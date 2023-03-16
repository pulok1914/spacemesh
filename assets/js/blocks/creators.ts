import { gsap, SplitText } from 'gsap/all'
import { Page } from '../pages/page'
import { Block } from './block'
import { debounce } from 'ts-debounce'
import { EVENT_OVERLAY_CLOSE, EVENT_SCROLL } from '../global/constants'
import { VideoPlayer } from '../overlays/video-player'
import { whenIdle } from '../utils/idle'
import { Cursor } from '../utils/cursor'
import { device } from '../global/device'
import { emitter } from '../global/emitter'

/************************************************************************************************************/
/*********************************** Without Autoplay Code *************************************/
/************************************************************************************************************/

// const EL = {
// 	links: `.navigation a`,
// 	creators: `.posters .creator`,
// 	creatorsContainer: `.posters`,
// 	nameA: `.block__bottom .name--a`,
// 	nameB: `.block__bottom .name--b`,
// 	cursor: `.cursor`,
// }

// const CYCLE_TIME = 4000

// export class Creators extends Block {
// 	private links: HTMLElement[]
// 	private creators: HTMLVideoElement[]
// 	private creatorContainer: HTMLElement

// 	private name: HTMLElement
// 	private nameNext: HTMLElement

// 	private activeIndex: number
// 	private activeTween: gsap.core.Timeline
// 	private playerOverlays: VideoPlayer[] = []
// 	private interval: number
// 	private autoChange = true

// 	private cursor: Cursor
// 	private pointerX: number = 0
// 	private pointerY: number = 0
// 	private isHovering: boolean
// 	private playersOpenCount = 0

// 	constructor(element: HTMLElement, page: Page) {
// 		super(element, page)
// 		this.links = [...element.querySelectorAll(EL.links)] as HTMLElement[]
// 		this.creators = [
// 			...element.querySelectorAll(EL.creators),
// 		] as HTMLVideoElement[]
// 		this.creatorContainer = element.querySelector(
// 			EL.creatorsContainer
// 		) as HTMLElement
// 		this.name = element.querySelector(EL.nameA) as HTMLElement
// 		this.nameNext = element.querySelector(EL.nameB) as HTMLElement
// 		this.cursor = new Cursor(element.querySelector(EL.cursor) as HTMLElement)
// 		this.cursor.resize(this.rect)
// 		this.addListeners()
// 		this.initFirstCreator(0)

// 		// Start slideshow
// 		this.interval = setInterval(this.changeCreator, CYCLE_TIME)
// 	}

// 	private addListeners() {
// 		this.links.forEach((link) => {
// 			;(link as HTMLElement).addEventListener('click', this.onLinkClick)
// 			link.addEventListener('pointerenter', this.onLinkHover)
// 			link.addEventListener('pointerleave', this.onLinkLeave)
// 		})
// 		this.creatorContainer.addEventListener('click', this.onCreatorClick)
// 		this.element.addEventListener('pointerenter', this.onMouseEnter, {
// 			passive: true,
// 		})
// 		this.element.addEventListener('pointerleave', this.onMouseLeave, {
// 			passive: true,
// 		})
// 		gsap.ticker.add(this.update)
// 		emitter.on(EVENT_SCROLL, this.onBoundingRectRecalculate)
// 	}

// 	update = (time: number, delta: number, frame: number) => {
// 		if (!this.isVisible || device.isTouchCapable) return
// 		if (this.isHovering) {
// 			this.pointerX = device.mouseLast.x - this.rect.left
// 			this.pointerY = device.mouseLast.y - this.rect.top
// 		}
// 		this.cursor.set(this.pointerX, this.pointerY)
// 		this.cursor.update()
// 	}

// 	onResize() {
// 		this.cursor.resize(this.rect)
// 	}

// 	private onBoundingRectRecalculate = debounce(() => {
// 		if (!this.isVisible) return
// 		this.rect = this.element.getBoundingClientRect()
// 	}, 15)

// 	private onMouseEnter = () => {
// 		this.isHovering = true
// 	}

// 	private onMouseLeave = () => {
// 		this.isHovering = false
// 		this.pointerX = this.rect.width - this.cursor.halfWidth - 20
// 		this.pointerY = this.rect.height - this.cursor.halfHeight - 20
// 	}

