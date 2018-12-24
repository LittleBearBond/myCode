/**
 * 函数节流
 * @param {*} func
 * @param {*} time 每隔time执行一次
 */
export function throtte(func, time) {
	let startTime;
	let that = this
	if (typeof func != 'function') {
		throw new TypeError('Expected a function')
	}
	return function (...args) {
		const currTime = Number(new Date())
		const run = function () {
			startTime = currTime
			func.apply(that, args)
		}
		if (!startTime) {
			run()
			return;
		}
		if (currTime - startTime >= time) {
			run()
		}
	}
}

/**
 * 函数放抖动
 * @param {*} func
 * @param {*} time 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 */
export function debounce(func, time) {
	let timmer;
	let that = this
	if (typeof func != 'function') {
		throw new TypeError('Expected a function')
	}
	return function (...args) {
		if (timmer) {
			clearTimeout(timmer)
			timmer = null
		}
		timmer = setTimeout(function () {
			func.apply(that, args)
		}, time)
	}
}
