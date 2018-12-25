# 面试题笔记（自我感觉)

闲逛知乎突然看到一个 [面试题汇总](https://zhuanlan.zhihu.com/p/48827292) ，突然好久不学习都落伍了，好多东西之前都研究过，突然看到竟然不能完整想起来

## 第一段 阿里

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

## 网易

* 介绍redux，主要解决什么问题
* 文件上传如何做断点续传
* 表单可以跨域吗
* promise、async有什么区别
* 搜索请求如何处理（防抖）
* 搜索请求中文如何请求
* 介绍观察者模式
* 介绍中介者模式
* 观察者和订阅-发布的区别，各自用在哪里
* 介绍react优化
* 介绍http2.0
* 通过什么做到并发请求
* http1.1时如何复用tcp连接
* 介绍Service Worker
* 介绍css3中position:sticky 实现粘性布局
* redux请求中间件如何处理并发
* 介绍Promise，异常捕获
* 介绍position属性包括CSS3新增
* 浏览器事件流向
* 介绍事件代理以及优缺点
* React组件中怎么做事件代理
* React组件事件代理的原理
* 介绍this各种情况
* 前端怎么控制管理路由
* 使用路由时出现问题如何解决
* React怎么做数据的检查和变化

## 滴滴

* react-router怎么实现路由切换
* react-router里的 Link 标签和 a 标签有什么区别
* a 标签默认事件禁掉之后做了什么才实现了跳转
* React层面的性能优化
* 整个前端性能提升大致分几类
* import { Button } from 'antd'，打包的时候只打包button，分模块加载，是怎么做到的
* 使用import时，webpack对node_modules里的依赖会做什么
* JS异步解决方案的发展历程以及优缺点
* Http报文的请求会有几个部分
* cookie放哪里，cookie能做的事情和存在的价值
* cookie和token都存放在header里面，为什么只劫持前者
* cookie和session有哪些方面的区别
* React中Dom结构发生变化后内部经历了哪些变化
* React挂载的时候有3个组件，textComponent、composeComponent、domComponent，区别和关系，Dom结构发生变化时怎么区分data的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
* key主要是解决哪一类的问题，为什么不建议用索引index（重绘）
* Redux中异步的请求怎么处理
* Redux中间件是什么东西，接受几个参数（两端的柯里化函数）
* 柯里化函数两端的参数具体是什么东西
* 中间件是怎么拿到store和action，然后怎么处理
* state是怎么注入到组件的，从reducer到组件经历了什么样的过程
* koa中response.send、response.rounded、response.json发生了什么事，浏览器为什么能识别到它是一个json结构或是html
* koa-bodyparser怎么来解析request
* webpack整个生命周期，loader和plugin有什么区别
* 介绍AST（Abstract Syntax Tree）抽象语法树
* 安卓Activity之间数据是怎么传递的
* 安卓4.0到6.0过程中WebView对js兼容性的变化
* WebView和原生是如何通信
* 跨域怎么解决，有没有使用过Apache等方案

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

[安全问题](./security.md)

### Promise

[Promise](./Promise.md)

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

### [service worker](../../study-code/serviceworker/index.html)
