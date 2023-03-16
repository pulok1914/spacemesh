import navaid, { Params, Router } from 'navaid'
import {
	gsap,
	Draggable,
	TextPlugin,
	SplitText,
	InertiaPlugin,
	ScrambleTextPlugin,
} from 'gsap/all'
import {
	EVENT_ROUTE_CHANGE,
	EVENT_ROUTE_CHANGE_FINISHED,
	PAGES,
} from './global/constants'
import { Page } from './pages/page'
import { swap } from './utils/swap'
import { Menu } from './components/menu'
import { emitter } from './global/emitter'
import { whenIdle } from './utils/idle'
import { PageConfig, RouteStateItem } from './global/types'
import { Footer } from './components/footer'
import { device } from './global/device'

// Lazy load
import('lazysizes')

// Avoid Treeshaking these
gsap.registerPlugin(Draggable, SplitText)
gsap.registerPlugin(TextPlugin, InertiaPlugin, ScrambleTextPlugin)

const EL = {
	footer: '.site-footer',
	menu: '.menu',
}

export class App {
	page: Page
	router: Router
	route?: RouteStateItem
	element = document.querySelector(`.app.container`) as HTMLElement
	loader = document.querySelector(`.page-loader`) as HTMLElement

	// Global Components
	menu: Menu
	footer: any

	constructor() {
		this.initComponents()
		this.initRouter()
		this.animateIn()
	}

	initRouter() {
		this.router = navaid()
		PAGES.forEach((page) => {
			this.router.on(page.slug, (params) => this.onRouteChange(page, params))
		})
		this.router.listen()
	}

	initComponents() {
		this.menu = new Menu(document.querySelector(EL.menu), this)
		this.footer = new Footer(document.querySelector(EL.footer), this)
	}

	async animateIn() {
		if (device.isDebug()) {
			return this.loader.remove()
		}

		// await gsap.to(this.loader, { opacity: 0, duration: 0.25, delay: 1.5 })
		// this.loader.remove()
	}

	async onRouteChange({ slug, type, constructor }: PageConfig, params: Params) {
		if (this.route?.path == location.pathname) {
			return
		}

		const prev = { ...this.route }
		const next = {
			type,
			slug,
			params,
			path: location.pathname,
		}
		this.route = next

		emitter.emit(EVENT_ROUTE_CHANGE, { next, prev })

		if (this.page) {
			let page = this.page
			await this.menu.animateOutMenuRoute()
			await page.animateOut({ next, prev })

			// Reset scroll when everything is hidden
			window.scrollTo({ top: 0, behavior: 'auto' })

			whenIdle(() => {
				page.destroy()
				page = null
			})
		}

		let element: HTMLElement
		if (!this.route) {
			element = document.querySelector('main')
		} else {
			try {
				element = await swap(location.pathname, 'main')
			} catch (error) {
				console.warn('[router] failed', error)
				return
			}
		}

		this.page = new constructor(element, this, params)
		await this.page.animateIn({ next, prev })

		emitter.emit(EVENT_ROUTE_CHANGE_FINISHED, { next, prev })
	}
}

new App()
