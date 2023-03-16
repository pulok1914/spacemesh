/**
 * Constrain a value to lie between two further values.
 *
 * @param  {number} min - Lower end of the range into which to constrain v.
 * @param  {number} max - Upper end of the range into which to constrain v.
 * @param  {number} v   - Value to clamp.
 * @return {number} The value to constrain.
 * @see {@link https://www.opengl.org/sdk/docs/man/html/clamp.xhtml}
 */
export function clamp(min: number, max: number, v: number) {
	return Math.min(max, Math.max(min, v))
}

/**
 * Compute value of one parameter modulo another.
 *
 * @param  {number} a - Value a.
 * @param  {number} n - Value b.
 * @return {number} Returns the value of x modulo n.
 * @see {@link https://www.opengl.org/sdk/docs/man4/html/mod.xhtml}
 */
export function mod(a: number, n: number) {
	return ((a % n) + n) % n
}

/**
 * Generate a random integer
 *
 * @param  {number} min - Minimum boundary.
 * @param  {number} max - Maximum boundary.
 * @return {number} Generated integer.
 */
export function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
