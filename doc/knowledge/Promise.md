# Promise

## 面试题

[关于 ES6 中 Promise 的面试题](https://segmentfault.com/a/1190000016848192)

## 自己实现一个Promsie

[Promise.js](../../algorithm/Promise.js)

[8张图帮你一步步看清 async/await 和 promise 的执行顺序](http://web.jobbole.com/95515/)
[JavaScript 运行机制--Event Loop详解](https://juejin.im/post/5aab2d896fb9a028b86dc2fd)
[JavaScript 运行机制--Event Loop 运行机制](https://juejin.im/post/5b67108e5188251aa30c8811)

### testcase

```js
async function testSometing() {
    console.log("执行testSometing");
    return "testSometing";
}
async function testAsync() {
    console.log("执行testAsync");
    return Promise.resolve("hello async");
}
async function test() {
    console.log("test start...");
    const v1 = await testSometing();
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
}
test();
var promise = new Promise((resolve) => {
    console.log("promise start..");
    resolve("promise");
});//3
promise.then((val) => console.log(val));
console.log("test end...")
/*
test start...
执行testSometing
promise start..
test end...
promise
testSometing
执行testAsync
hello async
testSometing hello async
*/
```
