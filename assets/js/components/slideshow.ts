import { mod } from '../utils/math'
import gsap from 'gsap'

const EL = {
	slide: `.slide`,
	next: `.side.next`,
	prev: `.side.prev`,
	pagination: `.pages`,
	textItem: `.item`,
}

/**
 * Abstract slideshow controller.
 * On mobile a slideshow doesn't open in a floating
 * overlay and need a different implementation.
 */
export class Slideshow {
	private element: HTMLElement
	private slides: HTMLElement[] = []
	private prevBtn: HTMLElement
	private nextBtn: HTMLElement
	private paginationEl: HTMLElement
	private texts: HTMLElement[] = []
	private index = 0

	constructor(element: HTMLElement) {
		this.element = element

		this.slides = [...element.querySelectorAll(EL.slide)] as HTMLElement[]
		this.texts = [...element.querySelectorAll(EL.textItem)] as HTMLElement[]
		this.prevBtn = element.querySelector(EL.prev) as HTMLElement
		this.nextBtn = element.querySelector(EL.next) as HTMLElement
		this.paginationEl = element.querySelector(EL.pagination) as HTMLElement

		this.addListeners()
		this.setSlide(0)
	}

	private addListeners() {
		this.prevBtn.addEventListener('click', this.prev)
		this.nextBtn.addEventListener('click', this.next)	
	}

	private removeListeners() {
		this.prevBtn.removeEventListener('click', this.prev)
		this.nextBtn.removeEventListener('click', this.next)
	}

	private setSlide(index: number) {
		this.index = index
		this.slides.forEach((s, i) => gsap.set(s, { opacity: index == i ? 1 : 0 }))
		this.texts.forEach((s, i) => gsap.set(s, { opacity: index == i ? 1 : 0 }))
		this.updatePagination()
	}

	private updatePagination() {
		this.paginationEl.innerText = `${(this.index + 1)
			.toString()
			.padStart(2, '0')} / ${this.slides.length.toString().padStart(2, '0')}`
	}

	// --- Public Interface

	cycle(dir: number) {
		const next = mod(this.index + dir, this.slides.length)
		this.setSlide(next)
		this.index = next
	}

	next = () => {
		this.cycle(1)
	}

	prev = () => {
		this.cycle(-1)
	}

	destroy() {
		this.removeListeners()
	}
}
