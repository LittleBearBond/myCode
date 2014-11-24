; (function () {
    var view = {};
    var timer = null;
    var limit = false;
    var curPage = 2;
    //初始化dom
    var initView = function () {
        view.pData = dj['getPageData']('p-recommend-list');
        view.list = view.pData.boxId ? $('#' + view.pData.boxId) : $('.recomm-list');
        view.ePage = $('#totalPage');
        view.more = $('.more');
        view.win = $(window);
        // view.pData = dj['getPageData']('p-recommend-list');
        view.totalPage = parseInt(view.ePage.val(), 10);
    };
    // 判断是否可以加载跟多了
    var isCanLoad = function () {
        var check = false;
        var num_action = 50; //距离页面底部多少距离开始加载
        var num_H = document.body.scrollHeight || document.documentElement.scrollHeight;
        var num_win = view.win.height();
        var num_over = document.body.scrollTop || document.documentElement.scrollTop;
        if (num_H - (num_over + num_win) <= num_action) {
            check = true;
        }
        return check;
    };
    var loadMore = function () {
        if (limit) return;
        limit = true;
        var pUrl = view.pData.url;
        $.ajax({
            url: pUrl,
            type: view.pData.ajaxType,
            data: 'page=' + curPage,
            success: function (r) {
                if (r) {
                    view.list.append(r);
                    loadAfter();
                }
            },
            error: function () {
                dj.iAlert('现在网络不给力哦>_<');
            }
        });
    };
    var loadAfter = function () {
        view.more.hide();
        curPage += 1;
        limit = false;
    };
    //各种事件绑定
    var bindEvent = function () {
        view.win.bind('scroll', function (e) {
            clearTimeout(timer);
            if (curPage <= view.totalPage) view.more.show();
            timer = setTimeout(function () {
                if (isCanLoad() && curPage <= view.totalPage) {
                    loadMore();
                }
            }, 100);
        });
        $('body').delegate('a', 'click', function (e) {
            var $href = $(this).data('href');
            if ($href) {
                e.preventDefault();
                location.replace($href);
            }
        });
    };
    $(function () {
        initView();
        bindEvent();
    });
})(Zepto);