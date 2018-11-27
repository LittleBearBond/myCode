# redux

## dispatch  action

## createStore dispatch(action) getState subscribe

## createStore dispatch getState subscribe oldState newState state=stateChanger(state,action)

## 合并state和stateChanger state + stateChanger = newStateChanger=reducer  初始的时候 dispatch({})-->getState

```js
function createStore(reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return {
    getState,
    dispatch,
    subscribe
  }
}
```

```jsx
//demo reducer = state + stateChanger
//reducer只能是纯函数
function themeReducer(state, action) {
  if (!state) return {
    themeName: 'Red Theme',
    themeColor: 'red'
  }
  switch (action.type) {
    case 'UPATE_THEME_NAME':
      return {
        ...state,
        themeName: action.themeName
      }
    case 'UPATE_THEME_COLOR':
      return {
        ...state,
        themeColor: action.themeColor
      }
    default:
      return state
  }
}

const store = createStore(themeReducer)
```

## redux在react中的初步使用demo

```jsx
function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer)
class Index extends Component {
  //必须指定childContextTypes
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    //所有child都能拿到这个contex
    return { store }
  }
  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

```

```jsx
class Header extends Component {

  static contextTypes = {
    store: PropTypes.object
  }

  constructor () {
    super()
    this.state = { themeColor: '' }
  }

  componentWillMount () {
    const { store } = this.context
    this._updateThemeColor()
    store.subscribe(() => this._updateThemeColor())
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  render () {
    return (
      <h1 style={{ color: this.state.themeColor }}>React.js 小书</h1>
    )
  }
}
```

```jsx
class Content extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor () {
    super()
    this.state = { themeColor: '' }
  }

  componentWillMount () {
    const { store } = this.context
    this._updateThemeColor()
    store.subscribe(() => this._updateThemeColor())
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  render () {
    return (
      <div>
        <p style={{ color: this.state.themeColor }}>React.js 小书内容</p>
        <ThemeSwitch />
      </div>
    )
  }
}
```

```jsx
class ThemeSwitch extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor () {
    super()
    this.state = { themeColor: '' }
  }

  componentWillMount () {
    this._updateThemeColor()
  }

  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }

  // dispatch action 去改变颜色
  handleSwitchColor (color) {
    const { store } = this.context
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    })
  }

  render () {
    return (
      <div>
        <button
          style={{ color: this.state.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
        <button
          style={{ color: this.state.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
      </div>
    )
  }
}
```

虽然已经用上了redux 但是以上三个组件都有大量发冗余代码，重复的逻辑

>在componentWillMount 也都是拿到store 然后订阅事件，执行一次初始话

>header 和content 都拿到context 然后getStore 自己内部再steState,

>这样写每个组件都有以下代码，这些代码实在是非常的冗余
  
>store: PropTypes.object constructor 都是重复的一样的代码

重复代码，和重复逻辑

```js
static contextTypes = {
  store: PropTypes.object
}

constructor () {
  super()
  this.state = { themeColor: '' }
}

componentWillMount () {
  const { store } = this.context
  this._updateThemeColor()
  store.subscribe(() => this._updateThemeColor())
}

_updateThemeColor () {
  const { store } = this.context
  const state = store.getState()
  this.setState({ themeColor: state.themeColor })
}
```

解决上面的问题，我们使用高阶组件，就是把上面组件重复的代码抽取出来，其实都是老套路，用一个函数来包装一下

```jsx
const connect = (mapStateToProps)=>(WrappedComponent)=>{
  class ConnectComponent extends Component {
    static contextTypes={
      store: PropTypes.object
    }
    constructor(){
      super()
      this.state = { allProps:{} }
    }
    componentWillMount(){
      const {store} = this.context;
      store._updateProps();
      store.subscribe(()=>this._updateProps())
    }
    _updateProps(){
      const {store} = this.context;
      let stateProps = mapStateToProps(store.getState() , this.props)
      this.setState({
        // 整合普通的 props 和从 state 生成的 props
        allProps:{
          ...stateProps,
          ...this.props
        }
      })
    }
    render(){
      return <WrappedComponent {...this.state.allProps} />
    }
  }
}
```

有了connect 这个高阶组价，我们就可以重构header 和content了

```jsx
class Header extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    themeColor:state.themeColor
  }
}

Header = connect(mapStateToProps)(Header)


class Content extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <div>
        <p style={{ color: this.props.themeColor }}>React.js 小书内容</p>
        <ThemeSwitch />
      </div>
    )
  }
}
Content = connect(mapStateToProps)(Content)

```

重构了header和content但是ThemeSwitch 里面的一段代码始终还是不够完美，依然在是从context里面获取store近相关操作
这段代码的获取store其实可抽出去，组件里面只需要调用外部一个函数，把参数传过去，函数内部去执行dispatch这个事情

```js
  // dispatch action 去改变颜色
  handleSwitchColor (color) {
    const { store } = this.context
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    })
  }
```

参照mapStateToProps 这设计一个 mapDispatchToProps

```js
  const mapDispacthToProps = (dispatch)=>{
    return {
      onSwitchColor:(color)=>{
         dispatch({ type: 'CHANGE_COLOR', themeColor: color })
      }
    }
  }
```

所以对connent进行改进

```js
  const connect = (mapStateToProps , mapDispatchToProps)=>(WrappedComponent)=>{
      class Connect extends Component {
         static contextTypes={
           store : PropTypes.object
         }
         constructor(){
           super();
           this.state = {
             allProps:{}
           }
         }
         componentWillMount(){
           const { store} = this.context;
           this._updateProps();
          store.subscribe(()=>this._updateProps())
         }
         _updateProps(){
            const { store } = this.context;
            let stateProps = mapStateToProps ? mapStateToProps(store.getState() , this.props) : {};
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {};
            this.setState({
             allProps: {
              ...stateProps,
              ...dispatchProps,
              ...this.props
             }
           })
         }
         render(){
           return <WrappedComponent {...this.allProps} />
         }
      }
  }
  const createStore = (reducer)=>{
    let state;
    const listeners=[];
    const subscribe = (listener)=>listeners.push(listener)
    const getState = ()=>state

    const dispatch=(action)=>{
      state = reducer(state , action)
      listeners.forEach(listener=>listener())
    }
    dispatch({})

    return {
      subscribe,
      getState,
      dispatch
    }
  }
  const ThemeReducer=(state , action){
    if(!state){
      return{
        themeColor:'red'
      }
    }
    switch (action.type){
      case 'xxx'
    }
    //....
  }
```

有了新一代的connect 我么去重构下ThemeSwitch

```jsx
class ThemeSwitch extends Component {
  static PropTypes={
    themeColor:PropTypes.string,
    onSwitchColor:PropTypes.func
  }
  handleSwitchColor(color){
    if(this.props.onSwitchColor){
      this.props.onSwitchColor(color)
    }
  }
  render () {
    return (
      <div>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    themeColor:state.themeColor
  }
}

const mapDisPatchToProps=(dispatch)=>{
  return {
    onSwitchColor:(color)=>{
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}
ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)
```

到这个时候我们的store 依然放在index里面 其实这个不太合理，应该把这个代码逻辑抽出来，用一个专门的组件来干这个事情

```js
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}
```

这个时候Index 就变得更干净了，只做本质工作了

```jsx
class Index extends Component {
  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}
// 把 Provider 作为组件树的根节点
ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
)
```
