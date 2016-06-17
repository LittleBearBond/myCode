'use strict';
/**
 * author           xj
 * @date            2016-06-17 10:26:00
 * @email           littlebearbond@qq.com
 * @description
 */

/**
 * requestAnimationFrame
 */
var requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        //所有都不支持，用setTimeout兼容
        function(callback) {
            return window.setTimeout(callback, (callback.interval || 1000 / 60)); // make interval as precise as possible.
        };
}());

/**
 * cancelAnimationFrame
 */
var cancelAnimationFrame = (function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function(id) {
            window.clearTimeout(id);
        };
}());

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

/**
 * Timline时间轴类
 * @constructor
 */
function Timeline() {
    this.animationHandler = 0;
    this.state = STATE_INITIAL;
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function(time) {};

/**
 * 动画开始
 * @param interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function(interval) {
    if (this.state === STATE_START) {
        return;
    }
    this.state = STATE_START;

    this.interval = interval || 1000 / 60;
    startTimeline(this, +new Date);
};

/**
 * 重新开始动画
 */
Timeline.prototype.restart = function() {
    if (this.state === STATE_START) {
        return;
    }
    if (!this.dur || !this.interval) {
        return;
    }
    this.state = STATE_START;

    //无缝连接停止动画的状态
    startTimeline(this, +new Date() - this.dur);
};

/**
 * 动画停止
 */
Timeline.prototype.stop = function() {
    if (this.state !== STATE_START) {
        return;
    }
    this.state = STATE_STOP;

    //如果动画开始过，则记录动画从开始到当前所经历的时间
    if (this.startTime) {
        this.dur = +new Date - this.startTime;
    }
    cancelAnimationFrame(this.animationHandler);
};

/**
 * 时间轴动画启动函数
 * @param timeline 时间轴实例
 * @param startTime 动画开始时间戳
 */
function startTimeline(timeline, startTime) {
    //记录上一次回调的时间戳
    var lastTick = +new Date;

    timeline.startTime = startTime;
    nextTick.interval = timeline.interval;

    /**
     * 每一帧执行的函数
     */
    function nextTick() {
        var now = +new Date();

        timeline.animationHandler = requestAnimationFrame(nextTick);

        //如果当前时间与上一次回调的时间戳相差大于我们设置的间隔时间，表示可以执行一次回调函数。
        if (now - lastTick >= timeline.interval) {
            timeline.onenterframe(now - startTime);
            lastTick = now;
        }
    }
    nextTick();
}



function Animation() {

};

Animation.prototype.start = function(propertyName, endPos, duration, easing) {

};

/**
 * 每一个任务执行完成之后执行的回调
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Animation.prototype.then = function(callback) {

};

/**
 *
 * @param  {[type]} times [description]
 * @return {[type]}       [description]
 */
Animation.prototype.repeat = function(times) {

};

/**
 * 无限循环
 * @return {[type]} [description]
 */
Animation.prototype.repeatForever = function() {

};

/**
 * 当前任务结束后到下一个任务开始的等待时长
 * @return {[type]} [description]
 */
Animation.prototype.wait = function() {

};

Animation.prototype.pause = function() {

};

Animation.prototype.restart = function() {

};

Animation.prototype.dispose = function() {

};
