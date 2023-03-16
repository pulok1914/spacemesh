import { gsap, SplitText } from 'gsap/all'
import { Page } from '../pages/page'
import { Block } from './block'
import { debounce } from 'ts-debounce'
import { EVENT_OVERLAY_CLOSE, EVENT_SCROLL } from '../global/constants'
import { VideoPlayer } from '../overlays/video-player'
import { whenIdle } from '../utils/idle'
import { device } from '../global/device'
import { emitter } from '../global/emitter'

// const EL = {
// 	imageWrapper: `.hero__image-wrapper`,
// 	image: `.hero__image-wrapper-image`,
// }

const CYCLE_TIME = 4000

export class Events extends Block {
	// private imageWrapper: HTMLElement
	// private image: HTMLElement

	private activeIndex: number
	private activeTween: gsap.core.Timeline
	private playerOverlays: VideoPlayer[] = []
	private interval: number
	private autoChange = true

	private pointerX: number = 0
	private pointerY: number = 0
	private isHovering: boolean
	private playersOpenCount = 0

	// constructor(element: HTMLElement, page: Page) {
	// 	super(element, page)

	// 	this.imageWrapper = element.querySelector(
	// 		EL.imageWrapper
	// 	) as HTMLElement
	// 	this.image = element.querySelector(
	// 		EL.image
	// 	) as HTMLElement
	// 	this.addListeners()

	// }

	// private addListeners() {
	// 	this.imageWrapper.addEventListener('click', this.onCreatorClick)

	// 	gsap.ticker.add(this.update)
	// 	emitter.on(EVENT_SCROLL, this.onBoundingRectRecalculate)
	// }

	update = (time: number, delta: number, frame: number) => {
		if (!this.isVisible || device.isTouchCapable) return
		if (this.isHovering) {
			this.pointerX = device.mouseLast.x - this.rect.left
			this.pointerY = device.mouseLast.y - this.rect.top
		}
	}


	private onBoundingRectRecalculate = debounce(() => {
		if (!this.isVisible) return
		this.rect = this.element.getBoundingClientRect()
	}, 15)

	private onMouseEnter = () => {
		this.isHovering = true
	}


	// private onCreatorClick = (event: MouseEvent) => {
	// 	event.preventDefault()
	// 	this.openPlayer(this.activeIndex, {
	// 		x: event.pageX,
	// 		y: event.pageY,
	// 	})
	// }

	// private openPlayer(index: number, from: { x: number; y: number }) {
	// 	if (this.playersOpenCount >= 1) return
	// 	const { name, video, id, subtitle, width, height } = this.image.dataset
	// 	const overlay = new VideoPlayer({
	// 		name,
	// 		video,
	// 		id,
	// 		subtitle,
	// 		width: parseInt(width),
	// 		height: parseInt(height),
	// 	})
	// 	overlay.animateIn(from)
	// 	overlay.emitter.on(EVENT_OVERLAY_CLOSE, this.onOverlayClose)
	// 	this.page.overlays.push(overlay)
	// 	this.playerOverlays.push(overlay)

	// 	this.autoChange = false
	// 	this.playersOpenCount += 1
	// }

	// private onOverlayClose = async (overlay: VideoPlayer) => {
	// 	await overlay.animateOut(0)
	// 	whenIdle(() => {
	// 		this.playerOverlays = this.playerOverlays.filter((t) => t !== overlay)
	// 		this.page.overlays = this.page.overlays.filter((t) => t !== overlay)
	// 		overlay.destroy()
	// 	})

	// 	this.playersOpenCount -= 1

	// 	console.log(this.playersOpenCount)

	// 	if (this.playersOpenCount == 0) {
	// 		this.autoChange = true
	// 	}
	// }


	destroy() {
		gsap.ticker.remove(this.update)
		emitter.off(EVENT_SCROLL, this.onBoundingRectRecalculate)
		// this.imageWrapper.removeEventListener('click', this.onCreatorClick)
		clearInterval(this.interval)
		super.destroy()
	}
}
