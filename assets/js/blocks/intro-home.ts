import { gsap } from 'gsap/all'
import { Vec2 } from 'ogl-typescript'
import { debounce } from 'ts-debounce'
import { EVENT_SCROLL } from '../global/constants'
import { device } from '../global/device'
import { emitter } from '../global/emitter'
import { Page } from '../pages/page'
import { BouncingCoin } from '../utils/coin'
import { Fluid } from '../webgl/fluid'
import { Block } from './block'

const EL = {
	canvas: 'canvas.background',
	coin: '.coin',
}

const VEC = new Vec2()

export class IntroHome extends Block {
	private bg: Fluid
	private canvas: HTMLCanvasElement
	private coin: BouncingCoin

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.canvas = element.querySelector(EL.canvas) as HTMLCanvasElement
		this.coin = new BouncingCoin(
			element.querySelector(EL.coin) as HTMLElement,
			this
		)
		this.bg = new Fluid(this.canvas)

		this.addListeners()
		this.onResize()
	}
	
	private addListeners() {
		emitter.on(EVENT_SCROLL, this.onBoundingRectRecalculate)
		this.draggable?.addEventListener('drag', this.onBoundingRectRecalculate)
		this.element.addEventListener('pointermove', this.onPointerMove)
	}

	private removeListeners() {
		emitter.off(EVENT_SCROLL, this.onBoundingRectRecalculate)
		this.draggable.removeEventListener('drag', this.onBoundingRectRecalculate)
		this.element.removeEventListener('pointermove', this.onPointerMove)
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
		const vec = VEC.set(device.mouseLast)
		vec.x -= this.rect.left
		vec.y -= this.rect.top
		this.bg.updatePointer(vec)
		console.log('scripts runs')
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
		this.coin.destroy()
		this.removeListeners()
		super.destroy()
	}

	async animateIn(index: number) {
		await super.animateIn(index)
		this.onResize()
	}
}
