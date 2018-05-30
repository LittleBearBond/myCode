function Cache(limit = 100) {
	this.size = 0;
	this.limit = limit;
	this.cache = Object.create(null)
	this.head = this.tail = undefined;
}

Cache.prototype.push = function (key, val) {
	const item = {
		key,
		val,
		time: +new Date()
	}
	this.cache[key] = item;
	if (this.tail) {
		this.tail.next = item
		item.pre = this.tail
	} else {
		this.head = item;
	}
	this.tail = item;
	if (this.size === this.limit) {
		return this.shift()
	}
	this.size++;
}

Cache.prototype.get = function (key, val) {
	const item = this.cache[key];
	if (typeof item === 'undefined') {
		return undefined;
	}
	if (item === this.head) {
		return item.val
	}
	if (item.pre) {
		item.pre.next = item.next
	}
	if (item.next) {
		item.next.pre = item.pre;
	}
	this.head.pre = item;
	item.next = this.head;
	item.pre = null
	this.head = item;
	return item.val
}

Cache.prototype.shift = function () {
	var item = this.head
	if (item) {
		this.head = this.head.next
		this.head.pre = undefined
		item.pre = item.next = undefined
		this.cache[item.key] = undefined
	}
	return item
}
Cache.prototype.size = function () {
	return this.size;
}

debugger
var c = new Cache(4)
c.push('adam', 29)
c.push('john', 26)
c.push('angela', 24)
c.push('bob', 48)
console.log(c.size())
c.get('bob')
