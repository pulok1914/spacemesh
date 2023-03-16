import { gsap, Draggable } from 'gsap/all'
import { EVENT_RESIZE } from '../global/constants'
import { emitter } from '../global/emitter'
import { whenIdle } from '../utils/idle'
import { Page } from '../pages/page'
import { device } from '../global/device'

export type BlockOptions = {
	intersectionObserverOptions: IntersectionObserverInit
}

/**
 * Base class for all window blocks.
 * Implement basic features such as resize and dragging.
 */
export class Block {
	public element: HTMLElement
	public rect: DOMRect
	public dragging = false
	public page: Page
	public draggable: Draggable
	public isVisible: boolean

	private observer: IntersectionObserver
	private _dragarea: HTMLElement
	private _options: Partial<BlockOptions>

	constructor(
		element: HTMLElement,
		page: Page,
		options?: Partial<BlockOptions>
	) {
		this.element = element
		this.page = page
		this._options = options
		this._dragarea = this.element.querySelector('.dragarea') as HTMLElement
		this._initDrag()
		this._initListeners()
		this.rect = this.element.getBoundingClientRect()

		this.presetAnimation()
	}

	onResize() {}

	onIntersection(isVisible: boolean, observer: IntersectionObserver) {}

	// Internal only
	private _initListeners() {
		emitter.on(EVENT_RESIZE, this._onResize)
		this.observer = new IntersectionObserver(
			this._onIntersection,
			this._options?.intersectionObserverOptions
		)
		this.observer.observe(this.element)
	}

	// Internal only
	private _onResize = () => {
		this.rect = this.element.getBoundingClientRect()
		this.onResize()
	}

	// Triggered when block becomes visible
	private _onIntersection = (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				if (!this.isVisible) {
					this.isVisible = true
					this.onIntersection(true, observer)
				}
			} else {
				if (this.isVisible) {
					this.isVisible = false
					this.onIntersection(false, observer)
				}
			}
		}
	}

	// Internal only
	private _initDrag() {
		this.draggable = Draggable.create(this.element, {
			trigger: this._dragarea,
			type: 'x,y',
			minimumMovement: 5,
			onDrag: () => {
				this.dragging = true
				this.element.classList.add('shadow')
				this.element.classList.add('dragging')
			},
			onDragEnd: () => {
				this.dragging = false
				this.element.classList.remove('dragging')
				this.rect = this.element.getBoundingClientRect()
			},
		})[0]

		if (device.isTouchCapable) this.draggable.disable()
	}

	/**
	 * Reset position if dragged
	 */
	async reset() {
		await gsap.to(this.element, { x: 0, y: 0, duration: 0.8 })
		this.element.classList.remove('dragging')
		this.element.classList.remove('shadow')
	}

	/**
	 * Preset animation.
	 */
	presetAnimation() {
		gsap.set(this.element, { opacity: 0, y: 50, scale: 0.9 })
	}

	/**
	 * Animate in handler called by parent page.
	 * @param index the animate in index
	 */
	async animateIn(index: number) {
		await gsap.timeline({ defaults: { ease: 'circ.out' } }).to(this.element, {
			opacity: 1,
			y: 0,
			scale: 1,
			delay: Math.min(index * 0.12, 2),
		})
	}

	/**
	 * Animate out handler called by parent page.
	 * @param index the animate out index
	 */
	async animateOut(index: number) {
		await gsap.to(this.element, {
			opacity: 0,
			duration: 0.35,
			delay: Math.min(index * 0.12, 0.7),
		})
	}

	/**
	 * Release resources
	 */
	destroy() {
		whenIdle(() => {
			emitter.off(EVENT_RESIZE, this._onResize)
			this.observer.disconnect()
			this.draggable.kill()
		})
	}
}
