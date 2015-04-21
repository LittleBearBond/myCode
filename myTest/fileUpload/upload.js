//Uploadify 的整体配置
var uploadFile = (function(wj) {
    var fileId = "uploadify",
        fileQueueId = 'fileQueue',
        defCfgs = {
            'swf': '/myTest/fileUpload/uploadify/uploadify.swf',
            'uploader': '',
            'formData': {
                'ASPSESSID': '',
                'AUTHID': ""
            },
            'buttonText': '选择文件',
            'height': 25,
            'width': 80,
            'All Files': '*.*',
            //在浏览窗口底部的文件类型下拉菜单中显示的文本
            'fileTypeDesc': '文件描述',
            'fileTypeExts': '*.xls;',
            'fileObjName': 'Filedata',
            'fileSizeLimit': '5120KB',
            //设置是否自动上传，选择完成后自动上传，这里我并没有自动上传
            'auto': false,
            'multi': true,
            'queueID': fileQueueId,
            'simUploadLimit': 3, //并发上传数据
            'uploadLimit': 10, //最多选择10个
            /*当文件上传成功时触发
            * file – 文件对象
              data – 服务端输出返回的信息
              response – 有输出时为true,如果无响应为false，如果返回的是false,当超过successTimeout设置的时间后假定为true
              */
            'onUploadSuccess': function(file, data, response) {
                /*var len = $('#' + fileQueueId + ' > div').length;
                if (len > 1) {
                    $('#' + fileId).uploadify('upload');
                } else if (len == 1) {
                    setTimeout(function () { $('#' + fileId).uploadify('upload'); }, 1000);
                }*/
            },
            'onUploadComplete': function(file) { //每个文件上传完毕后无论成功与否都会触发。
            },
            'onUploadError': function(file, errorCode, errorMsg, errorString) { //文件上传出错时触发，参数由服务端程序返回。
                console.log(errorCode + ':' + errorMsg);
            },
            //开始上传时所执行的代码
            'onUploadStart': function(file) {
                console.log(file.name + 'start upload');
            },
            'onCancel': function(file) { //当点击文件队列中文件的关闭按钮或点击取消上传时触发，file参数为被取消上传的文件对象
            },
            'onClearQueue': function(queueItemCount) { //当调用函数cancel方法时触发，queueItemCount参数为被取消上传的文件数量。
            },
            'onSelect': function(file) { //选择文件后向队列中添加每个上传任务时都会触发。
            },
            'onSelectError': function(file, errorCode, errorMsg) {
                console.log('发生错误请刷新页面再试');
            },
            'onFallback': function() { //当Uploadify初始化过程中检测到当前浏览器不支持flash时触发。
            },
            /*当文件浏览框关闭时触发，如果将此事件被重写，则当向队列添加文件上传出错时不会弹出错误消息提示。
            queueData对象包含如下属性：
            filesSelected 文件选择对话框中共选择了多少个文件
            filesQueued 已经向队列中添加了多少个文件
            filesReplaced 已经向队列中替换了多少个文件
            filesCancelled 取消了多少个文件 filesErrored 出错了多少个文件
             */
            'onDialogClose': function(queueData) {},
            /*处理上传队列的过程中会多次触发此事件，每当任务状态有更新时都会触发。
            file – 文件对象
            bytesUploaded – 已上传的字节数
            bytesTotal – 文件总字节数
            totalBytesUploaded – 当前任务队列中全部文件已上传的总字节数
            totalBytesTotal – 当前任务队列中全部文件的总字节数*/
            'onUploadProgress': function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {}
        };
    return function(uploadifyCfg, id) {
        id = id || fileId;
        if (!id.startsWith("#")) {
            id = '#' + id;
        }
        var cfgs = $.extend(defCfgs, uploadifyCfg || {});
        $(id).uploadify(cfgs, "*");
    };
})();
