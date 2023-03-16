import { gsap } from 'gsap'
import { Vec2 } from 'ogl-typescript'
import { debounce } from 'ts-debounce'
import { EVENT_OVERLAY_CLOSE, EVENT_SCROLL } from '../global/constants'
import { device } from '../global/device'
import { emitter } from '../global/emitter'
import { Slideshow } from '../components/slideshow'
import { Page } from '../pages/page'
import { Fluid } from '../webgl/fluid'
import { Block } from './block'
import { BouncingCoin } from '../utils/coin'
import { Screenshots, ScreenshotsMobile } from '../overlays/screenshots'
import { whenIdle } from '../utils/idle'

const RGX = new RegExp(`/${window.location.host}/`)

const EL = {
	shortcut: `.shortcut.preview`,
	downloadLink: `.download-cta .available`,
	systems: `.download-cta .systems a`,
	cta: `.download-cta`,
	canvas: `canvas.background`,
	coin: '.coin',
	slideshow: `.slideshow`,
	links: `.block__bottom .links a`,
}

export class IntroStart extends Block {
	private shortcut: HTMLElement
	private downloadLink: HTMLLinkElement
	private cta: HTMLElement
	private systems: { os: string; url: string; el: HTMLLinkElement }[]
	private currentSystem?: { os: string; url: string; el: HTMLLinkElement }
	private coin: BouncingCoin
	private canvas: HTMLCanvasElement
	private bg: any

	private overlay?: Screenshots
	private overlayMobile?: ScreenshotsMobile
	private slideshowElement: HTMLElement
	private links: HTMLLinkElement[]

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.shortcut = this.element.querySelector(EL.shortcut) as HTMLElement
		this.downloadLink = this.element.querySelector(EL.downloadLink)
		this.cta = this.element.querySelector(EL.cta) as HTMLElement
		this.links = [
			...this.element.querySelectorAll(EL.links),
		] as HTMLLinkElement[]
		this.canvas = element.querySelector(EL.canvas) as HTMLCanvasElement
		this.systems = ([
			...this.element.querySelectorAll(EL.systems),
		] as HTMLLinkElement[]).map((el) => ({
			os: el.dataset.os,
			url: el.href,
			el,
		}))
		this.coin = new BouncingCoin(
			element.querySelector(EL.coin) as HTMLElement,
			this
		)
		this.currentSystem = this.bestSystemGuess()
		this.bg = new Fluid(this.canvas)

		// Cache slideshow element and remove from DOM
		this.slideshowElement = this.element.querySelector(EL.slideshow)
		this.slideshowElement.remove()
		this.slideshowElement.style.opacity = '1'

