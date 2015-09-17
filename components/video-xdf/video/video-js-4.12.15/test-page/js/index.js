/* @grunt-build */

/**
 * author           xj
 * @date            2015-09-16 11:27:43
 * @email           568915669@qq.com
 * @description
 */
(function() {


    // register the plugin
    videojs.plugin('progressed', function(options) {
        this.on('progress', function(e) {
            console.log(this.bufferedPercent());
        });
    });

    var vid = document.getElementById("vid1");

    var player = videojs.videoXdf('#vid1', {
        time: 5,
        isDebug: true
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
