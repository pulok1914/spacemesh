//@ts-ignore
import {
	OGLRenderingContext,
	RenderTarget,
	RenderTargetOptions,
} from 'ogl-typescript'

// Helper functions for larger device support
export function getSupportedFormat(
	gl: any,
	internalFormat: any,
	format: any,
	type: any
): any {
	if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
		switch (internalFormat) {
			case gl.R16F:
				return getSupportedFormat(gl, gl.RG16F, gl.RG, type)
			case gl.RG16F:
				return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type)
			default:
				return null
		}
	}

	return { internalFormat, format }
}

export function supportRenderTextureFormat(
	gl: any,
	internalFormat: any,
	format: any,
	type: any
) {
	let texture = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, texture)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)

	let fbo = gl.createFramebuffer()
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
	gl.framebufferTexture2D(
		gl.FRAMEBUFFER,
		gl.COLOR_ATTACHMENT0,
		gl.TEXTURE_2D,
		texture,
		0
	)

	const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
	if (status != gl.FRAMEBUFFER_COMPLETE) return false
	return true
}

// Helper to create a ping-pong FBO pairing for simulating on GPU
export type FBOTarget = {
	read: RenderTarget
	write: RenderTarget
	swap: () => void
}

export function createDoubleFBO(
	gl: OGLRenderingContext,
	{
		width,
		height,
		wrapS,
		wrapT,
		minFilter = gl.LINEAR,
		magFilter = minFilter,
		type,
		format,
		internalFormat,
		depth,
	}: Partial<RenderTargetOptions> = {}
): FBOTarget {
	const options = {
		width,
		height,
		wrapS,
		wrapT,
		minFilter,
		magFilter,
		type,
		format,
		internalFormat,
		depth,
	}
	const fbo = {
		read: new RenderTarget(gl, options),
		write: new RenderTarget(gl, options),
		swap: () => {
			let temp = fbo.read
			fbo.read = fbo.write
			fbo.write = temp
		},
	}
	return fbo
}

export function getFormats(gl: OGLRenderingContext, halfFloat: GLenum) {
	let rgba, rg, r
	if (gl.renderer.isWebgl2) {
		rgba = getSupportedFormat(
			gl,
			(gl as WebGL2RenderingContext).RGBA16F,
			gl.RGBA,
			halfFloat
		)
		rg = getSupportedFormat(
			gl,
			(gl as WebGL2RenderingContext).RG16F,
			(gl as WebGL2RenderingContext).RG,
			halfFloat
		)
		r = getSupportedFormat(
			gl,
			(gl as WebGL2RenderingContext).R16F,
			(gl as WebGL2RenderingContext).RED,
			halfFloat
		)
	} else {
		rgba = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloat)
		rg = rgba
		r = rgba
	}
	return { rgba, rg, r }
}