// 	private changeCreator = () => {
// 		if (!this.autoChange) return
// 		const next = this.activeIndex + 1
// 		this.animateActive(next < this.creators.length ? next : 0)
// 	}

// 	private openPlayer(index: number, from: { x: number; y: number }) {
// 		if (this.playersOpenCount >= 1) return
// 		const { name, video, id, subtitle, width, height } = this.creators[
// 			index
// 		].dataset
// 		const overlay = new VideoPlayer({
// 			name,
// 			video,
// 			id,
// 			subtitle,
// 			width: parseInt(width),
// 			height: parseInt(height),
// 		})
// 		overlay.animateIn(from)
// 		overlay.emitter.on(EVENT_OVERLAY_CLOSE, this.onOverlayClose)
// 		this.page.overlays.push(overlay)
// 		this.playerOverlays.push(overlay)

// 		this.autoChange = false
// 		this.playersOpenCount += 1
// 	}

// 	private onCreatorClick = (event: MouseEvent) => {
// 		event.preventDefault()
// 		this.openPlayer(this.activeIndex, {
// 			x: event.pageX,
// 			y: event.pageY,
// 		})
// 	}


// 	private onOverlayClose = async (overlay: VideoPlayer) => {
// 		await overlay.animateOut(0)
// 		whenIdle(() => {
// 			this.playerOverlays = this.playerOverlays.filter((t) => t !== overlay)
// 			this.page.overlays = this.page.overlays.filter((t) => t !== overlay)
// 			overlay.destroy()
// 		})

// 		this.playersOpenCount -= 1

// 		console.log(this.playersOpenCount)

// 		if (this.playersOpenCount == 0) {
// 			this.autoChange = true
// 		}
// 	}

// 	private onLinkClick = (event: MouseEvent) => {
// 		event.preventDefault()
// 		const index = this.getIndex(event.target as HTMLLinkElement)
// 		// Only change preview if it's an actual change
// 		if (index != this.activeIndex) {
// 			this.activeTween?.progress(1)
// 			this.animateActive(index)
// 		}
// 		this.openPlayer(index, {
// 			x: event.pageX,
// 			y: event.pageY,
// 		})
// 	}

// 	private onLinkHover = (event: Event) => {
// 		const index = this.getIndex(event.target as HTMLLinkElement)
// 		this.autoChange = false
// 		if (index === this.activeIndex) return
// 		this.debouncedAnimate(index)
// 	}

// 	private debouncedAnimate = debounce((index: number) => {
// 		this.activeTween?.progress(1)
// 		this.animateActive(index)
// 	}, 300)

// 	private onLinkLeave = () => {
// 		this.autoChange = true
// 	}

// 	private getIndex(el: HTMLElement) {
// 		return this.links.indexOf(el)
// 	}

// 	private initFirstCreator(index: number) {
// 		const next = this.creators[index]
// 		gsap.set(next, { opacity: 1 })
// 		this.name.innerText = next.dataset.name
// 		this.activeIndex = index
// 	}

// 	private async animateActive(index: number, delay = 0) {
// 		const prev = this.creators[this.activeIndex]
// 		const next = this.creators[index]

// 		// Setup text animation
// 		this.nameNext.innerText = next.dataset.name
// 		const nameChars = new SplitText(this.name, { type: 'chars' }).chars
// 		const nameNextChars = new SplitText(this.nameNext, { type: 'chars' }).chars

// 		this.activeTween = gsap
// 			.timeline({ defaults: { ease: 'power2.out' } })
// 			// Preset
// 			.set(next, { scale: 1.2, opacity: 0 })
// 			.set(nameNextChars, { opacity: 0, y: -10 })
// 			// Images Fade
// 			.to(prev, { opacity: 0, scale: 1, duration: 0.9, delay })
// 			.to(next, { opacity: 1, scale: 1, duration: 0.9, delay }, '<')
// 			// Text
// 			.to(
// 				nameChars,
// 				{
// 					opacity: 0,
// 					y: 10,
// 					stagger: 0.045,
// 					duration: 0.3,
// 					ease: 'power4.out',
// 				},
// 				'<'
// 			)
// 			.to(
// 				nameNextChars,
// 				{ opacity: 1, y: 0, stagger: 0.045, duration: 0.3, ease: 'power4.out' },
// 				'<0.15'
// 			)

