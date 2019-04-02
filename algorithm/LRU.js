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


/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.cache = new Map()
    this.size = 0
    this.max = capacity
    this.head = this.tail = null
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (!this.cache.has(key)) {
        return -1
    }
    var item = this.cache.get(key)
    // 第一个不处理
    if (item === this.head) {
        return item.value
    }
    if (item === this.tail) {
        this.tail = item.pre || item
    }
    if (item.pre) {
        item.pre.next = item.next
    }
    if (item.next) {
        item.next.pre = item.pre;
    }
    this.head.pre = item
    item.next = this.head
    this.head = item
    item.pre = null
    return item.value
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    var item
    // 超出限制，切当前值不在缓存中
    if (this.size >= this.max && !this.cache.has(key)) {
        this.pop()
    }
    if (this.cache.has(key)) {
        item = this.cache.get(key)
        item && (item.value = value)
        if (item === this.head) {
            return
        }
        this.get(key)
        return
    }

    item = {
        key,
        value: value
    }
    this.cache.set(key, item)


    if (!this.head && !this.tail) {
        this.head = this.tail = item
        this.head.next = this.tail
        this.head.pre = null
        this.tail.pre = this.head
        this.tail.next = null
    } else {
        this.head.pre = item
        item.next = this.head
        this.head = item
        item.pre = null
    }

    this.size++
};

LRUCache.prototype.pop = function () {
    var item = this.tail
    if (item) {
        if (item.pre) {
            item.pre.next = null
        }
        this.tail = item.pre
        item.pre = null
        this.cache.delete(item.key)
    }
    return item
}
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
var cache = new LRUCache(2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
cache.get(2); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
cache.get(1); // 返回 -1 (未找到)
cache.get(3); // 返回  3
cache.get(4); // 返回  4 */

var cache = new LRUCache(2 /* 缓存容量 */ );
debugger
cache.get(2);
cache.put(2);
cache.put(2, 6);
cache.put(1);
cache.put(1, 5);
cache.put(1, 2);
cache.get(1);
cache.get(2);
