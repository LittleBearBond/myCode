var Queue = function() {
	this.list = []
}
Queue.prototype = {
	constructor: Queue,
	queue: function(fn) {
		this.list.push(fn)
		return this;
	},
	wait: function(ms) {
		this.list.push(ms)
		return this;
	},
	dequeue: function() {
		var self = this,
			list = self.list;
		var el = list.shift() || function() {};
		if (typeof el === "number") {
			setTimeout(function() {
				self.dequeue();
			}, el);
		} else if (typeof el === "function") {
			el.call(this)
			if (list.length) {
				self.dequeue();
			}
		}
	}
}