// 		this.activeTween.then(() => {
// 			// Flip text animation buffer
// 			;[this.name, this.nameNext] = [this.nameNext, this.name]
// 		})

// 		this.activeIndex = index
// 	}

// 	async animateIn(index: number) {
// 		await super.animateIn(index)
// 		if (device.isTouchCapable) return
// 		whenIdle(() => {
// 			this.rect = this.element.getBoundingClientRect()
// 			this.cursor.resize(this.rect)

// 			this.pointerX = this.rect.width - this.cursor.halfWidth - 20
// 			this.pointerY = this.rect.height - this.cursor.halfHeight - 20
// 			this.cursor.reset(this.pointerX, this.pointerY)

// 			gsap.to(this.cursor.element, { opacity: 1, delay: 0.3 })
// 		})
// 	}

// 	destroy() {
// 		gsap.ticker.remove(this.update)
// 		emitter.off(EVENT_SCROLL, this.onBoundingRectRecalculate)
// 		this.links.forEach((link) => {
// 			link.removeEventListener('click', this.onLinkClick)
// 			link.removeEventListener('mouseenter', this.onLinkHover)
// 		})
// 		this.creatorContainer.removeEventListener('click', this.onCreatorClick)
// 		this.element.removeEventListener('pointerenter', this.onMouseEnter)
// 		this.element.removeEventListener('pointerleave', this.onMouseLeave)
// 		clearInterval(this.interval)
// 		super.destroy()
// 	}
// }


/************************************************************************************************************/
/*********************************** Autoplay Code ***************************************************/
/************************************************************************************************************/


const EL = {
	links: `.navigation a`,
	creators: `.videos .creator`,
	creatorsContainer: `.videos`,
	nameA: `.block__bottom .name--a`,
	nameB: `.block__bottom .name--b`,
	cursor: `.cursor`,
}

const CYCLE_TIME = 4000

export class Creators extends Block {
	private links: HTMLElement[]
	private creators: HTMLVideoElement[]
	private creatorContainer: HTMLElement

	private name: HTMLElement
	private nameNext: HTMLElement

	private activeIndex: number
	private activeTween: gsap.core.Timeline
	private playerOverlays: VideoPlayer[] = []
	private interval: number
	private autoChange = true

	private cursor: Cursor
	private pointerX: number = 0
	private pointerY: number = 0
	private isHovering: boolean
	private playersOpenCount = 0

	private playPromise: Promise<any>

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.links = [...element.querySelectorAll(EL.links)] as HTMLElement[]
		this.creators = [
			...element.querySelectorAll(EL.creators),
		] as HTMLVideoElement[]
		this.creatorContainer = element.querySelector(
			EL.creatorsContainer
		) as HTMLElement
		this.name = element.querySelector(EL.nameA) as HTMLElement
		this.nameNext = element.querySelector(EL.nameB) as HTMLElement
		this.cursor = new Cursor(element.querySelector(EL.cursor) as HTMLElement)
		this.cursor.resize(this.rect)
		this.addListeners()
		this.initFirstCreator(0)

