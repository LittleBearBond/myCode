(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(['zepto', 'utils'], factory);
	} else {
		factory(root.$, root.utils);
	}
}(window, function($, utils) {
	var view = {
		'jumpEls': {},
		'$els': ''
	};

	function initView() {
		var $this, selector, $el;
		view.$els = $('a[data-href]'),
		$.each(view.$els, function(index, el) {
			$this = $(el);
			selector = $this.data('href');
			$el = $(selector);
			//更具调整到指定元素的选择器来缓存元素
			$el.length && (view.jumpEls[selector] = $el);
		});
	}

	function initEvent() {
		$.each(view.$els, function(el, index) {
			$(this).on('click', jumpLayer);
		});
	}

	function jumpLayer($el) {
		var $el = $(this),
			els = view.jumpEls,
			dataHref = $el.data('href'),
			showOrHideEl = {},
			$curr;
		//是自己直接返回
		if ($(dataHref).hasClass('.show')) {
			return;
		}
		for (var item in els) {
			if (!els.hasOwnProperty(item)) {
				continue;
			}
			$curr = els[item];
			//这个层是当前显示层
			if (dataHref === item) {
				//缓存即将显示的元素
				showOrHideEl.showEl = $curr;
				continue;
			}
			//缓存现在显示的元素，即将把他隐藏
			$curr.hasClass('.show') && (showOrHideEl.hideEl = $curr);
		}
		//showOrHideLayer(showOrHideEl);
	}

	function showOrHideLayer(showOrHideEl) {
		var w = window.innerWidth;
		utils.translate(showOrHideEl.showEl[0], w, 0);

		showOrHideEl.hideEl.removeClass('show').anim({
			translate: 'translate3d(-' + w + '"px",0,0)'
		}, 300, 'ease-in-out', function() {

		});
		showOrHideEl.showEl.removeClass('hide').anim({
			translate: 'translate3d(0,0,0)'
		}, 300, 'ease-in-out', function() {
			$(this).addClass('show');
		});
		/*fadeOut(function() {
			$(this).addClass('hide');
			showOrHideEl.showEl.removeClass('hide').fadeIn();
		});*/

	}
	$(function() {
		initView();
		initEvent();
		new slidePage($('#slider'), {
			isAutoPlay: false,
			current: 2
		});
	});

}))
