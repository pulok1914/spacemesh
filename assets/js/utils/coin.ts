import { Block } from '../blocks/block'
import { gsap } from 'gsap/all'
import { EVENT_SCROLL } from '../global/constants'
import { emitter } from '../global/emitter'
import { ScrollEventState } from '../global/types'

export class BouncingCoin {
	private element: HTMLElement
	private x = 0
	private y = 0
	private dx = 1.2
	private dy = 1.2
	private bounds: DOMRect
	private size: DOMRect
	private inner: HTMLElement

	private targetScroll = 0
	private scroll = 0
	private parent: Block

	constructor(element: HTMLElement, parent: Block) {
		this.element = element
		this.inner = element.querySelector('.inner') as HTMLElement
		this.bounds = parent.rect
		this.parent = parent
		this.size = element.getBoundingClientRect()
		emitter.on(EVENT_SCROLL, this.onScroll)
	}

	private onScroll = (payload: ScrollEventState) => {
		if (!this.parent.isVisible) return
		this.targetScroll += Math.abs(payload.deltaY) * 1.35
	}

	update() {
		gsap.set(this.element, { x: this.x, y: this.y })

		if (this.x > this.bounds.width - this.size.width) {
			this.dx = -this.dx
			this.x = this.bounds.width - this.size.width
		} else if (this.x < 0) {
			this.dx = -this.dx
			this.x = 0
		}

		if (this.y > this.bounds.height - this.size.height) {
			this.dy = -this.dy
			this.y = this.bounds.height - this.size.height
		} else if (this.y < 0) {
			this.dy = -this.dy
			this.y = 0
		}

		this.x += this.dx
		this.y += this.dy

		this.targetScroll += 6
		this.scroll = (this.targetScroll - this.scroll) * 0.25
		gsap.set(this.inner, { rotationZ: this.scroll })
	}

	resize(rect: DOMRect) {
		this.bounds = rect
		this.size = this.element.getBoundingClientRect()
	}

	destroy() {
		emitter.off(EVENT_SCROLL, this.onScroll)
	}
}
