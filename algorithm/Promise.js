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



/**
* Promise 实现 遵循promise/A+规范
* Promise/A+规范译文:
* https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4
*/

// promise 三个状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(excutor) {
	let that = this; // 缓存当前promise实例对象
	that.status = PENDING; // 初始状态
	that.value = undefined; // fulfilled状态时 返回的信息
	that.reason = undefined; // rejected状态时 拒绝的原因
	that.onFulfilledCallbacks = []; // 存储fulfilled状态对应的onFulfilled函数
	that.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数

	function resolve(value) { // value成功态时接收的终值
		if (value instanceof Promise) {
			return value.then(resolve, reject);
		}

		// 为什么resolve 加setTimeout?
		// 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
		// 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。

		setTimeout(() => {
			// 调用resolve 回调对应onFulfilled函数
			if (that.status === PENDING) {
				// 只能由pedning状态 => fulfilled状态 (避免调用多次resolve reject)
				that.status = FULFILLED;
				that.value = value;
				that.onFulfilledCallbacks.forEach(cb => cb(that.value));
			}
		});
	}

	function reject(reason) { // reason失败态时接收的拒因
		setTimeout(() => {
			// 调用reject 回调对应onRejected函数
			if (that.status === PENDING) {
				// 只能由pedning状态 => rejected状态 (避免调用多次resolve reject)
				that.status = REJECTED;
				that.reason = reason;
				that.onRejectedCallbacks.forEach(cb => cb(that.reason));
			}
		});
	}

	// 捕获在excutor执行器中抛出的异常
	// new Promise((resolve, reject) => {
	//     throw new Error('error in excutor')
	// })
	try {
		excutor(resolve, reject);
	} catch (e) {
		reject(e);
	}
}

/**
* resolve中的值几种情况：
* 1.普通值
* 2.promise对象
* 3.thenable对象/函数
*/

/**
* 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
* @param  {promise} promise2 promise1.then方法返回的新的promise对象
* @param  {[type]} x         promise1中onFulfilled的返回值
* @param  {[type]} resolve   promise2的resolve方法
* @param  {[type]} reject    promise2的reject方法
*/
function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {  // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
		return reject(new TypeError('循环引用'));
	}

	let called = false; // 避免多次调用
	// 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
	if (x instanceof Promise) { // 获得它的终值 继续resolve
		if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
			x.then(y => {
				resolvePromise(promise2, y, resolve, reject);
			}, reason => {
				reject(reason);
			});
		} else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
			x.then(resolve, reject);
		}
		// 如果 x 为对象或者函数
	} else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
		try { // 是否是thenable对象（具有then方法的对象/函数）
			let then = x.then;
			if (typeof then === 'function') {
				then.call(x, y => {
					if (called) return;
					called = true;
					resolvePromise(promise2, y, resolve, reject);
				}, reason => {
					if (called) return;
					called = true;
					reject(reason);
				})
			} else { // 说明是一个普通对象/函数
				resolve(x);
			}
		} catch (e) {
			if (called) return;
			called = true;
			reject(e);
		}
	} else {
		resolve(x);
	}
}

/**
* [注册fulfilled状态/rejected状态对应的回调函数]
* @param  {function} onFulfilled fulfilled状态时 执行的函数
* @param  {function} onRejected  rejected状态时 执行的函数
* @return {function} newPromsie  返回一个新的promise对象
*/
Promise.prototype.then = function (onFulfilled, onRejected) {
	const that = this;
	let newPromise;
	// 处理参数默认值 保证参数后续能够继续执行
	onFulfilled =
		typeof onFulfilled === "function" ? onFulfilled : value => value;
	onRejected =
		typeof onRejected === "function" ? onRejected : reason => {
			throw reason;
		};

	// then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
	// 原因:
	// 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
	// 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

	// 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
	// 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

	// 如下面这种情景 多次调用p1.then
	// p1.then((value) => { // 此时p1.status 由pedding状态 => fulfilled状态
	//     console.log(value); // resolve
	//     // console.log(p1.status); // fulfilled
	//     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
	//         console.log(value); // 'resolve'
	//     });
	//     console.log('当前执行栈中同步代码');
	// })
	// console.log('全局执行栈中同步代码');
	//

	if (that.status === FULFILLED) { // 成功态
		return newPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					let x = onFulfilled(that.value);
					resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
				} catch (e) {
					reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
				}
			});
		})
	}

	if (that.status === REJECTED) { // 失败态
		return newPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					let x = onRejected(that.reason);
					resolvePromise(newPromise, x, resolve, reject);
				} catch (e) {
					reject(e);
				}
			});
		});
	}

	if (that.status === PENDING) { // 等待态
		// 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
		return newPromise = new Promise((resolve, reject) => {
			that.onFulfilledCallbacks.push((value) => {
				try {
					let x = onFulfilled(value);
					resolvePromise(newPromise, x, resolve, reject);
				} catch (e) {
					reject(e);
				}
			});
			that.onRejectedCallbacks.push((reason) => {
				try {
					let x = onRejected(reason);
					resolvePromise(newPromise, x, resolve, reject);
				} catch (e) {
					reject(e);
				}
			});
		});
	}
};

/**
* Promise.all Promise进行并行处理
* 参数: promise对象组成的数组作为参数
* 返回值: 返回一个Promise实例
* 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
*/
Promise.all = function (promises) {
	return new Promise((resolve, reject) => {
		let done = gen(promises.length, resolve);
		promises.forEach((promise, index) => {
			promise.then((value) => {
				done(index, value)
			}, reject)
		})
	})
}

function gen(length, resolve) {
	let count = 0;
	let values = [];
	return function (i, value) {
		values[i] = value;
		if (++count === length) {
			console.log(values);
			resolve(values);
		}
	}
}

/**
* Promise.race
* 参数: 接收 promise对象组成的数组作为参数
* 返回值: 返回一个Promise实例
* 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
*/
Promise.race = function (promises) {
	return new Promise((resolve, reject) => {
		promises.forEach((promise, index) => {
			promise.then(resolve, reject);
		});
	});
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
Promise.prototype.catch = function (onRejected) {
	return this.then(null, onRejected);
}

Promise.resolve = function (value) {
	return new Promise(resolve => {
		resolve(value);
	});
}

Promise.reject = function (reason) {
	return new Promise((resolve, reject) => {
		reject(reason);
	});
}

