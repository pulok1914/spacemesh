import { gsap, SplitText } from 'gsap/all'
import { debounce } from 'ts-debounce'
import { EVENT_OVERLAY_CLOSE, EVENT_SCROLL } from '../global/constants'
import { emitter } from '../global/emitter'
import { device } from '../global/device'
import { VideoPlayer } from '../overlays/video-player'
import { Page } from '../pages/page'
import { Cursor } from '../utils/cursor'
import { whenIdle } from '../utils/idle'
import { Block } from './block'

const EL = {
	quotes: `.quote`,
	cursor: `.cursor`,
	header: `.block__top h2`,
	links: `.block__top h2 a`,
}

export class CreatorsLarge extends Block {
	private isHovering: boolean
	private quote: HTMLElement

	private cursor: Cursor
	private pointerX: number = 0
	private pointerY: number = 0

	private playerOverlays: VideoPlayer[] = []
	private quotes: HTMLElement[] = []

	private header: HTMLElement
	private headerTween: gsap.core.Tween
	private headerSplit: SplitText

	constructor(element: HTMLElement, page: Page) {
		super(element, page, {
			intersectionObserverOptions: {
				threshold: 0,
				rootMargin: '0px 0px -30% 0px',
			},
		})
		this.quotes = [...element.querySelectorAll(EL.quotes)] as HTMLElement[]
		this.cursor = new Cursor(element.querySelector(EL.cursor) as HTMLElement)
		this.cursor.resize(this.rect)
		this.initRandomQuote()
		this.addListeners()
	}

	private initRandomQuote() {
		const random = this.quotes[Math.floor(Math.random() * this.quotes.length)]
		if (!random) return

		gsap.set(random, { display: 'block' })

		this.quote = random
		this.header = random.querySelector(EL.header) as HTMLElement

		// Split Chars
		this.headerSplit = new SplitText(this.header, { type: 'words' })
		gsap.set(this.headerSplit.words, { opacity: 0 })
	}

	private addListeners() {
		if (!this.quote) return
		this.quote.addEventListener('click', this.onQuoteClick)
		this.element.addEventListener('pointerenter', this.onMouseEnter, {
			passive: true,
		})
		this.element.addEventListener('pointerleave', this.onMouseLeave, {
			passive: true,
		})
		gsap.ticker.add(this.update)
		emitter.on(EVENT_SCROLL, this.onBoundingRectRecalculate)
	}

	update = (time: number, delta: number, frame: number) => {
		if (!this.isVisible || device.isTouchCapable) return
		if (this.isHovering) {
			this.pointerX = device.mouseLast.x - this.rect.left
			this.pointerY = device.mouseLast.y - this.rect.top
		}
		this.cursor.set(this.pointerX, this.pointerY)
		this.cursor.update()
	}

	onIntersection(isVisible: boolean, observer: IntersectionObserver) {
		if (!isVisible || this.headerTween) return
		this.headerTween = gsap.to(this.headerSplit.words, {
			duration: 2,
			opacity: 1,
			stagger: 0.2,
		})
	}

	private onBoundingRectRecalculate = debounce(() => {
		if (!this.isVisible) return
		this.rect = this.element.getBoundingClientRect()
	}, 15)

	private openPlayer(from: { x: number; y: number }) {
		if (this.playerOverlays.length) return

		const { name, video, id, subtitle } = this.quote.dataset
		const overlay = new VideoPlayer({ name, video, id, subtitle })
		overlay.animateIn(from)
		whenIdle(() => {
			overlay.emitter.on(EVENT_OVERLAY_CLOSE, this.onOverlayClose)
			this.page.overlays.push(overlay)
			this.playerOverlays.push(overlay)
		})
	}

	private onOverlayClose = async (overlay: VideoPlayer) => {
		await overlay.animateOut(0)
		whenIdle(() => {
			this.playerOverlays = this.playerOverlays.filter((t) => t !== overlay)
			this.page.overlays = this.page.overlays.filter((t) => t !== overlay)
			overlay.destroy()
		})
	}

	private onQuoteClick = (event: MouseEvent) => {
		// Do not open video player when clicking a link
		if ((event.target as HTMLElement).tagName == 'A') {
			return
		}

		this.openPlayer({
			x: event.pageX,
			y: event.pageY,
		})
	}

	private onMouseEnter = () => {
		this.isHovering = true
	}

	private onMouseLeave = () => {
		this.isHovering = false
		this.pointerX = this.rect.width - this.cursor.halfWidth - 20
		this.pointerY = this.rect.height - this.cursor.halfHeight - 20
		this.cursor.set(this.pointerX, this.pointerY)
	}

	onResize() {
		this.cursor.resize(this.rect)
	}

	async animateIn(index: number) {
		await super.animateIn(index)
		whenIdle(() => {
			this.rect = this.element.getBoundingClientRect()
			this.cursor.resize(this.rect)
			gsap.to(this.cursor.element, { opacity: 1 })

			this.pointerX = this.rect.width - this.cursor.halfWidth - 20
			this.pointerY = this.rect.height - this.cursor.halfHeight - 20
			this.cursor.reset(this.pointerX, this.pointerY)
		})
	}

	destroy() {
		gsap.ticker.remove(this.update)
		emitter.off(EVENT_SCROLL, this.onBoundingRectRecalculate)
		this.element.removeEventListener('pointerenter', this.onMouseEnter)
		this.element.removeEventListener('pointerleave', this.onMouseLeave)
		this.quote.removeEventListener('click', this.onQuoteClick)
		super.destroy()
	}
}
