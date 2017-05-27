;
(function() {
    /**
     * abort 模式
     * 从validate中抽取（validate中已经删除相关源代码）
     * 具有相同port属性的请求，多个同时发出后，
     * 后发出的请求会把前面发出但没有返回结果的请求取消掉
     */
    /* var abortPendingRequests = {};
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function(settings, _, xhr) {
            var port = _.url;
            console.log(arguments)
            if (settings.smartType === 1) {
                if (abortPendingRequests[port]) {
                    abortPendingRequests[port].abort();
                }
                abortPendingRequests[port] = xhr;
                xhr.always(function() {
                    delete abortPendingRequests[port];
                });
            }
        });
    }* /

    /**
     * limit 模式
     * 具有相同port属性的请求，多个同时发出后，
     * 如果前面的请求没有返回结果，则后面发送的请求会被忽略
     */
    var limitPendingRequests = {};
    $.ajaxSetup({
        // 不缓存get
        cache: false,
        beforeSend: function(xhr, settings) {
            // ajax 请求限制
            var self = this;
            var port = (function() {
                var url = self.url;
                var index = url.indexOf('_');
                return index < 0 ? url : url.substring(0, index - 1)
            }());

            if (typeof settings.smartType === 'undefined') {
                return true;
            }
            //500 毫秒下一次
            if (settings.smartType === 0) {
                if (limitPendingRequests[port]) {
                    return false;
                }
                limitPendingRequests[port] = true;
                setTimeout(function() {
                    delete limitPendingRequests[port];
                }, 500);
                return true;
            }

            //请求完成进行下一次
            if (settings.smartType === 1) {
                if (limitPendingRequests[port]) {
                    return false;
                }
                limitPendingRequests[port] = true;
                xhr.complete(function() {
                    delete limitPendingRequests[port];
                });
                return true;
            }
            return true;
        }
    });
})();
