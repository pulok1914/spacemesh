import { App } from '../app'
import { Page } from './page'
import { Params } from 'navaid'

export class Blog extends Page {
	backlink?: HTMLElement

	constructor(element: HTMLElement, app: App, params: Params) {
		super(element, app)
		this.backlink = element.querySelector(`a.back`)
		this.backlink?.addEventListener('click', this.goBack)
	}

	private goBack = (event: Event) => {
		event.preventDefault()
		history.back()
	}

	destroy() {
		this.backlink?.removeEventListener('click', this.goBack)
		super.destroy()
	}
}
