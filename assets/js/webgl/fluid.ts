import {
	OGLRenderingContext,
	Post,
	Renderer,
	Vec2,
	RenderTarget,
	Geometry,
	Program,
	Mesh,
	Color,
	Pass,
} from 'ogl-typescript'
import { device } from '../global/device'
import { createDoubleFBO, getFormats, FBOTarget } from './helpers'
import {
	advectionManualFilteringShader,
	advectionShader,
	baseVertex,
	clearShader,
	curlShader,
	divergenceShader,
	gradientSubtractShader,
	pressureShader,
	splatShader,
	vorticityShader,
	fragment,
} from './fluid-shaders'
import { BlobGradient } from './blob-gradient'

type Splat = {
	x: number
	y: number
	dx: number
	dy: number
}

// Resolution of simulation
const simRes = 128
const dyeRes = 256 //512

// Main inputs to control look and feel of fluid

const FLUID_PARAMS = {
	iterations: 3,
	densityDissipation: 0.97,
	velocityDissipation: 0.98,
	pressureDissipation: 0.8,
	curlStrength: 20,
	radius: 0.3,
}

const GRADIENT_PARAMS = {
	uColor: 0x3affa7,
	uBackgroundColor: 0xf4f4f4,
	uNoiseScaleX: 1.31,
	uNoiseScaleY: 1.3,
	uNoiseSpeedX: 0.1,
	uNoiseSpeedY: 0.12,
	uFadeStop: 0.9,
}

let cache: Fluid

export class Fluid {
	// Render
	private renderer: Renderer
	private gl: OGLRenderingContext
	private post: Post
	private pass: Pass

	// Common uniform
	private texelSize = { value: new Vec2(1 / simRes) }
	private supportLinearFiltering: any

	// System
	private halfFloat: GLenum
	private filtering: number
	private formats: { rgba: any; rg: any; r: any }

	// FBOs
	private curl: RenderTarget
	private divergence: RenderTarget
	private pressure: FBOTarget
	private velocity: FBOTarget
	private density: FBOTarget

	// Other
	private triangle: Geometry
	private splats: Splat[] = []
	private mesh: BlobGradient
	private supportOffscreenCanvas = false

	// Programs
	private clearProgram: Mesh
	private splatProgram: Mesh
	private advectionProgram: Mesh
	private divergenceProgram: Mesh
	private curlProgram: Mesh
	private vorticityProgram: Mesh
	private pressureProgram: Mesh
	private gradienSubtractProgram: Mesh

	constructor(canvas: HTMLCanvasElement) {
		if (cache) {
			canvas.replaceWith(cache.gl.canvas)
			return cache
		}

		this.supportOffscreenCanvas = typeof OffscreenCanvas !== 'undefined'
		// if (this.supportOffscreenCanvas) {
		// 	console.log('::OFFSCREEN CANVAS SUPPORT')
		// 	const offscreen = canvas.transferControlToOffscreen();
		// 	// @ts-ignore
		// 	offscreen.style = {}
		// 	this.initRenderer(offscreen)
		// } else {
		// this.initRenderer(canvas)
		// }

		this.initRenderer(canvas)
		this.initSupported()
		this.initFluidSimulationFBOs()
		this.initMeshes()
		this.initFluidSimulationPrograms()

		cache = this
	}

	private initRenderer(canvas: HTMLCanvasElement | OffscreenCanvas) {
		this.renderer = new Renderer({
			canvas: canvas as HTMLCanvasElement,
			dpr: 1,
		})
		this.gl = this.renderer.gl

		this.gl.clearColor(0.956, 0.956, 0.956, 1)
		this.post = new Post(this.gl)

		// Final last post composit pass.
		// Takes original gradients and distrot it
		// with the fluid simulation
		this.pass = this.post.addPass({
			fragment,
			uniforms: {
				tFluid: { value: null },
				uTime: { value: 0 },
			},
		})
	}

