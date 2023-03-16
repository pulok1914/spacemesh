import { Overlay } from './overlay'
import gsap from 'gsap'
import { EVENT_OVERLAY_CLOSE } from '../global/constants'
import { device } from '../global/device'

const TIMEOUT_UI = 1900
type PlayerOptions = {
	video: string
	id: string
	name?: string
	subtitle?: string
	width?: number
	height?: number
}

export class VideoPlayer extends Overlay {
	private exit: HTMLElement
	private subtitles?: HTMLElement
	private video: HTMLVideoElement
	private timeout: number
	private header: HTMLElement
	private progressbar: HTMLElement
	private progressbarFill: HTMLElement

	private playback: HTMLElement
	private playbackPlayIcon: HTMLElement
	private playbackPauseIcon: HTMLElement

	private progressbarFillTarget: number = 0
	private progressbarFillValue: number = 0

	private tweenUI: gsap.core.Timeline
	private playPromise: Promise<void>

	constructor({ video, id, name, subtitle, width, height }: PlayerOptions) {
		super('videoPlayer')
		this.createVideoElement(video, id, name, subtitle, width, height)
		this.addListeners()
		this.presetAnimations()
		this.timeout = setTimeout(this.hideUI, TIMEOUT_UI)
	}

	createVideoElement(
		video: string,
		id: string,
		name?: string,
		subtitle?: string,
		width?: number,
		height?: number
	) {
		super.createElement()
		const html = `
			<div class="header">
				${name ? `<div class="name">${name}</div>` : ``}
				<div class="exit">Close</div>
			</div>
			<div class="content">
				<video playsinline autoplay width="${width || 'auto'}" height="${
			height || 'auto'
		}">
					<source src="${video}" type="video/mp4">
					${
						subtitle
							? `<track label="English" kind="subtitles" src="${subtitle}" default>`
							: ``
					}
				</video>
				<div class="subtitles"></div>
				<div class="progressbar">
					<div class="fill"></div>
				</div>
				<div class="playback">
					<div class="icon pause"></div>
					<div class="icon play"></div>
				</div>
			</div>
		`
		this.element.innerHTML = html
		this.header = this.element.querySelector('.header') as HTMLElement
		this.video = this.element.querySelector('video') as HTMLVideoElement
		this.subtitles = this.element.querySelector('.subtitles') as HTMLElement
		this.progressbar = this.element.querySelector('.progressbar') as HTMLElement
		this.progressbarFill = this.element.querySelector(
			'.progressbar .fill'
		) as HTMLElement
		this.exit = this.element.querySelector('.exit') as HTMLElement
		this.playback = this.element.querySelector('.playback')
		this.playbackPlayIcon = this.element.querySelector(
			'.playback .play'
		) as HTMLElement
		this.playbackPauseIcon = this.element.querySelector(
			'.playback .pause'
		) as HTMLElement
	}

	private addListeners() {
		this.exit.addEventListener('click', this.onExitClick)
		this.playback.addEventListener('click', this.onPlaybakcIconClick)
		this.draggable.addEventListener('click', this.onVideoClick)

		this.element.addEventListener('pointermove', this.onMouseMove)
		this.element.addEventListener('pointerleave', this.onMouseLeave)

		this.video.addEventListener('timeupdate', this.onTimeUpdate)
		this.video.addEventListener('pause', this.onVideoPause)
		this.video.addEventListener('play', this.onVideoPlay)
		this.video.addEventListener('ended', this.onVideoEnded)
		this.video.textTracks[0]?.addEventListener(
			'cuechange',
			this.onSubtitleChange
		)

		gsap.ticker.add(this.onUpdate)
	}

	private removeListeners() {
		this.exit.removeEventListener('click', this.onExitClick)
		this.playback.removeEventListener('click', this.onPlaybakcIconClick)
		this.draggable.removeEventListener('click', this.onVideoClick)

		this.element.removeEventListener('pointermove', this.onMouseMove)
		this.element.removeEventListener('pointerleave', this.onMouseLeave)

		this.video.removeEventListener('timeupdate', this.onTimeUpdate)
		this.video.removeEventListener('pause', this.onVideoPause)
		this.video.removeEventListener('play', this.onVideoPlay)
		this.video.removeEventListener('ended', this.onVideoEnded)
		this.video.textTracks[0]?.removeEventListener(
			'cuechange',
			this.onSubtitleChange
		)

		gsap.ticker.remove(this.onUpdate)
	}

