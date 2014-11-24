/*
 * ========================================================================
 * Copyright(c) 2012-2014 成都网席科技有限公司, All Rights Reserved.
 * ========================================================================
 *
 * 输入框自动补全插件 JQuery实现版，对网上的开源版本进行改造而成
 *
 * 作者：[熊建 xj]   时间：2013/12/09
 * 文件名：InputSuggest.js
 * 版本：V1.0.0
 *
 * 修改者：           时间：
 * 修改说明：
 * ========================================================================
 */
;
((function($) {
    //显示提示信息的DIV
    function inputSuggest(opt) {
            opt = opt || {};
            this.win = null;
            this.doc = null;
            this.container = null;
            this.items = null;
            this.input = opt.input || null;
            this.containerClass = opt.containerClass || 'suggest-container';
            this.itemClass = opt.itemClass || 'suggest-item';
            this.activeClass = opt.activeClass || 'suggest-active';
            this.width = opt.width;
            this.opacity = opt.opacity;
            this.data = opt.data || ['qq.com', '163.com', 'sina.cn', 'foxmail.com', 'live.com', 'hotmail.com'];
            this.active = null;
            this.visible = false;
            this.init();
        }
        //原型扩展
    inputSuggest.prototype = {
        init: function() {
            this.win = window;
            this.doc = window.document;
            this.container = this.doc.createElement('div');
            this.attr(this.container, 'class', this.containerClass);
            this.doc.body.appendChild(this.container);
            this.setPos(); //设置位置
            var _this = this,
                input = this.input;

            //绑定文本框的keyup  和keydown 时间
            this.on(input, 'keyup', function(e) {
                input.value ? _this.onKeyup(e) : _this.hide();
            });
            // blur会在click前发生，这里使用mousedown
            this.on(input, 'blur', function(e) {
                _this.hide();
            });
            this.onMouseover();
            this.onMousedown();
            this.windowResize();
        },
        setPos: function() {
            var input = this.input,
                pos = this.getPos(input),
                brow = this.brow,
                width = this.width,
                opacity = this.opacity,
                container = this.container;
                container.style.cssText = 'position:absolute;overflow:hidden;left:' + pos[0] + 'px;top:' + (pos[1] + input.offsetHeight) + 'px;width:'
                // IE6/7/8/9/Chrome/Safari input[type=text] border默认为2，Firefox为1，因此取offsetWidth-2保证与FF一致
                + (brow.ff ? input.clientWidth : input.offsetWidth - 2) + 'px;';
            if (width) {
                container.style.width = width + 'px';
            }
            if (opacity) {
                if (this.brow.ie) {
                    container.style.filter = 'Alpha(Opacity=' + opacity * 100 + ');';
                } else {
                    container.style.opacity = (opacity == 1 ? '' : '' + opacity);
                }
            }
        },
        getPos: function(el) {
            var pos = [0, 0],
                a = el;
            if (el.getBoundingClientRect) {
                var box = el.getBoundingClientRect();
                pos = [box.left, box.top];
            } else {
                while (a && a.offsetParent) {
                    pos[0] += a.offsetLeft;
                    pos[1] += a.offsetTop;
                    a = a.offsetParent;
                }
            }
            return pos;
        },
        windowResize: function() {
            var _this = this;
            window.onresize = function() {
                _this.setPos.call(_this);
            };
        },
        show: function() {
            this.container.style.visibility = 'visible';
            this.visible = true;
        },
        hide: function() {
            this.container.style.visibility = 'hidden';
            this.visible = false;
        },
        brow: function(ua) {
            return {
                version: ua.match(/(?:firefox|opera|safari|chrome|msie)[\/: ]([\d.]+)/)[1],
                ie: /msie/.test(ua) && !/opera/.test(ua), //匹配IE浏览器
                op: /opera/.test(ua), //匹配Opera浏览器
                sa: /version.*safari/.test(ua), //匹配Safari浏览器
                ch: /chrome/.test(ua), //匹配Chrome浏览器
                ff: /firefox/.test(ua) && !/webkit/.test(ua) //匹配Firefox浏览器
            };
        }(navigator.userAgent.toLowerCase()),
        onKeyup: function(e) {
            var container = this.container,
                input = this.input,
                iCls = this.itemClass,
                aCls = this.activeClass;
            if (this.visible) {
                switch (e.keyCode) {
                    case 13: // Enter
                        if (this.active) {
                            input.value = this.active.firstChild.data;
                            this.hide();
                        }
                        return;
                    case 38: // 方向键上
                        if (!this.active) {
                            this.active = container.lastChild;
                            this.attr(this.active, 'class', aCls);
                            input.value = this.active.firstChild.data;
                        } else {
                            if (this.active.previousSibling != null) {
                                this.attr(this.active, 'class', iCls);
                                this.active = this.active.previousSibling;
                                this.attr(this.active, 'class', aCls);
                                input.value = this.active.firstChild.data;
                            } else {
                                this.attr(this.active, 'class', iCls);
                                this.active = null;
                                input.focus();
                                input.value = input.getAttribute("curr_val");
                            }
                        }
                        return;
                    case 40: // 方向键下
                        if (!this.active) {
                            this.active = container.firstChild;
                            this.attr(this.active, 'class', aCls);
                            input.value = this.active.firstChild.data;
                        } else {
                            if (this.active.nextSibling != null) {
                                this.attr(this.active, 'class', iCls);
                                this.active = this.active.nextSibling;
                                this.attr(this.active, 'class', aCls);
                                input.value = this.active.firstChild.data;
                            } else {
                                this.attr(this.active, 'class', iCls);
                                this.active = null;
                                input.focus();
                                input.value = input.getAttribute("curr_val");
                            }
                        }
                        return;
                }

            }
            if (e.keyCode == 27) { // ESC键
                this.hide();
                input.value = this.attr(input, 'curr_val');
                return;
            }
            if (~input.value.indexOf('@')) {
                return;
            } //已经选中一次
            this.items = [];
            if (this.attr(input, 'curr_val') != input.value) {
                this.container.innerHTML = '';
                for (var i = 0, len = this.data.length; i < len; i++) {
                    var item = document.createElement('div');
                    item.className = item.className || '';
                    item.className += (item.className).indexOf(this.itemClass) != -1 ? '' : this.itemClass;
                    item.innerHTML = ~this.data[i].indexOf('@') ? input.value + this.data[i] : input.value + '@' + this.data[i];
                    this.items[i] = item;
                    //可优化 一次性拼接html方法
                    this.container.appendChild(this.items[i]);
                }
                this.attr(input, 'curr_val', input.value);
            }
            this.show();
        },
        attr: function(el, name, val) {
            if (!val) {
                return el.getAttribute(name);
            } else {
                return el.setAttribute(name, val),
                    name == 'class' && (el.className = val),
                    el;
            }
        },
        on: function(el, type, fn) {
            el.addEventListener ? el.addEventListener(type, fn, false) : el.attachEvent('on' + type, fn);
        },
        off: function(el, type, fn) {
            el.removeEventListener ? el.removeEventListener(type, fn, false) : el.detachEvent('on' + type, fn);
        },
        onMouseover: function() {
            var _this = this,
                icls = this.itemClass,
                acls = this.activeClass;
            this.on(this.container, 'mouseover', function(e) {
                var target = e.target || e.srcElement;
                if (target.className == icls) {
                    if (_this.active) {
                        _this.active.className = icls;
                    }
                    target.className = acls;
                    _this.active = target;
                }
            });
        },
        onMousedown: function() {
            var _this = this;
            this.on(this.container, 'mousedown', function(e) {
                var target = e.target || e.srcElement;
                _this.input.value = target.innerHTML;
                _this.hide();
            });
        }
    };
    //做成JQuery扩展
    $.fn.InputSuggest = function(opt) {
        opt = opt || {};
        opt.input = opt.input || $(this)[0];
        return opt.input ? new inputSuggest(opt) : null;
    };
})($));
