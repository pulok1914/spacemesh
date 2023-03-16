import { gsap } from 'gsap'
import { Page } from '../pages/page'
import { fromNow } from '../utils/fromnow'
import { Block } from './block'

const EL = {
	boxes: 'article.stat',
	metrics: '.metric',
	status: '.status span',
	updated: '.updated',
	smeshers: `.active .metric`,
	accounts: `.accounts .metric`,
	transactions: `.transactions .metric`,
	layer: `.layer .metric`,
	rewards: `.rewards .metric`,
	age: `.age .metric`,
	onlineImg: `.status-img .online`,
	offlineImg: `.status-img .offline`,
}

const REFRESH = 60 // 1 min

export class Testnet extends Block {
	private status: HTMLElement
	private updated: HTMLElement
	private smeshers: HTMLElement
	private accounts: HTMLElement
	private transactions: HTMLElement
	private layer: HTMLElement
	private rewards: HTMLElement
	private age: HTMLElement
	private offlineImg: HTMLImageElement
	private onlineImg: HTMLImageElement

	private boxes: HTMLElement[]
	private metrics: HTMLElement[]

	private tickerId: number
	private secondsSinceUpdate: number = 0
	private endpoint: string
	private failCount = 0

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.initSelectors()
		this.update()
		this.tickerId = setInterval(this.onTick, 1000)
	}

	initSelectors() {
		this.status = this.element.querySelector(EL.status) as HTMLElement
		this.updated = this.element.querySelector(EL.updated) as HTMLElement
		this.boxes = [...this.element.querySelectorAll(EL.boxes)] as HTMLElement[]
		this.metrics = [
			...this.element.querySelectorAll(EL.metrics),
		] as HTMLElement[]

		this.smeshers = this.element.querySelector(EL.smeshers) as HTMLElement
		this.accounts = this.element.querySelector(EL.accounts) as HTMLElement
		this.transactions = this.element.querySelector(
			EL.transactions
		) as HTMLElement
		this.layer = this.element.querySelector(EL.layer) as HTMLElement
		this.rewards = this.element.querySelector(EL.rewards) as HTMLElement
		this.age = this.element.querySelector(EL.age) as HTMLElement
		this.offlineImg = this.element.querySelector(
			EL.offlineImg
		) as HTMLImageElement
		this.onlineImg = this.element.querySelector(
			EL.onlineImg
		) as HTMLImageElement

		const el = this.element.querySelector(`[data-endpoint]`) as HTMLElement
		this.endpoint = el.dataset.endpoint
	}

	onTick = () => {
		this.secondsSinceUpdate += 1
		if (this.secondsSinceUpdate > REFRESH) this.update()
		this.updated.innerHTML = `${this.secondsSinceUpdate} seconds ago`
	}

	async update() {
		try {
			const data = await fetch(this.endpoint).then((res) => res.json())
			this.secondsSinceUpdate = 0
			this.status.innerHTML = `online`
			gsap.set(this.offlineImg, { opacity: 0 })
			gsap.set(this.onlineImg, { opacity: 1 })

			if (!data.epoch) {
				throw 'network down'
			}

			this.setMetric(
				this.smeshers,
				`${data.epoch.stats.cumulative.smeshers || 0}`
			)
			this.setMetric(
				this.accounts,
				`${data.epoch.stats.cumulative.accounts || 0}`
			)
			this.setMetric(
				this.transactions,
				`${data.epoch.stats.cumulative.transactions || 0}`
			)
			this.setMetric(this.layer, `${data.epoch.layerend || 0}/${data.layer.epoch || 0}`) // epoch.number

			const rewards = (data.epoch.stats.cumulative.rewards as number) || 0
			const nf = new Intl.NumberFormat()
			this.setMetric(this.rewards, nf.format(Math.round(rewards / 10 ** 12)))
			this.failCount = 0

			this.setMetric(
				this.age,
				this.relativeDateString((data.network.genesis as number) || 0)
			)
		} catch (e) {
			console.warn(e)
			this.failCount += 1
			if (this.failCount > 2) {
				clearInterval(this.tickerId)
				this.updated.innerHTML = ``
			}
			this.status.innerHTML = `offline`
			gsap.set(this.offlineImg, { opacity: 1 })
			gsap.set(this.onlineImg, { opacity: 0 })
		}
	}

	relativeDateString(timestamp: number) {
		const date = new Date(timestamp * 1000).toDateString()
		return fromNow(date.toString(), { max: 2 })
	}

	setMetric(el: HTMLElement, value: string) {
		el.innerHTML = value
		
	}

	destroy() {
		super.destroy()
		clearInterval(this.tickerId)
	}
}
