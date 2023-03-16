import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import mitt from 'mitt'
import { whenIdle } from '../utils/idle'
import { emitter } from '../global/emitter'
import { EVENT_RESIZE } from '../global/constants'
import { device } from '../global/device'
import { random } from '../utils/math'

const CONTAINER_ELEMENT = '.overlays'

const wait = (t: number) => new Promise((r) => setTimeout(r, t))

/**
 * Base class for all floating overlay windows.
 * This includes arley and persona videos.
 */
export class Overlay {
	static parent = document.querySelector(CONTAINER_ELEMENT) as HTMLElement

	/**
	 * HTML element for the entire floating overlay.
	 */
	public element: HTMLElement

	/**
	 * Uniqe string identifier
	 */
	public type: string

	/**
	 * Local event emitter used to communicate
	 * with containing view
	 */
	public emitter = mitt()

	/**
	 * Rect for the current window.
	 * Automatically updated on resize.
	 */
	public rect: DOMRect

	/**
	 * Window width and height.
	 */
	private origin: { x: number; y: number }
	public target: { x: number; y: number }

	/**
	 * Local coordinate pointer position
	 */
	public pointerX = 0
	public pointerY = 0

	// Tweens
	public draggable: Draggable
	private outTween: gsap.core.Timeline

	public dragging: boolean = false

	constructor(type: string) {
		this.type = type
		emitter.on(EVENT_RESIZE, this._onResize)
	}

	/**
	 * Call this to constrcut dom.
	 * This allow parents to do work before
	 * dom gets constructed.
	 */
	createElement() {
		this._initContainer()
		this._initDraggable()
	}

	private _initContainer() {
		this.element = document.createElement(`article`)
		this.element.setAttribute(`data-overlay`, this.type)
		this.element.classList.add(`overlay`, `shadow`)

		Overlay.parent.appendChild(this.element)
	}

	private _initDraggable() {
		this.draggable = Draggable.create(this.element, {
			type: 'x,y',
			minimumMovement: device.isTouchCapable ? 5 : 3,
			onDragStart: () => {
				this.dragging = true
			},
			onDragEnd: () => {
				this.dragging = false
			},
		})[0]
	}

	private _onResize = () => {
		if (!this.element) return
		this.rect = this.element.getBoundingClientRect()
		this.onResize()
	}

	onResize() {}

	/**
	 * Animate in overlay.
	 */
	async animateIn(from: { x: number; y: number }) {
		// wait micro-task to get width
		await wait(0)
		const { width, height } = this.element.getBoundingClientRect()

		// Set inital position close to click
		gsap.set(this.element, {
			x: from.x,
			y: from.y,
			opacity: 0,
		})

		// Make sure target is not extending the view by clamping X value.
		const x = device.isTouchCapable ? 0 : (device.width - width) / 2
		const y = from.y + random(0, 80)

		await gsap
			.timeline({ defaults: { ease: 'expo.out' } })
			.to(this.element, {
				x,
				y,
				duration: 1,
				ease: 'expo.out',
			})
			.to(this.element, { opacity: 1, duration: 0.25 }, '-=0.98')
	}

	/**
	 * Animate out the overlay
	 * @param index index in wich overlay is animated out on page transition
	 */
	async animateOut(index = 0) {
		this.outTween = gsap
			.timeline({ defaults: { ease: 'expo.out' } })
			.to(this.element, {
				y: '-=100',
				duration: 0.65,
				ease: 'expo.out',
				delay: index * 0.1,
			})
			.to(this.element, { opacity: 0, duration: 0.5 }, '-=0.6')

		await this.outTween
	}

	/**
	 * Release resources. Automatically makes sure
	 * out animation is done before destroying.
	 */
	async destroy(safe = true) {
		// Overlays can outlive their parent which triggers destory.
		// The parent call destory, but it won't complete before
		// the animate out tween has finished.
		if (safe) await this.outTween
		whenIdle(() => {
			this.element.remove()
			this.draggable.kill()
			emitter.off(EVENT_RESIZE, this._onResize)
		})
	}
}
