import { device } from '../global/device'
import { Page } from '../pages/page'
import { Block } from './block'

export class Glossary extends Block {
	links: HTMLElement[]

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.page.autoScrollToDeepLink = false
		this.links = [...element.querySelectorAll('.term')] as HTMLElement[]
		this.addListeners()
	}

	private addListeners() {
		this.links.forEach((link) =>
			link.addEventListener('click', this.onTermClick)
		)
	}

	private removeListeners() {
		this.links.forEach((link) =>
			link.removeEventListener('click', this.onTermClick)
		)
	}

	private onTermClick = (event: Event) => {
		event.preventDefault()
		const url = new URL(window.location.href)
		url.hash = (event.target as HTMLElement).id
		history.replaceState('', '', url.href)
	}

	private handleDeepLink() {
		const { hash } = this.page.deeplink
		if (!hash.startsWith('#term-')) return
		const term = hash.replace('#term-', '')
		this.element.scrollIntoView({ block: 'center' })
		setTimeout(() => {
			this.page.openTerm(term, {
				x: 0,
				y: window.scrollY + device.halfHeight,
			})
		}, 850)
	}

	async animateIn(index: number) {
		await super.animateIn(index)
		if (this.page.deeplink) this.handleDeepLink()
	}

	destroy() {
		this.removeListeners()
		super.destroy()
	}
}
