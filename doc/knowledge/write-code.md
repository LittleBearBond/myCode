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
    const inner = function* (arr) {
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
const arr = [1, 2, 1, 3, 4, 5, 4, 3]
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

## 不用循环，创建一个长度为 100 的数组，并且每个元素的值等于它的下标

```js
Array(100).fill().map((_,i)=>i+1);

[...Array(100).keys()]

Array.from({length:100},(_,i)=>i)
```

## 模拟bind实现

```js
// 简单实现，没管原型
Function.prototype.bind = function (...args) {
    const that = this
    const fn = args.shift();
    return function (...arg) {
        return that.apply(fn, [...args, ...arg])
    };
};

Function.prototype.bind = function (...args) {
    if (typeof this !== 'function') {
        throw new TypeError('not function');
    }
    const that = this
    const toThis = args.shift();
    const fn = function () {}
    const bindFn = function (...arg) {
        return that.apply(this instanceof fn ? this : toThis, [...args, ...arg])
    };
    fn.prototype = Object.create(this.prototype)
    bindFn.prototype = new fn()
    return bindFn
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
    let mostStr,
        num = 0,
        arr = []
    for (const s of str) {
        if (s in cache) {
            cache[s]++
                if (cache[s] > num) {
                    num = cache[s]
                    mostStr = s
                }
            continue;
        }
        arr.push(s)
        cache[s] = 1
    }
    console.log(mostStr, num, arr.join(''))
}
```

## 连续字符串去重使用正则

```js
`aaaabbbccccaaaa`.replace(/(\w)\1+/g,'$1')
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

## 手写jsonp

```js
function createScript(url) {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', url)
    script.async = true
    return script
}

function jsonp({
    url,
    callbackKeyName = 'callback',
    data = {}
} = {}) {
    return new Promise((resolve, reject) => {
        const cbName = 'jsonpcallback' + jsonp.index++
        const dataToStr = Object.entries(data).reduce((arr, [key, val]) => {
            arr.push(`${key}=${val}`)
            return arr;
        }, []).join('&')
        url += `${url.includes('?') ? `&` : `?`}${callbackKeyName}=${cbName}&${dataToStr}`
        const el = createScript(url)
        el.onerror = (error) => {
            destory()
            reject(error)
        }
        const destory = function () {
            el.parentNode.removeChild(el)
            delete window[cbName]
        }
        window[cbName] = function (data) {
            try {
                resolve(data)
            } finally {
                destory()
            }
        };
        (document.head || document.getElementsByTagName('head')[0]).appendChild(el)
    })
}
jsonp.index = 0
```

## 对象的深拷贝

```js
function deepCopy(target) {
    const extendObj = Array.isArray(target) ? [] : {}
    if (Array.isArray(target)) {
        for (const val of target) {
            if (typeof val !== 'object') {
                extendObj.push(val)
            } else if (val != target) {
                extendObj.push(deepCopy(val))
            }
        }
    } else {
        for (const [key, val] of Object.entries(target)) {
            if (typeof val !== 'object') {
                extendObj[key] = val
            } else if (val != target) {
                extendObj[key] = deepCopy(val)
            }
        }
    }
    return extendObj
}
```

## Promise all的实现

```js
function promiseAll(promise = []) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promise) || !promise.length) {
            return reject(new Error('arguments error'));
        }
        const {
            length
        } = promise
        let promiseCounter = 0
        const result = new Array(length)
        for (const [index, pro] of promise.entries()) {
            (function (i) {
                Promise.resolve(pro).then(res => {
                    result[i] = res
                    promiseCounter++
                    if (promiseCounter === length) {
                        resolve(result)
                    }
                }, error => {
                    resolve(error)
                })
            }(index))
        }
    })
}
Promise.all = promiseAll
```

## Promise 的实现

    代码太长不贴了

## 获取 url 中的参数

```js
function getUrlData(url) {
    let match = (url || window.location.search).match(/\?(.*)/)
    const objData = {};
    match = match && match[1];
    if (!match) {
        return objData;
    }
    match = match.split('&');
    let strKey;
    let strVal;
    match.forEach(function (str) {
        let val = str.split('=');
        strKey = decodeURIComponent(val[0]);
        strVal = val[1] === 'null' || val[1] == null ? '' : decodeURIComponent(val[1]);
        strKey && (objData[strKey] = strVal);
    });
    return objData;
}
```

## 斐波那契数

```js
function fn(n) {
    if (n === 0) {
        return 0
    }
    if (n === 1 || n === 2) {
        return 1
    }
    return fn(n - 1) + fn(n - 2)
}
```

## 实现一个函数，可以按顺序获取到一个DOM节点下面所有的文本

```js
function getInnerText(el, arrText = []) {
    if (!el.childNodes.length) {
        return arrText
    }
    for (const child of [...el.childNodes]) {
        if (child.childNodes.length) {
            getInnerText(child, arrText)
        } else {
            child.textContent && arrText.push(child.textContent)
        }
    }
    return arrText
}

function getInnerText(el) {
    const arrText = []
    const list = [el]
    while (list.length) {
        var child = list.shift()
        if (child.childNodes.length) {
            list.unshift(...child.childNodes)
        } else {
            child.textContent && arrText.push(child.textContent)
        }
    }
    return arrText
}
```

## 继承

```js
// babel 的实现
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    // 静态方法
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
```

## 其他算法

    算法就太多了，主要靠自己去刷题，以下算法基本上是我还记得的，我或者同事在面试前端岗位的时候碰到过的

    二分查找、快速排序、字符串全排列、从数组中取出n个数和为目的所有数的组合、树的几种遍历方式、查找第K大个数、判断一个单词是否是回文、背包问题
