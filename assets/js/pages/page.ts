import { RouteState } from '../global/types'
import gsap from 'gsap'
import { Params } from 'navaid'
import type { App } from '../app'
import {
	BEHINDS,
	BLOCKS,
	EVENT_OVERLAY_CLOSE,
	EVENT_RESIZE,
} from '../global/constants'
import { emitter } from '../global/emitter'
import { Block } from '../blocks/block'
import { Term } from '../overlays/term'
import { whenIdle } from '../utils/idle'
import { Overlay } from '../overlays/overlay'
import { random } from '../utils/math'
import { Behind } from '../behinds/behind'

export type DeepLink = {
	el?: HTMLElement
	hash: string
}

export class Page {
	public element: HTMLElement
	public app: App
	public blocks: Block[] = []
	public behinds: Behind[] = []
	public deeplink?: DeepLink
	public autoScrollToDeepLink = true

	// All overlay instances ascocciated with this page
	public overlays: Overlay[] = []

	constructor(element: HTMLElement, app: App, params?: Params) {
		this.element = element
		this.app = app
		this._initHash()
		this._initBlocks()
		this._initBehinds()
		this._initListeners()
		emitter.on(EVENT_RESIZE, this._onResize)
	}

	onResize() {}

	private _initHash() {
		try {
			const hash = window.location.hash
			if (!hash) return
			const el = this.element.querySelector(hash) as HTMLElement
			this.deeplink = { el, hash }
		} catch (e) {}
	}

	private _initListeners() {
		this.app.element.addEventListener('click', this._onTermClick)
	}

	private _getTerm(el: HTMLLinkElement) {
		if (!el.href) return null
		const matches = el.href.match(/^.*#term:(.+)$/m)
		if (!matches || !matches[1]) return null
		return matches[1]
	}

	private _onTermClick = async (event: MouseEvent) => {
		const el = event.target as HTMLLinkElement
		const term = this._getTerm(el)
		if (!term) return
		event.preventDefault()
		await this.openTerm(term, {
			x: event.pageX,
			y: event.pageY,
		})
	}

	// Open term programatically
	public async openTerm(term: string, position: { x: number; y: number }) {
		const termOverlay = new Term()
		try {
			await termOverlay.init(term)
		} catch (e) {
			return
		}
		termOverlay.animateIn({
			x: position.x + random(20, 20),
			y: position.y - termOverlay.rect.height / 2,
		})
		termOverlay.emitter.on(EVENT_OVERLAY_CLOSE, this._overlayClose)
		this.overlays.push(termOverlay)
	}

	private _overlayClose = async (overlay: Overlay) => {
		await overlay.animateOut(0)
		whenIdle(() => {
			this.overlays = this.overlays.filter((t) => t !== overlay)
			overlay.destroy()
		})
	}

	private _onResize = () => {
		if (this.onResize) this.onResize()
	}

	/**
	 * Init all blocks found on page.
	 */
	private _initBlocks() {
		const elements = [
			...this.element.querySelectorAll(`[data-block]`),
		] as HTMLElement[]
		this.blocks = elements.map((el: HTMLElement) => {
			const key = el.dataset.block as keyof typeof BLOCKS
			return new (BLOCKS[key] || BLOCKS.base)(el, this)
		})
	}

	private _initBehinds() {
		whenIdle(() => {
			const elements = [
				...this.element.querySelectorAll(`[data-behind]`),
			] as HTMLElement[]
			this.behinds = elements
				.filter((el: HTMLElement) => {
					return el.dataset.behind as keyof typeof BEHINDS
				})
				.map((el: HTMLElement) => {
					const key = el.dataset.behind as keyof typeof BEHINDS
					return new (BEHINDS[key] || BEHINDS.base)(el, this)
				})
		})
	}

	/**
	 * Scroll to URL hash if one is found.
	 * This is needed to support deep linking.
	 * @returns void
	 */
	public scrollToDeepLink() {
		if (!this.deeplink?.el) return
		this.deeplink.el?.scrollIntoView({
			behavior: 'smooth',
		})
	}

	/**
	 * Animate in handler called by router.
	 * @param from slug and type of the prev page
	 */
	async animateIn(from?: RouteState) {
		await Promise.all(this.blocks.map((b, index) => b.animateIn(index)))
		this.autoScrollToDeepLink && this.scrollToDeepLink()
		this.behinds.forEach((b) => b.show())
	}

	/**
	 * Animate out handler called by router.
	 * @param to slug and type of the next page
	 */
	async animateOut(to?: RouteState) {
		this.behinds.forEach((b) => b.hide())
		// Don't wait for overlays, they can take their time since
		// they live in an overlay on top of all content.
		this.overlays.forEach((t, i) => t.animateOut(i))
		this.blocks.forEach((b, i) => b.animateOut(i))
		await gsap.to(this.element, { opacity: 0, duration: 0.35 })
	}

	/**
	 * Destroy and cleanup.
	 * Automatically called by router.
	 */
	destroy() {
		this.blocks.forEach((b) => b.destroy())
		this.behinds.forEach((b) => b.destroy())
		this.overlays.forEach((t) => {
			t.emitter.off(EVENT_OVERLAY_CLOSE, this._overlayClose)
			t.destroy()
		})
		this.app.element.removeEventListener('click', this._onTermClick)
		emitter.off(EVENT_RESIZE, this._onResize)
	}
}
