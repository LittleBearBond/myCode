//取出页面所有元素，统计页面元素个数，得到出现次数最多的-->new Set($$('*').map(e => e.tagName)).size
//字符串去重，拿到出现次数最多的

Function.prototype.show1 = function () {}
Object.prototype.show1 = function () {}

function Person(name) {}
var p = new Person('name');
//p能拿到show1 或show2 么，怎么能拿到
//p、Person怎么指到原型链终点的

Object.__proto__ === Function.prototype
Function.__proto__ === Function.prototype
Function.prototype

//两种写法区别
(function () {})()
(function () {})

//运行结果
(function () {
    console.log(1)
})()
(function () {
    console.log(2)
})()
//运行结果
(function () {
    console.log(1)
}())
(function () {
    console.log(2)
}())

//立即执行函数你知道有多少种写法
//函数调用用多少种
//手写jsonp
//手写promise

$.ajax({
    type: 'jsonp',
    url: ''
}).dnoe(function () {
    console.log(this)
})

function a() {};

a();

a.call();

a.apply();

a.bind()();

// function() { } ()
(function () {
    console.log(1)
})()

(new Function())();

new a()

function LazyMan(msg) {
    if (!(this instanceof LazyMan)) {
        return new LazyMan(msg);
    }
    this.tasks = [];
    if (msg) {
        this.log(`Hi! This is ${msg}`)
    }
    setTimeout(this.execute.bind(this));
    return this;
}

LazyMan.prototype = {
    constructor: LazyMan,
    execute: function (msg, time) {
        if (time) {
            msg && console.log(msg)
            time && console.log(`Wake up after ${time}`)
        }
        var item = this.tasks.shift();
        var that = this;
        while (item) {
            if (item.time === 0) {
                console.log(item.msg);
                item = this.tasks.shift();
            } else {
                setTimeout(function () {
                    that.execute(item.msg, item.time);
                }, item.time * 1000);
                break;
            }
        }
    },
    log: function (msg) {
        this.tasks.push({
            msg: msg,
            time: 0
        });
        return this;
    },
    sleepFirst: function (time) {
        this.tasks.unshift({
            time: time
        });
        return this;
    },
    sleep: function (time) {
        this.tasks.push({
            time: time
        });
        return this;
    },
    eat: function (food) {
        this.log(`Eat ${food}`)
        return this;
    }
}

function LazyMan(name) {
    if (!(this instanceof LazyMan)) {
        return new LazyMan(name);
    }
    this.tasks = [];
    var that = this;
    this.tasks.push((function (name) {
        return function () {
            console.log(`Hi! This is ${name}!`);
            that.next();
        }
    }(name)));
    setTimeout(function () {
        that.next();
    }, 0); // 在下一个事件循环启动任务
    return this;
}

LazyMan.prototype = {
    constructor: LazyMan,
    next: function () {
        var task = this.tasks.shift();
        task && task();
    },
    sleepFirst: function (time) {
        var that = this;
        this.tasks.unshift((function (time) {
            return function () {
                setTimeout(function () {
                    console.log(`Wake up after ${time}S`);
                    that.next();
                }, time * 1000)
            }
        }(time)));
        return this;
    },
    sleep: function (time) {
        var that = this;
        this.tasks.unshift((function (time) {
            return function () {
                setTimeout(function () {
                    console.log(`Wake up after ${time}S`);
                    that.next();
                }, time * 1000)
            }
        }(time)));
        return this;
    },
    eat: function (food) {
        var that = this;
        this.tasks.shift((function (food) {
            return function () {
                console.log(`Eat ${food}`);
                that.next();
            }
        }(food)));
        return this;
    }
}

function binarySearch(arr = [], num) {
    let right = arr.length - 1;
    let left = 0;
    while (left <= right) {
        let middle = ((right + left) / 2) | 0;
        let curr = arr[middle];
        if (num === curr) {
            return middle;
        }
        if (curr < num) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return -1;
}

//[1,5,4,2,7,9,1]
function sort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return;
    }
    var len = arr.length;
    var i = 0,
        j = 0,
        temp;
    for (; i < len; i++) {
        //每个的对比次数
        for (j = 1; j < len - 1 - i; j++) {
            if (arr[j] >= arr[j - 1]) {
                temp = arr[j - 1];
                arr[j - 1] = arr[j]
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function quickSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return arr;
    }
    var index = Math.floor(arr.length / 2);
    var item = arr.splice(index, 1)[0];
    var left = [],
        right = [],
        len = arr.length;
    while (len--) {
        (arr[len] < item ? left : right)['push'](arr[len]);
    }
    return quisckSort(left).concat(item, quisckSort(right));
}

function Animal(name) {
    this.name = name;
}

Animal.prototype.say = function () {
    console.log(this.name)
}

function extend(child, parent) {
    const Fn = function () {}
    Fn.prototype = parent.prototype;
    child.prototype = new Fn();
    // Object.assign(child.prototype, parent.prototype)
    child.prototype.constructor = child;
    child.user = parent.prototype;
}

function Dog(name, age) {
    Animal.apply(this, [...arguments])
    this.age = age
}
extend(Dog, Animal)

Dog.prototype.wang = function () {
    console.log(this.age)
}

var dog = new Dog('dog', 10)

dog.say()
dog.wang()