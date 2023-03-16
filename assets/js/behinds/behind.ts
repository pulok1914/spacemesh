import { Page } from '../pages/page'

export class Behind {
	element: HTMLElement
	page: Page

	constructor(element: HTMLElement, page: Page) {
		this.element = element
		this.page = page
	}

	show() {
		this.element.classList.remove('hide')
	}

	hide() {
		this.element.classList.add('hide')
	}

	destroy() {}
}
