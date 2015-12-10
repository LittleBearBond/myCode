/*
$.ajax({
    xxxx: xxx,
    mode: xxx, //'abort'||'limit'
    port: 'xxx',
});
*/
(function() {
    /**
     * abort 模式
     * 具有相同port属性的请求，多个同时发出后，
     * 后发出的请求会把前面发出的给干掉
     */
    var abortPendingRequests = {};
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function(settings, _, xhr) {
            var port = settings.port || _.url;
            if (settings.mode === "abort") {
                if (abortPendingRequests[port]) {
                    abortPendingRequests[port].abort();
                }
                abortPendingRequests[port] = xhr;
            }
        });
    }

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
            if (settings.mode !== 'limit') {
                return true;
            }
            // ajax 请求限制
            var self = this;
            var port = settings.port || (function() {
                var url = self.url;
                var index = url.indexOf('_');
                return index < 0 ? url : url.substring(0, index - 1)
            }());
            if (limitPendingRequests[port]) {
                return false;
            }
            limitPendingRequests[port] = true;
            xhr.complete(function() {
                delete limitPendingRequests[port];
            });
        }
    });
}());
