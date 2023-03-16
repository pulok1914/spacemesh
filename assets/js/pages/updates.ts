import gsap from 'gsap'
import { Page } from './page'
import { App } from 'app'
import { UpdatePost } from '../blocks/update-post'

export class Updates extends Page {
	updates: UpdatePost[] = []

	constructor(element: HTMLElement, app: App) {
		super(element, app)
		this.autoScrollToDeepLink = false
		this.updates = this.blocks.filter(
			(b) => b instanceof UpdatePost
		) as UpdatePost[]
		this.addListeners()

		this.presetAnimation()
	}

	presetAnimation() {
		this.updates.forEach((b) => gsap.set(b.element, { opacity: 0, y: 20 }))
	}

	addListeners() {
		this.updates.forEach((b) =>
			b.element.addEventListener('click', () => this.onUpdateClick(b))
		)
	}

	onUpdateClick = (block: UpdatePost) => {
		if (block.accordion.closed) {
			block.accordion.animateOpen()
			block.updateURL()
		} else {
			block.accordion.animateClose()
			block.reset()
		}
	}

	highlightDeepLink() {
		if (this.deeplink?.hash) {
			const id = this.deeplink?.hash?.replace('#', '')
			if (!id) return
			const update = this.updates.find((update) => update.id == id)
			update?.scrollIntoView()
		}
	}

	async animateIn() {
		this.updates[0]?.accordion.open()
		await super.animateIn()
		this.highlightDeepLink()
		await Promise.all(
			this.updates.map((b, i) =>
				gsap.to(b.element, {
					opacity: 1,
					y: 0,
					duration: 1,
					delay: 0 + i * 0.2,
				})
			)
		)
	}
}
