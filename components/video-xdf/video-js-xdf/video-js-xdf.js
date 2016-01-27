/* @grunt-copy */
/**
 * author           xj
 * @date            2015-09-10 16:37:15
 * @email           568915669@qq.com
 * @description
 */

//durationchange ended error firstplay fullscreenchange loadedalldata loadeddata loadedmetadata
//loadstart pause play progress seeked seeking timeupdate volumechange waiting resize
((function(root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else {
        factory();
    }
})(window, function() {
    videojs.options.flash.swf = '../../video/video-js.swf';
    videojs.addLanguage("zh-CN", {
        "Play": "播放",
        "Pause": "暂停",
        "Current Time": "当前时间",
        "Duration Time": "时长",
        "Remaining Time": "剩余时间",
        "Stream Type": "媒体流类型",
        "LIVE": "直播",
        "Loaded": "加载完毕",
        "Progress": "进度",
        "Fullscreen": "全屏",
        "Non-Fullscreen": "退出全屏",
        "Mute": "静音",
        "Unmuted": "取消静音",
        "Playback Rate": "播放码率",
        "Subtitles": "字幕",
        "subtitles off": "字幕关闭",
        "Captions": "内嵌字幕",
        "captions off": "内嵌字幕关闭",
        "Chapters": "节目段落",
        "You aborted the video playback": "视频播放被终止",
        "A network error caused the video download to fail part-way.": "网络错误导致视频下载中途失败。",
        "The video could not be loaded, either because the server or network failed or because the format is not supported.": "视频因格式不支持或者服务器或网络的问题无法加载。",
        "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.": "由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。",
        "No compatible source was found for this video.": "无法找到此视频兼容的源。",
        "The video is encrypted and we do not have the keys to decrypt it.": "视频已加密，无法解密。"
    });
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
    var statsData = function() {},
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
            controls: true,
            width: '100%',
            height: '100%',
            controls: 'auto',
            'data-setup': '{}',
            poster: 'http://video-js.zencoder.com/oceans-clip.png',
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
        isDebug: false,
        //后来加的参数，这个外部可以覆盖这个参数，只是给他们统计使用做标识
        systemId: 1002001
    };

    extend(statsData.prototype, {
        //默认设置，外部可以修改
        defaults: {
            // ios 微信内嵌播放
            playInlineAttr: 'webkit-playsinline',
            //每隔60秒统计一次播放时间
            statsDisTime: 60 * 1000
        },
        init: function(id, opts) {
            opts = opts || {};
            if (!id) {
                console.warn('id is null');
                return;
            }

            this.opts = extend({}, defaults, playerOpts, opts);
            //设定缓冲time这么长的时间 超过time*2*1000 这么久久认为很慢
            this.opts.bufferTime = this.opts.time * 2 * 1000;
            this.hasRecord = false;

            //get player
            this.player = videojs(id, this.getPlayerOpts(opts));

            //init
            this.initEvent().initGetData();

            this._isFirstPlay = true;

            return this.player;
        },
        initEvent: function() {
            var that = this;
            //第一次播放的时候才开始准备进行统计
            this.player.on('firstplay', this.firstPlayDo.bind(this));

            //set ios weixin webkit-playsinline
            //this.opts.isInline && this.player.el().querySelector('video').setAttribute(this.defaults.playInlineAttr, '');

            //发送数据
            this.player.one('error', function() {
                that.dataCollectionPlugin({
                    canPlay: '0',
                    firstBuffer: '0'
                });
            });
            return this;
        },
        /**
         * 只取playerOpts 有的key 忽略其他没有的
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        getPlayerOpts: function(opts) {
            var playerOptsKeys = Object.keys(playerOpts),
                obj = extend({}, playerOpts),
                hasOwn = Object.prototype.hasOwnProperty;
            for (var item in opts) {
                //may use  (item in playerOptsKeys)
                if (hasOwn.call(opts, item) && !!~playerOptsKeys.indexOf(item)) {
                    obj[item] = opts[item];
                }
            }
            return obj;
        },
        /**
         * 第一次播放的时候需要做些事情
         * 初始话绑定事件，做速度计算
         * @param  {Object} video
         * @return {}
         */
        firstPlayDo: function(video) {
            if (!this._isFirstPlay) {
                return;
            }
            this.getPlaySrc();

            var that = this;
            var video = this.player;
            //记住视频开始播放时间
            this.startPlayTime = +new Date();
            this.log('this.startPlayTime', this.startPlayTime);
            //速度统计request
            'loadeddata loadedmetadata loadstart progress'.split(/\s+/).forEach(function(val, index) {
                video.on(val, function() {
                    //已经统计过了，不在统计
                    if (that.hasRecord) {
                        return;
                    }

                    var currentTime = +new Date(),
                        //第一次这里that.startTime 是没有滴
                        loadTime = currentTime - that.startTime || 0,
                        //当前缓冲到多少秒
                        currBufferedTime = getEnd(video);

                    //首次初始话,第一次给定开始时间
                    if (!that.startTime) {
                        //初始话开始记录时间
                        that.startTime = +new Date();
                        //初始话开始缓冲时间
                        that.bufferedStart = getEnd(video);
                        return;
                    }

                    //加载时长已经超过我们的预期，证明很慢
                    if (loadTime > that.opts.bufferTime) {
                        //console.warn('low low low');
                        return;
                    }

                    /*加载时长还不到指定的秒数
                     *或者是已经记录过数据了，这里就返回
                     *加载currBufferedTime - that.bufferedStart 这么长的时间耗时 loadTime
                     *把loadTime传回服务端做数据统计
                     */
                    var hasBurfferTime = currBufferedTime - that.bufferedStart;
                    if (hasBurfferTime < that.opts.time) {
                        return;
                    }

                    //给个标记，表示数据已经记录过了
                    that.hasRecord = true;
                    //记录数据
                    that.log('加载' + that.opts.time + ' 秒，耗时：', loadTime / 1000);

                    that.collData({
                        method: 'request',
                        actionName: 'request',
                        totalTime: video.duration(),
                        contentLength: that.opts.time,
                        loadingTime: loadTime / 1000
                    });

                    that.dataCollectionPlugin({
                        canPlay: '1',
                        firstBuffer: loadTime / 1000
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
        //获取播放的地址
        getPlaySrc: function() {
            var that = this;
            if (this._ajaxLimit) {
                return;
            }
            this._ajaxLimit = true;
            $.ajax({
                url: this.opts.getMoblieInfoUrl,
                type: 'post',
                dataType: 'json',
                data: {
                    hasT: 1,
                    mId: this.opts.mobliePlayId
                },
                error: function() {
                    //发生错误的时候可以重新获取地址
                    that._isFirstPlay = true;
                    console.log(arguments)
                }
            }).done(function(r) {
                if (String(r.status) !== '0') {
                    console.warn(r.message);
                    return;
                }
                that._isFirstPlay = false;
                that.player.src(r.data).play();
            }).always(function() {
                that._ajaxLimit = false;
            });
        },
        log: function() {
            this.opts.isDebug && console.trace.apply(console, Array.prototype.slice.call(arguments));
        }
    });

    /**
     * dataCollectionPlugin
     * 20160112 加
     */
    extend(statsData.prototype, {
        dataCollectionPlugin: function(data) {
            var player = this.player;
            var that = this;
            /*
             *   firstBuffer: '',//第一次加载视频时间
             *   canPlay: '1', //是否能够播放 0不能播放，1可以播放
             */
            window.dataCollectionPlugin && dataCollectionPlugin.connect(extend({}, {
                videoUrl: player.currentSrc(), //当前视频地址
                systemId: that.opts.systemId,
                userId: that.opts.userId || ''
            }, data), true);
            return this;
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

    //拖动特殊处理
    var seekHooks = {
        /*
         *   触发一次seeking然后就触发seeked 这个时候就是点击播放
         *   多次触发seeking然后触发seeked就是拖动进度条快进
         */
        seeking: function() {
            //第一次触发seeking，初始话开始触发时间，记录触发次数
            if (!this.seekStartTime) {
                this.seekStartTime = this.player.currentTime();
                this.seekTimes = 1;
            } else {
                //多次触发，增加触发次数
                this.seekTimes && (this.seekTimes++);
            }
        },
        seeked: function() {
            this.seekEndTime = this.player.currentTime();
            var startTime = this.seekStartTime || this.seekEndTime;
            //清除seeking 开始的时候记录的时间
            this.seekStartTime = null;
            return {
                startPlayTime: startTime,
                nowPlayTime: this.seekEndTime,
                /*
                 * this.seekTimes大于1 就是拖拽快进
                 * this.seekTimes小于1 就是直接点击快进
                 */
                method: this.seekTimes > 1 ? 'dragVideoBar' : 'click', //点击事件
                actionName: 'seeked', //动作名称
            }
        }
    };

    //数据统计相关
    extend(statsData.prototype, {
        statsPlayTime: function() {
            var that = this;
            /**
             * 精确统计用户的播放事件，剔除用户的暂停时间和加载时间
             * @return {[type]} [description]
             */
            var updateTime = function() {
                that.playToPauseTime = (+new Date()) - that.startPlayTime;
                //更新指针位置，之前的播放时长
                that.lastPlayTime = that.playTotalTime;
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
                that.startPlayTime = (+new Date());
            });

            ['pause', 'ended'].forEach(function(val) {
                that.player.on(val, updateTime);
            });

            // 累加播放时间
            this.player.on('timeupdate', function(event) {
                //暂停的时候不做统计
                if (that.player.paused()) {
                    return;
                }
                //这次播放的时长差值
                that.playToPauseTime = +new Date() - that.startPlayTime;
                // 播放时间
                that.playTotalTime = that.lastPlayTime + (+new Date() - that.startPlayTime) / 1000;

            });
            return this;
        },
        initGetData: function() {
            var that = this;
            //把要数据统计的相关事件都给绑上去
            Object.keys(getDataHooks).concat(Object.keys(seekHooks)).forEach(function(val, index) {
                that.player.on(val, that.proxyCollData.bind(that));
            });
        },
        //不断统计用户停留在页面上的时间
        stayTime: function() {

            this.collData({
                method: 'stay',
                actionName: 'stay',
                //用户播放视频，播放了多久
                stay: this.playTotalTime.toFixed(2),
                totalTime: this.player.duration()
            });
            //定时统计
            setTimeout(this.stayTime.bind(this), this.defaults.statsDisTime || 60 * 1000);
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
            //把播放器对象扔进去^_^
            args.unshift(this.player);

            /**
             * 对seeking 和seeked 做了特殊处理
             * getDataHooks seekHooks两种不同的处理
             */
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

            window.videoSetCollectionsData && window.videoSetCollectionsData(extend({}, {
                videoaddress: player.currentSrc(), //当前视频地址
                nowPlayTime: player.currentTime() //当前视频播放时间
            }, data));
        }
    });

    videojs.videoXdf = function(id, option) {
        return new statsData().init(id, option);
    };

}));
