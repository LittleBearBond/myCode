# 面试题解析（自我感觉)

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

koa1中间件使用㢧，koa2也是使用过，两者实现原理各部相同，koa 使用async await实现上更为简洁，如果在koa2中中间件依然使用generator函数会抱警告，但是内部还是支持的，内部调用koa-convert进行转换
