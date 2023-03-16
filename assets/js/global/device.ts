import { Vec2 } from 'ogl-typescript'
import { EVENT_RESIZE, EVENT_SCROLL } from './constants'
import { emitter } from './emitter'

export class Device {
	public width: number
	public height: number
	public halfWidth: number
	public halfHeight: number
	public readonly isTouchCapable = 'ontouchstart' in document.documentElement
	public lastScrollY: number = 0
	public mouseLast = new Vec2()
	public mouseDelta = new Vec2()

	private isLastMouseInit = false

	constructor() {
		window.addEventListener('resize', (event: Event) => this.onResize(event), {
			passive: true,
		})
		window.addEventListener('scroll', (event: Event) => this.onScroll(event), {
			passive: true,
		})

		if (this.isTouchCapable) {
			window.addEventListener('touchstart', this.onTouchMove, false)
			window.addEventListener('touchmove', this.onTouchMove, false)
		} else {
			window.addEventListener('pointermove', this.onMouseMove, false)
		}

		this.onResize()
	}

	isDebug() {
		const params = new URLSearchParams(window.location.search)
		return params.has('debug')
	}

	private onMouseMove = (event: MouseEvent) => {
		let x = event.x,
			y = event.y
		if (x == undefined) {
			x = event.pageX
			y = event.pageY
		}
		this.updatePointer(x, y)
	}

	private onTouchMove = (event: TouchEvent) => {
		let x = event.changedTouches[0].pageX
		let y = event.changedTouches[0].pageY
		this.updatePointer(x, y)
	}

	private updatePointer(x: number, y: number) {
		if (!this.isLastMouseInit) {
			this.isLastMouseInit = true
			this.mouseLast.set(x, y)
		}
		this.mouseDelta.set(x - this.mouseLast.x, y - this.mouseLast.y)
		this.mouseLast.set(x, y)
	}

	private onResize(event?: Event): void {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.halfWidth = Math.round(this.width * 0.5)
		this.halfHeight = Math.round(this.height * 0.5)
		emitter.emit(EVENT_RESIZE, {
			width: this.width,
			height: this.height,
		})
	}

	private onScroll(event: Event): void {
		emitter.emit(EVENT_SCROLL, {
			y: window.scrollY,
			deltaY: window.scrollY - this.lastScrollY,
		})
		this.lastScrollY = window.scrollY
	}
}

export const device = new Device()
