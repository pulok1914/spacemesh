import gsap from 'gsap/all'
import mitt from 'mitt'
import { Slideshow } from '../components/slideshow'
import { EVENT_OVERLAY_CLOSE } from '../global/constants'
import { Overlay } from './overlay'

export class Screenshots extends Overlay {
	private controller: Slideshow
	private close: HTMLElement

	constructor(element: HTMLElement) {
		super('screenshots')
		this.init(element)
		this.addListeners()
	}

	private init(element: HTMLElement) {
		this.createElement()
		this.element.appendChild(element)
		this.close = element.querySelector('.close') as HTMLElement
		this.controller = new Slideshow(element)
	}

	private addListeners() {
		this.close.addEventListener('click', this.onCloseClick)
	}

	private onCloseClick = () => {
		this.emitter.emit(EVENT_OVERLAY_CLOSE, this)
	}

	async destroy() {
		this.controller.destroy()
		super.destroy()
	}
}

export class ScreenshotsMobile {
	private element: HTMLElement
	private close: HTMLElement
	private controller: Slideshow
	emitter = mitt()

	constructor(element: HTMLElement) {
		this.element = element
		this.controller = new Slideshow(element)
		this.close = element.querySelector('.close') as HTMLElement
		this.addListeners()
	}

	private addListeners() {
		this.close.addEventListener('click', this.onCloseClick)
	}

	private preventScroll(enable: boolean) {
		document.body.style.overflow = enable ? 'hidden' : 'auto'
		document.documentElement.style.overflow = enable ? 'hidden' : 'auto'
	}

	private onCloseClick = () => {
		this.emitter.emit(EVENT_OVERLAY_CLOSE, this)
	}

	animateIn() {
		this.preventScroll(true)
		this.element.classList.add('slideshow--mobile')
		gsap.set(this.element, { opacity: 0 })
		document.body.append(this.element)
		gsap.to(this.element, { opacity: 1, duration: 0.5 })
	}

	async animateOut() {
		await gsap.to(this.element, { opacity: 0, duration: 0.25 })
		this.element.remove()
	}

	destroy() {
		this.element.classList.remove('slideshow--mobile')
		this.element.remove()
		this.controller.destroy()
		this.preventScroll(false)
	}
}
