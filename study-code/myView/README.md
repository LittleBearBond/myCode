#搞这个有什么好处

1. 代码更简洁
2. 避免重复代码
3. 继承的实现，这里可以参见project/vip-student/1.x/js/my-course/page.es6，以及/project/vip-student/1.x/demo/my-course/index.html 这个页面右边时间控件实现公用，采用继承的方式，把共有的东西抽象到父类中实现，子类中不一样的复写父类或者扩展父类，从而实现代码的重用。
4. 事件绑定抽出，内部做处理，源于backbone的思想
5. 为什么不用backbone，我们当前堆代码的方式和业务决定了我们如果使用backbone是得不偿失

用该组件来完成todos[demo地址](https://github.com/LittleBearBond/myCode/blob/master/components/todos/demo-jquery-my-new/page.js)

平时我们的业务代码结构大致如下，基本是属于我们开发时候的一个模板
```js
/* @grunt-build */

define(function (require, exports, module) {
    var app = {},
        //默认配置项
        options = {};
    $.extend(app, {
        init: function (opts) {
            var self = app;
            this.opts = $.extend(true, {}, options, opts || {});

            return self.initView().initEvent();
        },
        //初始话视图
        initView: function () {
            var self = this;
            $.each({
                $key1:'selector1',
                $key2:'selector2',
                $key3:'selector3',
                $key4:'selector4',
            }, function (key, sel) {
                self[key] = $(sel);
            });

            return this;
        },
        //初始话相关事件绑定
        initEvent: function () {
            //直接绑定
            this.$el.on('type',this.xxxFn.bind(this));
            //委托绑定
            this.$el.on('type','selector',this.xxxFn.bind(this));
            //绑定window下的函数
            this.$el.on('type',window.XXX);
            //找到一个元素在绑定事件
            $('xxxx').on('type',fn)
            return this;
        },

    });
    return function (args) {
        $(function(){
            app.init(args);
        })
    }
});
```
每开发一个业务页面我就要弄一个这个模板代码，仔细观察会发现很多事重复代码这些代码充斥在每一个业务js中，其实这是编写代码的大忌。如果相同的代码出现在各个地方，一旦将来相同的代码出问题，或者是有所改动，后果将是不可想象。所以我们一定是要避免这些重复性的业务代码或者是非业务性代码。

所以想办法干掉这些重复的代码，这样让我们的代码重用性更高，方便将来维护以及填坑。

回想当初代码没有加$(function(){XXX })后来发现有坑，然后挨着去找页面给每个页面加上！是自己给自己挖下的坑，得我们自己来填，当时也都填了，不过这些我们是要经量避免的。

进过一番设计，写了一个公共组件吧，来避免我们一些重复的代码，并且也符合我们现在堆代码的方式，下面是一个模板吧

```js
/* @grunt-build */
//这代码就是/project/vip-cms/1.x/js/manage-course/teach.es6
define(function(require, exports, module) {
    let todoView = viewInit.extend({
        //根节点，页面相关的委托事件，都委托到这个节点上
        //'$el': $('.jp-tpl'),
        //默认配置项，放在这里，如果外面调用函数有传入会直接覆盖它
        opts: {
            //最多能添加多少科
            maxSubjectNum: 20
        },
        //元素配置
        //this.$jqAdd=$('#jq-add')
        //会自动循环这个object 把取到的元素附加到this对象上
        'viewData': {
            '$jqAdd': '#jq-add',
            '$jpTpl': '.jp-tpl',
            '$jqTalbeList': '#jq-talbe-list'
        },
        //时间配置，具体可以参考demo页面，有所依的配置方式
        'events': {
            "click [data-binded]": 'showDialog'
            /*"click .jp-test1": "test1",
            "dblclick .jp-test2": "test2",
            "click $jp-test3": "test3",
            'click $$.jp-test4': 'test4',
            "click $$.jp-test5": "window.test5WindowFN",
            "click #jp-test6": "test6"*/
        },
        //初始话，这个会在视图和事件初始话完毕后会自动调用
        init() {
            turnpage.init(this.opts);
            this.liNum = 0;
        },
        //视图初始话完成会调用，但是是在事件绑定初始话之前调用
        //具体细节见源代码注释
        onAfterViewInit() {
            this.$el = this.$jqTalbeList;
        },
        /*
         * 当有this 或者arguments 的时候 函数不能简写成 xx=>{} 不然转换会有问题
         * 这坨代码会被抽象到一个父类中实现，不然到时又充斥在每个业务页面上
         */
        ajaxFn(opts) {
            var ajaxFn = $.ajax(opts).error(function() {
                arguments[1] === 'canceled' || $.cmsFailAlert('ajax 发生错误');
                console.log(arguments);
            });

            /*
             * this arguments 转换有问题
             */
            ajaxFn.doneFn = function(fn) {
                return ajaxFn.done(function(r) {
                    r && String(r.status) !== '0' && r.message && $.cmsFailAlert(r.message);
                    fn.apply(this, Array.prototype.slice.call(arguments));
                });
            };
            return ajaxFn;
        }
    });

    return function(args) {
        //直接new 就ok domready 内部有控制，不需要写那个重复的$(function(){})代码
        new todoView(args);
    }
});

```


##1.1

主要改进extend，支持静态方法和实例方法的继承
对继承这一块有了新的改进
```js
var a = TodoView.extend({
        a: 'a'
    });
//1.0 只能这样继续扩展a，而不能从a派生出b c ……
    a.extend({
        b: 'a'
    });

//但是往往我们需要的是
var a = TodoView.extend({
        a: 'a'
    });
    //b 从a继承
var b = a.extend({
        b: 'b'
    });
    //c从a继承
var c = a.extend({
        c:  'c'
    });
//这在1.0的时候是不行的，自己想法太简单，导致设计失误，后来想了想backbone 恩！还是他的成熟点。
```


```js
//1.0支持这样
var myView = TodoView.extend({
        a: 'a'
    });
//创建一个view实例
var view = new myView();
//1.o支持实例对象还可以这样，继续extend
//1.1不在支持
  view.extend({
    a: 1
  });

//1.1支持这样
//实例属性和静态属性继承
var myView = TodoView.extend(
    //实例属性，附加到prototype
    {
        a: 'a'
    }, 
    //静态属性
    {
        staticPro:"staticPro"
    });
```


