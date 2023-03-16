import { gsap } from 'gsap/all'
import { Page } from '../pages/page'
import { Block } from './block'
import { debounce } from 'ts-debounce'
import { EVENT_OVERLAY_CLOSE, EVENT_SCROLL } from '../global/constants'
import { VideoPlayer } from '../overlays/video-player'
import { whenIdle } from '../utils/idle'
import { Cursor } from '../utils/cursor'
import { device } from '../global/device'
import { emitter } from '../global/emitter'

const EL = {
	cursor: `.cursor`,
	bottom: `.block__bottom`,
}

export class StartVideo extends Block {
	private playerOverlays: VideoPlayer[] = []
	private cursor: Cursor
	private pointerX: number = 0
	private pointerY: number = 0
	private isHovering: any
	private videoURL: string
	private videoID: string

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.cursor = new Cursor(element.querySelector(EL.cursor) as HTMLElement)
		this.cursor.resize(this.rect)

		const { video, id } = (element.querySelector(
			EL.bottom
		) as HTMLElement)?.dataset
		this.videoURL = video
		this.videoID = id

		gsap.set(this.cursor.element, { opacity: 0 })
		this.addListeners()
	}

	private addListeners() {
		this.element.addEventListener('click', this.onElementClick)
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

	onResize() {
		this.cursor.resize(this.rect)
	}

	private onBoundingRectRecalculate = debounce(() => {
		if (!this.isVisible) return
		this.rect = this.element.getBoundingClientRect()
	}, 15)

	private onMouseEnter = () => {
		this.isHovering = true
	}

	private onMouseLeave = () => {
		this.isHovering = false
		this.pointerX = this.rect.width - this.cursor.halfWidth - 20
		this.pointerY = this.rect.height - this.cursor.halfHeight - 20
	}

	private onElementClick = (event: MouseEvent) => {
		this.openPlayer({
			x: event.pageX,
			y: event.pageY,
		})
	}

	private openPlayer(from: { x: number; y: number }) {
		const overlay = new VideoPlayer({ video: this.videoURL, id: this.videoID })
		overlay.animateIn(from)
		overlay.emitter.on(EVENT_OVERLAY_CLOSE, this.onOverlayClose)
		this.page.overlays.push(overlay)
		this.playerOverlays.push(overlay)
	}

	private onOverlayClose = async (overlay: VideoPlayer) => {
		await overlay.animateOut(0)
		whenIdle(() => {
			this.playerOverlays = this.playerOverlays.filter((t) => t !== overlay)
			this.page.overlays = this.page.overlays.filter((t) => t !== overlay)
			overlay.destroy()
		})
	}

	async animateIn(index: number) {
		await super.animateIn(index)
		whenIdle(() => {
			this.rect = this.element.getBoundingClientRect()
			this.cursor.resize(this.rect)

			this.pointerX = this.rect.width - this.cursor.halfWidth - 20
			this.pointerY = this.rect.height - this.cursor.halfHeight - 20
			this.cursor.reset(this.pointerX, this.pointerY)

			gsap.to(this.cursor.element, { opacity: 1, delay: 0.3 })
		})
	}

	destroy() {
		gsap.ticker.remove(this.update)
		emitter.off(EVENT_SCROLL, this.onBoundingRectRecalculate)
		this.element.removeEventListener('click', this.onElementClick)
		this.element.removeEventListener('pointerenter', this.onMouseEnter)
		this.element.removeEventListener('pointerleave', this.onMouseLeave)
		super.destroy()
	}
}
