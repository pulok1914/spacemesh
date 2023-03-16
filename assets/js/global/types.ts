import { Params } from 'navaid'
import { Page } from '../pages/page'
import type { PageType } from '../global/constants'

export type PageConfig = {
	type: PageType
	slug: string
	constructor: typeof Page
}

export type RouteState = {
	next: RouteStateItem
	prev: RouteStateItem
}

export type RouteStateItem = {
	type: PageType
	slug: string
	path: string
	params: Params
}

export type ScrollEventState = {
	y: number
	deltaY: number
}
