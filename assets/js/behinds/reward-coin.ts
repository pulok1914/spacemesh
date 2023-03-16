import { Page } from '../pages/page'
import { Behind } from './behind'

export class RewardCoin extends Behind {
	private video: HTMLVideoElement

	constructor(element: HTMLElement, page: Page) {
		super(element, page)
		this.video = element.querySelector('video')
		this.video.play()
	}
}
