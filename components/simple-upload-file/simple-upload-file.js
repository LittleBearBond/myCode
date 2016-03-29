'use strict';
/**
 * author           xj
 * @date            2016-03-29 16:50:21
 * @email           littlebearbond@qq.com
 * @description
 */
((function(root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else {
        root.simpleUploadFile = factory(root.$);
    }
})(window, function($) {
    function simpleUploadFile(args) {
        if (!(this instanceof simpleUploadFile)) {
            return new simpleUploadFile(args);
        }
        $.extend(this, simpleUploadFile.defaultOpts, args || {});
        this.init();
    }

    simpleUploadFile.defaultOpts = {
        $fileInput: null, //html file控件
        $dragDrop: null, //拖拽敏感区域
        $upButton: null, //提交按钮
        url: "http://10.10.38.143:1337/api/public/upload", //ajax地址
        fileFilter: [], //过滤后的文件数组
        filter: function(files) { //选择文件组的过滤方法
            return files;
        },
        onSelect: function() {}, //文件选择后
        onDelete: function() {}, //文件删除后
        onDragOver: function() {}, //文件拖拽到敏感区域时
        onDragLeave: function() {}, //文件离开到敏感区域时
        onProgress: function() {}, //文件上传进度
        onSuccess: function() {}, //文件上传成功时
        onFailure: function() {}, //文件上传失败时,
        onComplete: function() {}, //文件全部上传完毕时
    };

    $.extend(simpleUploadFile.prototype, {
        init: function() {

            /*this.$dragDrop && this.$dragDrop.length && this.$dragDrop.on("dragover", this.fnDragHover.bind(this))
                .on("dragleave", this.fnDragHover.bind(this))
                .on("drop", this.fnGetFiles.bind(this));*/

            //文件选择控件选择
            this.$fileInput && this.$fileInput.length && this.$fileInput.on("change", this.fnGetFiles.bind(this));

            //上传按钮提交
            this.$upButton && this.$upButton.length && this.$upButton.on("click", this.fnUploadFile.bind(this));

        },
        //文件拖放
        fnDragHover: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this[e.type === "dragover" ? "onDragOver" : "onDragLeave"].call(e.target);
            return this;
        },
        //获取选择文件，file控件或拖放
        fnGetFiles: function(e) {
            // 取消鼠标经过样式
            this.fnDragHover(e);

            // 获取文件列表对象
            var files = e.target.files || e.dataTransfer.files;
            //继续添加文件
            this.fileFilter = this.fileFilter.concat(this.filter(files));
            this.fnDealFiles();
            return this;
        },

        //选中文件的处理与回调
        fnDealFiles: function() {
            for (var i = 0, file; file = this.fileFilter[i]; i++) {
                //增加唯一索引值
                file.index = i;
            }
            //执行选择回调
            this.onSelect(this.fileFilter);
            return this;
        },

        //删除对应的文件
        fnDeleteFile: function(fileDelete) {
            var arrFile = [];
            for (var i = 0, file; file = this.fileFilter[i]; i++) {
                if (file != fileDelete) {
                    arrFile.push(file);
                } else {
                    this.onDelete(fileDelete);
                }
            }
            this.fileFilter = arrFile;
            return this;
        },

        //文件上传
        fnUploadFile: function() {
            var that = this;
            for (var i = 0, file; file = this.fileFilter[i]; i++) {
                (function(file) {
                    var xhr = new XMLHttpRequest();
                    if (!xhr.upload) {
                        console.log('error');
                        return;
                    }

                    // 上传中
                    xhr.upload.addEventListener("progress", function(e) {
                        that.onProgress(file, e.loaded, e.total);
                    }, false);

                    // 文件上传成功或是失败
                    xhr.onreadystatechange = function(e) {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                that.onSuccess(file, xhr.responseText);
                                that.fnDeleteFile(file);
                                if (!that.fileFilter.length) {
                                    //全部完毕
                                    that.onComplete();
                                }
                            } else {
                                that.onFailure(file, xhr.responseText);
                            }
                        }
                    };
                    // 开始上传
                    xhr.open("POST", that.url, true);
                    // xhr.setRequestHeader("X_FILENAME", file.name);
                    xhr.send(file, {
                        type: "file",
                        compress: true,
                        business_type: "walle"
                    });
                })(file);
            }
        }
    });
    return simpleUploadFile;
}));
