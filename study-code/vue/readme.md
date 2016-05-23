
##响应的数据绑定

Vue.js 的核心是一个响应的数据绑定系统，它让数据与 DOM 保持同步非常简单。在使用 jQuery 手工操作 DOM 时，我们的代码常常是命令式的、重复的与易错的。Vue.js 拥抱数据驱动的视图概念。通俗地讲，它意味着我们在普通 HTML 模板中使用特殊的语法将 DOM “绑定”到底层数据。一旦创建了绑定，DOM 将与数据保持同步。每当修改了数据，DOM 便相应地更新。这样我们应用中的逻辑就几乎都是直接修改数据了，不必与 DOM 更新搅在一起。这让我们的代码更容易撰写、理解与维护。

##Vue 实例
![生命周期](http://cn.vuejs.org/images/lifecycle.png)
![watcher](http://cn.vuejs.org/images/data.png)

##神奇的 Object.defineProperty
https://segmentfault.com/a/1190000004346467

2268 defineReactive
7845 stateMixin
7965 _proxy

##组件
组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展

##TODOS

## VUE-WEBPACK-LOADER SPA


http://www.imooc.com/video/6346