		// Start slideshow
		this.interval = setInterval(this.changeCreator, CYCLE_TIME)
	}

	private addListeners() {
		this.links.forEach((link) => {
			;(link as HTMLElement).addEventListener('click', this.onLinkClick)
			link.addEventListener('pointerenter', this.onLinkHover)
			link.addEventListener('pointerleave', this.onLinkLeave)
		})
		this.creatorContainer.addEventListener('click', this.onCreatorClick)
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

	onIntersection(isVisible: boolean, observer: IntersectionObserver) {
		!isVisible
			? this.pauseAllVideo()
			: this.play(this.creators[this.activeIndex])
	}

	private pauseAllVideo() {
		this.creators.forEach((el) => this.pause(el))
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

	private changeCreator = () => {
		if (!this.autoChange) return
		const next = this.activeIndex + 1
		this.animateActive(next < this.creators.length ? next : 0)
	}

	private openPlayer(index: number, from: { x: number; y: number }) {
		if (this.playersOpenCount >= 1) return
		const { name, video, id, subtitle } = this.creators[index].dataset
		const overlay = new VideoPlayer({ name, video, id, subtitle })
		overlay.animateIn(from)
		overlay.emitter.on(EVENT_OVERLAY_CLOSE, this.onOverlayClose)
		this.page.overlays.push(overlay)
		this.playerOverlays.push(overlay)

		this.autoChange = false
		this.pause(this.creators[index])
		this.playersOpenCount += 1
	}

	private onCreatorClick = (event: MouseEvent) => {
		event.preventDefault()
		this.openPlayer(this.activeIndex, {
			x: event.pageX,
			y: event.pageY,
		})
	}

	private onOverlayClose = async (overlay: VideoPlayer) => {
		await overlay.animateOut(0)
		whenIdle(() => {
			this.playerOverlays = this.playerOverlays.filter((t) => t !== overlay)
			this.page.overlays = this.page.overlays.filter((t) => t !== overlay)
			overlay.destroy()
		})

		this.playersOpenCount -= 1

		console.log(this.playersOpenCount)

		if (this.playersOpenCount == 0) {
			this.autoChange = true
			this.play(this.creators[this.activeIndex])
		}
	}

	private onLinkClick = (event: MouseEvent) => {
		event.preventDefault()
		const index = this.getIndex(event.target as HTMLLinkElement)
		// Only change preview if it's an actual change
		if (index != this.activeIndex) {
			this.activeTween?.progress(1)
			this.animateActive(index)
		}
		this.openPlayer(index, {
			x: event.pageX,
			y: event.pageY,
		})
	}

	private onLinkHover = (event: Event) => {
		const index = this.getIndex(event.target as HTMLLinkElement)
		this.autoChange = false
		if (index === this.activeIndex) return
		this.debouncedAnimate(index)
	}

	private debouncedAnimate = debounce((index: number) => {
		this.activeTween?.progress(1)
		this.animateActive(index)
	}, 300)

	private onLinkLeave = () => {
		this.autoChange = true
	}

	private getIndex(el: HTMLElement) {
		return this.links.indexOf(el)
	}

	private initFirstCreator(index: number) {
		const next = this.creators[index]
		gsap.set(next, { opacity: 1 })
		this.name.innerText = next.dataset.name
		this.activeIndex = index
	}

	private async play(video: HTMLVideoElement) {
		this.playPromise = video?.play()
	}

	private async pause(video: HTMLVideoElement) {
		await this.playPromise
		video?.pause()
	}

	private async animateActive(index: number, delay = 0) {
		const prev = this.creators[this.activeIndex]
		const next = this.creators[index]

		if (this.playersOpenCount == 0) {
			this.play(next)
		}

		// Setup text animation
		this.nameNext.innerText = next.dataset.name
		const nameChars = new SplitText(this.name, { type: 'chars' }).chars
		const nameNextChars = new SplitText(this.nameNext, { type: 'chars' }).chars

		this.activeTween = gsap
			.timeline({ defaults: { ease: 'power2.out' } })
			// Preset
			.set(next, { scale: 1.2, opacity: 0 })
			.set(nameNextChars, { opacity: 0, y: -10 })
			// Images Fade
			.to(prev, { opacity: 0, scale: 1, duration: 0.9, delay })
			.to(next, { opacity: 1, scale: 1, duration: 0.9, delay }, '<')
			// Text
			.to(
				nameChars,
				{
					opacity: 0,
					y: 10,
					stagger: 0.045,
					duration: 0.3,
					ease: 'power4.out',
				},
				'<'
			)
			.to(
				nameNextChars,
				{ opacity: 1, y: 0, stagger: 0.045, duration: 0.3, ease: 'power4.out' },
				'<0.15'
			)

		this.activeTween.then(() => {
			// Pause prev video
			this.pause(prev)
			// Flip text animation buffer
			;[this.name, this.nameNext] = [this.nameNext, this.name]
		})

		this.activeIndex = index
	}

	async animateIn(index: number) {
		await super.animateIn(index)
		if (device.isTouchCapable) return
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
		this.links.forEach((link) => {
			link.removeEventListener('click', this.onLinkClick)
			link.removeEventListener('mouseenter', this.onLinkHover)
		})
		this.creatorContainer.removeEventListener('click', this.onCreatorClick)
		this.element.removeEventListener('pointerenter', this.onMouseEnter)
		this.element.removeEventListener('pointerleave', this.onMouseLeave)
		clearInterval(this.interval)
		super.destroy()
	}
}

