# Koa2

## 使用过的koa2中间件

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

## koa-body原理

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

## 介绍自己写过的中间件

没写过，因为koa2我用得少，express我倒是写过，mock数据，原理是差不多。

## 介绍pm2

用过几次，PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等。我用得很基础，就自动重启，异常监控。