	private initSupported() {
		// Get supported formats and types for FBOs
		this.supportLinearFiltering = this.gl.renderer.extensions[
			`OES_texture_${this.gl.renderer.isWebgl2 ? `` : `half_`}float_linear`
		]
		this.halfFloat = this.gl.renderer.isWebgl2
			? (this.gl as WebGL2RenderingContext).HALF_FLOAT
			: this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES

		this.filtering = this.supportLinearFiltering
			? this.gl.LINEAR
			: this.gl.NEAREST
		this.formats = getFormats(this.gl, this.halfFloat)
	}

	private initFluidSimulationFBOs() {
		const {
			gl,
			halfFloat,
			filtering,
			formats: { rgba, r, rg },
		} = this

		this.density = createDoubleFBO(gl, {
			width: dyeRes,
			height: dyeRes,
			type: halfFloat,
			format: rgba?.format,
			internalFormat: rgba?.internalFormat,
			minFilter: filtering,
			depth: false,
		})

		this.velocity = createDoubleFBO(gl, {
			width: simRes,
			height: simRes,
			type: halfFloat,
			format: rg?.format,
			internalFormat: rg?.internalFormat,
			minFilter: filtering,
			depth: false,
		})

		this.pressure = createDoubleFBO(gl, {
			width: simRes,
			height: simRes,
			type: halfFloat,
			format: r?.format,
			internalFormat: r?.internalFormat,
			minFilter: gl.NEAREST,
			depth: false,
		})

		this.divergence = new RenderTarget(gl, {
			width: simRes,
			height: simRes,
			type: halfFloat,
			format: r?.format,
			internalFormat: r?.internalFormat,
			minFilter: gl.NEAREST,
			depth: false,
		})

		this.curl = new RenderTarget(gl, {
			width: simRes,
			height: simRes,
			type: halfFloat,
			format: r?.format,
			internalFormat: r?.internalFormat,
			minFilter: gl.NEAREST,
			depth: false,
		})
	}

	private initMeshes() {
		// Reused full screen geometry
		this.triangle = new Geometry(this.gl, {
			position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
			uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
		})

		// Full screen mesh to render
		this.mesh = new BlobGradient(this.gl, this.triangle)
	}

	private initFluidSimulationPrograms() {
		const { triangle, texelSize, gl, supportLinearFiltering } = this

		this.clearProgram = new Mesh(gl, {
			geometry: triangle,
			program: new Program(gl, {
				vertex: baseVertex,
				fragment: clearShader,
				uniforms: {
					texelSize,
					uTexture: { value: null },
					value: { value: FLUID_PARAMS.pressureDissipation },
				},
				depthTest: false,
				depthWrite: false,
			}),
		})

		this.splatProgram = new Mesh(gl, {
			geometry: triangle,
			program: new Program(gl, {
				vertex: baseVertex,
				fragment: splatShader,
				uniforms: {
					texelSize,
					uTarget: { value: null },
					aspectRatio: { value: 1 },
					color: { value: new Color() },
					point: { value: new Vec2() },
					radius: { value: 1 },
				},
				depthTest: false,
				depthWrite: false,
			}),
		})

		this.advectionProgram = new Mesh(gl, {
			geometry: triangle,
			program: new Program(gl, {
				vertex: baseVertex,
				fragment: supportLinearFiltering
					? advectionShader
					: advectionManualFilteringShader,
				uniforms: {
					texelSize,
					dyeTexelSize: { value: new Vec2(1 / dyeRes, 1 / dyeRes) },
					uVelocity: { value: null },
					uSource: { value: null },
					dt: { value: 0.016 },
					dissipation: { value: 1.0 },
				},
				depthTest: false,
				depthWrite: false,
			}),
		})

		this.divergenceProgram = new Mesh(gl, {
			geometry: triangle,
			program: new Program(gl, {
				vertex: baseVertex,
				fragment: divergenceShader,
				uniforms: {
					texelSize,
					uVelocity: { value: null },
				},
				depthTest: false,
				depthWrite: false,
			}),
		})

		this.curlProgram = new Mesh(gl, {
			geometry: triangle,
			program: new Program(gl, {
				vertex: baseVertex,
				fragment: curlShader,
				uniforms: {
					texelSize,
					uVelocity: { value: null },
				},
				depthTest: false,
				depthWrite: false,
			}),
		})

		this.vorticityProgram = new Mesh(gl, {
			geometry: triangle,
			program: new Program(gl, {
				vertex: baseVertex,
				fragment: vorticityShader,
				uniforms: {
					texelSize,
					uVelocity: { value: null },
					uCurl: { value: null },
					curl: { value: FLUID_PARAMS.curlStrength },
					dt: { value: 0.016 },
				},
				depthTest: false,
				depthWrite: false,
			}),
		})

		this.pressureProgram = new Mesh(gl, {
			geometry: triangle,
			program: new Program(gl, {
				vertex: baseVertex,
				fragment: pressureShader,
				uniforms: {
					texelSize,
					uPressure: { value: null },
					uDivergence: { value: null },
				},
				depthTest: false,
				depthWrite: false,
			}),
		})

		this.gradienSubtractProgram = new Mesh(gl, {
			geometry: triangle,
			program: new Program(gl, {
				vertex: baseVertex,
				fragment: gradientSubtractShader,
				uniforms: {
					texelSize,
					uPressure: { value: null },
					uVelocity: { value: null },
				},
				depthTest: false,
				depthWrite: false,
			}),
		})
	}

