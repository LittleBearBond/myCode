/* @grunt-build */

/**
 * author           xj
 * @date            2015-08-04 16:00:49
 * @email           xj_bond@live.com
 * @description
 */
((function(root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(factory); // AMD
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        factory(); // 浏览器全局变量(root 即 window)
    }
})(window, function() {
    var app = function(args) {
            this.init(args);
        },
        //default setting
        options = {
            imgAttr: 'data-src',
            dataSaveAttr: 'hasloaded',
            //scroll延迟处理时间为50
            times: 50,
            //当元素在屏幕中多少像素是才显示
            showDis: 180
        };

    $.extend(app.prototype, {
        init: function(opts) {
            var self = this;
            this.opts = $.extend(true, {}, options, opts || {});
            return self.initView().initEvent();
        },
        initView: function() {
            var self = this;
            $.each({
                $cr: '#cr',
                $win: window,
                $doc: document
            }, function(key, sel) {
                self[key] = $(sel);
            });
            this.$conbxs = this.$cr.find('>.conbx1');
            return this;
        },
        initEvent: function() {
            this.$cr.on('mouseover', '.conbx1 .tabtit1>span', $.proxy(this.processTabImg, this));
            this.initLoadImgs();
            this.$win.trigger('scroll.navEffect');
            return this;
        },
        //滚动滚动条的时候判断图片是否在可视区域，如果在做相关操作
        initLoadImgs: function() {
            var self = this,
                handler = function() {
                    var wh = this.$win.height();
                    var st = this.$win.scrollTop(),
                        curr = [],
                        $curr, top, dis, $this, minDis, min = 2000;
                    //找到可是区域中的conbx1
                    self.$conbxs.each(function() {
                        $this = $(this);
                        top = $this.offset().top;
                        dis = top - st;
                        //在屏幕可视区域中的元素
                        dis >= -180 && dis <= (wh - self.opts.showDis) && curr.push($this);
                    });
                    $.each(curr, function(index, item) {
                        $curr = $(item);
                        //已经处理过图片路径
                        if ($curr.data(self.opts.dataSaveAttr)) {
                            return;
                        }
                        $curr.find('.tabcon').filter(':visible')
                            .find('img[' + self.opts.imgAttr + ']').each(function() {
                                self.loadImg(this);
                            });
                        $curr.data(self.opts.dataSaveAttr, true);
                    });
                };

            this.$win.on('scroll.navEffect', function() {
                clearTimeout(self.timmer);
                self.timmer = setTimeout($.proxy(handler, self), self.opts.times);
            });
        },
        //tab切换，不用计算是否在可视区域，事件大多都发生在可视区域
        processTabImg: function(e) {
            //检验是否已经处理过突破的路径
            //处理图片路径
            //搞定
            //设置相关状态
            var $el = $(e.currentTarget);
            //已经处理过图片路径
            if ($el.data(this.opts.dataSaveAttr)) {
                return;
            }
            //找到对我们需要的相关DOM元素
            var self = this,
                $p = $el.closest('.conbx1'),
                $spans = $p.find('.tabtit1>span'),
                $tabcons = $p.find('>.tabcon'),
                index = $spans.index($el),
                $currentCon = $tabcons.eq(index),
                $imgs = $currentCon.find('img[' + this.opts.imgAttr + ']');
            //没有相关元素返回
            if (!$currentCon.length || !$imgs.length) {
                return;
            }
            //循环--处理这些图片
            $imgs.each(function() {
                self.loadImg(this);
            });
            //设置已经处理过，标记一下
            $el.data(this.opts.dataSaveAttr, true);
        },
        loadImg: function(obj) {
            var self = this,
                $currImg = $(obj);
            var src = $currImg.attr(this.opts.imgAttr);
            if (src) {
                //当独去加载这张图片，加载完成再显示到页面上，并且移除自定义的属性
                //可以不用加载完成再去操作
                ((function(s, $img) {
                    var newImg = new Image;
                    newImg.onload = function() {
                        $img[0].src = this.src;
                        $img.removeAttr(self.opts.imgAttr);
                    };
                    newImg.src = s;
                })(src, $currImg));
            }
        }
    });
    $(function(args) {
        new app(args || {});
    });
    return app;
}));
