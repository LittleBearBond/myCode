/* @grunt-build */

/**
 * author           xj
 * @date            2015-09-16 11:27:43
 * @email           568915669@qq.com
 * @description
 */
(function() {
    // register the plugin
    /*videojs.plugin('progressed', function(options) {
        this.on('progress', function(e) {
            console.log(this.bufferedPercent());
        });
    });*/
    var vid = document.getElementById("vid1");

    var player = videojs.videoXdf('#vid1', {
        getMoblieInfoUrl: '/project/video-h5/1.x/test-page/data/data.php',
        time: 5,
        isDebug: true,
        height: '400px',
        poster: 'http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png', //默认背景图
        //m4v: 'http://10.155.114.55:8081/echo-hereweare.mp4' //HTTP 视频地址
        m4v: [{
                type: "video/mp4",
                src: "http://127.0.0.1:8081/echo-hereweare.mp4"
            }
            /*, {
                type: "video/webm",
                src: "http://www.example.com/path/to/video.webm"
            }, {
                type: "video/ogg",
                src: "http://www.example.com/path/to/video.ogv"
            }*/
        ]
    });

    window.player = player;
    var videoEl = player.el().querySelector('video');
    var videoCon = document.querySelector('.con1');
    var originVideoCon = document.querySelector('.con2');
    var videoEventEls = {};
    var originVideoEls = {};

    var frag = document.createDocumentFragment();

    //使用videojs 的事件
    var eventArr = ('durationchange ended error firstplay fullscreenchange loadedalldata loadeddata loadedmetadata' + ' loadstart pause play progress seeked seeking timeupdate volumechange waiting resize')
        .split(' ');
    var createEl = function(fragCon, cache, idPre) {
        return function(val, index) {
            var div = document.createElement('div');
            var span = document.createElement('span');
            var em = document.createElement('em');
            div.id = !!idPre ? idPre + val : val;
            div.appendChild(span);
            span.innerHTML = val;
            em.innerHTML = 0;
            div.appendChild(em);
            fragCon.appendChild(div);
            cache[val] = div;
        }
    };
    var eventArrCb = function(fn) {
        eventArr.forEach(fn);
    }

    eventArrCb(createEl(frag, videoEventEls));
    videoCon.innerHTML = '';
    videoCon.appendChild(frag);
    frag.innerHTML = '';

    eventArrCb(createEl(frag, originVideoEls, 'origin'));
    originVideoCon.innerHTML = '';
    originVideoCon.appendChild(frag);

    //使用videojs的相关事件
    eventArrCb(function(val, index) {
        player.on(val, function() {
            var el = videoEventEls[val].querySelector('em'); //document.getElementById(val);
            var num = el.innerHTML | 0;
            el.innerHTML = ++num;
        });
    });

    //使用原生的事件
    eventArrCb(function(val, index) {
        videoEl.addEventListener(val, function() {
            var el = originVideoEls[val].querySelector('em'); //document.getElementById(val);
            var num = el.innerHTML | 0;
            el.innerHTML = ++num;
        }, false);
    })

}());
