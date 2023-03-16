import { Page } from '../pages/page'
import { Block } from './block'

type NewsCurrencies = {
	code: string
	title: string
	slug: string
	url: string
}

type NewsInterface = {
	title: string
	published: string
	url: string
	domain: string
	slug: string
	currencies?: NewsCurrencies[]
}

const EL = {
	newsContainer: `.block__bottom`,
}

export class CryptoNews extends Block {
	container: HTMLElement
	endpoint: string

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.container = element.querySelector(EL.newsContainer) as HTMLElement
		this.endpoint = this.container.dataset.endpoint
		this.fetchNews()
	}

	async fetchNews() {
		const json = await fetch(this.endpoint, {
			redirect: 'follow',
		}).then((res) => res.json())

		if (!json || !json?.data) {
			console.warn('Failed to load crypto news...')
			return
		}

		// Only take first 6 news items
		for (let item of json.data.slice(0, 6)) {
			const el = this.createRowElement(item)
			this.container.appendChild(el)
		}
	}

	timeAgo(date: Date) {
		const time = Math.abs(date.getTime() - new Date().getTime())
		// weeks
		if (time > 1000 * 60 * 60 * 24 * 7)
			return parseInt(`${time / (1000 * 60 * 60 * 24 * 7)}`, 10) + 'w'
		// days
		if (time > 1000 * 60 * 60 * 24)
			return parseInt(`${time / (1000 * 60 * 60 * 24)}`, 10) + 'd'
		// hours
		if (time > 1000 * 60 * 60)
			return parseInt(`${time / (1000 * 60 * 60)}`, 10) + 'h'
		// minutes
		return parseInt(`${time / (1000 * 60)}`, 10) + 'm'
	}

	createRowElement(data: NewsInterface) {
		const container = document.createElement(`a`)
		container.setAttribute('href', data.url)
		container.setAttribute('target', '_blank')
		container.innerHTML = `
			<div class="time">${this.timeAgo(new Date(data.published))}</div>
			<h5>${data.title}</h5>
			<ul class="tags">${(data.currencies ?? [])
				.slice(0, 3)
				.map((x) => `<li>${x}</li>`)}</ul>
		`
		return container
	}
}
