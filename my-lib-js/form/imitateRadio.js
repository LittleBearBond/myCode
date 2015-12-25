/* @grunt-build */

define(function(require, exports, module) {
    /* 模拟　 单选　、多选 */
    var imitate = function(opts) {
            return this.init(opts);
        },
        emptyFn = function() {};

    imitate.defaults = {
        //容器
        container: document.body,
        //选中的class
        currClass: 'selected',
        onSelAfter: emptyFn,
        onSelBefore: emptyFn,
        onClick: emptyFn,
        //委托事件的选择器
        selector: '[input="radio"]', //input="checkbox"
        isMultiple: false,
        //是否阻止冒泡
        isPreventDefault: false,
        //是否循环选择， 只适用于在允许单个选择的时候，点击一次选中，再点一次取消选择，和多选类似处理
        isLoopSel: false
    }

    $.extend(imitate.prototype, {
        constructor: imitate,
        init: function(opts) {
            this.opts = $.extend({}, imitate.defaults, opts || {});
            this.$con = $(this.opts.container);
            if (!this.$con.length) {
                console.log('error container is null')
                return null;
            };
            this.initEvent();
            return this;
        },
        initEvent: function() {
            var self = this,
                opts = this.opts;

            //不可以多选的时候　要去掉其他已经选中的
            this.$con.on('click.imitate', opts.selector, function(e) {
                var $this = $(this);

                //事件执行之前
                if (opts.onSelBefore.call($this) === false) {
                    //点击的时候就调用,onSelBefore 调用之后
                    opts.onClick.call($this);
                    return;
                }
                var isTrue = $this.hasClass(opts.currClass);
                //可以多选，那么在再次点击的时候应该取消选择
                if (opts.isMultiple) {
                    $this[isTrue ? 'removeClass' : 'addClass'](opts.currClass);
                } else {
                    //单选 去掉其他已经选择的
                    self.$con.find(opts.selector).removeClass(opts.currClass);
                    opts.isLoopSel ?
                        //这个处理可以是一个都不选中
                        $this[isTrue ? 'removeClass' : 'addClass'](opts.currClass) :
                        //必须有一个是选中的
                        $this.addClass(opts.currClass);
                }
                opts.onSelAfter.call($this);

                //点击的时候就调用、onSelAfter 调用之后
                opts.onClick.call($this);

                if (self.opts.isPreventDefault) {
                    return false;
                }
            });
        },
        destory: function() {
            this.$con.off('click.imitate');
        }
    });
    module.exports = function(opts) {
        return new imitate(opts);
    };
})