	private presetAnimations() {
		gsap.set(this.video, { opacity: 0 })
		gsap.set(this.playback, { opacity: 0, scale: 0 })
		gsap.set(this.header, { opacity: 0, y: -10 })
		gsap.set(this.progressbar, { opacity: 0, y: 10 })
	}

	/**
	 * Only for mouse events within the element itself.
	 * Not useful for global mouse events, like the cursor.
	 */
	private onMouseMove = (event: MouseEvent) => {
		if (device.isTouchCapable) return
		this.showUI()
		clearTimeout(this.timeout)
		this.timeout = setTimeout(this.hideUI, TIMEOUT_UI)
	}

	private onMouseLeave = (event: MouseEvent) => {
		if (device.isTouchCapable) return
		clearTimeout(this.timeout)
		this.hideUI()
	}

	private hideUI = () => {
		this.tweenUI?.kill()
		this.tweenUI = gsap
			.timeline()
			.to(this.playback, { opacity: 0, duration: 0.35, scale: 0 }, 0)
			.to(this.header, { opacity: 0, duration: 0.45, y: -10 }, 0)
			.to(this.progressbar, { opacity: 0, duration: 0.45, y: 10 }, 0)

		clearTimeout(this.timeout)
	}

	private showUI = () => {
		this.tweenUI?.kill()
		this.tweenUI = gsap
			.timeline()
			.to(this.playback, { opacity: 1, duration: 0.45, scale: 1 }, 0)
			.to(this.header, { opacity: 1, duration: 0.45, y: 0 }, 0)
			.to(this.progressbar, { opacity: 1, duration: 0.45, y: 0 }, 0)

		// Always trigger auto-hide
		clearTimeout(this.timeout)
		this.timeout = setTimeout(this.hideUI, TIMEOUT_UI)
	}

	private onTimeUpdate = () => {
		this.progressbarFillTarget = this.video.currentTime / this.video.duration
	}

	private onUpdate = () => {
		this.progressbarFillValue +=
			(this.progressbarFillTarget - this.progressbarFillValue) * 0.1
		gsap.set(this.progressbarFill, { scaleX: this.progressbarFillValue })
	}

	// Delegate to controller or containing view
	private onExitClick = (event: Event) => {
		event.preventDefault()
		this.emitter.emit(EVENT_OVERLAY_CLOSE, this)
	}

	// -- Video Playback

	private onSubtitleChange = (event: Event) => {
		if (!this.subtitles) return
		const track = event.target as TextTrack
		const cue = track.activeCues[0] as VTTCue
		this.subtitles.innerText = cue?.text || ''
		track.mode = 'hidden'
	}

	private onVideoEnded = () => {
		this.emitter.emit(EVENT_OVERLAY_CLOSE, this)
	}

	private onVideoPause = () => {
		this.animatePlaybackPlay()
	}

	private onVideoPlay = () => {
		this.animatePlaybackPause()
	}

	private togglePlayback() {
		if (this.video.paused) {
			this.play(this.video)
		} else {
			this.pause(this.video)
		}
	}
	private onPlaybakcIconClick = () => {
		if (!device.isTouchCapable) return
		this.togglePlayback()
	}

	private onVideoClick = () => {
		this.showUI()
		if (!device.isTouchCapable) this.togglePlayback()
	}

	private async play(el: HTMLVideoElement) {
		await this.playPromise
		this.playPromise = this.video.play()
	}

	private async pause(el: HTMLVideoElement) {
		this.video.pause()
	}

	private animatePlaybackPlay() {
		gsap
			.timeline({ defaults: { duration: 0.4 } })
			.to(this.playbackPauseIcon, { opacity: 0, scale: 0 })
			.to(this.playbackPlayIcon, { opacity: 1, scale: 1 }, '-=0.3')
	}

	private animatePlaybackPause() {
		gsap
			.timeline({ defaults: { duration: 0.4 } })
			.to(this.playbackPlayIcon, { opacity: 0, scale: 0 })
			.to(this.playbackPauseIcon, { opacity: 1, scale: 1 }, '-=0.3')
	}

	// -- Animate In

	async animateIn(from: { x: number; y: number }) {
		gsap.to(this.video, { opacity: 1, duration: 1 })
		await super.animateIn(from)
	}

	// -- Cleanup

	async destroy(safe = true) {
		this.removeListeners()
		clearTimeout(this.timeout)
		await super.destroy(safe)
	}
}
