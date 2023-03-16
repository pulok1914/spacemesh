import { AccordionItem } from '../components/accordion'
import { device } from '../global/device'
import { Page } from '../pages/page'
import { Block } from './block'

export class UpdatePost extends Block {
	accordion: AccordionItem
	id: string

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.accordion = new AccordionItem(element)
		this.id = element.id
	}

	updateURL() {
		const url = new URL(window.location.href)
		url.hash = this.id
		history.replaceState('', '', url.href)
	}

	scrollIntoView() {
		this.accordion.open()
		this.accordion.element.scrollIntoView()
	}
}
