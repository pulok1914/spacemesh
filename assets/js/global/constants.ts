// @ts-ignore
import * as params from '@params'
import { Page } from '../pages/page'
import { Blog } from '../pages/blog'
import { PageConfig } from './types'
import { Updates } from '../pages/updates'

import { Block } from '../blocks/block'
import { IntroStart } from '../blocks/intro-start'
import { Cover } from '../blocks/cover'
import { Discord } from '../blocks/discord'
import { CreatorsLarge } from '../blocks/creators-large'
import { UpdatePost } from '../blocks/update-post'
import { FAQ } from '../blocks/faq'
import { Glossary } from '../blocks/glossary'
import { Testnet } from '../blocks/testnet'
import { CryptoNews } from '../blocks/crypto-news'
import { Connect } from '../blocks/connect'
import { IntroHome } from '../blocks/intro-home'
import { Creators } from '../blocks/creators'
import { SingleCreator } from '../blocks/single-creator'
import { StartVideo } from '../blocks/start-video'
import { RewardCoin } from '../behinds/reward-coin'
import { Behind } from '../behinds/behind'
import { Events } from '../blocks/events'

export const BLOCKS = {
	base: Block,
	introStart: IntroStart,
	introHome: IntroHome,
	cover: Cover,
	discord: Discord,
	creatorsLarge: CreatorsLarge,
	updatePost: UpdatePost,
	faq: FAQ,
	glossary: Glossary,
	testnet: Testnet,
	cryptoNews: CryptoNews,
	connect: Connect,
	creators: Creators,
	events: Events,
	singleCreator: SingleCreator,
	startVideo: StartVideo,
}

export const BEHINDS = {
	base: Behind,
	rewardCoin: RewardCoin,
}

export enum PageType {
	home = 'home',
	start = 'start',
	blog = 'blog',
	updates = 'updates',
	about = 'about',
	resources = 'resources',
	careers = 'careers',
	events = 'events',
	pages = 'pages'
}

export const PAGES: PageConfig[] = [
	{ type: PageType.home, slug: `/`, constructor: Page },
	{ type: PageType.start, slug: `start`, constructor: Page },
	{ type: PageType.blog, slug: `blog`, constructor: Blog },
	{ type: PageType.blog, slug: `blog/page/:page`, constructor: Blog },
	{ type: PageType.blog, slug: `blog/categories/:category`, constructor: Blog },
	{ type: PageType.blog, slug: `blog/categories/:category/:page/:page`, constructor: Blog },
	{ type: PageType.blog, slug: `blog/:post`, constructor: Blog },
	{ type: PageType.updates, slug: `updates`, constructor: Updates },
	{ type: PageType.about, slug: `about`, constructor: Page },
	{ type: PageType.resources, slug: `resources`, constructor: Page },
	{ type: PageType.careers, slug: `careers`, constructor: Page },
	{ type: PageType.careers, slug: `careers/:job`, constructor: Page },
	{ type: PageType.events, slug: `events`, constructor: Page },
	{ type: PageType.pages, slug: `:post`, constructor: Page},

]

// Event Keys
export const EVENT_RESIZE = 'events_resize'
export const EVENT_SCROLL = 'events_scroll'
export const EVENT_ROUTE_CHANGE = 'events_route_change'
export const EVENT_ROUTE_CHANGE_FINISHED = 'events_route_change_finished'
export const EVENT_OVERLAY_CLOSE = 'events_overlay_closed'