		this.addListeners()
		this.setCTAState()
		this.styleCoverLinks()
		this.onResize()
	}

	private setCTAState() {
		if (!this.currentSystem) {
			this.cta.classList.add('disabled')
		} else {
			this.cta.classList.add('enabled')
		}
	}

	private styleCoverLinks() {
		this.links.forEach((link) => {
			if (link.href.match(/^mailto\:/)) return
			RGX.test(link.href)
				? link.classList.add('internal')
				: link.classList.add('external')
		})
	}

	private bestSystemGuess() {
		if (
			navigator.userAgent.match(/Linux/i) ||
			navigator.userAgent.match(/Ubuntu/i)
		) {
			return this.systems.filter((x) => x.os.includes('ubuntu'))[0]
		} else if (navigator.userAgent.match(/Windows/i)) {
			return this.systems.filter((x) => x.os.includes('windows'))[0]
		} else if (navigator.userAgent.match(/Mac/i)) {
			return this.systems.filter((x) => x.os.includes('macos'))[0]
		}
	}

	private addListeners() {
		this.shortcut.addEventListener(`click`, this.onPreviewClick)
		this.downloadLink.addEventListener(`click`, this.onDownloadClick)
		this.downloadLink.addEventListener(`click`, this.openOverlayMobile)
		this.cta.addEventListener(`click`, this.onDownloadClick)

		this.element.addEventListener('pointermove', this.onPointerMove)
		this.element.addEventListener('pointerdown', this.onPointerClick)

		emitter.on(EVENT_SCROLL, this.onBoundingRectRecalculate)
		this.draggable?.addEventListener('drag', this.onBoundingRectRecalculate)
	}

	private removeListeners() {
		this.shortcut.removeEventListener(`click`, this.onPreviewClick)
		this.downloadLink.removeEventListener(`click`, this.onDownloadClick)
		this.downloadLink.addEventListener(`click`, this.openOverlayMobile)
		this.cta.removeEventListener(`click`, this.onDownloadClick)

		this.element.removeEventListener('pointermove', this.onPointerMove)
		this.element.removeEventListener('pointerdown', this.onPointerClick)

		emitter.off(EVENT_SCROLL, this.onBoundingRectRecalculate)
		this.draggable?.removeEventListener('drag', this.onBoundingRectRecalculate)
	}

	private onPointerClick = (event: Event) => {
		event.preventDefault()
		let vec = new Vec2().copy(device.mouseLast)
		vec.x -= this.rect.left
		vec.y -= this.rect.top
		this.bg.onPointerClick(vec)
		console.log('onclick pointer')
	}

	private onDownloadClick = (event: Event) => {
		event.preventDefault()
		const el = event.target as HTMLElement
		if (el.classList.contains('direct-link')) return
		event.preventDefault()
		if (!this.currentSystem) return
		console.log(window.matchMedia('(max-width: 768px)').matches)
		if(window.matchMedia('(max-width: 768px)').matches) return
		open(this.currentSystem.url)
		
	}

	private onPreviewClick = (event: MouseEvent) => {
		event.preventDefault()
		if (this.isDesktopOverlay()) {
			this.openOverlay({
				x: event.pageX,
				y: event.pageY + 300,
			})
		} else {
			this.openOverlayMobile()
		}
	}

	private openOverlay(from: { x: number; y: number }) {
		if (this.overlay) return
		this.overlay = new Screenshots(this.slideshowElement)
		this.overlay.animateIn(from)
		this.overlay.emitter.on(EVENT_OVERLAY_CLOSE, this.onOverlayDesktopClose)
		this.page.overlays.push(this.overlay)
	}

	private isDesktopOverlay() {
		return device.width > 650
	}

	private openOverlayMobile() {
		if (this.overlayMobile) return
		this.overlayMobile = new ScreenshotsMobile(this.slideshowElement)
		this.overlayMobile.animateIn()
		this.overlayMobile.emitter.on(
			EVENT_OVERLAY_CLOSE,
			this.onOverlayMobileClose
		)
		console.log('Do something else')
	}

	private onOverlayMobileClose = async (overlay: ScreenshotsMobile) => {
		await overlay.animateOut()
		overlay.destroy()
		this.overlayMobile = null
	}

	private onOverlayDesktopClose = async (overlay: Screenshots) => {
		this.overlay = null
		await overlay.animateOut(0)
		whenIdle(() => {
			this.page.overlays = this.page.overlays.filter((t) => t !== overlay)
			overlay.destroy()
		})
	}

	private onBoundingRectRecalculate = debounce(() => {
		if (!this.isVisible) return
		this.rect = this.element.getBoundingClientRect()
	}, 15)

	onIntersection(isVisible: boolean, observer: IntersectionObserver) {
		isVisible ? this.start() : this.stop()
	}

	onResize() {
		const { width, height } = this.rect
		this.bg.resize(width, height)
		this.coin.resize(this.rect)
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
		this.coin.update()
	}

	stop() {
		gsap.ticker.remove(this.update)
	}

	start() {
		gsap.ticker.add(this.update)
	}

	destroy() {
		this.stop()
		this.removeListeners()
		this.coin.destroy()
		this.overlay?.destroy()
		this.overlayMobile?.destroy()
		super.destroy()
	}

	async animateIn(index: number) {
		await super.animateIn(index)
		this.onResize()
	}
}
