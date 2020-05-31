# 手写代码

[](https://juejin.im/post/5cef46226fb9a07eaf2b7516)

## 函数节流、防抖

``` js
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
    return function(...arg) {
        const run = function() {
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

``` js
const arr = [1, [3, 6],
    [7, [8, 9], 20, 26], 18
]
// 1
String(arr).split(',')
// 2
JSON.stringify(arr).replace(/\[|]/g, '').split(',')
// 3
const flat = arr => arr.reduce((pre, curr) => pre.concat(Array.isArray(curr) ? flat(curr) : curr), [])
// 4
const flat = arr => [].concat(...arr.map(v => Array.isArray(v) ? flat(v) : v))
// 5
const flat = function(arr) {
    const inner = function*(arr) {
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
// 6
const flat = function(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
// 7 es10 自带api
arr.flat(Number.MAX_VALUE)
```

### flattenObject

``` js
export const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    const curr = obj[k]
    if (Object.prototype.toString.call(curr) === '[object Object]') {
      Object.assign(acc, flattenObject(curr, pre + k));
    } else if (Array.isArray(curr)) {
      curr.forEach((val, index) => {
        const currKey = `${pre}${k}[${index}]`
        if (typeof val === 'object') {
          Object.assign(acc, flattenObject(val, currKey));
        } else {
          acc[currKey] = val;
        }
      })
    } else {
      acc[pre + k] = curr;
    }
    return acc;
  }, {});
flattenObject({
    a: {
        b: {
            c: 1
        }
    },
    d: 1
}); // { 'a.b.c': 1, d: 1 }

/*
var aa ={
  "a": {
    "bb": {
      "cc": 1
    },
    "c": 1
  },
  "b": {
    "bb": {
      "cc": 1
    }
  },
  "c": {
    "bb": {
      "cc": 1
    }
  },
  "d": 1,
  "e": [
    1,
    2
  ],
  "f": [
    {
      "ff": 1
    },
    [
      1,
      2
    ]
  ]
}

{
  "a.bb.cc": 1,
  "a.c": 1,
  "b.bb.cc": 1,
  "c.bb.cc": 1,
  "d": 1,
  "e[0]": 1,
  "e[1]": 2,
  "f[0].ff": 1,
  "f[1].0": 1,
  "f[1].1": 2
}
 */
```

### getObjectByKey

``` js
// var obj = {a:{b:1}}   getObjectByKey(obj,'a.b')==>1
// var obj = {a:{b:[0,{c:1}]}}   getObjectByKey(obj,'a.b.[1].c')==>1
export const getObjectByKey = (data, key) =>
  key
    .replace(/([\w])(\[)/gi, '$1.[')
    .split('.')
    .reduce((innerData, innerKey) => {
      const match = innerKey.match(/\[(\d+)\]/);
      if (match) {
        // eslint-disable-next-line no-bitwise
        return innerData[match[1] | 0];
      }
      try {
        // 执行 innerKey in innerData 可能会报错
        return innerData && innerKey && innerKey in innerData ? innerData[innerKey] : innerData;
      } catch {
        return undefined
      }
    }, data);
```

### setObjectByKey

```js
export const setObjectByKey = (data, key, value) => {
  let currData = data;
  // 'c.f[0].h' ==>'c.f.[0].h'
  const keys = key.replace(/(\w+)(\[\d+\])/gi, (all, $1, $2) => `${$1}.${$2}`).split('.');
  const { length } = keys;
  let index = 0;
  for (let oneKey of keys) {
    // [0] [1]
    const match = oneKey.match(/\[(\d+)\]/);
    if (match && match.length) {
      // eslint-disable-next-line prefer-destructuring
      oneKey = match[1];
    }
    if (index === length - 1) {
      currData[oneKey] = value;
      break;
    }
    currData = currData[oneKey];
    if (!currData) {
      break;
      // throw new Error(`${key} is error , ${oneKey} val is null`);
    }
    index += 1;
  }
  return data;
};
```

## toCamelCaseVar

```js
const toCamelCaseVar = (variable) => {
  variable = variable.replace(/[\_|-](\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
  return variable.slice(0, 1).toLowerCase() + variable.slice(1)
 }

console.log(toCamelCaseVar('Foo_style_css')) // fooStyleCss
console.log(toCamelCaseVar('Foo-style-css')) // fooStyleCss
```

## 数组去重

``` js
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

``` js
Array(100).fill().map((_, i) => i + 1);

[...Array(100).keys()]

Array.from({
    length: 100
}, (_, i) => i)
```

## 获取两个数组的差集 const a =[1,2,3] const b = [3,4,5] ==>差集[1,2,4,5]

## 模拟bind实现

``` js
// 简单实现，没管原型
Function.prototype.bind = function(...args) {
    const that = this
    const fn = args.shift();
    return function(...arg) {
        return that.apply(fn, [...args, ...arg])
    };
};

Function.prototype.bind = function(...args) {
    if (typeof this !== 'function') {
        throw new TypeError('not function');
    }
    const that = this
    const toThis = args.shift();
    const fn = function() {}
    const bindFn = function(...arg) {
        return that.apply(this instanceof fn ? this : toThis, [...args, ...arg])
    };
    fn.prototype = Object.create(this.prototype)
    bindFn.prototype = new fn()
    return bindFn
};
```

## 发布订阅模式

``` js
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

``` js
const handle = function(...args) {
    const fn = args.shift()
    const obj = Object.create(fn.prototype)
    const o = fn.apply(obj, args)
    return typeof o === 'object' ? o : obj;
}
```

## 字符串去重，并且找出出现字符最多的字符以及次数

``` js
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

``` js
`aaaabbbccccaaaa` .replace(/(\w)\1+/g, '$1')
```

## 找出一个html页面使用的所有html元素标签名

``` js
[...new Set([...document.all].map(h => h.tagName))]
```

## 连表反转

``` js
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

``` js
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
            arr.push( `${key}=${val}` )
            return arr;
        }, []).join('&')
        url += `${url.includes('?') ? ` & ` : ` ? `}${callbackKeyName}=${cbName}&${dataToStr}`
        const el = createScript(url)
        el.onerror = (error) => {
            destory()
            reject(error)
        }
        const destory = function() {
            el.parentNode.removeChild(el)
            delete window[cbName]
        }
        window[cbName] = function(data) {
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

``` js
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

## 函数柯里化

``` js
// 1
function currying(func) {
    const args = []
    return function ret(...rest) {
        if (rest.length === 0) {
            return func(...args)
        }
        args.push(...rest)
        return ret
    }
}
// 2
function currying(fn, length) {
    length = length || fn.length
    return function ret(...args) {
        ret.length >= length ?
            fn(...args) :
            (...arg) => ret(...args, ...arg)
    }
}
```

## Promise all的实现

``` js
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
            (function(i) {
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

``` js
function getUrlData(url) {
    let match = (url || window.location.search).match(/\?(.*)/)
    const ret = {};
    match = match && match[1];
    if (!match) {
        return ret;
    }
    let strKey, strVal;
    return match.split('&').reduce((ret, str) => {
        const [key, val] = str.split('=');
        strKey = decodeURIComponent(key);
        strVal = val === 'null' || val == null ? '' : decodeURIComponent(val);
        strKey && (ret[strKey] = strVal);
        return ret
    }, ret);
}
```

## 设置URL参数

```js
 function setUrlParam(name, value, url) {
    url = url || window.location.href;
    var re = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "ig"),
        m = url.match(re),
        endsWith = function(target, str, ignorecase) {
            var end_str = target.substring(target.length - str.length);
            return ignorecase ? end_str.toLowerCase() === str.toLowerCase() :
                end_str === str;
        };
    if (m) {
        return (url.replace(re, function($0, $1, $2, $3) {
            if (!value) {
                return $1 == '?' ? $1 : $3; //return ''; 20130910 xj 修正
            } else {
                return ($0.replace($2, value));
            }
        }));
    }
    if (!value) {
        return url;
    }
    if (!~url.indexOf('?')) {
        return (url + '?' + name + '=' + value);
    }
    if (endsWith(url, '?')) {
        return (url + name + '=' + value);
    }
    return endsWith(url, '&') ? (url + name + '=' + value) : (url + '&' + name + '=' + value);
},
```

## 斐波那契数 四种实现方法

``` js
function fn(n) {
    if (n === 0) {
        return 0
    }
    if (n === 1 || n === 2) {
        return 1
    }
    return fn(n - 1) + fn(n - 2)
}

const fn = (function() {
    const temp = {
        0: 0,
        1: 1
    };
    return function fib(n) {
        if (!(n in temp)) {
            temp[n] = fib(n - 1) + fib(n - 2);
        }
        return temp[n];
    }
}())

function fnDp(n) {
    let current = 0;
    let next = 1;
    for (let i = 0; i < n; i++) {
        [current, next] = [next, current + next];
    }
    return current;
}

function fn(n) {
    return [...Array(n)].reduce((pre, next, index) => pre.concat(index > 1 ? pre[index - 1] + pre[index - 1] : index), [])[n - 1];
}
```

## 实现一个函数，可以按顺序获取到一个DOM节点下面所有的文本

``` js
// 递归
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
// 非递归
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

``` js
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

## Browser Dom

[参考地址](https://github.com/30-seconds/30-seconds-of-code#chunk)

### copyToClipboard

``` js
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};
```

### counter

``` js
const counter = (selector, start, end, step = 1, duration = 2000) => {
    let current = start
    let _step = (end - start) * step < 0 ? -step : step
    let el = document.querySelector(selector)
    let timer = setInterval(() => {
        current += _step;
        el.innerHTML = current;
        if (current >= end) {
            el.innerHTML = end;
            clearInterval(timer);
            el = null
        }
    }, Math.abs(Math.floor(duration / (end - start))));
    return timer;
};
```

### elementContains

``` js
const elContains = (parent, child) => parent !== child && parent.contais(child)
```

### elementIsVisibleInViewport

``` js
const elementIsVisiableViewport = (el, isfullVisiavle = false) => {
    const {
        left,
        right,
        top,
        bottom
    } = el.getBoundingClientRect();
    const {
        innerHeight,
        innerWidth
    } = window
    return isfullVisiavle ? top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth :
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) &&
        ((top > 0 && top < innerHeight) || bottom > 0 && bottom < innerHeight)
}
```

### getScrollPosition

``` js
const getScrollPosition = (el = window) => ({
    left: pageXOffset || el.scrollLeft,
    top: pageYOffset || el.scrollTop,
})
```

### hasClass

``` js
const hasClass = (el, className) => el.classList.contains(className);
```

### insertAfter

``` js
// el.insertAdjacentHTML
const insertAfter = (el, htmlString) => el.insertAdjacentHTML('afterend', htmlString);
```

### event on delegate

``` js
function on(el, type, fn, {
    target = null,
    useCapture = false
} = {}) {
    const delegateFn = opts.target ? (e) => el.matches(e.target) && fn.call(e.target) : fn
    el.addEventListener(type, delegateFn, useCapture)
    return delegateFn
}
```

### recordAnimationFrames

``` js
const recordAnimationFrames = (callback, isAutoStart = false) => {
    let running = false
    let anf
    const stop = () => {
        cancelAnimationFrame(anf)
        running = false
    }
    const stop = () => {
        run()
        running = true
    }
    const run = () => {
        if (!running) {
            return
        }
        anf = requestAnimationFrame(() => {
            callback();
            running && run();
        });
    }
    return {
        start,
        stop
    }
}
```

### scrollToTop

``` js
const scrollToTop = (time = .3) => {
    let runTime = time < 100 ? time *= 1000 : time;
    const st = pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    let startTime = Number(new Date());
    (function run() {
        requestAnimationFrame(() => {
            let disTime = Number(new Date()) - startTime;
            if (disTime > runTime) {
                window.scrollTo(0, 0)
                return;
            }
            window.scrollTo(0, st * (runTime - disTime) / runTime)
            run()
        })
    }())
}
```

### setStyle

``` js
const setStyle = (el, ruleName, val) => Object.assign(el.style, typeof ruleName === 'object' ? ruleName : {
    [ruleName]: val
})
```

### scrollIntoView

``` js
const smoothScroll = element =>
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });

// 这个可以和scrollToTop 设计成一个通用方法，详见项目scrollAnimation
```

### chainAsync

``` js
const chainAsync = fns => {
    const lastFn = fns[fns.length - 1];
    let i = 0;
    let fn;
    (function next() {
        fn = fns[i++]
        fn === lastFn ? lastFn() : fn(next);
    }())
}
```

### compose

``` js
const chainAsync = fns => {
    return fns.reduce((pre, next) => {
        return (...args) => pre(next(...args))
    });
}
const chainAsync = fns => {
    fns.reduce((pre, next) => (...args) => pre(next(...args)))
}
```

### composeRight

``` js
const chainAsync = fns => {
    return fns.reduce((pre, next) => {
        return (...args) => next(pre(...args))
    });
}
```

### runPromisesInSeries

``` js
const runPromisesInSeries = promises => promises.reduce((p, next) => p.then(next), Promise.resolve());
```

## Math

### distance

[Math.hypot](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot)

``` js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
```

