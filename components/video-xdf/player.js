/* @grunt-build */

/**
 * author           xj
 * @date            2015-10-14 10:26:50
 * @email           568915669@qq.com
 * @description
 */

define(function (require, exports, module) {
    //原始
    require('./video/video');
    require('./video/video-js.css');
    //扩展
    require('./video-js-xdf/video-xdf.css');
    require('./video-js-xdf/video-js-xdf');
});

