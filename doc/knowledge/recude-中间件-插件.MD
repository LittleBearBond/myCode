# Reduce、中间件、插件设计

<a name="Wxvk4"></a>
# reduce
[MDN介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

- 使用：[].reduce((acc, curr, index, src) => {}, initValue)
- 参数
  - **callback(acc, curr, index, src)**：回调函数(`必选`)
  - **initValue**：初始值(`可选`)
- 回调函数的参数
  1. Accumulator (acc) (累计器)
  1. Current Value (cur) (当前值)
  1. Current Index (idx) (当前索引)
  1. Source Array (src) (源数组)



<a name="4V4eT"></a>
## reduce 基本使用
<a name="9uKVd"></a>
### 实际用例
```javascript
['a', 'b', 'c'].reduce((acc, curr, index, src) => {
  console.log(acc, curr, index, src)
  return acc
}, 0);
```
运行结果
### 替代forEach
<a name="6B1CH"></a>
### 数组里所有值的和
```javascript
const sum = [0, 1, 2, 3].reduce((accumulator, currentValue)=> accumulator + currentValue, 0)
```
<a name="G9Bp8"></a>
### 累加对象数组里的值
```javascript
const sum = [{x: 1}, {x:2}, {x:3}].reduce((accumulator, {x})=> accumulator + x,initialValue)
```
<a name="51LRD"></a>
### 数组去重
```javascript
const arraySet = array => array.reduce((acc, curr) => {
    !acc.includes(curr) && acc.push(curr)
    return acc
}, [])
```
<a name="L60Wx"></a>
### 数组拉平
```javascript
const flat = arr => arr.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flat(curr) : curr), [])
```
<a name="GmLQa"></a>
### 对象拉平
```javascript
export const flattenObject = (obj: object, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    const curr = obj[k];
    if (Object.prototype.toString.call(curr) === '[object Object]') {
      Object.assign(acc, flattenObject(curr, pre + k));
    } else if (Array.isArray(curr)) {
      curr.forEach((val, index) => {
        const currKey = `${pre}${k}[${index}]`;
        if (typeof val === 'object') {
          Object.assign(acc, flattenObject(val, currKey));
        } else {
          acc[currKey] = val;
        }
      });
    } else {
      acc[pre + k] = curr;
    }
    return acc;
  }, {});
```
<a name="EUtpX"></a>
### _根据路径获取数据_
```javascript
/**
 * 根据路径获取数据
 * @param data 数据
 * @param key key值
 * @param returnUndefined key找不到对应值的时候返回当前层级的数据还是undefined
 */
export const getObjectByKey = (data: Record<string, any>, key: string, returnUndefined = false) =>
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
        return innerData && innerKey && innerKey in innerData
          ? innerData[innerKey]
          : returnUndefined
          ? undefined
          : innerData;
      } catch {
        return undefined;
      }
    }, data);
```
<a name="hBt8V"></a>
### **斐波那契数**
```javascript
function fn(n) {
    return [...Array(n)].reduce((acc, next, index) => acc.concat(index > 1 ? acc[index - 1] + acc[index - 1] : index), [])[n - 1];
}
```
<a name="Tqt7W"></a>
### 数组的子集
```javascript
const sub = arr => arr.reduce((acc, item) => acc.concat(acc.map(v => v.concat(item))), [[]])

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 const subsets = function(nums) {
	// const result = []
	// for (const n of nums) {
	// 	for (var i = 0, len = result.length; i < len; i++) {
	// // 前面的组合和最新这个元素再次组合
	// 		result.push([...result[i], n])
	// 	}
	// 	result.push([n])
	// }
	// result.push([])
	// return result

    const ret = [[]];
    const {length} = nums
    const dfs = function (start, arr = []) {
        for (let i = start; i < length; i++) {
            const curr = arr.slice()
            curr.push(nums[i])
            ret.push(curr)
            dfs(i + 1, curr)
        }
    }
    dfs(0)
    return ret
};
// 寻找规律，后面元素和前面元素集合的集合
//[]-->[]
//[1]-->[] | [1]
//[1,2]--> [] [1] | [2] [1,2]
//[1,2,3]--> [] [1] [2] [1,2] |  [3] [1,3] [2,3] [1,2,3]
```
<a name="Qqr5q"></a>
## 高级使用
<a name="IqQ3F"></a>
### 异步串行
```javascript
const pipeAsyncFunctions = (promises = [],initialValue) => promises.reduce((pro, curr) => pro.then(curr), Promise.resolve(initialValue))

// examples
const sum = pipeAsyncFunctions(
  x => x + 1,
  () => new Promise(resolve => setTimeout(resolve.bind(this, 10), 1000)),
  () => new Promise(resolve => setTimeout(resolve.bind(this, 20), 2000)),
  () => new Promise(resolve => setTimeout(resolve.bind(this, 30), 3000)),
  x => x + 3,
  async x => (await x) + 4
);

(async () => {
  console.log(await sum(5)); // 37 (after 6 second)
})();
```
<a name="3duo8"></a>
### pipeFunctions chainAsync
> 同步函数串行运行c(b(a())) 执行返回c 的返回值

```javascript
// [].concat(...args) 拉平一级数组
const pipeRightFunctions = (...args) => [].concat(...args).reduce((acc, next) => (...args) => next(acc(...args)));
const chainLeftAsync = (...args) => [].concat(...args).reduce((acc, next) => (...args) => acc(next(...args)))

// 执行的时候从左到右 a-->b-->c
// c(b(a()))
// ()=>c(()=>b(a(/*初始参数*/)))
const acc = (...args) => b(a(...args))
const fn = (...args) => c(acc(...args))
// pipeFunctions([a,b,c])(1,2) === fn(1,2)

// 执行的时候从右到左 c-->b-->a
// a(b(c(...args)))
// ()=> a(() => b(c()))
const acc = (...args) => a(b(...args))
const fn = (...args) => acc(c(...args))

/******************另外几种实现方式***********************/

// 1、用for 循环加上函数包裹来实现
function chainAsync(fns = []) {
  // fns.length ===0 ===1 需要特殊处理
  let chainFn = fns[0];
  for (let i = 1; i < fns.length; i++) {
    let pre = chainFn
    chainFn = (...args) => fns[i](pre(...args))
  }
  return function (...args) {
    return chainFn(...args)
  }
}

// 2、直接使用for循环,不使用函数包裹，方便理解
function chainAsync(...args) {
  args = [].concat(...args)
  return (...innerArgs)=>{
    let ret = innerArgs;
    for (let item of args ) {
      ret = item(...ret)
    }
    return ret
  }
}
// 3、reduce 简化实现,需要处理较多细节
const chainAsync = (...args) => (...innerArgs) => [].concat(...args).reduce((acc, fn) => fn.apply(null, [].concat(...[acc])), innerArgs)

// ❌
function chainAsync(fns = []) {
  const chainFn = fns[0];
  for (let i = 1; i < fns.length; i++) {
    // 死循环
    chainFn = (...args) => chainFn(fns[i](...args))
  }
  return chainFn
}
// ✔️✅ a(b(c(...args)))
function chainAsync(fns = []) {
  // fns.length ===0 ===1 需要特殊处理
  let chainFn = fns[0];
  for (let i = 1; i < fns.length; i++) {
    let pre = chainFn
    chainFn = (...args) => pre(fns[i](...args))
  }
  return function (...args) {
    return chainFn(...args)
  }
}

// examples
const add = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions([multiply, add]);
multiplyAndAdd(5, 2);
// pipeFunctions([a,b,c])(123)==> "a" 123  -> "b" "a"  -> "c" "b"  ->  return "c"

```
<a name="r8m2i"></a>
### compose chainAsync [composeRight](https://www.30secondsofcode.org/js/s/compose-right/)
> 函数包裹 a(b(c(...args))) 执行结果返回a的返回值

```javascript
// examples
function a(...args){
	console.log('a',...args)
  return [...args,'a']
}
function b(...args){
	console.log('b',...args)
  return [...args,'b']
}
function c(...args){
	console.log('c',...args)
  return [...args,'c']
}
chainAsync(a,b,c)(1,2,3)

```
<a name="9Ds9a"></a>
### chainAsyncNext
```javascript
const chainAsync = fns => {
  let curr = 0;
  const last = fns[fns.length - 1];
  // 实现技巧类似KOA 中间件
  const next = (...args) => {
    const fn = fns[curr++];
    fn === last ? fn(...args) : fn(next);
  };
  next();
};

chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(()=>next(), 3000);
  },
  next => {
    console.log('3 second');
    setTimeout(()=>next(), 2000);
  },
  () => {
    console.log('5 second');
  }
]);
```
<a name="J6pqn"></a>
## 各种专业术语
> **过滤器、拦截器、中间件、插件、责任链**
> **AOP（Aspect-Oriented Programming 面向切面编程）：层逻辑解耦、对原有代码无入侵性、职责分明、降低了代码的复杂程度、提高代码重用性、后端一般使用动态代理来实现**
> **IOC: **[https://mp.weixin.qq.com/s/ApAK6MrXIDud4Nfj89tEYQ](https://mp.weixin.qq.com/s/ApAK6MrXIDud4Nfj89tEYQ) 、 [从 VSCode 看大型 IDE 技术架构](https://zhuanlan.zhihu.com/p/96041706)

<a name="hbPQS"></a>
### redux 中间件
> [https://github.com/reduxjs/redux/blob/master/src/compose.ts](https://github.com/reduxjs/redux/blob/master/src/compose.ts)

```javascript
export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
}

const logger = store => next => action => {
  console.log("dispatching", action);
  let result = next(action); //next为下一个dispatch；
  console.log("next state", store.getState());
  return result;
};

// https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.ts#L74
// 所有middlewares 调用一次传递进去getState和dispatch，中间件里面能拿到getState和dispatch
const chain = middlewares.map(middleware => middleware(middlewareAPI))

// dispatch = f1(f2(f3(store.dispatch))))，一层包一层，这是洋葱模型，直到最后拿到根上的store.dispatch
// next(action) 最终会调用到store.dispatch(action)
dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

// redux-thunk
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
      //可以接受一个返回函数的action creator。如果这个action creator 返回的是一个函数，就将dispatch的决策权交给此函数，如果不是，就按照原来的next(action)执行。
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);//这就是上面例子的函数为啥接受dispatch和getState两个参数的原因
    }
    return next(action);
  };
}

```
[https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.ts](https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.ts)
<a name="iTSPR"></a>
### koa compose
>
> [https://github.com/koajs/compose/blob/master/index.js](https://github.com/koajs/compose/blob/master/index.js)

```javascript
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
<a name="PfIfp"></a>
### test compose
```javascript
const sleep = time => new Promise((resolve) => setTimeout(resolve, time))
const fn1 = async (context, next) => {
  console.log('fn1 start', context)
  await sleep(1000)
  await next()
  console.log('fn1 end')
}
const fn2 = async (context, next) => {
  console.log('fn2 start', context)
  await sleep(1000)
  await next()
  console.log('fn2 end')
}
const fn3 = async (context, next) => {
  console.log('fn3 start', context)
  await sleep(1000)
  await next()
  console.log('fn3 end')
}
compose([fn1, fn2, fn3])(1234)
```
<a name="59Nyg"></a>
### [umi-request](https://github.com/umijs/umi-request) vs axios vs  jq ajax
> **jq ajax 只能单个全局配置、单个实例配置、beforeSend 、全局filter**
> **axios 有拦截器、全局单个transformRequest、transformResponse**
> **umi-request 拦截器、中间件**
> **拦截器、插件、中间件、组件**
> [https://github.com/umijs/umi-request/blob/master/src/onion/compose.js](https://github.com/umijs/umi-request/blob/master/src/onion/compose.js)
> [https://github.com/umijs/umi-request/blob/master/src/core.js#L89](https://github.com/umijs/umi-request/blob/master/src/core.js#L89)
> 缓存：内置MapCache 缓存 LRU实现，缓存上限大小控制，过期时间控制
> 中间件执行顺序：instanceA1 -> instanceB1 -> globalA1 -> coreA1 -> coreA2 -> globalA2 -> instanceB2 -> instanceA2

```javascript
// 返回一个组合了所有插件的“插件”

export default function compose(middlewares) {
  if (!Array.isArray(middlewares)) throw new TypeError('Middlewares must be an array!');

  const middlewaresLen = middlewares.length;
  for (let i = 0; i < middlewaresLen; i++) {
    if (typeof middlewares[i] !== 'function') {
      throw new TypeError('Middleware must be componsed of function');
    }
  }
  return function wrapMiddlewares(params, next) {
    let index = -1;
    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() should not be called multiple times in one middleware!'));
      }
      index = i;
      const fn = middlewares[i] || next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(params, () => dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  };
}
```
<a name="H2Qau"></a>
## UMI 插件

- 插件API:[https://umijs.org/plugins/api](https://umijs.org/plugins/api)
- 2.5.x 版本插件实现：
  - [https://github.com/umijs/umi/blob/2.5.x/packages/umi-build-dev/src/PluginAPI.js#L200](https://github.com/umijs/umi/blob/2.5.x/packages/umi-build-dev/src/PluginAPI.js#L200)
  - [https://github.com/umijs/umi/blob/2.5.x/packages/umi-build-dev/src/Service.js#L200](https://github.com/umijs/umi/blob/2.5.x/packages/umi-build-dev/src/Service.js#L200)
- 3.x 插件实现：
  - [https://github.com/umijs/umi/blob/master/packages/core/src/Service/Service.ts#L466](https://github.com/umijs/umi/blob/master/packages/core/src/Service/Service.ts#L466)
  - [https://github.com/umijs/umi/blob/master/packages/core/src/Service/PluginAPI.ts#L122](https://github.com/umijs/umi/blob/master/packages/core/src/Service/PluginAPI.ts#L122)
- hook 执行的部分切换为 [tapable](https://github.com/webpack/tapable): [https://github.com/umijs/umi/blob/master/memo/packages/core.md](https://github.com/umijs/umi/blob/master/memo/packages/core.md)
<a name="JHHLd"></a>
### G6-Editor 插件
[https://code.alipay.com/bankprod/yitian-assets/blob/sprint_yitian-assets_S911113763_20200305/src/page/ServiceEditor/G6Container/utils/registerCommand/index.ts](https://code.alipay.com/bankprod/yitian-assets/blob/sprint_yitian-assets_S911113763_20200305/src/page/ServiceEditor/G6Container/utils/registerCommand/index.ts)<br />[https://code.alipay.com/bankprod/yitian-assets/blob/sprint_yitian-assets_S911113763_20200305/src/page/ServiceEditor/G6Container/utils/registerEvents/index.ts](https://code.alipay.com/bankprod/yitian-assets/blob/sprint_yitian-assets_S911113763_20200305/src/page/ServiceEditor/G6Container/utils/registerEvents/index.ts)
<a name="3sbFB"></a>
## Tapable

- [https://github.com/webpack/tapable/tree/tapable-1](https://github.com/webpack/tapable/tree/tapable-1)
- 类型
  - 普通型
  - 瀑布流水型
  - 熔断
  - Loop
- 执行
  - 同步
    - 普通型 事件发布订阅
      - **hooks.forEach(_fn_=>fn(...args))**
    - 瀑布型，第一个函数执行结果传递给第二个，第二个执行结果传递给三个
      - **hooks.slice(1).reduce((_ret_, _curr_) => curr(_ret_) , hooks[0](..._args_))**
    - 熔断型，中间有一个返回true，就熔断
      -  **hooks.some(_fn_=>fn(...args))**
    - **Loop **只要返回结果不为undefined 就一直调用
      - **while (index < hooks.length) {**

**     const ret = hooks[index](...param);**<br />**          if (ret === undefined) {**<br />**            index++;**<br />**      }**<br />**}**

  - 异步
    - 并行
      - 并行
        - Promise.all(hooks.map(_fn_ => fn(...args)))，也可自行计数实现
      - 有返回结果为true 跳到最后
        - Promise.all(hooks.map(_fn_ => new Promise((_reslove_, _reject_) => { fn(...args).then(() => {_/**判断返回值 */_ }, () => { }) }))).catch()
    - 串行
      - 串行执行
        - reduce
      - 熔断
        - reduce，包裹单个hook，有异常熔断
      - 瀑布型， 前一个执行结果传递给后一个
- 动态拼接函数字符串，使用new Function 运行，把fn进行缓存，目的就是将递归代码非递归化，能减少内存的消耗
- [https://juejin.im/post/5c12046af265da612b1377aa#heading-12](https://juejin.im/post/5c12046af265da612b1377aa#heading-12)
<a name="D93KF"></a>
## vscode 插件
[https://github.com/LittleBearBond/vscode-generator-author/blob/master/src/extension.ts](https://github.com/LittleBearBond/vscode-generator-author/blob/master/src/extension.ts)<br />git diff、缓存文件过多<br />[https://code.visualstudio.com/blogs/2017/02/08/syntax-highlighting-optimizations](https://code.visualstudio.com/blogs/2017/02/08/syntax-highlighting-optimizations)
<a name="4MENr"></a>
## Webpack

- 内部 100+ 钩子
- Compiler: [https://github.com/webpack/webpack/blob/master/lib/Compiler.js](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)
- Compilation: [https://github.com/webpack/webpack/blob/master/lib/Compilation.js](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)



