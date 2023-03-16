import { gsap } from 'gsap/all'

export class Cursor {
	public x = 0
	public y = 0
	public ease = 0.12
	public element: HTMLElement

	public tx = 0
	public ty = 0
	public halfWidth = 0
	public halfHeight = 0
	public width = 0
	public height = 0
	private bound: DOMRect

	constructor(element: HTMLElement) {
		this.element = element
		this.element.style.zIndex = '99999'
		this.element.style.willChange = 'transform'
	}

	resize(bounds?: DOMRect) {
		const { width, height } = this.element.getBoundingClientRect()
		this.width = width
		this.height = height
		this.halfWidth = width * 0.5
		this.halfHeight = height * 0.5
		this.bound = bounds
	}

	/**
	 * Call this in render loop to update ease.
	 */
	update() {
		this.x += (this.tx - this.x) * this.ease
		this.y += (this.ty - this.y) * this.ease
		gsap.set(this.element, { x: this.x, y: this.y })
	}

	/**
	 * Prevent easing
	 */
	reset(x: number, y: number) {
		this.x = this.tx = x
		this.y = this.ty = y
		this.update()
	}

	/**
	 * Set new cursor position
	 * @param x number
	 * @param y number
	 */
	set(x: number, y: number) {
		// This is getting reset
		if (x - this.width < 0) {
			x = this.halfWidth
		} else if (x > this.bound.width - this.halfHeight) {
			x = this.bound.width - this.halfWidth
		}

		if (y - this.height < 0) {
			y = this.halfHeight
		} else if (y > this.bound.height - this.halfHeight) {
			y = this.bound.height - this.halfHeight
		}

		this.tx = x - this.halfWidth
		this.ty = y - this.halfHeight
	}
}
