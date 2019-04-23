# react-router、react-router-dom、history

## react-router

> React Router 的核心模块

```js
    import { Switch, Route, Router, Prompt, StaticRouter, MemoryRouter, withRouter } from 'react-router-dom';
```

### Router

>借助 context 向 Route 传递组件相关数据，监听history变化，更新location对象的值

```jsx
<RouterContext.Provider
    children={this.props.children || null}
    value={{
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
    }}
    />
```

### Route

> 最核心组件，它最基本的职责就是当页面的访问地址与 Route 上的 path 匹配时，就渲染出对应的 UI 界面

Route 自带三个 render method 和三个 props

```jsx
// component
<Route path="/app" component={App} />

// render: function
<Route exact path="/app" render={() => <Redirect to="/app/work-items/list" />} />

// children: function

<ul>
  <ListItemLink to="/somewhere" />
  <ListItemLink to="/somewhere-ele" />
</ul>
const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )}
)
```

```js
  Route.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    component: (props, propName) => {
      if (props[propName] && !isValidElementType(props[propName])) {
        return new Error(
          `Invalid prop 'component' supplied to 'Route': the prop is not a valid React component`
        );
      }
    },
    // 如果为 true，path 为 '/one' 的路由将不能匹配 '/one/two'，反之，亦然。
    exact: PropTypes.bool,
    location: PropTypes.object,
    // 任何可以被 path-to-regexp解析的有效 URL 路径
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    render: PropTypes.func,
    sensitive: PropTypes.bool,
    // 对路径末尾斜杠的匹配。如果为 true。path 为 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'。
    strict: PropTypes.bool
  }
```

### Switch

> 只渲染出第一个与当前访问地址匹配的 Route 或 Redirect。

```js
Switch.propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  };
```

### Redirect

> 渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址

```js
Redirect.propTypes = {
    // 若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面
    push: PropTypes.bool,
    // 需要匹配的将要被重定向路径
    from: PropTypes.string,
    // 重定向的 URL 字符串
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  };
  // this.props.children 就是配置Route 匹配到一个就OK
  React.Children.forEach(this.props.children, child => {
    if (match == null && React.isValidElement(child)) {
        element = child;

        const path = child.props.path || child.props.from;

        match = path
        ? matchPath(location.pathname, { ...child.props, path })
        : context.match;
    }
    });

    return match
    ? React.cloneElement(element, { location, computedMatch: match })
    : null;
```

### Prompt

> 当用户离开当前页面前做出一些提示

```js
  const messageType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

Prompt.propTypes = {
    // 通过设置一定条件要决定是否启用 Prompt
    when: PropTypes.bool,
    // 当用户离开当前页面时，设置的提示信息
    message: messageType.isRequired
  };
```

### withRouter

> 其实内部就是用Route包装组件，方便组件拿到history、location、match对象

```jsx
  const C = props => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <Route
        children={routeComponentProps => (
          <Component
            {...remainingProps}
            {...routeComponentProps}
            ref={wrappedComponentRef}
          />
        )}
      />
    );
  };
```

---

## react-router-dom

> 用于 DOM 绑定的 React Router

```js
    import { NavLink, Link, HashHistory, BrowserRouter} from 'react-router-dom';
```

### Link

```js
Link.propTypes = {
    innerRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onClick: PropTypes.func,
    // 是否是replace
    replace: PropTypes.bool,
    // 是否是新页面打开
    target: PropTypes.string,
    // 跳转到指定路径
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  };
```

### NavLink

```js
const ariaCurrentType = PropTypes.oneOf([
    "page",
    "step",
    "location",
    "date",
    "time",
    "true"
  ]);

  NavLink.propTypes = {
    "aria-current": ariaCurrentType,
    // 导航选中激活时候应用的样式名，默认样式名为 active
    activeClassName: PropTypes.string,
    // 如果不想使用样式名就直接写style
    activeStyle: PropTypes.object,
    className: PropTypes.string,
    // 若为 true，只有当访问地址严格匹配时激活样式才会应用
    exact: Route.propTypes.exact,
    // 决定导航是否激活，或者在导航激活时候做点别的事情。不管怎样，它不能决定对应页面是否可以渲染。
    isActive: PropTypes.func,
    location: PropTypes.object,
    // 若为 true，只有当访问地址后缀斜杠严格匹配（有或无）时激活样式才会应用
    strict: Route.propTypes.strict,
    style: PropTypes.object,
    to: Link.propTypes.to
  };
```

### BrowserRouter

> 一个使用了 HTML5 history API 的高阶路由组件，保证你的 UI 界面和 URL 保持同步

---

## history

```js
import {createBrowserHistory, createHashHistory, createMemoryHistory} from 'history'

```

* "browser history" - history 在 DOM 上的实现，用于支持 HTML5 history API 的浏览器
* "hash history" - history 在 DOM 上的实现，用于旧版浏览器。
* "memory history" - history 在内存上的实现，用于测试或非 DOM 环境（例如 React Native）。

```js
// 一个history对象一般具有如下属性
  const history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    listen
  };
```

### location

> location 是指你当前的位置，将要去的位置，或是之前所在的位置，location对象的获取方式如下

* 在 Route component 中，以 this.props.location 获取
* 在 Route render 中，以 ({location}) => () 方式获取
* 在 Route children 中，以 ({location}) => () 方式获取
* 在 withRouter 中，以 this.props.location 的方式获取

> 在不同情境中使用 location：

```jsx
<Link to={location} />
<NaviveLink to={location} />
<Redirect to={location />
history.push(location)
history.replace(location)
```

### match

> match 对象包含了 `<Route path>` 如何与 URL 匹配的信息，具有以下属性：

* params: object 路径参数，通过解析 URL 中的动态部分获得键值对
* isExact: bool 为 true 时，整个 URL 都需要匹配
* path: string 用来匹配的路径模式，用于创建嵌套的 `<Route>`
* url: string URL 匹配的部分，用于嵌套的 `<Link>`

---

## react-router-redux

> React Router 和 Redux 的集成

---

## react-router-config

> 静态路由配置的小助手
