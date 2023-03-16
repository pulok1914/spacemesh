import gsap from 'gsap'
import { EVENT_SCROLL } from '../global/constants'
import { device } from '../global/device'
import { emitter } from '../global/emitter'
import { ScrollEventState } from '../global/types'
import { Page } from '../pages/page'
import { Block } from './block'

const EL = {
	textRing: '.circle .text',
	frog: '.circle .frog',
}

export class Discord extends Block {
	private textRing: HTMLElement
	private frog: HTMLElement
	private rotationTween: gsap.core.Tween
	roationFrogTween: gsap.core.Tween

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.textRing = element.querySelector(EL.textRing) as HTMLElement
		this.frog = element.querySelector(EL.frog) as HTMLElement
		this.addListeners()
	}

	private addListeners() {
		emitter.on(EVENT_SCROLL, this.onScroll)
		if (device.isTouchCapable) return
		this.element.addEventListener('pointerenter', this.onElementEnter)
		this.element.addEventListener('pointerleave', this.onElementLeave)
	}

	private onScroll = (payload: ScrollEventState) => {
		if (!this.isVisible) return
		this.rotationTween?.kill()
		gsap.set(this.textRing, { rotationZ: `+=${payload.deltaY}` })
	}

	private onElementEnter = () => {
		this.rotationTween = gsap.to(this.textRing, {
			rotationZ: -360,
			duration: 9,
			repeat: -1,
			ease: 'none',
		})
		this.roationFrogTween = gsap.to(this.frog, {
			rotation: 360,
			duration: 2,
			repeat: -1,
			ease: 'none',
		})
	}

	private onElementLeave = () => {
		this.rotationTween?.kill()
		this.roationFrogTween?.kill()
		gsap.to(this.frog, {
			rotation: '0_ccw',
			duration: 0.55,
			ease: 'bounce.out',
		})
	}

	destroy() {
		emitter.off(EVENT_SCROLL, this.onScroll)
		this.element.removeEventListener('pointerenter', this.onElementEnter)
		this.element.removeEventListener('pointleave', this.onElementLeave)
		super.destroy()
	}
}
