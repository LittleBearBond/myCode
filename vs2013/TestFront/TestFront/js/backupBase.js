; (function (exports) {
    exports['dj'] = exports['dj'] || {};
    var data = {};
    exports['dj']['setPageData'] = function (obj) {
        data = $.extend({}, data, obj);
    };
    exports['dj']['getPageData'] = function (attr) {
        return attr ? data && data[attr] : data;
    };
    //提示弹层
    exports['dj']['iAlert'] = function (msg, hiddenTime) {
        var msgBox = createLayer(msg);
        var pMsgbox = $('#J_dj_tip_layer');
        var milliseconds = hiddenTime * 1000 || 3000; //弹层隐藏的时间 单位：秒 默认2s
        if (pMsgbox[0]) {
            pMsgbox.remove();
        }
        $('body').append(msgBox);
        var ele = $(msgBox).find('span');
        resertLayer(ele);
        alertHide(msgBox, milliseconds);
    };
    var alertTimer = null;
    //创建弹层
    var createLayer = function (msg) {
        var msgBox = document.createElement('div');
        msgBox.id = 'J_dj_tip_layer';
        msgBox.className = 'dj-res-tip-layer';
        msgBox.innerHTML = '<p><span>' + msg + '</span></p>';
        return msgBox;
    };
    // 重设弹层位置
    var resertLayer = function (ele) {
        var $width = '-' + ele.width() / 2 + 'px';
        var $height = '-' + ele.height() / 2 + 'px';
        ele.css({
            'position': 'absolute',
            'margin-top': $height,
            'margin-left': $width,
            'visibility': 'visible' // display为none取不到高宽
        });

    };
    // 弹层自动关闭
    var alertHide = function (dom, milliseconds) {
        clearTimeout(alertTimer);
        alertTimer = setTimeout(function () {
            $(dom).remove();
        }, milliseconds);
    };
    // 添加姓名验证
    $(function () {
        if (!$.validate) return;
        $.validate.fun.name = function () {
            var tool = $.validate;
            var $this = $(this);
            var value = tool.trim($this.val());
            var isChinese = /^([\u4e00-\u9fa5])+$/.test(value);
            var isEnglist = /^([a-zA-Z\s])+$/.test(value);
            function setError(str) {
                $this.attr('data-regerr', str);
            }
            if (isChinese) {
                if (!/^.{2,5}$/.test(value)) {
                    setError('请填写真实姓名(2-5汉字)');
                    return false;
                } else {
                    return true;
                }
            }
            if (isEnglist) {
                if (!/^.{2,15}$/.test(value)) {
                    setError('请填写真实姓名(2-15英文)');
                    return false;
                } else {
                    return true;
                }
            }
            setError('请填写真实姓名(2-5汉字)');
            return false;
        };
    });

    // share蒙板
    $(function () {
        /* by fei.yang */
        var view = {};
        var viewInit = function () {
            view.shareBtn = $('.J_pageShareLayer'); // 引导分享的按钮
            view.body = $('body');
        };
        // 分享弹层的html
        var shareLayerHtml = function (hasPacket) {
            var ph = '<p class="dj-item-words t-step">3、坐等收红包啦！</p>';
            var layerHtml = '<span class="dj-guide-mark"></span>\
                        <div class="dj-words-guide">\
                          <p class="dj-item-words f-step">1、点击右上角按钮</p>\
                          <p class="dj-item-words s-step">2、点击发送给好友<br>或发送到微信群</p>%packetHTML%\
                        </div>';
            if (hasPacket) ph = '';
            layerHtml = layerHtml.replace('%packetHTML%', ph);
            return layerHtml;
        };
        // 将弹层的容器先添加到页面中
        var addLayerBox = function () {
            viewInit();
            if (view.shareBtn[0]) {
                view.mask = $('<div class="dj-share-guide"></div>');
                LayerBindEvent();
            } else {
                return;
            }
        };
        // 弹层插入页面中
        var showLayer = function (layerInner) {
            view.mask.empty().append(layerInner);
            view.body.append(view.mask);
            view.mask.show();
        };
        // 弹层上的时间绑定
        var LayerBindEvent = function () {
            view.shareBtn.on('click', function (e) {
                e.preventDefault();
                var self = $(this);
                var hasPacket = self.data('packet') == 'no-packet' ? true : false;
                var shareLayer = shareLayerHtml(hasPacket);
                showLayer(shareLayer);
            });
            view.mask.on('touchmove', function (e) {
                e.preventDefault();
            }).on('click', function () {
                view.mask.remove();
            });
            exports['dj']['setPageData']({
                'i-weixin-share-success-callback': function () {
                    view.mask.remove();
                }
            });
        };
        addLayerBox(); // 初始化弹层逻辑
        function useHack2xiaomi() {
            var ua = navigator.userAgent.toLocaleLowerCase();
            // 小米中的微信浏览器或者原生浏览器
            var isXiaomi = /\bmi\b/.test(ua) && (ua.indexOf('xiaomi') != -1 || ua.indexOf('micromessenger') != -1);
            return isXiaomi;
        }

        // 小米 fixed的宽度横屏后不能自适应
        if (useHack2xiaomi()) {
            $(window).on('resize', function () {
                $('.i-share-mask').css('width', '99.5%');
                setTimeout(function () {
                    $('.i-share-mask').css('width', '100%');
                }, 0);
            });
        }
    });

    // 微信分享
    var Weixin = {
        init: function () {
            this.getAppId();
            document.addEventListener('WeixinJSBridgeReady', function () {
                //隐藏微信底部导航栏
                if (document.getElementsByTagName('html')[0].getAttribute('nobar') === 'true') {
                    WeixinJSBridge.call('hideToolbar');
                } else {
                    WeixinJSBridge.call('showToolbar');
                }
                //隐藏微信右上角按钮
                if ($('#hideMenu')[0]) {
                    WeixinJSBridge.call('hideOptionMenu');
                } else {
                    WeixinJSBridge.call('showOptionMenu');
                }
                var weixinJSBridge = WeixinJSBridge;
                // 发送给好友
                weixinJSBridge['on']('menu:share:appmessage', Weixin.shareFriend);
                // 分享到朋友圈
                weixinJSBridge['on']('menu:share:timeline', Weixin.shareTimeline);
                // 分享到微博
                weixinJSBridge['on']('menu:share:weibo', Weixin.shareWeibo);
                // 邮件分享
                weixinJSBridge['on']('menu:share:email', Weixin.shareEmail);
            });
        },
        // 获取addID
        getAppId: function () {
            this.appid = dj.getPageData('appID') || '';
        },
        getResource: function () {
            var $link = $('meta[property="og:url"]').attr('content') || location.href.replace('djshare=1', '');
            $link = $link.indexOf('?') != -1 ? $link + '&xtjtr=' + (+new Date()) : $link + '?xtjtr=' + (+new Date());
            return {
                'img_url': $('meta[property="og:image"]').attr('content') || '',
                'img_width': '640',
                'img_height': '640',
                'link': $link,
                'desc': $('meta[property="og:description"]').attr('content') || document.title || '',
                'title': $('meta[property="og:title"]').attr('content') || document.title || ''
            };
        },
        getResourceWeibo: function () {
            var $link = $('meta[property="og:url"]').attr('content') || location.href.replace('djshare=1', '');
            $link = $link.indexOf('?') != -1 ? $link + '&xtjtr=' + (+new Date()) : $link + '?xtjtr=' + (+new Date());
            return {
                'img_url': $('meta[property="og:image"]').attr('content') || '',
                //        'img_width': '640',
                //        'img_height': '640',
                'url': $link,
                'content': $('meta[property="og:description"]').attr('content') || document.title || '',
                'title': $('meta[property="og:title"]').attr('content') || document.title || ''
            };
        },
        getResourcePerson: function () {
            var $link = $('meta[property="og:url"]').attr('content') || location.href.replace('djshare=1', '');
            $link = $link.indexOf('?') != -1 ? $link + '&xtjtr=' + (+new Date()) : $link + '?xtjtr=' + (+new Date());
            return {
                'img_url': $('meta[property="og:image"]').attr('content') || '',
                'img_width': '640',
                'img_height': '640',
                'link': $link,
                'desc': $('meta[property="og:description"]').attr('content') || document.title || '',
                'title': $('meta[property="og:title"]').attr('content') || document.title || ''
            };
        },
        getResourceEmail: function () {
            return {
                'title': $('meta[property="og:title"]').attr('content') || document.title || '',
                'content': $('meta[property="og:content"]').attr('content') || document.title || ''
            };
        },
        // 发送给好友
        shareFriend: function () {
            var data = Weixin.getResourcePerson();
            WeixinJSBridge.invoke('sendAppMessage', $.extend(data, { 'appid': Weixin.appid }),
                function (res) {
                    Weixin.report('send_msg', res.err_msg);
                }
            );
        },
        // 分享到朋友圈
        shareTimeline: function () {
            var data = Weixin.getResource();
            WeixinJSBridge.invoke('shareTimeline', data,
                function (res) {
                    Weixin.report('send_msg', res.err_msg);
                }
            );
        },
        // 分享到微博
        shareWeibo: function () {
            var data = Weixin.getResourceWeibo();
            WeixinJSBridge.invoke('shareWeibo', data,
                function (res) {
                    Weixin.report('send_msg', res.err_msg);
                }
            );
        },
        // 分享邮箱
        shareEmail: function () {
            var data = Weixin.getResourceEmail();
            WeixinJSBridge.invoke('sendEmail', {
                'title': data['title'],
                'content': data['content'] + '\n' + document.documentURI
            },
                function (res) {
                    Weixin.report('send_msg', res.err_msg);
                }
            );
        },
        report: function (type, msg) {
            var result = msg.split(':')[1];
            var funSuccess = exports['dj']['getPageData']('i-weixin-share-success-callback');
            if (/^(confirm|send|ok)$/.test(result)) {
                Weixin.shareSuccess && Weixin.shareSuccess();
                funSuccess && funSuccess();
            }
        },
        // 分享成功后的记录分享
        shareSuccess: function () {
            var sucData = exports['dj']['getPageData']('weixin-share-success');
            if (sucData && sucData.url) {
                $.ajax({
                    url: sucData.url,
                    type: sucData.ajaxType,
                    data: sucData.data,
                    dataType: 'json',
                    success: function () { },
                    error: function () { }
                });
            }
        }
    };
    Weixin.init();

    // 调用app 或者下载
    //页面调客户端
    var appLink = function () {
        var UA = navigator.userAgent,
            IsAndroid = (/Android|HTC/i.test(UA) || (window.navigator['platform'] + '').match(/Linux/i)),
            IsWeixin = /MicroMessenger/i.test(UA);
        var downloadLink = IsAndroid ? 'http://bcs.duapp.com/weikaapp/weika_dl.apk' : 'https://itunes.apple.com/app/wei-ka-neng-sao-tou-xiang/id805428016?ls=1&mt=8',
            appLink = IsAndroid ? 'vcard://android.client.launch' : 'weika://', //客户端链接
            openAppFn = function () {
                location.href = downloadLink;
            };
        if (IsWeixin) {
            var $mask = $('<div class="p-mask">');
            $('body').append($mask);
            $mask.on('touchmove', function (e) {
                e.preventDefault();
            }).on('click', function (e) {
                $mask.remove();
            });
        } else {
            //自动判断
            //创建一个隐藏的iframe，链接指向客户端
            var elFrame = $('<iframe src="' + appLink + '" frameborder="0" width="0" height="0" onload="location.href=\'' + downloadLink + '\'"></iframe>');
            elFrame.appendTo(document.body);
            //没有安装客户端，延时跳转商店
            setTimeout(openAppFn, 200);
        }
        return false;
    };
    var $doc = $(document);
    var funBlank = function () { };
    $doc.on('click', function (e) {
        if (e.target.getAttribute('getapp') || e.target.getAttribute('href') == 'getapp') {
            e.preventDefault();
            appLink();
        }
    });
    // 触发页面中元素的:active状态
    $doc.on('touchstart', funBlank);
    exports['i-appLink'] = appLink;

    // 防止表单重复提交
    $(function () {
        var clsDisabled = 'i-btn-disabled';
        $('form').on('submit', function (e) {
            var $btn = $('#jp-submit', this);
            $btn = $btn.length ? $btn : $('[for="fp-submit"]', this);
            if ($btn.hasClass(clsDisabled)) {
                e.preventDefault();
            } else {
                $btn.addClass(clsDisabled);
                setTimeout(function () {
                    $btn.removeClass(clsDisabled);
                }, 20000);
            }
        });
    });

})(window);