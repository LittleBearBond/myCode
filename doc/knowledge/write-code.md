# 手写代码

## 函数节流、防抖

```js
function debounce(fn, time, ...args) {
    const that = this
    let timer = null;
    const debounced = (...arg) => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(that, [...args, ...arg])
            timer = null
        }, time)
    }
    debounced.cancel = () => {
        clearTimeout(timer);
        timer = null;
    };
    return debounced
}

function throttle(fn, time, ...args) {
    const that = this
    let isFirstTime = true
    let lastTime
    let timer
    return function (...arg) {
        const run = function () {
            fn.apply(that, [...args, ...arg])
            lastTime = Number(new Date())
            timer = null
        }
        if (isFirstTime) {
            run()
            isFirstTime = false
            return;
        }
        if (Number(new Date()) - lastTime < time) {
            clearTimeout(timer)
            // 保证在当前时间区间结束后，再执行一次 fn
            timer = setTimeout(run, time)
            return;
        }
        run()
    }
}
```

## 扁平化嵌套数组/flat实现

```js
const arr = [1,[3,6],[7,[8,9],20,26],18]
// 1
String(arr).split(',')
// 2
JSON.stringify(arr).replace(/\[|]/g,'').split(',')
// 3
const flat = arr => arr.reduce((pre, curr) => pre.concat(Array.isArray(curr) ? flat(curr): curr), [])
// 4
const flat = arr => [].concat(...arr.map(v=>Array.isArray(v) ? flat(v): v))
// 5
const flat = function (arr) {
    var inner = function* (arr) {
        for (const v of arr) {
            if (Array.isArray(v)) {
                yield* inner(v)
            } else {
                yield v
            }
        }
    }
    return [...inner(arr)]
}
```

## 数组去重

```js
var arr = [1, 2, 1, 3, 4, 5, 4, 3]
// 1
[...new Set(arr)]
// 2
const handle = array => array.reduce((pre, curr) => {
    !pre.includes(curr) && accumulator.push(curr)
    return pre
}, [])
// 3
const handle = array => {
    const map = new Map()
    return array.filter(item => map.has(item) ? false : map.set(item))
}
```

## 模拟bind实现

```js
Function.prototype.bind = function (...args) {
    const that = this
    const fn = args.shift();
    return function (...arg) {
        return that.apply(fn, [...args, ...arg])
    };
};
```

## 发布订阅模式

```js
class Observer {
    constructor() {
        this.events = {}
    }
    one(name, fn, ...args) {
        this.remove(name).on.apply(this, [name, fn, ...args])
    }
    on(name, fn = () => {}, ...args) {
        if (!(name in this.events)) {
            this.events[name] = []
        }
        this.events[name].push({
            fn,
            args
        })
        return this;
    }
    fire(name, ...args) {
        if (!(name in this.events)) {
            return this;
        }
        for (const item of this.events[name]) {
            let ret = item.fn(...[...args, ...item.args])
            if (ret === false) {
                break;
            }
        }
        return this;
    }
    remove(name, fn) {
        if (!fn) {
            if ((name in this.events)) {
                this.events[name].length = 0;
            }
            return
        }
        for (const [index, {
                fn
            }] of this.events[name].entries()) {
            if (fn === fn) {
                this.events[name].splice(index, 1)
                break
            }
        }
        return this;
    }
}
```

## 模拟New实现

```js
const handle = function (...args) {
    const fn = args.shift()
    const obj = Object.create(fn.prototype)
    const o = fn.apply(obj, args)
    return typeof o === 'object' ? o : obj;
}
```

## 字符串去重，并且找出出现字符最多的字符以及次数

```js
function strUnique(str) {
    const cache = {}
    let mostStr, mostNum = 0,
        arr = []
    for (const s of str) {
        if (s in cache) {
            cache[s]++
                if (cache[s] > mostNum) {
                    mostNum = cache[s]
                    mostStr = s
                }
            continue;
        }
        arr.push(s)
        cache[s] = 1
    }
    console.log(mostStr, mostNum, arr.join(''))
}
```

## 找出一个html页面使用的所有html元素标签名

```js
[...new Set([...document.all].map(h => h.tagName))]
```

## 连表反转

```js
// 这个都算不上算法
function reverse(head) {
    let pre = null
    let next
    while (head) {
        next = head.next
        head.pre = pre
        pre = head
        head = next
    }
}
```