import { gsap } from 'gsap'
import { Vec2 } from 'ogl-typescript'
import { debounce } from 'ts-debounce'
import { EVENT_SCROLL } from '../global/constants'
import { device } from '../global/device'
import { emitter } from '../global/emitter'
import { Page } from '../pages/page'
import { whenIdle } from '../utils/idle'
import { Fluid } from '../webgl/fluid'
import { Block } from './block'

const RGX = new RegExp(`/${window.location.host}/`)
const EL = {
	links: `.links a`,
	canvas: `canvas.background`,
}

export class Cover extends Block {
	private links: HTMLLinkElement[]
	private bg: Fluid
	private canvas: HTMLCanvasElement

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.links = [...element.querySelectorAll(EL.links)] as HTMLLinkElement[]
		this.canvas = element.querySelector(EL.canvas) as HTMLCanvasElement

		this.bg = new Fluid(this.canvas)

		this.styleCoverLinks()
		this.addListeners()

		whenIdle(() => {
			this.bg.resize(this.rect.width, this.rect.height)
		})
	}

	private addListeners() {
		emitter.on(EVENT_SCROLL, this.onBoundingRectRecalculate)
		this.element.addEventListener('pointermove', this.onPointerMove)
		this.draggable?.addEventListener('drag', this.onBoundingRectRecalculate)
		this.links.forEach((link) => {
			link.addEventListener('click', this.onLinkClick)
		})
	}

	private onBoundingRectRecalculate = debounce(() => {
		if (!this.isVisible) return
		this.rect = this.element.getBoundingClientRect()
	}, 15)

	/**
	 * Style link arrows accordingly.
	 */
	private styleCoverLinks() {
		this.links.forEach((link) => {
			if (link.href.match(/^mailto\:/)) return
			RGX.test(link.href)
				? link.classList.add('internal')
				: link.classList.add('external')
		})
	}

	private onLinkClick = (event: Event) => {
		const link = event.currentTarget as HTMLLinkElement
		const id = link.href.split('#')[1]
		if (RGX.test(link.href) && id) {
			event.preventDefault()
			document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth' })
		}
	}

	onIntersection(isVisible: boolean, observer: IntersectionObserver) {
		isVisible ? this.start() : this.stop()
	}

	onResize() {
		const { width, height } = this.rect
		this.bg.resize(width, height)
	}

	onPointerMove = () => {
		let vec = new Vec2().copy(device.mouseLast)
		vec.x -= this.rect.left
		vec.y -= this.rect.top
		this.bg.updatePointer(vec)
	}

	update = (t: number) => {
		if (!this.isVisible) return
		this.bg.update(t)
	}

	stop() {
		gsap.ticker.remove(this.update)
	}

	start() {
		gsap.ticker.add(this.update)
	}

	destroy() {
		this.stop()
		emitter.off(EVENT_SCROLL, this.onBoundingRectRecalculate)
		this.draggable.removeEventListener('drag', this.onBoundingRectRecalculate)
		this.element.removeEventListener('pointermove', this.onPointerMove)
		this.links.forEach((link) =>
			link.removeEventListener('click', this.onLinkClick)
		)
		super.destroy()
	}
}
