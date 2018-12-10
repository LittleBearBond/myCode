/**
 * @author 熊建
 * @email
 * @create date 2018-04-25 08:03:56
 * @modify date 2018-04-25 08:03:56
 * @desc [description]
 */
new Promise((res, rej) => {
	const img = new Image();
	img.onload = res;
	img.onerror = rej
	img.src = 'http://static.galileo.xiaojukeji.com/static/tms/api/public/aegis/262189998959693258d7b57474e8bab7.png'
}).then(console.log, console.error).then()


/*
pending
fulfilled
rejected
*/
const PENDING = "pending";
const RESOLVEED = "resolved";
const REJECTED = "rejected";

function Promise(executor) {
	this.status = PENDING;
	this.data = void (0)
	this.onRejectedCallbacks = []
	this.onResolveCallbacks = []
	const that = this;

	//成功
	function resolve(...args) {
		let [value] = args;
		if (value instanceof Promise) {
			return value.then(resolve, reject);
		}
		setTimeout(() => {
			if (that.status !== PENDING) {
				return;
			}
			that.status = RESOLVEED
			that.data = args
			for (let fn of that.onResolveCallbacks) {
				fn(...args)
			}
		});
	}

	//失败
	function reject(...args) {
		setTimeout(() => {
			if (that.status !== PENDING) {
				return;
			}
			that.status = REJECTED
			that.data = args
			for (let fn of that.onRejectedCallbacks) {
				fn(...args)
			}
		});
	}
	try {
		executor(resolve.bind(this), reject.bind(this))
	} catch (error) {
		return reject()
	}
}

Promise.prototype.then = function (onReslove, onRejected) {
	let promise2;
	const that = this;
	onReslove = typeof onReslove === 'function' ? onReslove : v => v
	onRejected = typeof onRejected === 'function' ? onRejected : v => {
		throw v
	}

	if (this.status === RESOLVEED) {
		return promise2 = new Promise(function (resolve, reject) {
			setTimeout(() => {
				try {
					const value = onReslove(that.data)
					resolvePromise(promise2, value, resolve, reject)
				} catch (error) {
					reject(error)
				}
			})
		})
	}
	if (this.status === REJECTED) {
		return promise2 = new Promise(function (resolve, reject) {
			setTimeout(() => {
				try {
					const value = onRejected(that.data)
					resolvePromise(promise2, value, resolve, reject)

				} catch (error) {
					reject(error)
				}
			})
		})
	}
	if (this.status === PENDING) {
		return promise2 = new Promise(function (resolve, reject) {
			that.onResolvedCallback.push(function (...args) {
				try {
					var x = onResolved(self.data)
					resolvePromise(promise2, x, resolve, reject)
				} catch (e) {
					reject(e)
				}
			})
			that.onRejectedCallbacks.push(function (...args) {
				try {
					var x = onRejected(self.data)
					resolvePromise(promise2, x, resolve, reject)
				} catch (e) {
					reject(e)
				}
			})
		})
	}
}

function resolvePromise(promise2, x, resolve, reject) {
	var then
	var thenCalledOrThrow = false

	if (promise2 === x) {
		return reject(new TypeError('Chaining cycle detected for promise!'))
	}
	if (x instanceof Promise) {
		if (x.status === 'pending') { //because x could resolved by a Promise Object
			x.then(v => resolvePromise(promise2, v, resolve, reject), reject)
		} else {
			x.then(resolve, reject)
		}
		return;
	}
	if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
		try {
			then = x.then //because x.then could be a getter
			if (typeof then === 'function') {
				then.call(x, function res(y) {
					if (thenCalledOrThrow) {
						return
					}
					thenCalledOrThrow = true
					return resolvePromise(promise2, y, resolve, reject)
				}, function rej(r) {
					if (thenCalledOrThrow) {
						return
					}
					thenCalledOrThrow = true
					return reject(r)
				})
			} else {
				resolve(x)
			}
		} catch (e) {
			if (thenCalledOrThrow) {
				return
			}
			thenCalledOrThrow = true
			return reject(e)
		}
	} else {
		resolve(x)
	}
}

Promise.prototype.catch = function (fn) {

}

Promise.all = function (...args) {

}

Promise.race = function (...args) {

}

Promise.resolve = function (...args) {

}

Promise.reject = function (...args) {

}

const P = 'pending'
const RES = 'resolved'
const REJ = 'rejected'

function myPromise(executor) {
	this.status = P;
	this.resolveCallbacks = []
	this.rejectCallbacks = []
	this.data = void (0)
	const that = this;

	function resolve(...args) {
		if (args[0] instanceof myPromise) {
			return args[0].then(resolve, reject)
		}
		setTimeout(() => {
			if (that.status === P) {
				that.status = RES;
				that.data = args;
				for (let fn of that.resolveCallbacks) {
					fn(...args)
				}
			}
		})
	}

	function reject(...args) {
		setTimeout(() => {
			if (that.status === P) {
				that.status = REJ;
				that.data = args;
				for (let fn of that.rejectCallbacks) {
					fn(...args)
				}
			}
		})
	}

	try {
		executor(resolve.bind(this), reject.bind(this))
	} catch (error) {
		return reject(error)
	}
}

myPromise.prototype.then = function (onResolve, onReject) {
	onResolve = typeof onResolve === 'function' ? onResolve : v => v
	onReject = typeof onReject === 'function' ? onReject : v => {
		throw v
	}
	let promise2;
	const status = this.status;
	const that = this;
	if (status === RES) {
		return promise2 = new Promise(function (resolve, reject) {
			try {
				const value = onResolve(...that.data)
				resolvePromise(promise2, value, resolve, reject)
			} catch (error) {
				reject(error)
			}
		})
	}
	if (status === REJ) {
		return promise2 = new Promise(function (resolve, reject) {
			try {
				const value = onReject(...that.data)
				resolvePromise(promise2, value, resolve, reject)
			} catch (error) {
				reject(error)
			}
		})
	}
	if (status === P) {
		return promise2 = new myPromise(function (resolve, reject) {

			that.resolveCallbacks.push(function (v) {
				try {
					const value = onResolve(v);
					resolvePromise(promise2, value, resolve, reject)
				} catch (error) {
					reject(error)
				}
			})
			that.rejectCallbacks.push(function (v) {
				try {
					const value = onReject(v);
					resolvePromise(promise2, value, resolve, reject)
				} catch (error) {
					reject(error)
				}
			})
		})
	}
}

function resolvePromise(promise, value, resolve, reject) {
	let isThenCall = false

	if (promise === value) {
		return reject(new TypeError('Chaining cycle detected for promise!'))
	}
	if (value instanceof myPromise) {
		if (value.status === P) {
			value.then((value) => resolveProomise(proomise2, value, resolve, reject), reject);
		}
		return value.then(resolve, reject)
	}
	if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
		try {
			const {
				then
			} = value
			if (typeof then === 'function') {
				then.call(value, function () {
					if (isThenCall) {
						return
					}
					isThenCall = true
					return resolvePromise(promise2, y, resolve, reject)
				}, function () {
					if (isThenCall) {
						return
					}
					isThenCall = true
					return reject(r)
				})
			} else {
				resolve(value)
			}
		} catch (error) {
			if (isThenCall) {
				return
			}
			isThenCall = true
			reject(error)
		}
	} else {
		resolve(value)
	}
}
