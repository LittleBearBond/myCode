/**
 * author           xj
 * @date            2015-09-10 16:37:15
 * @email           568915669@qq.com
 * @description
 */

//durationchange ended error firstplay fullscreenchange loadedalldata loadeddata loadedmetadata
//loadstart pause play progress seeked seeking timeupdate volumechange waiting resize

/*

var eventsArr = ['onabort', //script  在退出时运行的脚本。
        'oncanplay', //script  当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。
        'oncanplaythrough', //script  当媒介能够无需因缓冲而停止即可播放至结尾时运行的脚本。
        'ondurationchange', //script  当媒介长度改变时运行的脚本。
        'onemptied', //script  当发生故障并且文件突然不可用时运行的脚本（比如连接意外断开时）。
        'onended', //script  当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）。
        'onerror', //script  当在文件加载期间发生错误时运行的脚本。
        'onloadeddata', //script  当媒介数据已加载时运行的脚本。
        'onloadedmetadata', //script  当元数据（比如分辨率和时长）被加载时运行的脚本。
        'onloadstart', //script  在文件开始加载且未实际加载任何数据前运行的脚本。
        'onpause', //script  当媒介被用户或程序暂停时运行的脚本。
        'onplay', //script  当媒介已就绪可以开始播放时运行的脚本。
        'onplaying', //script  当媒介已开始播放时运行的脚本。
        'onprogress', //script  当浏览器正在获取媒介数据时运行的脚本。
        'onratechange', //script  每当回放速率改变时运行的脚本（比如当用户切换到慢动作或快进模式）。
        'onreadystatechange', //script  每当就绪状态改变时运行的脚本（就绪状态监测媒介数据的状态）。
        'onseeked', //script  当 seeking 属性设置为 false（指示定位已结束）时运行的脚本。
        'onseeking', //script  当 seeking 属性设置为 true（指示定位是活动的）时运行的脚本。
        'onstalled', //script  在浏览器不论何种原因未能取回媒介数据时运行的脚本。
        'onsuspend', //script  在媒介数据完全加载之前不论何种原因终止取回媒介数据时运行的脚本。
        'ontimeupdate', //script  当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。
        'onvolumechange', //script  每当音量改变时（包括将音量设置为静音）时运行的脚本。
        'onwaiting' //script  当媒介已停止播放但打算继续播放时（比如当媒介暂停已缓冲更多数据）运行脚本
    ];

    var propsArr = ['audioTracks', //返回表示可用音频轨道的 AudioTrackList 对象。
        'autoplay', //   设置或返回是否在就绪（加载完成）后随即播放视频。
        'buffered', //   返回表示视频已缓冲部分的 TimeRanges 对象。
        'controller', // 返回表示视频当前媒体控制器的 MediaController 对象。
        'controls', //   设置或返回视频是否应该显示控件（比如播放/暂停等）。
        'crossOrigin', //设置或返回视频的 CORS 设置。
        'currentSrc', // 返回当前视频的 URL。
        'currentTime', //设置或返回视频中的当前播放位置（以秒计）。
        'defaultMuted', //   设置或返回视频默认是否静音。
        'defaultPlaybackRate', //设置或返回视频的默认播放速度。
        'duration', //   返回视频的长度（以秒计）。
        'ended', //  返回视频的播放是否已结束。
        'error', //  返回表示视频错误状态的 MediaError 对象。
        'height', // 设置或返回视频的 height 属性的值。
        'loop', //   设置或返回视频是否应在结束时再次播放。
        'mediaGroup', // 设置或返回视频所属媒介组合的名称。
        'muted', //  设置或返回是否关闭声音。
        'networkState', //   返回视频的当前网络状态。
        'paused', // 设置或返回视频是否暂停。
        'playbackRate', //   设置或返回视频播放的速度。
        'played', // 返回表示视频已播放部分的 TimeRanges 对象。
        'poster', // 设置或返回视频的 poster 属性的值。
        'preload', //设置或返回视频的 preload 属性的值。
        'readyState', // 返回视频当前的就绪状态。
        'seekable', //   返回表示视频可寻址部分的 TimeRanges 对象。
        'seeking', //返回用户当前是否正在视频中进行查找。
        'src', //设置或返回视频的 src 属性的值。
        'startDate', //  返回表示当前时间偏移的 Date 对象。
        'textTracks', // 返回表示可用文本轨道的 TextTrackList 对象。
        'videoTracks', //返回表示可用视频轨道的 VideoTrackList 对象。
        'volume', // 设置或返回视频的音量。
        'width' //  设置或返回视频的 width 属性的值。
    ];
 */
