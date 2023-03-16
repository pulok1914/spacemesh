import gsap from 'gsap'
import { Block } from './block'
import { AccordionItem } from '../components/accordion'
import { whenIdle } from '../utils/idle'
import { Page } from '../pages/page'

export class FAQ extends Block {
	categories: FAQCategory[]

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.page.autoScrollToDeepLink = false
		this.categories = [...element.querySelectorAll(`.category`)].map(
			(el, index) => new FAQCategory(el as HTMLElement, index, this)
		)
		this.addListeners()
	}

	private addListeners() {
		this.categories.forEach((c) =>
			c.emitter.on(AccordionItem.CLICK, this.onCategoryClick)
		)
	}

	private handleDeepLink() {
		const { hash } = this.page.deeplink
		if (!hash.startsWith('#faq-')) return
		const id = hash.replace('#', '')

		this.categories.forEach((category, index) => {
			// Is it a section/category id?
			if (category.id == id) {
				category.open()
				category.element.scrollIntoView({ block: 'center' })
				return
			}

			// It must be a question item
			category.questions.forEach((question, index) => {
				if (question.id == id) {
					category.open()
					question.open()
					question.element.scrollIntoView({ block: 'center' })
					return
				}
			})
		})
	}

	private onCategoryClick = async (category: FAQCategory) => {
		// Update URL State
		const url = new URL(window.location.href)
		url.hash = category.header.dataset.id
		history.replaceState('', '', url.href)

		if (!category.closed) {
			await category.animateClose()
			return
		}

		this.categories.forEach((a) =>
			a == category ? a.animateOpen() : a.animateClose()
		)
	}

	async animateIn(index: number) {
		super.animateIn(index)
		if (this.page.deeplink) this.handleDeepLink()
	}

	destroy() {
		super.destroy()
		this.categories.forEach((c) => {
			c.emitter.off(AccordionItem.CLICK, this.onCategoryClick)
			c.destroy()
		})
	}
}

class FAQCategory extends AccordionItem {
	questions: AccordionItem[]
	parent: FAQ

	constructor(element: HTMLElement, index: number, parent: FAQ) {
		super(element, index)
		this.parent = parent
		this.questions = [...element.querySelectorAll(`.questions .question`)].map(
			(el, index) => new AccordionItem(el as HTMLElement, index)
		)
		this.addListeners()
	}

	addListeners() {
		this.emitter.on(AccordionItem.CLOSE, this.onCategoryClose)
		this.questions.forEach((accordian) =>
			accordian.emitter.on(AccordionItem.CLICK, this.onQuestionClick)
		)
	}

	onQuestionClick = async (accordian: AccordionItem) => {
		// Update URL State
		const url = new URL(window.location.href)
		url.hash = accordian.header.dataset.id
		history.replaceState('', '', url.href)

		if (!accordian.closed) {
			await accordian.animateClose()
			return
		}
		this.questions.forEach((c) =>
			c == accordian ? c.animateOpen() : c.animateClose()
		)
	}

	// Close all items when the section is fully closed
	onCategoryClose = () => {
		whenIdle(() => {
			this.questions.forEach((q) => q.close())
		})
	}

	destroy() {
		super.destroy()
	}
}
