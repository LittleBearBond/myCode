/*
* 提示加载动画 loading……
*author xj
*20140506 弹出提示层
*/
(function (root, factory) {
    // Set up loadingDialog appropriately for the environment. Start with AMD.
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory((root.jQuery || root.Zepto || root.ender || root.$), {});
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return factory($, {});
        });
    } else {
        root.loadingDialog = factory((root.jQuery || root.Zepto || root.ender || root.$), {});
    }
    // ReSharper disable once ThisInGlobalContext
}(typeof window !== "undefined" ? window : this, function ($, loadingDialog) {
    'use strict';
    var reszieTimmer, template;
    //设置模板的数据
    function setTemplate(opts) {
        opts = opts || $.loadingDialog.defaults;
        var temp = '<div class="' + opts.loadingClass + '">                                           ' +
                            '<div id="loading-circular">                                                           ' +
                            '     <div></div>  ' +
                            '     <div></div>  ' +
                            '     <div></div>  ' +
                            '     <div></div>  ' +
                            '     <div></div>  ' +
                            '     <div></div>  ' +
                            '     <div></div>  ' +
                            '     <div></div>  ' +
                            '     <div class="clearfix"></div>                                                    ' +
                            '    </div>                                                                                        ' +
                            '   <span class="' + opts.loadingTextClass + '">' + opts.loadingText + '</span>' +
                            '   </p></div>';
        template = temp; //缓存这个对象
        return temp;
    }

    /*
    *设置对象到屏幕中心位置，这里不计算scroll的高度和宽度
    */
    function setObjToCenter(obj) {
        if (!obj) { return obj; }
        var $obj = $(obj),
                $win = $(window),
                top = ($win.height() - $obj.height()) / 2,
                left = ($win.width() - $obj.width()) / 2;
        $obj.css({ left: left, top: top });
        return $obj;
    }
    /*
    *绑定window resize scroll事件  调整对话框的位置
    */
    function resize() {
        $(window).on('resize'/*scroll*/, function () {
            var $loadingDialog = $('.loadingDialog');
            if (!$loadingDialog) { return; }
            reszieTimmer && clearTimeout(reszieTimmer);
            reszieTimmer = setTimeout(function () {
                setObjToCenter($loadingDialog);
            }, 10);
        });
    }

    $.loadingDialog = function (opts) {
        if ($.type(opts) === 'string') {
            opts = $.extend({}, $.loadingDialog.defaults, { loadingText: opts });
        } else {
            opts = $.extend({}, $.loadingDialog.defaults, opts || {});
        }
        //遮罩层
        var $loadDiv = $('<div class="loading-masklayer"></div>'),
                $load = $(setTemplate(opts)),
                $body = $('body');
        //先移除之前的
        $.loadingDialog.remove();
        //把遮罩层和提示框模板都append到body上
        opts.hasOwnProperty('locked') && opts.locked && $body.append($loadDiv);
        $body.append($load);
        //设置位置
        setObjToCenter($load);
        //显示
        $.loadingDialog.show();
        //监听window 的resize scroll事件
        resize();
        //如果设置动画过期时间
        if (!opts.timeOut || opts.timeOut <= 0) {
            return;
        }
        setTimeout(function () { $.loadingDialog.remove(); }, opts.timeOut);
    };

    function showOrRemove(flag) {
        var $masklayer = $('.loading-masklayer'), $loadingDialog = $('.loadingDialog');
        if (flag === 'show') {
            $masklayer && $masklayer.show();
            $loadingDialog && $loadingDialog.show();
        } else {
            $masklayer && $masklayer.fadeOut(function () { $masklayer.remove(); });
            $loadingDialog && $loadingDialog.fadeOut(function () { $loadingDialog.remove(); });
        }
    }

    //显示动画
    $.loadingDialog.show = function () {
        showOrRemove('show');
    }

    //隐藏动画
    $.loadingDialog.remove = function () {
        showOrRemove('remove');
    }

    /* Setup plugin defaults */
    $.loadingDialog.defaults = {
        loadingClass: 'loadingDialog', //加载框的class
        loadingTextClass: 'loadingTextClass', // 文字的class
        loadingText: 'loading', // 加载时显示的文本
        timeOut: 0, //时间设置为0,将一直存在不消失，如果设置具体时间，将在指定时间自动消失,时间单位毫秒
        locked: true//是否弹出遮罩层，锁定用户操作,默认是锁定
    };
    loadingDialog = $.loadingDialog;
    return loadingDialog;
}));
