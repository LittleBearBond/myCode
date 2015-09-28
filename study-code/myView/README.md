#说明

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
每开发一个业务页面我就要弄一个这个模板代码，感觉这是累，而且还不爽。
所以想办法干掉这些重复的代码，这样让我们的代码重用性更高，方便将来维护。

以前代码没有加$(function(){XXX }) 导致后来挨着去找页面给每个页面加上，是自己给自己挖下的坑，还得我们自己来填。
进过一番设计，写了一个公共组件吧，来避免我们一些重复的代码，并且也符合我们现在这种开发模式
基本代码如下

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




