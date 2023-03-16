import { Overlay } from './overlay'
import gsap from 'gsap'
import { EVENT_OVERLAY_CLOSE } from '../global/constants'

export interface GlossaryData {
	glossary: GlossaryEntity[] | null
}
export interface GlossaryEntity {
	id: string
	term: string
	content: string
	custom_id?: string
	hide_button?: boolean
}

export class Term extends Overlay {
	static data: Promise<GlossaryData> = fetch(
		'/glossary.json'
	).then((response) => response.json())

	private term: GlossaryEntity
	private exit: HTMLElement

	private animateInTween: gsap.core.Timeline
	private termEl: HTMLElement
	private btn: HTMLButtonElement

	private loaderDots: HTMLElement[]
	private loader: HTMLElement
	private body: HTMLElement

	constructor() {
		super('term')
	}

	/**
	 * Initialize overlay by fetching data. This can and will throw
	 * if no term with that ID is found. If comes from this.type
	 */
	async init(id: string) {
		await this.initTermData(id) // Show window before data is ready
		super.createElement()
		this.initTermOverlay()
		this.presetAnimations()
		this.addListeners()
	}

	private async initTermData(termId: string) {
		let data = await Term.data
		this.term = data.glossary.find(
			(json) => termId == json.custom_id || termId == json.id
		)

		if (!this.term) {
			console.warn(`No term found for ${termId}`)
			throw 'Failed to find term'
		}
	}

	private async initTermOverlay() {
		const html = `
			<div class="header">
				<div class="term">${this.term.term}</div>
				<div class="exit">Close</div>
			</div>
	
			<div class="bottom">
				<div class="body">
					<div class="arley">@arley</div>
					<div class="content">${this.term.content}</div>
				</div>
				<a class="btn" href="/resources#glossary">
					<span class="adjust-baseline">Learn More</span>
				</a>
			</div>

			<div class="loader">
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
			</div>
		`
		this.element.innerHTML = html
		this.termEl = this.element.querySelector('.term') as HTMLElement
		this.body = this.element.querySelector('.body') as HTMLElement
		this.exit = this.element.querySelector('.exit') as HTMLElement
		this.btn = this.element.querySelector('.btn') as HTMLButtonElement
		this.loader = this.element.querySelector('.loader') as HTMLElement
		this.loaderDots = [
			...this.element.querySelectorAll('.loader .dot'),
		] as HTMLElement[]

		this.rect = this.element.getBoundingClientRect()

		// Hide FAQ button if on FAQ page.
		// or if term_hidden is enabled.
		const url = window.location.href
		if (url.includes('/resources') || this.term.hide_button) {
			this.btn.style.display = 'none'
		}
	}

	private presetAnimations() {
		gsap.set([this.termEl, this.exit], { opacity: 0, y: -10 })
		gsap.set([this.element, this.btn], { opacity: 0 })
		gsap.set(this.loader, { opacity: 0, y: 80 })
		gsap.set(this.btn, { opacity: 0 })
		gsap.set(this.body, { opacity: 0, y: 10 })
	}

	private addListeners() {
		this.element.addEventListener('click', this.onTextClick)	
		this.exit.addEventListener('click', this.onExitClick)	
		this.btn.addEventListener('click', this.onButtonClick)
		this.element.addEventListener('touchend', this.onTextClick)
		this.exit.addEventListener('touchend', this.onExitClick)
		this.btn.addEventListener('touchend', this.onButtonClick)
	}

	private onButtonClick = () => {
		window.location.href = this.btn.attributes[1].value;	
	
	}


	private onTextClick = () => {
		this.animateInTween?.progress(1)
	}

	private onExitClick = () => {
		this.emitter.emit(EVENT_OVERLAY_CLOSE, this)
		console.log('clicked')
	}

	async animateIn(from: { x: number; y: number }) {
		// Animte dots all the time
		gsap
			.timeline({
				defaults: { stagger: 0.2, duration: 0.35 },
				repeat: -1,
				repeatDelay: 0,
			})
			.to(this.loaderDots, { opacity: 0.5, y: -2 })
			.to(this.loaderDots, { opacity: 0.15, y: 0 }, '-=0.31')

		const loaderIn = gsap
			.timeline()
			.set(this.loader, { opacity: 0, y: 80 })
			.to(this.loader, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'elastic.out(1, 1)',
				delay: 0.25,
			})

		// Show loader while waiting for data.
		// Animate loader while overlay animates in as well
		await Promise.all([Term.data, super.animateIn(from), loaderIn])

		this.animateInTween = gsap
			.timeline({ defaults: { ease: 'expo.out' }, delay: 0.55 })
			// Animate out loader
			.to(this.loader, { backgroundColor: '#CBCBCB', duration: 0.45 })
			.to(
				this.loader,
				{ y: 80, opacity: 0, duration: 0.8, ease: 'elastic.in(1, 1)' },
				'<'
			)

			// Animate in Content
			.to(this.body, { opacity: 1, y: 0, duration: 0.6 })
			.to(this.termEl, { opacity: 1, y: 0, duration: 0.6 }, '<')
			.to(this.exit, { opacity: 1, y: 0, duration: 0.65, delay: 0.1 }, '<')

			// Button last
			.to(this.btn, { opacity: 1 })

		await this.animateInTween
	}

	async destroy(safe = true) {
		this.element.removeEventListener('click', this.onTextClick)
		this.exit.removeEventListener('click', this.onExitClick)
		this.btn.removeEventListener('click', this.onButtonClick)
		this.element.removeEventListener('touchend', this.onTextClick)
		this.exit.removeEventListener('touchend', this.onExitClick)
		this.btn.removeEventListener('touchend', this.onButtonClick)
		await super.destroy(safe)
	}
}
