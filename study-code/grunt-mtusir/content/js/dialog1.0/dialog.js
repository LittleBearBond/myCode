/*
 * 20140825
 * author xj
 * version 1.0
 * */
(function(root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(['zepto'], factory);
    } else {
        root.popDialog = factory(root.$);
    }
}(window, function($) {
    var $popMask = $('<div class="pop_dialog_mask"></div>'),
        dialogTemplates = [
            '<div class="dialog_wrap">',
            '<em class="dialog_close"></em>',
            '<div class="dialog_title"></div>',
            '<div class="dialog_content"></div>',
            '</div>'
        ].join(''),
        $loadDialog=$('<div class="loading-circular"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><div class="clearfix"></div></div>'),
        $dialog = $(dialogTemplates),
        callFunc = function(func, $obj, $target) {
            if ($.isFunction(func)) {
                return func.apply($obj, [].slice.call(arguments, 2)) === false;
            }
            return void 0;
        },
        deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0,
        deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    /*
      pop、onbeforeshow、onshow、onbeforehide、onhide 五个参数
    */
    $.fn.popLayer = function(opts) {
        opts = opts || {};
        var $body = $('body'),
            $popLayer,
            $this;
        return this.each(function() {
            $this = $(this);
            if ($.type(opts.pop) !== 'string') {
                return;
            }
            //给目标按钮绑定事件
            $this.on('click', function(e) {
                e.preventDefault();
                $popLayer = $(opts.pop);
                if (callFunc(opts.onbeforeshow, $this, $popLayer) === false) {
                    return;
                }
                callFunc(opts.onshow, $this, $popLayer);
            });
            //给弹层绑定事件
            $body.on('click', opts.pop, function() {
                if (callFunc(opts.onbeforehide, $(this)) === false) {
                    return;
                }
                callFunc(opts.onhide, $(this));
            }).on('touchmove', opts.pop, function(e) {
                e.preventDefault();
            });
        });
    };

    var defaults = {
        //安卓是否开启动画
        androidAnimate: false,
        // animate the modal in/out
        animate: 'dialogfadeInDown',
        //关闭的动画
        closeAnimate: 'dialogfadeOutUp',
        //content的class
        contentClassName: null,
        //是否显示关闭按钮
        closeBtn: true,
        //是否显示
        //show: true,
        //content的内容为指定的选择器
        dataSelector: '',
        //指定content为传入的html
        html: '',
        //直接指定显示文本
        content: '',
        //是否锁定
        isLock: true,
        //是否显示阴影
        shadow: false,
        //设置自动关闭时间
        times: 0,
        // 是否支持快捷关闭（点击遮罩层自动关闭）
        quickClose: true,
        //显示loading动画
        //showLoading:false
    };

    /*弹窗*/
    function dialog(opts) {
        this.options = $.extend({},defaults, opts || {});
        this.$dialog = $dialog.clone();
        this.$pop = $popMask.clone();
        this.$title = this.$dialog.find('.dialog_title');
        this.$close = this.$dialog.find('.dialog_close');
        this.$content = this.$dialog.find('.dialog_content');
        this.isShow = this.isDestory = false;
        this.fixed = true;
        this.init().initEvent();
        return this;
    }

    $.extend(dialog.prototype, {
        init: function() {
            var opts = this.options;
            //显示动画 deviceIsIOS &&
            deviceIsIOS && opts.animate && this.$dialog.addClass(opts.animate);
            opts.androidAnimate && deviceIsAndroid && this.$dialog.addClass(opts.animate);

            //关闭按钮是否显示
            $.type(opts.closeBtn) === 'boolean' && opts.closeBtn || this.$close.hide();

            //title，没有内容就不显示
            opts.title ? this.$title.text(opts.title) : this.$title.hide();

            //內容是指定的选择器
            if (opts.dataSelector) {
                var dataTarget = $(opts.dataSelector);
                //取到多个的话 就只显示第一个
                dataTarget.length && dataTarget.first().length && this.$content.html(dataTarget.first()[0].outerHTML);
                //之前的 dataTarget是隐藏元素，这里将其显示出来
                this.$content.children().first().show();
                //内容是指定的html
            } else if (opts.html) {
                this.$content[typeof opts.html === 'object' ? 'append' : 'html'](opts.html);
            } else if (opts.content) {
                this.$content.text(opts.content);
            }

            //内容的ClassName
            opts.contentClassName && this.$content.addClass(opts.contentClassName);

            //显示阴影
            opts.shadow && this.$dialog.addClass('dialog_wrap_shadow');
            //opts.showLoading ===true && $loadDialog.prependTo(this.$content);
            return this;
        },
        initEvent: function() {
            var self = this,
                opts = this.options;
            this.$close.on('click', function(e) {
                self.close();
                return false;
            });
            //是否支持快捷关闭
            opts.quickClose && this.$pop.on('click', function() {
                self.close();
                return false;
            });
            return this;
        },
        show: function() {
            if (this.isShow) {
                return this;
            }
            var opts = this.options;
            //显示之前
            if (callFunc(opts.onbeforeshow, this.$dialog, opts)) {
                return this;
            }
            opts.isLock && this.lock();
            var $body = $('body');
            $body.append(this.$dialog);
            this.center();
            this.$dialog.addClass('dialog_wrap_show');
            //显示之后
            callFunc(opts.onshow, this.$dialog, opts);
            deviceIsAndroid && setTimeout(function() {
                var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (iScrollTop == 0) {
                    //window.scrollTo(0, 1);
                } else {
                    window.scrollTo(0, iScrollTop - 1);
                }
            }, 0);
            this.isShow = true;
            //延时自动关闭
            (opts.times | 0) > 0 && setTimeout($.proxy(this.close, this), opts.times);
            return this;
        },
        close: function() {
            var self = this,
                opts = this.options,
                remove = function() {
                    //$('.dialog_wrap').remove();
                    self.$dialog.remove();
                    opts.isLock && self.unLock();
                    //关闭之后
                    callFunc(opts.onclose, self.$dialog, opts);
                };
            //关闭之前
            if (callFunc(opts.onbeforeclose, this.$dialog, opts)) {
                return this;
            }
            //不是ios设备 或者没有设置关闭动画
            if (!deviceIsIOS || !opts.closeAnimate) {
                remove();
                return this;
            }
            this.$dialog.removeClass(opts.animate).addClass(opts.closeAnimate).on(this.getAnimateEnd(), $.proxy(remove, this));
            return this;
        },
        lock: function() {
            var $body = $('body'),
                $popMask = $body.find('.pop_dialog_mask');
            $popMask.length && $popMask.remove();
            //不允许滑动
            this.$pop.appendTo($body).on('touchmove', function() {
                return false;
            });
            return this;
        },
        unLock: function() {
            var $popMask = $('body').find('.pop_dialog_mask');
            $popMask.length && $popMask.remove();
            return this;
        },
        getAnimateEnd: function() {
            var eventName = {
                    AnimationEvent: 'animationend',
                    WebKitAnimationEvent: 'webkitAnimationEnd'
                },
                animationend;
            for (var name in eventName) {
                if (/object|function/.test(typeof window[name])) {
                    animationend = eventName[name]
                    break
                }
            }
            return animationend;
        },
        // 居中浮层
        center: function() {
            var popup = this.$dialog;
            var style = popup[0].style;
            var $window = $(window);
            var $document = $(document);
            var fixed = this.fixed;
            var dl = fixed ? 0 : document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            var dt = fixed ? 0 : document.documentElement.scrollTop || document.body.scrollTop || 0;
            var ww = $window.width();
            var wh = $window.height();
            var ow = popup.width();
            var oh = popup.height();
            //当弹出层宽度较大的时候
            if (ow >= ww - 20) {
                ow = ww - 30; //30是padding这里是写死的
                //var padding=parseInt(getComputedStyle(popup[0]).paddingLeft)+parseInt(getComputedStyle(popup[0]).paddingRight);
                popup.width(ow);
            }
            //当弹出层的高度很到的时候
            if (oh >= wh - 20) {
                popup.css({
                    'position': 'absolute',
                    'margin-top': '15px',
                    'margin-bottom': '30px'
                });
            }
            var left = (ww - ow) / 2; //+ dl
            var top = (wh - oh) * 382 / 1000; // 黄金比例 + dt
            style.left = Math.max(left | 0, dl) + 'px';
            style.top = Math.max(top | 0, dt) + 'px';
        }
    });
    var popDialog = function(opts) {
        return new dialog(opts);
    };
    return popDialog;
}));
