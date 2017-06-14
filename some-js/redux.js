//redux

//dispatch  action

//createStore dispatch(action) getState subscribe

//createStore dispatch getState subscribe oldState newState state=stateChanger(state,action)

//合并state和stateChanger state + stateChanger = newStateChanger=reducer  初始的时候 dispatch({})-->getState
//
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


//====================================demo code=================================================
function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = stateChanger(state, action) // 覆盖原对象
    listeners.forEach((listener) => listener())
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

function renderApp(newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function stateChanger(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state // 没有修改，返回原来的对象
  }
}

const store = createStore(appState, stateChanger)
let oldState = store.getState() // 缓存旧的 state
store.subscribe(() => {
  const newState = store.getState() // 数据可能变化，获取新的 state
  renderApp(newState, oldState) // 把新旧的 state 传进去渲染
  oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
})

renderApp(store.getState()) // 首次渲染页面
store.dispatch({
    type: 'UPDATE_TITLE_TEXT',
    text: '《React.js 小书》'
  }) // 修改标题文本
store.dispatch({
    type: 'UPDATE_TITLE_COLOR',
    color: 'blue'
  }) // 修改标题颜色



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

function themeReducer(state, action) {
  if (!state) return {
    themeName: 'Red Theme',
    themeColor: 'red'
  }
  switch (action.type) {
    case 'UPATE_THEME_NAME':
      return {...state,
        themeName: action.themeName
      }
    case 'UPATE_THEME_COLOR':
      return {...state,
        themeColor: action.themeColor
      }
    default:
      return state
  }
}

const store = createStore(themeReducer)


const usersReducer = /* TODO */ (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.user];
    case 'DELETE_USER':
      let deState = [...state];
      deState.splice(action.index, 1);
      return deState;
    case 'UPDATE_USER':
      let upState = [...state];
      upState[action.index] = {...upState[action.index],
        ...action.user
      };
      return upState;
    default:
      return state;
  }
}



function createStore(reducer) {
  let state = null
  const listeners = []

  const subscribe = listener => listeners.push(listener)

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

const themeReducer = (state, action) => {
  if (!state) {
    return {
      themeColor: 'red'
    }
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state,
        themeColor: action.themeColor
      }
    default:
      return state
  }
}

const store = createStore(themeReducer)

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor() {
      super()
      this.state = {
        allProps: {}
      }
    }
    componentWillMount() {
      const {
        store
      } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    _updateProps() {
      const {
        store
      } = this.context

      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {} // 防止 mapStateToProps 没有传入

      let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {} // 防止 mapDispatchToProps 没有传入

      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }
    render() {
      const {
        store
      } = this.context
      return <WrappedComponent {...this.state.allProps
      }
      />
    }
  }
  return Connect
}

class Header extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }
  render() {
    return ( < h1 style = {
        {
          color: this.props.themeColor
        }
      } > React.js 小书 < /h1>)
    }
  }
  Header = connect(mapStateToProps)(Header)

  const mapDispatchToProps = (dispatch) => {
    return {
      onSwitchColor: (color) => {
        dispatch({
          type: 'CHANGE_COLOR',
          themeColor: color
        })
      }
    }
  }

  class ThemeSwitch extends Component {
    static propTypes = {
      themeColor: PropTypes.string,
      onSwitchColor: PropTypes.func
    }

    handleSwitchColor(color) {
      if (this.props.onSwitchColor) {
        this.props.onSwitchColor(color)
      }
    }

    render() {
      return ( < div >
        < button style = {
          {
            color: this.props.themeColor
          }
        }
        onClick = {
          this.handleSwitchColor.bind(this, 'red')
        } > Red < /button> < button style = { {
        color: this.props.themeColor
      }
    }
    onClick = {
      this.handleSwitchColor.bind(this, 'blue')
    } > Blue < /button> < /div >
  )
}
}
ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)


class Content extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

  render() {
    return ( < div >
      < p style = {
        {
          color: this.props.themeColor
        }
      } > React.js 小书内容 < /p> < ThemeSwitch / >
      < /div>
    )
  }
}
Content = connect(mapStateToProps)(Content)

class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return ( < div > {
        this.props.children
      } < /div>)
    }
  }
  class Index extends Component {
    render() {
      return ( < div >
        < Header / >
        < Content / >
        < /div>
      )
    }
  }
