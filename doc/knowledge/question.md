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

### Koa

[Koa](./Koa.md)

### React

[React](./react.md)

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

### 安全问题

[安全问题](./security)

### 文件断点续传好处

* 节省流量，避免上传重复的分块。

* 减少用户等待时间。

* 可恢复的上传。出现中断，就算浏览器刷新或者是换了台电脑也能恢复到上次中断的位置

#### 断点续传原理

    户端，客户端做对应处理。

    如何去找出分块的唯一ID:文件名+分块编号，或者再加文件大小，文件最后修改时间什么的，都无法保证分块的唯一性。采用 MD5 的方式来序列化文件内容，这样就算是文件不同名，只要内容是一致的也会正确地识别出是同一个分块。每次分块上传前，根据内容 MD5 序列化，得到一个唯一ID，与服务端验证，如果此分块已经存在于服务端，则直接跳过此分块上传，否则上传此分块，成功后，服务端记下此分块ID。

    file.slice实现文件切片，file.slice((num - 1) * blockSize, num * blockSize);

   [参考webUploader](http://fex.baidu.com/webuploader/)

   [Node+H5实现大文件分片上传](https://segmentfault.com/a/1190000008899001)
