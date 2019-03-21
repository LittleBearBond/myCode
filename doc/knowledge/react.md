# knowledge

## 官方文档

[](https://react.bootcss.com/docs/hello-world.html)

## react react-router redux mobx

### react

* [《React源码解析》系列完结！](https://juejin.im/post/5a84682ef265da4e83266cc4)
* [各种面试解析](https://zhuanlan.zhihu.com/p/24856035)
* [React 源码剖析系列 － 不可思议的 react diff](https://segmentfault.com/a/1190000004003055)
* [聊聊列表中的 key 属性 diff](https://zhuanlan.zhihu.com/p/59619074)

### 调用 setState 之后发生了什么？

    在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

### 在什么情况下你会优先选择使用 Class Component 而不是 Functional Component？

    在组件需要包含内部状态或者使用到生命周期函数的时候使用 Class Component ，否则使用函数式组件。

### React 中 refs 的作用是什么？

    Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄

### React 中 keys 的作用是什么？

    Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识

### Controlled Component 与 Uncontrolled Component 之间的区别是什么？

    受控组件（Controlled Component）代指那些交由 React 控制并且所有的表单数据统一存放的组件

    非受控组件（Uncontrolled Component）则是由DOM存放表单数据，并非存放在 React 组件中。我们可以使用 refs 来操控DOM元素

### 在生命周期中的哪一步你应该发起 AJAX 请求？

    componentDidMount 函数中执行。React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount。如果我们将 AJAX 请求放到 componentWillMount 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。

    如果我们将 AJAX 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。如果我们的数据请求在组件挂载之前就完成，并且调用了setState函数将数据添加到组件状态中，对于未挂载的组件则会报错。而在 componentDidMount 函数中进行 AJAX 请求则能有效避免这个问题

### shouldComponentUpdate 的作用是啥以及为何它这么重要？

    shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。

### 概述下 React 中的事件处理逻辑

    为了解决跨浏览器兼容性问题，React 会将浏览器原生事件（Browser Native Event）封装为合成事件（SyntheticEvent）传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。另外有意思的是，React 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器，最终达到优化性能的目的。

    React 使用 SyntheticEvent 代理了浏览器的原生事件，目的在于提供更通用更高效的事件策略

    1. 统一 API
    2. 补充了一些浏览器原生没有实现的事件
    3. Event Pooling

    其中最重要的就是 Event Pooling。在绑定事件时，React 不会直接在对应的 DOM 节点上直接绑定事件，而是以「事件委托（Event Delegation）」的方式，将事件委托到 document 上；同时，SyntheticEvent 会被复用：在每次事件回调结束后，除非用户显式的声明该 Event 对象应当被 presist()，否则 React 会回收该对象，并在下一个事件回调中进行复用

[React源码分析6 — React合成事件系统](https://zhuanlan.zhihu.com/p/25883536)

[React源码解读系列 – 事件机制](http://link.zhihu.com/?target=http%3A//zhenhua-lee.github.io/react/react-event.html)

### 组件的设计原则

    单一职责、开放封闭、依赖导致、接口隔离

### 在定义React组件或者书写React相关代码，不管代码中有没有用到React这个对象，我们都必须将其import进来，这是为什么？

    React.createElement 语法糖

### 组件的生命周期

```html
<table>
    <tr>
        <th>
            constructor <br/>
            componentWillMount <br/>
            render <br/>
            componentDidMount<br/>
        </th>
        <th>
            componentWillReceiveProps <br/>
            shouldComponentUpdate <br/>
            componentWillUpdate <br/>
            render <br/>
            componentDidUpdate <br/>
        </th>
        <th>
            componentWillUnmount
        </th>
    </tr>
</table>
```

### React生命周期及自己的理解

```html
<table>
    <tr>
        <th>
            <!-- 初始化 -->
            constructor(props) <br/>
            static getDerivedStateFromProps(nextProps, prevState) <br/>
            render <br/>
            componentDidMount<br/>
        </th>
        <th>
            <!-- 更新 -->
            componentWillReceiveProps() / UNSAFE_componentWillReceiveProps() 将废弃 <br/>
            static getDerivedStateFromProps() 新 <br/>
            shouldComponentUpdate(nextProps, nextState) <br/>
            componentWillUpdate() / UNSAFE_componentWillUpdate() 将废弃 <br/>
            render() <br/>
            getSnapshotBeforeUpdate() 新() <br/>
            componentDidUpdate(prevProps, prevState, snapshot)() <br/>
        </th>
        <th>
            componentWillUnmount
        </th>
    </tr>
</table>
```

#### 错误处理

* componentDidCatch(error, info)

### React的Diff算法

[从零开始实现一个React](https://github.com/hujiulong/blog/issues/7)

### React Hooks

* [hook-demo](../../study-code/react-server/src/pages/HooksTest.js)
* [精读《Function VS Class 组件》](https://zhuanlan.zhihu.com/p/59558396)
* [30分钟精通React Hooks](https://juejin.im/post/5be3ea136fb9a049f9121014)
* [精读《怎么用 React Hooks 造轮子》](https://zhuanlan.zhihu.com/p/50274018)

### React Fiber

[理解React Fiber](http://www.ayqy.net/blog/dive-into-react-fiber/)

### Typescript React

[demo](../../study-code/typescipt/src/ReactTs.tsx)

### 性能优化

* 更小粒度的组件，组件尽可能的进行拆分、解耦、使用纯函数组件、防止组件内部一个变化引起整个组件diff或者重新渲染
* 纯函数组件使用React.memo，可以创建自动进行props浅比较的函数式组件
* 使用生产版本
* 虚拟化长列表
* 在一些情况下，重写这个生命周期函数shouldComponentUpdate控制是否重新渲染
* 使用PureComponent
* Code Splitting
* SSR
* 缓存基础框架、公共模块
* 使用更高版本的react、webpack
* key不要使用数组index