	// Function to draw number of interactions onto input render target
	private splat({ x, y, dx, dy }: Splat) {
		this.splatProgram.program.uniforms.uTarget.value = this.velocity.read.texture
		this.splatProgram.program.uniforms.aspectRatio.value =
			this.gl.renderer.width / this.gl.renderer.height
		this.splatProgram.program.uniforms.point.value.set(x, y)
		this.splatProgram.program.uniforms.color.value.set(dx, dy, 1.0)
		this.splatProgram.program.uniforms.radius.value =
			FLUID_PARAMS.radius / 100.0

		this.gl.renderer.render({
			scene: this.splatProgram,
			target: this.velocity.write,
			sort: false,
			update: false,
		})
		this.velocity.swap()

		this.splatProgram.program.uniforms.uTarget.value = this.density.read.texture

		this.gl.renderer.render({
			scene: this.splatProgram,
			target: this.density.write,
			sort: false,
			update: false,
		})
		this.density.swap()
	}

	onPointerClick = (position: Vec2) => {
		console.log('Pointer::click')
		let x = position.x / this.gl.renderer.width
		let y = 1.0 - position.y / this.gl.renderer.height
		for (let i = 0; i < 360 / Math.PI; i++) {
			this.splats.push({
				x,
				y,
				dx: 800 * Math.sin(100 * i),
				dy: 800 * Math.cos(100 * i),
			})
		}
	}

	// --- Public

	updatePointer(position: Vec2) {
		// Add splats if the mouse is moving
		if (Math.abs(device.mouseDelta.x) || Math.abs(device.mouseDelta.y)) {
			this.splats.push({
				// Get mouse value in 0 to 1 range, with y flipped
				x: position.x / this.gl.renderer.width,
				y: 1.0 - position.y / this.gl.renderer.height,
				dx: device.mouseDelta.x * 5.0,
				dy: device.mouseDelta.y * -5.0,
			})
		}
	}