((function(root, factory) {
    "use strict";
    /*if (typeof define === "function" && define.amd) {
        define(['videojs'], factory);
    } else {*/
    factory(root.videojs);
    /*}*/
})(window, function($) {
    var app = {},
        extend = function() {
            var args = arguments,
                o = args[0],
                len = args.length,
                curr;
            for (var j = 1; j < len; j++) {
                curr = args[j];
                for (var i in curr) {
                    curr.hasOwnProperty(i) && (o[i] = curr[i]);
                }
            }
            return o;
        },
        // 获取视频已经下载的时长
        getEnd = function(video) {
            var end = 0
            try {
                end = video.buffered().end(0) || 0
                    //转换为时常
                end = parseInt(end * 1000 + 1) / 1000
            } catch (e) {}
            return end
        };

    //相关默认数据 外部不可以修改
    var defaults = {
        //统计多少秒的加载时间
        time: 5,
        //预计视频缓冲time 这么长需要耗时,超过这个预计时间就应该是网上过慢
        bufferTime: 10 * 1000,
        //播放器是否在ios 中内联播放
        isInline: true
    };

    extend(app, {
        //默认设置，外部可以修改
        defaults: {
            playInlineAttr: 'webkit-playsinline'
        },
        init: function(id, opts) {
            if (!id) {
                console.warn('id is null');
                return;
            }
            this.opts = extend(defaults, opts || {});

            this.player = videojs(id);

            /*('loadeddata loadedmetadata loadstart progress')
            .split(' ').forEach(function(val, index) {
                player.on(val, (function(name) {
                    return function() {

                    }
                }(val)));
            });*/

            this.initEvent();
            self.hasRecord = false;

        },
        initEvent: function() {
            //第一次播放的时候才开始准备进行统计
            this.player.on('firstplay', this.initGetSpeed.bind(this));

            this.opts.isInline && this.player.el().querySelector('video').setAttribute(this.defaults.playInlineAttr, '');
        },
        initGetSpeed: function(video) {
            var self = this;
            var video = this.player;

            'loadeddata loadedmetadata loadstart progress'.split(/\s+/).forEach(function(val, index) {
                video.on(val, function() {
                    var currentTime = +new Date(),
                        //第一次这里self.startTime 是么有滴
                        loadTime = currentTime - self.startTime || 0,
                        currBufferedTime = getEnd(video);;

                    //首次初始话,第一次给定开始时间
                    if (!self.startTime) {
                        self.startTime = +new Date();
                        self.bufferedStart = getEnd(video);
                        return;
                    }

                    //加载时长已经超过我们的语气，证明很慢
                    if (loadTime > self.opts.bufferTime) {
                        console.warn('low low low');
                        return;
                    }

                    //加载时长还不到指定的秒数
                    //或者是已经记录过数据了，这里就返回
                    if (currBufferedTime - self.bufferedStart < self.opts.time || self.hasRecord) {
                        return;
                    }

                    //给个标记，表示数据已经记录过了
                    self.hasRecord = true;
                    //记录数据
                    console.log('加载' + self.opts.time + ' 秒，耗时：', loadTime);

                });
            });


            /*var timer = setInterval(function() {

                if (getEnd(video) < 10) {
                    return
                }
                console.log(+new Date() - self.currentTime);

                clearInterval(timer)
            }, 1000)*/
        }
    });

    var getDataHooks = {
        'firstplay': function(player) {
            return {

            };
        }
    };

    //数据统计相关
    extend(app, {
        initGetData:function () {

        },
        //收集数据
        collData: function(actionName) {
            var self = this;
            window.videoSetCollectionsData && window.videoSetCollectionsData({
                method: 'click', //点击事件
                videoaddress: self.currentSrc(), //当前视频地址
                actionName: actionName, //动作名称 播放
                nowPlayTime: self.currentTime() //当前视频播放时间
            });
        }
    })

    videojs.videoXdf = function(id, option) {
        app.init(id, option);
    };

}));
