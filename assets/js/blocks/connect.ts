import { gsap } from 'gsap'
import { Page } from '../pages/page'
import { clamp } from '../utils/math'
import { Block } from './block'

const EL = {
	prev: `nav .prev`,
	next: `nav .next`,
	scroller: `.channels`,
	items: `.channels .channel`,
}

export class Connect extends Block {
	shortcut: HTMLElement
	prev: HTMLElement
	next: HTMLElement
	scroller: HTMLElement
	items: HTMLElement[] = []
	scrollerRect: DOMRect
	itemRect: DOMRect

	scroll = 0
	scrollAmount: number
	scrollDiff: number

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.prev = this.element.querySelector(EL.prev) as HTMLElement
		this.next = this.element.querySelector(EL.next) as HTMLElement
		this.scroller = this.element.querySelector(EL.scroller) as HTMLElement
		this.items = [...this.element.querySelectorAll(EL.items)] as HTMLElement[]
		this.addListeners()
		this.onResize()
		this.updateArrows()
	}

	addListeners() {
		this.prev.addEventListener(`click`, this.onPrevClick)
		this.next.addEventListener(`click`, this.onNextClick)
	}

	updateArrows() {
		if (this.scrollDiff <= 0) {
			this.next.classList.add('disabled')
			this.prev.classList.add('disabled')
		} else if (this.scroll == 0) {
			this.prev.classList.add('disabled')
			this.next.classList.remove('disabled')
		} else if (this.scroll == this.scrollDiff) {
			this.prev.classList.remove('disabled')
			this.next.classList.add('disabled')
		} else {
			this.next.classList.remove('disabled')
			this.prev.classList.remove('disabled')
		}
	}

	onPrevClick = (e: Event) => {
		e.preventDefault()
		if (this.scrollDiff <= 0) return
		this.scroll = clamp(0, this.scrollDiff, this.scroll - this.scrollAmount)
		gsap.to(this.scroller, { x: -this.scroll })
		this.updateArrows()
	}

	onNextClick = (e: Event) => {
		e.preventDefault()
		if (this.scrollDiff <= 0) return
		this.scroll = clamp(0, this.scrollDiff, this.scroll + this.scrollAmount)
		gsap.to(this.scroller, { x: -this.scroll })
		this.updateArrows()
	}

	onResize() {
		this.scrollerRect = this.scroller.getBoundingClientRect()
		this.itemRect = this.items[0]?.getBoundingClientRect()
		this.scrollAmount =
			this.scrollerRect.width < this.itemRect.width * 2
				? this.itemRect.width
				: this.itemRect.width * 2
		this.scrollDiff = this.scrollerRect.width - this.rect.width
		this.updateArrows()
	}

	destroy() {
		this.prev.removeEventListener(`click`, this.onPrevClick)
		this.next.removeEventListener(`click`, this.onNextClick)
		super.destroy()
	}
}
