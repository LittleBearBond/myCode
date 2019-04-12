# [react-redux](../../study-code/react/redux-react-redux.md)

## redux vs mobx 复杂 vs 简洁

- mobx 使用的是 @inject 装饰器语法注入，redux 使用的是 connect 语法注入
- mobx 会动态精确绑定数据字段和对应 component 关系， redux 使用 connect 参数手动控制传递哪些字段
- mobx 直接修改 store 的状态，但是必须在 @action 修饰的函数中完成，@action 的语义，表示这是一个修改状态的操作
- redux 使用了比较难以理解的高阶函数和参数 connect combineReducers bindActionCreators mapStateToProps mapDispatchToProps ，mobx 方案，除了使用 decorator 语法，没有其它让人感觉理解困难的函数。
- redux 在处理异步请求需要单独用到redux-thunk中间件，使用起来比较繁琐，一般人难以理解这样的设计
- redux 引入了数据流，mobx 没有数据流的概念，通过 actions 直接改变数据
- mobx 使用 @observer 语法，让一个 component 能响应 store 字段更新
- redux Provider 传递 store 是强约定，mobx Provider 灵活传递 store actions，也可以是其它名字，比如 db

- 代码功能少，感觉不到差别，好像就是 redux 方案有点难理解；而 mobx 比较直接，也比较 magic

### 实现一个数据修改 reudx需要修改三个地方，mobx只需要一个

- redux 有太多的样板代码 修改一个数据请求方案需要要改 3 个地方： action_types、action_creator 、reducer，在项目中，action_types、action_creator 、reducer 分布于不同的文件夹，需要来回切换文件修改。
- mobx 方案需要改 1 个地方： 添加一个 action
- 实现同样功能，redux 需要关注的地方多了 2/3。功能比较少的时候，感觉不到工作量差异多大，当项目变得庞大，这个差别就特别大了
