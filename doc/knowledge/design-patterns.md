# 设计模式

## 单例模式

    创建唯一对象，比如单个对话框，创建一次不再重新创建，业务中遇到很多单次执行，很多只执行一次的情况处理，这个是对象只创建一次

## 策略模式

    定义一系列的算法和实现，把他们都封装起来，并且是他们可以互换。
    我的理解是把一些规则和实现都单独封装起来，上层配置可以随意使用他们，比如表单验证相关，动画曲线相关，实际运用比如我们实现ItemGenerator 配置是不用的表单元素，上层只需配置，底层都有封装对应的实现

## 代理模式

    第一反应$.proxy，es6 proxy ，Object.defineProperties，http代理，services.js 封装axion，过滤所有的ajax请求，统一拦截处理

```js
// es6 proxy
var person = {
  name: "张三"
};
var proxy = new Proxy(person, {
  get: function(target, property) {
      console.log('GET ' + property);
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});
```

## 迭代器

    把迭代过程从业务逻辑中抽离，$.each 、es6 iterator、 for of

## 发布订阅

    Observer on one fire off、跨模块通信、事件机制

## 命令模式

    执行相同的指令、命令可重做、可撤销。比如很多菜单按钮本身的绘制和它实际产生的作用就行了分离，只需要给它添加上对应的响应

## 组合模式

## 模板方法

    使用继承即可实现的简单形式，最常用的就是react的class com extends Component,然后子类对应相应的生命周期事件，不过可以通过钩子方法代替继承，钩子是隔离变化的一种常见手段，在父类中放置钩子，钩子方法的返回结构决定了模板方法后续部分的执行步骤。

## 享元模式

    常用于性能优化，减少对象的创建，然类或者对象的内部状态共享，达到不用反复创建该类或者对象实例的目的。 对象池，重复使用一个对象，只需改变该对象不行属性和行为，不用重新创建对象。
    使用百度地图做订单轨迹可视化的时候，重复使用mark对象，而不是删除重新创建，多条轨迹每次进行显示和隐藏而不是每次删除重新创建

## 责任链模式

    chain、redux express koa 中间件、可实现AOP，洋葱模型

## 中介者模式

    所有对象或者节点只和中介者之间通信，由中介来处理，转发

## 装饰器模式

    函数柯里化、高阶组件 、组件注入、Render回调、es6 Decorator、

## 状态模式

    大概理解就是通过数据去控制不同的行为，数据驱动，this.setState()

## 适配器

    中间业务层封装提供统一接口给上层业务调用，底层适配不同的底层框架或者接口，buildSelect的设计，播放器html5 和flash的兼容系处理，appbridge的设计

## 编程技巧和设计原则

### 单一职责

    Single Responsibility Principle 类或者方法都的职责要单一，职责变更的时候引起的变化会更小，代码粒度更小地控制，方便代码重用和扩展以及单元测试。当然代码粒度越小开发的时候可能就相对更麻烦

### 开放封闭

    可扩展但是不可修改，当前程序需要改变或者添加新功能的时候，不用修改原来的代码，可以使用新增代码，来实现。组件设计的时候常常用到这个思想，

    1、消除条件分支免得新增代码需修改之前代码，常用手段是抽出配置，或者使用循环
    2、找出变化的地方，封装不变的地方（策略模式），既抽出不变相
    3、放置钩子（模板方法，react组件设计），使用回调函数
    4、可配置化，插件化

    增加功能不要修改原有代码，常用手段比如新增配置来实现，新增代码，新增方法，或者底层提供强大可配置和钩子，上层可进行二次开发扩展，
    react-router里面的Route配置，可传递component、可设置render、可传递children、也可是在children是function，灵活多变实现各种功能无需修源码，✘这个好像不太对😆。

## 代码重构

### 提炼函数

    细粒度的函数有利于代码重用，职责更单一，更方便单元测试

### 合并重复条件片段

    1、抽出成配置，在通过相应的key去查找对应条件；列表页状态映射，数字转文字，这样少些if else

```jsx
const obj = {
    title: '操作',
    dataIndex: 'operate',
    render: (a, { id, status, orderId, cityId }) => {
        const toDetailUrl = <Link to={`/app/ordercenter/detail/${id}`}>查看详情</Link>
        const MAP_SUATUS_LINK = {
            1: toDetailUrl,
            3: toDetailUrl,
            4: toDetailUrl,
            2: <Link to={`/app/policerecord/detail?orderId=${orderId}&cityId=${cityId}`}>查看详情</Link>,
        }
        return MAP_SUATUS_LINK[status]
    }
}
const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
// 抽出不可变部分
const weeks = new Array("日", "一", "二", "三", "四", "五", "六").map(v=>`星期${v});
```

    2、用map代替switch case，redux 的使用

```js
// 使用switch case
const login = (state = {
    isLogin: true,
    displayName: '',
    email: '',
    canCreate: false,
    auth: {},
    menus: []
}, action) => {
    switch (action.type) {
        case RECEIVE_USER_INFO: {
            return {
                ...state,
                ...action.data
            }
        }
        default:
            return state;
    }
}
// 使用map
const ActionMap = {
    [REQUEST_CONFLICT_DATA]: (state, action) => {
        return {
            ...state,
            isGetPageDataIng: true
        };
    },
    [RECEIVE_CONFLICT_DATA]: (state, action) => {
        return {
            ...state,
            ...action.data,
            isGetPageDataIng: false
        };
    },
}
const ConflictCreate = (state = extend(true, {}, initState), action) => {
    return ActionMap[action.type] ? ActionMap[action.type](state, action) : state;
}
```

    3、使用循环代替重复的条件判断，循环搞定一切，不用反复的if else

```js
function transitionEnd() {
    var el = document.createElement('bootstrap');
    var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    };
    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name];
        }
    }
    return ''; // explicit for ie8 (  ._.)
}
```

    4、使用extend技巧，处理对象赋值

```js
// style赋值
const { style } = document.body
Object.assign(style,{})

// 对象赋值
const a={}
Object.assign(a,{})

```

    5、找出不变部分，封装不变，ItemGenrator、ListCommon、BuildSelect

    6、 if 条件不满足就立即return，让函数提前退出条件分支，不要if else 层层嵌套

    7、 函数参数过多，使用对象传递

    8、 使用链式调用，sfe-bmap 的animation设计

    9、 对大类进行分解，比如一个react组件超过二三百行，这个时候可能有必要对这个类进行拆分

    10、es6 各种技巧让代码更为简洁、例如：结构，Object.entries、for of、Array reduce的妙用
