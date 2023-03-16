const MIN = 60e3
const HOUR = MIN * 60
const DAY = HOUR * 24
const YEAR = DAY * 365
const MONTH = DAY * 30

export type DateOkay = Date | string | number
export interface DateOptions {
	and?: boolean
	suffix?: boolean
	zero?: boolean
	max?: number
}

/**
 * Hacked version of https://github.com/lukeed/fromnow
 */
export function fromNow(date: DateOkay, opts?: DateOptions): string {
	opts = opts || {}

	var del = new Date(date).getTime() - Date.now()
	var abs = Math.abs(del)

	if (abs < MIN) return '0'

	var periods = {
		y: abs / YEAR,
		m: (abs % YEAR) / MONTH,
		d: (abs % MONTH) / DAY,
		h: (abs % DAY) / HOUR,
	}

	let val,
		keep = [],
		max = opts.max || MIN // large number

	for (let k in periods) {
		if (keep.length < max) {
			val = Math.floor(periods[k as keyof typeof periods])
			if (val || opts.zero) {
				keep.push(val + k)
			}
		}
	}

	let l = keep.length
	let sep = ':'

	if (l > 1 && opts.and) {
		if (l == 2) sep = ' '
		keep[--l] = 'and ' + keep[l]
	}

	val = keep.join(sep)

	if (opts.suffix) {
		val += del < 0 ? ' ago' : ' from now'
	}

	return val
}
