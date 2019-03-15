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

    把迭代过程从业务逻辑中抽离，$.each 、es6 iterator

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

    
