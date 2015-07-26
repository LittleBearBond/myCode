/*
 * Winxin.Js
 * author xj
 *version 1.0
 */
(function(win) {
    win.dj = win.dj || {};
    var dj = win.dj,
        data = {},
        extend = function(src, data) {
            src = src || {};
            data = data || {};
            for (var d in data) {
                src[d] = data[d];
            }
            return src;
        };
    dj.setPageData = function(obj) {
        data = extend(data, obj);
    };
    dj.getPageData = function(attr) {
        return attr ? data[attr] : data;
    };
    var pageData = dj.getPageData;
    // 微信分享
    var Weixin = {
        init: function() {
            Weixin.getAppId();
            var elHtml = document.getElementsByTagName('html')[0];

            //隐藏微信底部导航栏
            Weixin[elHtml.getAttribute('nobar') === 'true' ? 'hideToolbar' : 'showToolbar']();

            //隐藏微信右上角按钮
            Weixin[elHtml.getAttribute('hideMenu') === 'true' ? 'hideOptionMenu' : 'showOptionMenu']();

            // 发送给好友
            WeixinJSBridge['on']('menu:share:appmessage', Weixin.shareFriend);
            // 分享到朋友圈
            WeixinJSBridge['on']('menu:share:timeline', Weixin.shareTimeline);
            // 分享到微博
            WeixinJSBridge['on']('menu:share:weibo', Weixin.shareWeibo);
            // 邮件分享
            WeixinJSBridge['on']('menu:share:email', Weixin.shareEmail);
        },
        // 获取addID
        getAppId: function() {
            Weixin.appid = dj.getPageData('appID') || '';
        },
        getResource: function() {
            var elMetas = document.getElementsByTagName('meta'),
                len = elMetas.length,
                i = 0,
                result = {},
                el, propertyVal, reg = /^og:([^\s]+)/i;
            for (; i < len; i++) {
                el = elMetas[i];
                propertyVal = el.getAttribute('property') || '';
                match = propertyVal.match(reg);
                if (propertyVal && match) {
                    result[match[1]] = el.getAttribute('content') || ''
                }
            }
            var $link = result.url || location.href.replace('djshare=1', '');
            $link = $link.indexOf('?') != -1 ? $link + '&xtjtr=' + (+new Date()) : $link + '?xtjtr=' + (+new Date());
            return {
                'img_url': result.image || '',
                'img_width': '640',
                'img_height': '640',
                'link': $link,
                'desc': result.description || document.title || '',
                'title': result.title || document.title || ''
            };
        },
        getResourceWeibo: function() {
            var opts = Weixin.getResource();
            return {
                'img_url': opts.img_url,
                'url': opts.$link,
                'content': opts.desc,
                'title': opts.title
            };
        },
        getResourcePerson: function() {
            return Weixin.getResource();
        },
        getResourceEmail: function() {
            var opts = Weixin.getResource();
            return {
                'title': opts.title,
                'content': opts.desc
            };
        },
        // 发送给好友
        shareFriend: function() {
            WeixinJSBridge.invoke('sendAppMessage', extend(Weixin.getResourcePerson(), {
                    'appid': Weixin.appid
                }),
                function(res) {
                    Weixin.report('send_msg', res.err_msg, 'shareFriend');
                }
            );
        },
        // 分享到朋友圈
        shareTimeline: function() {
            WeixinJSBridge.invoke('shareTimeline', Weixin.getResource(),
                function(res) {
                    Weixin.report('send_msg', res.err_msg, 'shareTimeline', res);
                }
            );
        },
        // 分享到微博
        shareWeibo: function() {
            WeixinJSBridge.invoke('shareWeibo', Weixin.getResourceWeibo(),
                function(res) {
                    Weixin.report('send_msg', res.err_msg, 'shareWeibo');
                }
            );
        },
        // 分享邮箱
        shareEmail: function() {
            var data = Weixin.getResourceEmail();
            WeixinJSBridge.invoke('sendEmail', {
                    'title': data['title'],
                    'content': data['content'] + '\n' + document.documentURI
                },
                function(res) {
                    Weixin.report('send_msg', res.err_msg, 'shareEmail');
                }
            );
        },
        report: function(type, msg, shareType) {
            var result = msg.split(':')[1];
            var funSuccess = pageData('i-weixin-share-success-callback');
            if (/^(confirm|send|ok)$/.test(result)) {
                Weixin.shareSuccess && Weixin.shareSuccess(shareType);
                funSuccess && funSuccess(shareType);
            }
            /(:fail)$/.test(msg) && Weixin.shareFail();
            /(:cancel)$/.test(msg) && Weixin.shareCancel();
        },
        // 分享成功后的记录分享
        shareSuccess: function(shareType) {
            var sucData = pageData('weixin-share-success');
            if (sucData && sucData.url) {
                shareType && (sucData.data.shareType = shareType);
                //如果有回调执行必须引入zepto.js， 默认是没有引入的
                $ && $.ajax({
                    url: sucData.url,
                    type: sucData.ajaxType,
                    data: sucData.data,
                    dataType: 'json',
                    success: function() {},
                    error: function() {}
                });
            }
        },
        /*发送失败*/
        shareFail: function(res) {
            var sucData = pageData('weixin-share-fail');
            sucData && typeof sucData === 'function' && sucData(res);
        },
        /*用户取消*/
        shareCancel: function(res) {
            var sucData = pageData('weixin-share-cancel');
            sucData && typeof sucData === 'function' && sucData(res);
        },
        /**
         * 关闭当前微信公众平台页面
         */
        closeWindow: function() {
            WeixinJSBridge.call("closeWindow");
        },
        /**
         * 返回如下几种类型：
         * network_type:wifi     wifi网络
         * network_type:edge     非wifi,包含3G/2G
         * network_type:fail     网络断开连接
         * network_type:wwan     2g或者3g
         */
        getNetworkType: function(callback) {
            if (callback && typeof callback == 'function') {
                WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                    var m = e.err_msg.match(/:([^\s]+)$/);
                    callback(m[1]);
                });
            }
        },
        /**
         * 调起微信Native的图片播放组件。
         * 这里必须对参数进行强检测，如果参数不合法，直接会导致微信客户端crash
         *
         * @param {String} curSrc 当前播放的图片地址
         * @param {Array} srcList 图片地址列表
         */
        imagePreview: function(curSrc, srcList) {
            if (!curSrc || !srcList || !srcList.length) {
                return;
            }
            WeixinJSBridge.invoke('imagePreview', {
                'current': curSrc,
                'urls': srcList
            });
        },
        /**
         * 显示网页右上角的按钮
         */
        showOptionMenu: function() {
            WeixinJSBridge.call('showOptionMenu');
        },
        /**
         * 隐藏网页右上角的按钮
         */
        hideOptionMenu: function() {
            WeixinJSBridge.call('hideOptionMenu');
        },
        /**
         * 显示底部工具栏
         */
        showToolbar: function() {
            WeixinJSBridge.call('showToolbar');
        },
        /**
         * 隐藏底部工具栏
         */
        hideToolbar: function() {
            WeixinJSBridge.call('hideToolbar');
        }
    };
    if (typeof window.WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', Weixin.init, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', Weixin.init);
            document.attachEvent('onWeixinJSBridgeReady', Weixin.init);
        }
    } else {
        Weixin.init();
    }
    win['Weixin'] = Weixin;
})(window);