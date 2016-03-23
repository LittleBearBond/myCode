'use strict';
/**
 * author           xj
 * @date            2016-03-23 15:40:50
 * @email           littlebearbond@qq.com
 * @description
 */

function uploadFile($el, opts) {
    this.$el = $el;
    this.opts = $.extend({}, uploadFile.defaultOpts, opts || {});
    this.init();
}
uploadFile.defaultOpts = {
    //图片的宽度或者高度，高度大的时候以高度为准，宽度大的时候一宽度为准
    imgSize: 500,
    //预览容器
    $previewEl: ''
};

$.extend(uploadFile.prototype, {
    init: function() {
        this.$el.on('change', this.changeFile.bind(this));
    },
    changeFile: function(e) {
        var target = e.currentTarget;
        var $target = $(target);
        var that = this;
        if (!target.files.length) {
            console.log('files is null');
            return;
        }
        var file = target.files[0];
        var reader = new FileReader();
        if (!file || file.size <= 0) {
            console.log('files size is null');
            return;
        }
        reader.onload = function(event) {
            var imgData = that.imgData = event.target.result;
            // if (/android/i.test(navigator.userAgent)) {
            //     imgData = 'data:application/octet-stream;' + imgData.substr(event.target.result.indexOf('base64,'));
            // }
            that.getImgSize(imgData, function(w, h, img) {
                var newWidth, newHeight;
                //宽高适配，按比例大的计算
                if (h > w) {
                    newHeight = that.opts.imgSize;
                    newWidth = newHeight * w / h;
                } else {
                    newWidth = that.opts.imgSize;
                    newHeight = newWidth * h / w;
                }
                that.zipImg(imgData, newWidth, newHeight, that.previewImg.bind(that));
            });
        };
        reader.readAsDataURL(file);
    },
    getImgSize: function(data, callback) {
        var $con = $("<div>", {
            "id": "js-img-size-cont"
        }).css({
            opacity: 0,
            position: "absolute",
            zIndex: -1,
            top: -10000,
            overflow: "hidden",
            width: 100
        }).appendTo($("body"));

        var $img = $("<img>", {
            src: data
        }).appendTo($con);

        $img.on('load', function() {
            callback.call(this, this.width, this.height);
            $con.remove();
        });
    },
    previewImg: function(imgData) {
        var $previewEl = $(this.opts.$previewEl);
        $previewEl.length && $previewEl.css("background-image", "url(" + imgData + ")").parent().addClass('hasimg');
    },
    zipImg: function(imgData, width, height, callback) {
        var cvs = document.createElement('canvas');
        cvs.width = width;
        cvs.height = height;
        var ctx = cvs.getContext("2d");
        var newImg = new Image();
        newImg.crossOrigin = "anonymous";
        newImg.onload = function() {
            ctx.drawImage(newImg, 0, 0, width, height);
            callback && callback(cvs.toDataURL("image/jpeg"));
        }
        newImg.src = imgData;
    }
});
