import mitt from 'mitt'
import gsap from 'gsap'

/**
 * Base Class for accordion functionality.
 * Reused for outer and inner FAQ elements and weekly updates block.
 * Implements basic open and close features.
 */
export class AccordionItem {
	static CLICK = 'click'
	static OPEN = 'open'
	static CLOSE = 'close'

	emitter = mitt()
	body: HTMLElement
	header: HTMLElement
	closed = true
	element: HTMLElement
	toggleBtn?: HTMLElement
	id: string
	index: number

	/**
	 * Creates an according instance from root element.
	 * This is only for each individual item in an accordian.
	 * Opening/closing siblings is left out.
	 *
	 * <ul class="accordion">
	 *     <li class="item">
	 *         <b class="header">Click Me</b>
	 *         <p class="body">I open/close</p>
	 *     </li>
	 *     <li class="item">
	 *         <b class="header">Click Me</b>
	 *         <p class="body">I open/close</p>
	 *     </li>
	 * </ul>
	 *
	 * @param element root element or wrapper
	 */
	constructor(element: HTMLElement, index: number = 0) {
		this.element = element
		this.body = element.querySelector(`.body`) as HTMLElement
		this.header = element.querySelector(`.header`) as HTMLElement
		this.toggleBtn = this.header.querySelector(`.toggle`)
		this.header.addEventListener('click', this.onHeaderClick)
		this.id = this.element.id
		this.close()
	}

	private onHeaderClick = (event: Event) => {
		this.emitter.emit(AccordionItem.CLICK, this)
	}

	close() {
		gsap.set(this.body, { height: 0, opacity: 0 })
		this.setCloseState()
	}

	open() {
		gsap.set(this.body, { height: 'auto', opacity: 1 })
		this.setOpenState()
	}

	private setCloseState() {
		this.closed = true
		this.element.classList.add('closed')
		this.element.classList.remove('open')
		this.toggleBtn?.classList.add('open')
		this.toggleBtn?.classList.remove('open')
	}

	private setOpenState() {
		this.closed = false
		this.element.classList.remove('closed')
		this.element.classList.add('open')
		this.toggleBtn?.classList.remove('open')
		this.toggleBtn?.classList.add('open')
	}

	async animateOpen(delay = 0) {
		if (!this.closed) return
		this.setOpenState()
		await Promise.all([
			gsap.to(this.body, {
				height: 'auto',
				opacity: 1,
				delay,
				duration: 0.55,
			}),
		])
		this.emitter.emit(AccordionItem.OPEN, this)
	}

	async animateClose(delay = 0) {
		if (this.closed) return
		this.setCloseState()
		await Promise.all([
			gsap.to(this.body, {
				height: 0,
				opacity: 0,
				delay,
				duration: 0.55,
			}),
		])
		this.emitter.emit(AccordionItem.CLOSE, this)
	}

	toggle = () => {
		return this.closed ? this.animateOpen() : this.animateClose()
	}

	destroy() {
		this.header.removeEventListener('click', this.onHeaderClick)
	}
}
