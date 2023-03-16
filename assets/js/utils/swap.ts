// https://github.com/estrattonbailey/operator
const cache = new Map()
const EL = document.createElement('div')

export const swap = (url: string, selector: string) =>
	new Promise<HTMLElement>(async (resolve, reject) => {
		const cached = cache.get(url)

		if (cached) {
			EL.innerHTML = cached
		} else {
			const string = await fetch(url, { credentials: 'include' }).then((res) =>
				res.text()
			)
			if (!string) return reject(`failed fetching new page`)
			cache.set(url, string)
			EL.innerHTML = string
		}

		const title = EL.querySelector('title').innerHTML
		const element = EL.querySelector(selector) as HTMLElement

		if (!element) {
			return reject(`No "${selector}" container found.`)
		}

		requestAnimationFrame(() => {
			const root = document.querySelector(selector) as HTMLElement
			if (title) document.title = title
			root.replaceWith(element)
			resolve(element)
		})
	})