	update = (t: number) => {
		// Perform all of the fluid simulation renders
		// No need to clear during sim, saving a number of GL calls.
		this.gl.renderer.autoClear = false

		// Render all of the inputs since last frame
		for (let i = this.splats.length - 1; i >= 0; i--) {
			this.splat(this.splats.splice(i, 1)[0])
		}

		this.curlProgram.program.uniforms.uVelocity.value = this.velocity.read.texture

		this.gl.renderer.render({
			scene: this.curlProgram,
			target: this.curl,
			sort: false,
			update: false,
		})

		this.vorticityProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
		this.vorticityProgram.program.uniforms.uCurl.value = this.curl.texture

		this.gl.renderer.render({
			scene: this.vorticityProgram,
			target: this.velocity.write,
			sort: false,
			update: false,
		})
		this.velocity.swap()

		this.divergenceProgram.program.uniforms.uVelocity.value = this.velocity.read.texture

		this.gl.renderer.render({
			scene: this.divergenceProgram,
			target: this.divergence,
			sort: false,
			update: false,
		})

		this.clearProgram.program.uniforms.uTexture.value = this.pressure.read.texture
		this.clearProgram.program.uniforms.value.value =
			FLUID_PARAMS.pressureDissipation

		this.gl.renderer.render({
			scene: this.clearProgram,
			target: this.pressure.write,
			sort: false,
			update: false,
		})
		this.pressure.swap()

		this.pressureProgram.program.uniforms.uDivergence.value = this.divergence.texture

		for (let i = 0; i < FLUID_PARAMS.iterations; i++) {
			this.pressureProgram.program.uniforms.uPressure.value = this.pressure.read.texture

			this.gl.renderer.render({
				scene: this.pressureProgram,
				target: this.pressure.write,
				sort: false,
				update: false,
			})
			this.pressure.swap()
		}

		this.gradienSubtractProgram.program.uniforms.uPressure.value = this.pressure.read.texture
		this.gradienSubtractProgram.program.uniforms.uVelocity.value = this.velocity.read.texture

		this.gl.renderer.render({
			scene: this.gradienSubtractProgram,
			target: this.velocity.write,
			sort: false,
			update: false,
		})
		this.velocity.swap()

		this.advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / simRes)
		this.advectionProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
		this.advectionProgram.program.uniforms.uSource.value = this.velocity.read.texture
		this.advectionProgram.program.uniforms.dissipation.value =
			FLUID_PARAMS.velocityDissipation

		this.gl.renderer.render({
			scene: this.advectionProgram,
			target: this.velocity.write,
			sort: false,
			update: false,
		})
		this.velocity.swap()

		this.advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / dyeRes)
		this.advectionProgram.program.uniforms.uVelocity.value = this.velocity.read.texture
		this.advectionProgram.program.uniforms.uSource.value = this.density.read.texture
		this.advectionProgram.program.uniforms.dissipation.value =
			FLUID_PARAMS.densityDissipation

		this.gl.renderer.render({
			scene: this.advectionProgram,
			target: this.density.write,
			sort: false,
			update: false,
		})
		this.density.swap()

		// Set clear back to default
		this.gl.renderer.autoClear = true

		// Update post pass uniform with the simulation output
		this.pass.uniforms.tFluid.value = this.density.read.texture

		// Update local here
		this.mesh.program.uniforms.uTime.value = t
		this.mesh.program.uniforms.uNoiseSpeed.value.x =
			GRADIENT_PARAMS.uNoiseSpeedX
		this.mesh.program.uniforms.uNoiseSpeed.value.y =
			GRADIENT_PARAMS.uNoiseSpeedY
		this.mesh.program.uniforms.uNoiseScale.value.x =
			GRADIENT_PARAMS.uNoiseScaleX
		this.mesh.program.uniforms.uNoiseScale.value.y =
			GRADIENT_PARAMS.uNoiseScaleY
		this.mesh.program.uniforms.uColor.value.set(GRADIENT_PARAMS.uColor)

		this.pass.uniforms.uTime.value = t

		// Replace Renderer.render with post.render. Use the same arguments.
		this.post.render({ scene: this.mesh })
	}

	resize(width: number, height: number) {
		this.renderer.setSize(width, height)
		this.post.resize()
	}
}
