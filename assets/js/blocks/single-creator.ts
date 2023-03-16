import gsap from 'gsap'
import { EVENT_OVERLAY_CLOSE, EVENT_SCROLL } from '../global/constants'
import { VideoPlayer } from '../overlays/video-player'
import { Page } from '../pages/page'
import { whenIdle } from '../utils/idle'
import { Block } from './block'

const EL = {
	creator: `.creator`,
}

export class SingleCreator extends Block {
	private creator: HTMLElement

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.creator = element.querySelector(EL.creator) as HTMLElement
		this.addListeners()
	}

	private addListeners() {
		this.element.addEventListener('click', this.onElementClick)
	}

	private onElementClick = (event: MouseEvent) => {
		this.openPlayer({
			x: event.pageX,
			y: event.pageY,
		})
	}

	private openPlayer(from: { x: number; y: number }) {
		const { name, video, id, subtitle } = this.creator.dataset
		const overlay = new VideoPlayer({ name, video, id, subtitle })
		overlay.animateIn(from)
		overlay.emitter.on(EVENT_OVERLAY_CLOSE, this.onOverlayClose)
		this.page.overlays.push(overlay)
	}

	private onOverlayClose = async (overlay: VideoPlayer) => {
		await overlay.animateOut(0)
		whenIdle(() => {
			this.page.overlays = this.page.overlays.filter((t) => t !== overlay)
			overlay.destroy()
		})
	}

	destroy() {
		this.element.removeEventListener('click', this.onElementClick)
		super.destroy()
	}
}
