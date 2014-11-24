(function(w) {
	// 空函数
	function shield() {
			return false;
		}
		//取消浏览器的所有事件，使得active的样式在手机上正常生效
	document.addEventListener('touchstart', shield, false);
	document.oncontextmenu = shield;
	// H5 plus事件处理
	var ws = null,
		at = 100;

	function plusReady() {
		ws = plus.webview.currentWebview();
		// Android处理返回键
		plus.key.addEventListener('backbutton', function() {
			back();
		}, false);
		compatibleAdjust();
	}
	if (w.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}
	// DOMContentLoaded事件处理
	var domready = false;
	document.addEventListener('DOMContentLoaded', function() {
		domready = true;
		document.body.onselectstart = shield;
		compatibleAdjust();
		prettyPrint();
	}, false);
	// 兼容性样式调整
	var adjust = false;

	function compatibleAdjust() {
		if (adjust || !w.plus || !domready) {
			return;
		}
		// iOS平台使用滚动的div
		if ('iOS' == plus.os.name) {
			at = 300;
			var t = document.getElementById('dcontent');
			t && (t.className = 'sdcontent');
			t = document.getElementById('content');
			t && (t.className = 'scontent');
		}
		adjust = true;
	};
	// 处理返回事件
	w.back = function() {
		if (w.plus) {
			plus.webview.currentWebview().close('auto', at);
		} else if (history.length > 1) {
			history.back();
		} else {
			w.close();
		}
	}
})(window);