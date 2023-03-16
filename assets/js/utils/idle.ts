interface RequestIdleCallback {
	didTimeout?: boolean
	timeRemaining?(): DOMHighResTimeStamp
}

export const whenIdle =
	(window as any).requestIdleCallback ||
	function (cb: (params: RequestIdleCallback) => void) {
		var start = Date.now()
		return setTimeout(() => {
			cb({
				didTimeout: false,
				timeRemaining: () => {
					return Math.max(0, 50 - (Date.now() - start))
				},
			})
		}, 1)
	}
