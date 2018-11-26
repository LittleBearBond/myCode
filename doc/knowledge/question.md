# 面试题笔记（自我感觉)

    闲逛知乎突然看到一个 [p面试题汇总](https://zhuanlan.zhihu.com/p/48827292)，突然好久不学习都落伍了，好多东西之前都研究过，突然看到竟然不能完整想起来

## 第一段

* 使用过的koa2中间件
* koa-body原理
* 介绍自己写过的中间件
* 有没有涉及到Cluster
* 介绍pm2
* master挂了的话pm2怎么处理
* 如何和MySQL进行通信
* React声明周期及自己的理解
* 如何配置React-Router
* 路由的动态加载模块
* 服务端渲染SSR
* 介绍路由的history
* 介绍Redux数据流的流程
* Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理
* 多个组件之间如何拆分各自的state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块
* 使用过的Redux中间件
* 如何解决跨域的问题
* 常见Http请求头
* 移动端适配1px的问题
* 介绍flex布局
* 其他css方式设置垂直居中
* 居中为什么要使用transform（为什么不使用marginLeft/Top）
* 使用过webpack里面哪些plugin和loader
* webpack里面的插件是怎么实现的
* dev-server是怎么跑起来
* 项目优化
* 抽取公共文件是怎么配置的
* 项目中如何处理安全问题
* 怎么实现this对象的深拷贝

### 使用过的koa2中间件

koa-router、koa-logger、koa-json、koa-onerror、koa-ejs、koa-views、koa-bodyparser、koa-session
koa1、koa2两者实现原理各部相同，koa2使用async await实现上更为简洁，如果在koa2中中间件依然使用generator函数会报警告，但是内部还是支持的，内部调用koa-convert进行转换。中间件实现核心代码

```js
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
        // 最核心就一行
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

### koa-body原理

内部调用判断需要处理哪些types， formTypes,jsonTypes,textTypes 然后调用co-body进行处理，co-body 调用 type-is 进行请求数据类型判断，判断主要根据content-type，建源码 **var value = req.headers['content-type']**

```js
 var jsonType = opts.jsonTypes || jsonTypes;
  if (typeis(req, jsonType)) return json(req, opts);

  // form
  var formType = opts.formTypes || formTypes;
  if (typeis(req, formType)) return form(req, opts);

  // text
  var textType = opts.textTypes || textTypes;
  if (typeis(req, textType)) return text(req, opts);
```

* 根据不同的数据类型做不同的处理，内部都是调用**raw(inflate(req), opts)** 获取到请求的数据再做对应转换。

* inflate做content-encoding判断，做Unzip处理，raw方法是得到请求body里面的数据,然后调用会掉函数done,把拿到的数据返回。

* 拿到数据json form text做不同处理，如果是formTypes 还会对url参数进行处理，处理完成返回处理过的数据，在koa-bodyparser 里面把返回的数据赋值给body **ctx.request.body = body**

```js
 // attach listeners
stream.on('aborted', onAborted)
stream.on('close', cleanup)
stream.on('data', onData)
stream.on('end', onEnd)
stream.on('error', onEnd)
// 省略……
function onEnd(err) {
    if (complete) return
    if (err) return done(err)

    if (length !== null && received !== length) {
        done(createError(400, 'request size did not match content length', 'request.size.invalid', {
            expected: length,
            length: length,
            received: received
        }))
    } else {
        var string = decoder ?
            buffer + (decoder.end() || '') :
            Buffer.concat(buffer)
        done(null, string)
    }
}
```

### 介绍自己写过的中间件

没写过，因为koa2我用得少，express我倒是写过，mock数据，原理是差不多。

### 介绍pm2

用过几次，PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等。我用得很基础，就自动重启，异常监控。

### React生命周期及自己的理解

#### 初始化

* constructor(props)
* static getDerivedStateFromProps(nextProps, prevState)
* componentWillMount() / UNSAFE_componentWillMount() 将废弃
* render
* componentDidMount

#### 更新

* componentWillReceiveProps() / UNSAFE_componentWillReceiveProps() 将废弃
* static getDerivedStateFromProps() 新
* shouldComponentUpdate(nextProps, nextState)
* componentWillUpdate() / UNSAFE_componentWillUpdate() 将废弃
* render()
* getSnapshotBeforeUpdate() 新
* componentDidUpdate(prevProps, prevState, snapshot)

#### 卸载阶段

* componentWillUnmount()

#### 错误处理

* componentDidCatch(error, info)

### Redux

[Redux](./redux.md)

### 跨域

#### 前端页面跨域

1、主域一样，可强行设置主域

2、postMessage

3、window.name url 参数轮询

#### 前端调用后端接口跨域

1、[jsonp](../../some-js/jsonp.ts)

2、服务端配置允许跨域调用，Access-Control-Allow-Origin

3、nginx代理

### 移动端适配1px的问题

1、svg

2、缩放viewport 0.5 0.33333

3、ios可直接设置小数

4、border-image、box-shadow

5、缩放

### flex布局

[css-flex布局](./css.md)

[flex](https://segmentfault.com/a/1190000012275086)

### css垂直居中和布局

[各种布局](https://segmentfault.com/a/1190000013565024)

### webpack

[webpack详解](./webpack.md)
