var promiseNums = 1;
var Promise = function(func) {
	this.state = 'pending';
	this.affair = func || function(obj) {
		return obj;
	};
	this.allAffairs = [];
	this.promiseNums = promiseNums;
	console.log('Promise' + promiseNums + "----------------------------");
	promiseNums++;
};

Promise.prototype = {
	constructor: Promise,
	resolve: function(data) {
		var affair, i = 0,
			len = this.allAffairs.length;
		if (this.state !== 'pending') {
			return;
		}
		this.state = 'resloved';
		//执行自己的func
		this.result = this.affair(data); // 执行ok
		console.log(this.promiseNums + "resloved");
		for (; i < len; ++i) {
			// 依次调用该任务的后续任务
			affair = this.allAffairs[i];
			console.log(affair.promise.promiseNums + "NNfire");
			this.fire(affair.promise, affair.affair);
		}
		return this;
	},
	fire: function(p, func) {
		var result = func.call(this, this.result);
		if (result instanceof Promise) {
			result.then(function(data) {
				console.log(this.promiseNums + "	then 	" + p.promiseNums + "===============")
				p.resolve(data);
			});
		} else {
			p.resolve(result);
		}
		return p;
	},
	then: function(func) {
		var p = new Promise();
		console.log(this.promiseNums + "	then 	" + p.promiseNums)
		if (this.state !== 'pending') {
			return this.fire(p, func);
		} else {
			this.allAffairs.push({
				promise: p,
				affair: func
			});
			return p;
		}
	}
}
