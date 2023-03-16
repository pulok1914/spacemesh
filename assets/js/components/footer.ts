import { App } from '../app'

const EL = {
	top: `.top`,
}

export class Footer {
	private element: HTMLElement
	private app: App
	private topLink: HTMLLinkElement

	constructor(element: HTMLElement, app: App) {
		this.app = app
		this.element = element
		this.topLink = element.querySelector(EL.top) as HTMLLinkElement

		this.topLink.addEventListener('click', this.scrollToTop)
	}

	private scrollToTop = (event: Event) => {
		event.preventDefault()
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
}
