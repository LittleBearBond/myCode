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
    factory();
    /*}*/
})(window, function() {

    //简单修复Object.keys
    Object.keys || (Object.keys = function(o) {
        if (o !== Object(o)) {
            throw new TypeError('Object.keys called on a non-object')
        }
        var k = [],
            p;
        for (p in o) {
            Object.prototype.hasOwnProperty.call(o, p) && k.push(p);
        }
        return k;
    });

    Function.prototype.bind || (Function.prototype.bind = function(context) {
        var fn = this;
        return function() {
            fn.apply(context, Array.prototype.slice.call(arguments));
        }
    });

    //statisticsData
    var statsData = {},
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
        },
        playerOpts = {
            children: {
                // bigPlayButton: false,
                // textTrackDisplay: false,
                // posterImage: false,
                // errorDisplay: false,
                controlBar: {
                    captionsButton: false,
                    chaptersButton: false,
                    subtitlesButton: false,
                    liveDisplay: false,
                    playbackRateMenuButton: false,
                    muteToggle: false,
                    volumeControl: false
                }
            }
        };

    //相关默认数据 外部不可以修改
    var defaults = {
        //统计多少秒的加载时间
        time: 5,
        //预计视频缓冲time 这么长需要耗时,超过这个预计时间就应该是网上过慢
        bufferTime: 5 * 2 * 1000,
        //播放器是否在ios 中内联播放
        isInline: true,
        //是否是调试状态
        isDebug: false
    };

    extend(statsData, {
        //默认设置，外部可以修改
        defaults: {
            // ios 微信内嵌播放
            playInlineAttr: 'webkit-playsinline',
            //每隔60秒统计一次播放时间
            statsDisTime: 60 * 1000
        },
        init: function(id, opts) {
            if (!id) {
                console.warn('id is null');
                return;
            }
            this.opts = extend({}, defaults, opts || {});

            //设定缓冲time这么长的时间 超过time*2*1000 这么久久认为很慢
            this.opts.bufferTime = this.opts.time * 2 * 1000;
            self.hasRecord = false;

            //get player
            this.player = videojs(id, playerOpts);

            //init
            this.initEvent().initGetData();

            return this.player;
        },
        initEvent: function() {
            //第一次播放的时候才开始准备进行统计
            this.player.on('firstplay', this.firstPlayDo.bind(this));

            //set ios weixin webkit-playsinline
            //this.opts.isInline && this.player.el().querySelector('video').setAttribute(this.defaults.playInlineAttr, '');

            return this;
        },
        //第一次播放的时候需要做些事情
        firstPlayDo: function(video) {
            var self = this;
            var video = this.player;
            //记住视频开始播放时间
            this.startPlayTime = +new Date();
            this.log('this.startPlayTime', this.startPlayTime);
            //速度统计request
            'loadeddata loadedmetadata loadstart progress'.split(/\s+/).forEach(function(val, index) {
                video.on(val, function() {
                    var currentTime = +new Date(),
                        //第一次这里self.startTime 是没有滴
                        loadTime = currentTime - self.startTime || 0,
                        //当前缓冲到多少秒
                        currBufferedTime = getEnd(video);


                    //已经统计过了，不在统计
                    if (self.hasRecord) {
                        return;
                    }
                    //首次初始话,第一次给定开始时间
                    if (!self.startTime) {
                        //初始话开始记录时间
                        self.startTime = +new Date();
                        //初始话开始缓冲时间
                        self.bufferedStart = getEnd(video);
                        return;
                    }

                    //加载时长已经超过我们的预期，证明很慢
                    if (loadTime > self.opts.bufferTime) {
                        console.warn('low low low');
                        return;
                    }

                    /*加载时长还不到指定的秒数
                     *或者是已经记录过数据了，这里就返回
                     *加载currBufferedTime - self.bufferedStart 这么长的时间耗时 loadTime
                     *把loadTime传回服务端做数据统计
                     */
                    var hasBurfferTime = currBufferedTime - self.bufferedStart;
                    if (hasBurfferTime < self.opts.time) {
                        return;
                    }

                    //给个标记，表示数据已经记录过了
                    self.hasRecord = true;
                    //记录数据
                    //console.log('加载' + self.opts.time + ' 秒，耗时：', loadTime / 1000);

                    self.collData({
                        method: 'request',
                        actionName: 'request',
                        totalTime: video.duration(),
                        contentLength: self.opts.time,
                        loadingTime: loadTime / 1000
                    });

                });
            });

            //统计基本信息videoInfo
            this.collData({
                method: 'videoInfo',
                actionName: 'videoInfo',
                userDate: (+new Date()),
                userInfo: navigator.userAgent
            });

            //不断统计视频播放时间初始话
            this.statsPlayTime().stayTime();
        },
        log: function() {
            this.opts.isDebug && console.log.apply(console, Array.prototype.slice.call(arguments));
        }
    });

    //获取数据的相关处理，没有特殊情况的抽出到这里做处理
    var getDataHooks = {
        //播放
        play: function(player) {
            return {
                method: 'click' //点击事件
            }
        },
        //暂停
        pause: function(player) {
            return {
                method: 'click' //点击事件
            }
        },
        //结束
        ended: function(player) {
            return {
                method: 'setInterval,ended', //点击事件
                actionName: 'stop' //动作名称
            }
        },
        fullscreenchange: function(player) {
            return {
                method: 'click', //点击事件
                actionName: player.isFullscreen() ? 'fullScreen' : 'cancelFullScreen' //动作名称
            }
        },
        error: function(player) {
            //得到错误信息
            var errorMedia = player.error() || {};
            return {
                currErrorCode: errorMedia.code, //动作名称 1.用户终止 2.网络错误 3.解码错误 4.URL无效
                currErrorMsg: errorMedia.message
            }
        },
        //会多次触发，每次快进必然会触发
        /*canplay: function(player) {
            return {
                method: 'canplay', //点击事件
                actionName: 'canplay', //动作名称
                totalTime: player.duration()
            }
        },*/
        loadstart: function(player) {
            return {
                totalTime: player.duration()
            }
        },
        abort: function(player) {
            return {
                totalTime: player.duration()
            }
        },
        loadedmetadata: function(player) {
            return {
                totalTime: player.duration()
            }
        }
    };

    var seekHooks = {
        /*
         *   触发一次seeking然后就触发seeked 这个时候就是点击播放
         *   多次触发seeking然后触发seeked就是拖动进度条快进
         */
        seeking: function() {
            //第一次触发seeking，初始话开始触发时间，记录触发次数
            if (!statsData.seekStartTime) {
                statsData.seekStartTime = statsData.player.currentTime();
                statsData.seekTimes = 1;
            } else {
                //多次触发，增加触发次数
                statsData.seekTimes && (statsData.seekTimes++);
            }
        },
        seeked: function() {
            statsData.seekEndTime = statsData.player.currentTime();
            var startTime = statsData.seekStartTime || statsData.seekEndTime;
            //清除seeking 开始的时候记录的时间
            statsData.seekStartTime = null;
            return {
                startPlayTime: startTime,
                nowPlayTime: statsData.seekEndTime,
                /*
                 * statsData.seekTimes 大于1 就是拖拽快进
                 * statsData.seekTimes小于1 就是直接点击快进
                 */
                method: statsData.seekTimes > 1 ? 'dragVideoBar' : 'click', //点击事件
                actionName: 'seeked', //动作名称
            }
        }
    };

    //数据统计相关
    extend(statsData, {
        statsPlayTime: function() {
            var self = this;
            var updateTime = function() {
                self.playToPauseTime = (+new Date()) - self.startPlayTime;
                //更新指针位置，之前的播放时长
                self.lastPlayTime = self.playTotalTime;
            };
            /*
             * 为了精确统计用户播放视频的时长，这里也蛮拼的，用了三个变量来记录相关的状态
             * playTotalTime 视频播放的总共时长
             *
             * playToPauseTime 记录视频这次播放到暂停之间的时长，因为用户可能多次暂停多次播放，而我们只记录用户真正播放视频的时间
             *
             * lastPlayTime 视频播放进度变化发生变化会触发timeupdate时间，在这里我们记录用户播放的时长。但是问题来了，timeupdate回不断地触发，
             * 而playTotalTime只是保存用户播放视频的时长，不可能每次都playTotalTime更新，所以需要一个值来保存之前的时长然后加上这次视频从开始播放到现在的时间差值
             * 就得出了视频总的播放时长。 所以lastPlayTime就是用来记录上次视频播放时长的，playTotalTime时时更新值，lastPlayTime只在视频暂停的时候更新为playTotalTime的值
             * 这样就记住这次暂停之前用户播放视频的时间。
             *
             */
            //播放视频总时间
            this.playTotalTime = 0;

            //重新播放到暂停的时间
            this.playToPauseTime = 0;

            //上次的时长
            //相等于一个指针，始终是知道上次开始播放时，之前的播放时长
            this.lastPlayTime = 0;

            this.player.on('play', function() {
                //更新开始播放时间
                self.startPlayTime = (+new Date());
            });

            ['pause', 'ended'].forEach(function(val) {
                self.player.on(val, updateTime);
            });

            // 累加播放时间
            this.player.on('timeupdate', function(event) {
                //暂停的时候不做统计
                if (self.player.paused()) {
                    return;
                }
                //这次播放的时长差值
                self.playToPauseTime = +new Date() - self.startPlayTime;
                // 播放时间
                self.playTotalTime = self.lastPlayTime + (+new Date() - self.startPlayTime) / 1000;

            });
            return this;
        },
        //不断统计用户停留在页面上的时间   1442458519486
        stayTime: function() {

            this.collData({
                method: 'stay',
                actionName: 'stay',
                //用户播放视频，播放了多久
                stay: this.playTotalTime.toFixed(2), //(+new Date) - this.startPlayTime,
                totalTime: this.player.duration()
            });

            //定时统计
            setTimeout(this.stayTime.bind(this), this.defaults.statsDisTime || 60 * 1000);
        },
        initGetData: function() {
            var self = this;
            //把要数据统计的相关事件都给绑上去
            Object.keys(getDataHooks).concat(Object.keys(seekHooks)).forEach(function(val, index) {
                self.player.on(val, self.proxyCollData.bind(self));
            });
        },
        proxyCollData: function(e) {
            //事件名称
            var name = e.type,
                data = {
                    method: name, //点击事件
                    actionName: name //动作名称
                };
            if (!name) {
                console.warn('参数错误');
                return;
            }
            var args = Array.prototype.slice.call(arguments);
            args.unshift(this.player);

            //对seeking 和seeked 做了特殊处理
            if (name in getDataHooks) {
                data = extend({}, data, getDataHooks[name].apply(this, args) || {});
            } else if (name in seekHooks) {
                data = extend({}, data, seekHooks[name].apply(this, args) || {});
            }
            //seeking 不做统计，这个在拖动的时候会连续触发
            if (name === 'seeking') {
                return;
            }
            //getDataHooks[name].apply(this)  把this对象传入，你懂的。
            //本想直接传统this.player,但是考虑到以后的说不需要this对象，想想算了，把player当初一个参数传入吧
            this.collData(data);
        },
        //收集数据
        collData: function(data) {
            var player = this.player;

            this.log(extend({}, {
                videoaddress: player.currentSrc(), //当前视频地址
                nowPlayTime: player.currentTime() //当前视频播放时间
            }, data));

            /*if (data.actionName === 'seeked') {
                document.getElementById('info').innerHTML = JSON.stringify(data);
            }*/

            window.videoSetCollectionsData && window.videoSetCollectionsData(extend({}, {
                videoaddress: player.currentSrc(), //当前视频地址
                nowPlayTime: player.currentTime() //当前视频播放时间
            }, data));
        }
    });

    videojs.videoXdf = function(id, option) {
        return statsData.init(id, option);
    };

}));
