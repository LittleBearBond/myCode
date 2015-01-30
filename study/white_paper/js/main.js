$(function() {
	var $bottomIcos = $("#bottom_icos"),
		$page1 = $("#page1"),
		$wrap = $('.dj_wrap'),
		timer = null,
		$container = $('.swipe_wrap'),
		//缓存节点
		cacheNode = [],
		$template = $(template),
		clearTemplate = [],
		//页面上只有五个 先写死
		num = 5,
		//总共21页
		totalPage = 21,
		//从第六页开始
		index = 0,
		slider = new slidePage($('#slider'), {
			isAutoPlay: false,
			current: 0,
			dis: 30,
			round: false,
			horizontal: true,
			isStartRebound: true,
			totalPage: 21,
			transitionEnd: lazyLoad
		});

	//把页面上的节点放入缓存数组中
	$('.pages').each(function(index, item) {
		cacheNode[index] = item;
	});
	//过滤掉文本节点和注释节点，取到所有的pages 节点
	$template.each(function(index, item) {
		item.nodeName === 'DIV' && clearTemplate.push(item);
	});
	//把所有数据放入cacheNode 进行缓存
	for (var i = 5; i < totalPage; i++) {
		cacheNode[i] = clearTemplate[i - 5];
	}
	//页面上有多少页
	//假设为5
	function lazyLoad() {
		var curr = slider.getCurrentIndex() + 1;
		var isNext = slider.moveDis < 0;
		var $pages = $('.pages');
		var regPageNum = /.*page(\d+).*/i;
		var currPage = regPageNum.exec($container.find('.in').get(0).className)[1] | 0;
		var lastPage = regPageNum.exec($pages.last().get(0).className)[1] | 0;
		var firstPage = regPageNum.exec($pages.first().get(0).className)[1] | 0;
		var pNum, isRemove = false;
		//向后翻页
		//移除前面的 加载后面的
		if (isNext) {
			if (currPage >= lastPage - 2) {
				$pages.each(function(index, item) {
					pNum = regPageNum.exec(item.className)[1] | 0;
					if (pNum <= lastPage - num) {
						$(item).remove();
						slider.setData(-slider.wh * (slider.getCurrentIndex() - 1));
						isRemove = true;
					}
				});
				if ((lastPage + 1 <= totalPage && !$('.page' + lastPage + 1).length) || isRemove) {
					$container.append(cacheNode[lastPage]);
					setTimeout(function() {
						slider.resize();
						imgLoad();
					});
				}
			}
		} else {
			//向前翻页
			//移除后面的 加载前面的
			if (currPage <= firstPage + 2) {
				$pages.each(function(index, item) {
					pNum = regPageNum.exec(item.className)[1] | 0;
					if (pNum >= firstPage + num) {
						$(item).remove();
						slider.resize();
					};
				});
				if (firstPage - 1 >= 1 && !$('.page' + firstPage - 1).length) {
					$container.prepend(cacheNode[firstPage - 2]);
					slider.setData(-slider.wh * (slider.getCurrentIndex() + 1));
					setTimeout(function() {
						slider.resize();
						imgLoad();
					});
				}
			}
		}
		if (currPage >= 20 && isNext) {
			handleWeixin();
		}
	}　

	function imgLoad() {
		var $this, src;
		$('.swipe_wrap').find('img').each(function(index, item) {
			$this = $(item);
			src = $this.attr('_src');
			$this.attr('src') || $this.attr('src', src);
		});
	}

	//page1 start动画
	if ($page1.hasClass("in")) {
		clearInterval(timer);
		timer = setInterval(function() {
			$bottomIcos.removeClass("start_dot");
			setTimeout(function() {
				$bottomIcos.addClass("start_dot");
			}, 20);
		}, 1800);
	}

	//是否是微信访问
	function handleWeixin() {
		var isW = /MicroMessenger/i.test(navigator.userAgent);
		$(".weixin_share_box,.page21_share_weixin")[isW ? 'show' : 'hide']();
		$(".page21_share_weixin")[isW ? 'addClass' : 'removeClass']("show_ico");
		$(".other_share_box,.page21_img2")[isW ? 'hide' : 'show']();
	}

	//翻页
	$wrap.on('click', '.operatePre', $.proxy(slider.pre, slider));
	$wrap.on('click', '.operateNext', $.proxy(slider.next, slider));

	//网页版分享
	(function webShare() {
		var url = encodeURIComponent(top.location.href);
		var title = encodeURIComponent(top.document.title);

		var sina = document.getElementById("share_sina");
		var douban = document.getElementById("share_douban");
		var renren = document.getElementById("share_renren");
		var qqwb = document.getElementById("share_qqwb");

		if (sina) sina.href = "http://v.t.sina.com.cn/share/share.php?url=" + url + "&title=" + title;
		if (douban) douban.href = "http://www.douban.com/recommend/?url=" + url + "&title=" + title;
		if (renren) renren.href = "http://share.renren.com/share/buttonshare.do?link=" + url + "&title=" + title;
		if (qqwb) qqwb.href = "http://v.t.qq.com/share/share.php?title=" + title + "&url=" + url;
	})();
});
