import type { App } from '../app'
import gsap from 'gsap'
import { emitter } from '../global/emitter'
import { EVENT_RESIZE, EVENT_ROUTE_CHANGE, PageType } from '../global/constants'
import { RouteState } from '../global/types'

const EL = {
	LINKS: `.menu [data-menu-id]`,
	QUICK: `.menu__quick .nav`,
	QUICK_LINKS: `.menu__quick .nav li`,
	TOGGLE: `.toggle`,
	PRIMARY: `.menu__primary`,
	SPLITS: `.menu__primary .split`,
	PRIMARY_LINKS: `.menu__primary a`,
	NEWSLETTER: `.menu__primary .newsletter`,
	FOOTER: `.site-footer`,
	CLOSE_PIXEL: `#menu-close-pixel`,
}

export class Menu {
	public element: HTMLElement
	public open = false

	private app: App
	private toggle: HTMLElement
	private primaryMenu: HTMLElement
	private primaryMenuHeight: number
	private links: HTMLElement[]
	private footer: HTMLElement

	private animateInMenuTween: gsap.core.Timeline
	private animateOutMenuTween: gsap.core.Timeline
	private closePixel: HTMLElement

	constructor(element: HTMLElement, app: App) {
		this.app = app
		this.element = element
		this.toggle = element.querySelector(EL.TOGGLE)
		this.primaryMenu = element.querySelector(EL.PRIMARY)
		this.links = [...document.querySelectorAll(EL.LINKS)] as HTMLElement[]
		this.footer = document.querySelector(EL.FOOTER) as HTMLElement
		this.closePixel = document.querySelector(EL.CLOSE_PIXEL) as HTMLElement

		this.presetAnimation()
		this.addListeners()
		this.onResize()
		this.close()
	}

	addListeners() {
		this.toggle.addEventListener('click', this.onToggleMenu)
		emitter.on(EVENT_RESIZE, this.onResize)
		emitter.on(EVENT_ROUTE_CHANGE, this.onRouteChange)

		// Automatically close after scroll to bottom
		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio < 1 && this.open) {
					this.animateOutMenuBottom()
				}
			})
		})
		observer.observe(this.closePixel)
	}

	onToggleMenu = (event: Event) => {
		event.preventDefault()
		this.animateInMenuTween?.kill()
		this.animateOutMenuTween?.kill()
		if (this.open) {
			this.animateOutMenu()
		} else {
			this.animateInMenu()
		}
	}

	// Hide and reset menu state without any animation.
	close() {
		this.presetAnimation()
		this.pointerEvents(false)
	}

	pointerEvents(enabled: Boolean) {
		this.primaryMenu.style.pointerEvents = enabled ? `auto` : `none`
	}

	presetAnimation() {
		gsap.set(EL.PRIMARY, { opacity: 1 })
		gsap.set(EL.SPLITS, { opacity: 1, scaleX: 0 })
		gsap.set(EL.PRIMARY_LINKS, { opacity: 0 })
		gsap.set(EL.NEWSLETTER, { opacity: 0 })
		gsap.set(this.footer, { opacity: 1 })
		gsap.set(EL.QUICK_LINKS, { opacity: 1, y: 0 })
	}

        private getPageElement() {
                return this.app?.page?.element || document.querySelector('.app main.main') as HTMLElement
        }

	async animateInMenu() {
		this.open = true
		this.toggle.classList.add('open')

		// Needed to start from scratch each time
		// and to prevent race conditions
		this.presetAnimation()

                const page = this.getPageElement() as HTMLElement

		this.animateInMenuTween = gsap
			.timeline({ defaults: { ease: 'circ.out' } })
			.set(EL.FOOTER, { opacity: 0 })
			.to(EL.QUICK_LINKS, { duration: 0.2, opacity: 0, y: -12, stagger: 0.03 })
			.to(
				page,
				{
					y: this.primaryMenuHeight,
					duration: 0.65,
				},
				0
			)
			.to(
				EL.SPLITS,
				{
					stagger: 0.05,
					scaleX: 1,
					duration: 0.6,
				},
				'<-0.1'
			)
			.to(
				EL.PRIMARY_LINKS,
				{
					opacity: 1,
					stagger: 0.05,
					duration: 0.6,
					delay: 0.45,
				},
				'<-0.15'
			)
			.to(
				EL.NEWSLETTER,
				{
					opacity: 1,
				},
				'<-0.30'
			)

		this.pointerEvents(true)
		await this.animateInMenuTween
	}

	async animateOutMenu() {
		this.open = false
		this.toggle.classList.remove('open')

                const page = this.getPageElement() as HTMLElement

		this.animateOutMenuTween = gsap
			.timeline({ defaults: { ease: 'circ.out' } })
			.to(EL.PRIMARY, { opacity: 0, duration: 0.6 }, 0)
			.to(page, { y: 0, duration: 0.6 }, 0.12)
			.to(EL.QUICK_LINKS, { opacity: 1, duration: 0.3, y: 0, stagger: 0.1 })
			.to(this.footer, { opacity: 1, duration: 0.3 })

		await this.animateOutMenuTween

		this.pointerEvents(false)
	}

	/**
	 * A slightly faster animation when
	 * the menu is open and a route happen.
	 * This is awaited before transition happens so keep it fast.
	 */
	async animateOutMenuRoute() {
		if (!this.open) return

                const page = this.getPageElement() as HTMLElement

		this.open = false
		this.toggle.classList.remove('open')
		this.animateOutMenuTween = gsap
			.timeline({ defaults: { ease: 'circ.out' } })
			.to(this.footer, { opacity: 1, duration: 0.3 }, 0)
			.to(EL.PRIMARY, { opacity: 0, duration: 0.3 }, 0)

		// Do not await these tweens
		gsap.to(page, {
			y: '+=400',
			duration: 0.56,
			ease: 'circ.in',
		})
		gsap.to(EL.QUICK_LINKS, {
			opacity: 1,
			duration: 0.4,
			y: 0,
			stagger: 0.1,
			delay: 0.2,
		})

		await this.animateOutMenuTween
		this.pointerEvents(false)
	}

	async animateOutMenuBottom() {
		if (!this.open) return

                const page = this.getPageElement() as HTMLElement

		this.open = false
		this.toggle.classList.remove('open')

		this.animateOutMenuTween = gsap
			.timeline({ defaults: { ease: 'circ.out' } })
			.to(EL.PRIMARY, { opacity: 0, duration: 0.4 })
			.to(this.footer, { opacity: 1, duration: 0.3 }, 0)
			.to(page, { y: 0, duration: 0.4 }, '-=0.2')
			.set(EL.QUICK_LINKS, { opacity: 1, y: 0 })

		await this.animateOutMenuTween

		await this.animateOutMenuTween
		this.pointerEvents(false)
	}

	updateActiveMenuItem(id: PageType) {
		this.links.forEach((link) => {
			link.classList.remove(`active`)
			if (link.dataset.menuId === id) link.classList.add(`active`)
		})
	}

	// -- Event Handlers

	onResize = () => {
		this.primaryMenuHeight = this.primaryMenu.getBoundingClientRect().height
		if (this.open) {
			gsap.set(this.app.page.element, { y: this.primaryMenuHeight })
		}
	}

	onRouteChange = (event: RouteState) => {
		// No need to wait - do this work ASAP
		this.updateActiveMenuItem(event.next.type)
	}
}
