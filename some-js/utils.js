function connectPromise({ loader, mapResultsToProps }) {
	return function (Com) {
		return class AsyncCom extends Component {
			constructor(props) {
				super(props);
				this.state = {
					result: undefined
				}
			}
			componentDidMount() {
				loader().then(result => this.setState(resule))
			}
			render() {
				return <Com {...mapResultsToProps(this.state) } {...this.props} />
			}
		}
	}
}

const UserList = connectPromise({
	loader: loadUsers,
	mapResultToProps: result => ({ list: result.userList })
})(List)

const BookList = connectPromise({
	promiseLoader: loadBooks,
	mapResultToProps: result => ({ list: result.bookList })
})(List);
/**
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	// code..
	console.log(errorMessage)
}
window.onerror = function (msg, url, line, col, error) {
	//没有URL不上报！上报也不知道错误
	if (msg != "Script error." && !url) {
		return true;
	}
	//采用异步的方式
	//我遇到过在window.onunload进行ajax的堵塞上报
	//由于客户端强制关闭webview导致这次堵塞上报有Network Error
	//我猜测这里window.onerror的执行流在关闭前是必然执行的
	//而离开文章之后的上报对于业务来说是可丢失的
	//所以我把这里的执行流放到异步事件去执行
	//脚本的异常数降低了10倍
	setTimeout(function () {
		var data = {};
		//不一定所有浏览器都支持col参数
		col = col || (window.event && window.event.errorCharacter) || 0;

		data.url = url;
		data.line = line;
		data.col = col;
		if (!!error && !!error.stack) {
			//如果浏览器有堆栈信息
			//直接使用
			data.msg = error.stack.toString();
		} else if (!!arguments.callee) {
			//尝试通过callee拿堆栈信息
			var ext = [];
			var f = arguments.callee.caller,
				c = 3;
			//这里只拿三层堆栈信息
			while (f && (--c > 0)) {
				ext.push(f.toString());
				if (f === f.caller) {
					break; //如果有环
				}
				f = f.caller;
			}
			ext = ext.join(",");
			data.msg = ext;
		}
		//把data上报到后台！
	}, 0);
	return true;
};

Object.prototype.hash = function (path) {
	return path && path.split('.').reduce(function (obj, key) {
		return obj && obj[key];
	}, this);
};
// 20160202 add
function setUrlParam(url, name, value) {
	var regMatchKey = new RegExp('((' + name + ')=([^&#]*))', 'gi')
	var paramsStr = url.split('?')[1];
	var matchKey = paramsStr && paramsStr.match(regMatchKey);
	if (matchKey) {
		url = url.replace(regMatchKey, function () {
			return (name + '=' + value);
		});
		return url;
	};
	if (!value) {
		return url;
	}
	if (!~url.indexOf('?')) {
		return (url + '?' + name + '=' + value);
	}
	if (endsWith(url, '?')) {
		return (url + name + '=' + value);
	}
	return endsWith(url, '&') ? (url + name + '=' + value) : (url + '&' + name + '=' + value);
}

function setUrlParam(name, value, url) {
	url = url || window.location.href;
	var re = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "ig"),
		m = url.match(re),
		endsWith = function (target, str, ignorecase) {
			var end_str = target.substring(target.length - str.length);
			return ignorecase ? end_str.toLowerCase() === str.toLowerCase() :
				end_str === str;
		};
	if (m) {
		return (url.replace(re, function ($0, $1, $2, $3) {
			if (!value) {
				return $1 == '?' ? $1 : $3; //return ''; 20130910 xj 修正
			} else {
				return ($0.replace($2, value));
			}
		}));
	}
	if (!value) {
		return url;
	}
	if (!~url.indexOf('?')) {
		return (url + '?' + name + '=' + value);
	}
	if (endsWith(url, '?')) {
		return (url + name + '=' + value);
	}
	return endsWith(url, '&') ? (url + name + '=' + value) : (url + '&' + name + '=' + value);
}

//图片加载
function loadImage(container, afterSingle, afterAll) {
	var noop = function () { },
		isFunc = function (variable) {
			return typeof variable === 'function';
		},
		loadCheck = function (loadImg) {
			if (!loadImg) {
				return;
			}
			if (loadImg.complete) {
				complete++;
				afterSingle(loadImg.ele, loadImg.width, loadImg.height, loadImg.i, max, loadImg.startTime);
				(complete >= max) && afterAll(complete, loadImg.startTime);
				loadImg.ele = null;
				loadImg = null;
				return;
			}
			//轮询
			setTimeout(function () {
				loadCheck(loadImg);
			}, 100);
		},
		images = typeof container === 'string' ? $(container).find('img') : container,
		max = images.length,
		complete = 0,
		i = 0,
		image, loadImg;
	!isFunc(afterSingle) && (afterSingle = noop);
	!isFunc(afterAll) && (afterAll = noop);
	for (; i < max; i++) {
		image = images[i];
		loadImg = new Image();
		loadImg.src = image.src;
		loadImg.ele = image;
		loadImg.i = i;
		loadImg.startTime = (+new Date());
		loadCheck(loadImg);
	}
}

function parseURL(url) {
	var a = document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':', ''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function () {
			var ret = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length,
				i = 0,
				s;
			for (; i < len; i++) {
				if (!seg[i]) {
					continue;
				}
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
		hash: a.hash.replace('#', ''),
		path: a.pathname.replace(/^([^\/])/, '/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
		segments: a.pathname.replace(/^\//, '').split('/')
	};
}


function transitionEnd() {
	var el = document.createElement('bootstrap');
	var transEndEventNames = {
		WebkitTransition: 'webkitTransitionEnd',
		MozTransition: 'transitionend',
		OTransition: 'oTransitionEnd otransitionend',
		transition: 'transitionend'
	};
	for (var name in transEndEventNames) {
		if (el.style[name] !== undefined) {
			return transEndEventNames[name];
		}
	}
	return ''; // explicit for ie8 (  ._.)
}

$.support.transition = (function () {
	var el = document.createElement('bootstrap'),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd otransitionend',
			'transition': 'transitionend'
		};
	for (var name in transEndEventNames) {
		if (el.style[name] !== undefined) {
			return transEndEventNames[name]
		}
	}
}());

function getTransitionEndEventName() {
	var obj = {
		TransitionEvent: "transitionend",
		WebKitTransitionEvent: "webkittransitionEnd",
		OTransitionEvent: "OTransitionEnd",
		otransitionEvent: "otransitionEnd",
		MSTransitionEvent: "MSTransitionEnd"
	}
	var ret = false,
		ev
	for (var name in obj) {
		try {
			ev = document.createEvent(name) //只有firefox不支持
			ret = obj[name]
			break
		} catch (e) { }
	}
	if (ret === false) {
		try {
			ev = new TransitionEvent("transitionend", {
				bubbles: true,
				cancelable: true,
				propertyName: "some-unknown-prop",
				elapsedTime: 0.5,
				pseudoElement: "pseudo"
			});
			ret = "transitionend"
		} catch (e) { }
	}
	getTransitionEndEventName = function () {
		return ret;
	};
	return ret;
}
console.log(getTransitionEndEventName() + "!!!!!!!!!!!!!!!!")

var eventName = {
	AnimationEvent: 'animationend',
	WebKitAnimationEvent: 'webkitAnimationEnd'
},
	animationend;
for (var name in eventName) {
	if (/object|function/.test(typeof window[name])) {
		animationend = eventName[name]
		break
	}
}

function format(str, obj) {
	var toStr = {}.toString,
		array = Array.prototype.slice.call(arguments, 1),
		result = [];
	if (toStr.call(obj) === '[object Array]') {
		var i = 0,
			len = obj.length;
		for (; i < len; i++) {
			result.push(format(str, obj[i]));
		}
		return result.join('');
	}
	return str.replace(/\\?\{\{([^{}]+)\}\}/gm, function (match, name) {
		if (match.charAt(0) == '\\') {
			return match.slice(1);
		}
		var index = Number(name);
		if (index >= 0) {
			return array[index];
		}
		if (obj && obj[name] !== void 0) {
			return obj[name];
		}
		return '';
	});
}

var each = function (obj, callback, context) {
	if (!obj) {
		return;
	}
	var nativeForEach = Array.prototype.forEach;
	if (nativeForEach && obj.forEach === nativeForEach) {
		obj.forEach(callback, context);
	} else if (obj.length === +obj.length) {
		//for循环迭代
		for (var i = 0, l = obj.length; i < l; i++) {
			if (callback.call(context, obj[i], i, obj) === false) {
				break;
			}
		}
	}
};

function funcBind() {
	if (!Function.prototype.hasOwnProperty('bind')) {
		Function.prototype.bind = function (context) {
			var fn = this,
				sl = [].slice,
				args = sl.call(arguments, 1);
			if (typeof fn != "function") {
				throw new TypeError();
			}
			return function () {
				return fn.apply(context || this, args.concat(sl.call(arguments)));
			};
		};
	}
}

function animate(el, css, time, fn) {
	if (!el) {
		return;
	}
	var tn = transitionEnd(),
		cb = function () {
			fn(arguments);
			el.removeListener(tn, fn);
		};
	el.addEventListener(tn, cb);
	for (var k in css) {
		if (css.hasOwnProperty(k)) {
			el.style['-webkit-transition'] = k + ' ' + time + 's';
			el.style[k] = css[k];
		}
	}
}
// 公共方法
var common = {
	// 添加class
	addClass: function (obj, className) {
		if (obj.classList) {
			this.addClass = function (obj, className) {
				obj.classList.add(className);
			};
		} else {
			this.addClass = function (obj, className) {
				var originalClass = obj.className;
				var re = new Regexp("\\b" + className + "\\b", "g");
				var result = className;
				if (re.test(originalClass)) {
					return;
				}
				if (originalClass != "") {
					result += " " + className;
				}
				obj.className = this.combAndTrim(result.replace(re, ''));
			};
		}
		this.addClass(obj, className);
	},
	removeClass: function (obj, className) {
		if (obj.classList) {
			this.removeClass = function (obj, className) {
				obj.classList.remove(className);
			}
		} else {
			this.removeClass = function (obj, className) {
				var re = new RegExp("\\b" + className + "\\b", "g");
				obj.className = this.combAndTrim(obj.className.replace(re, ''));
			}
		}
		this.removeClass.apply(this, arguments);
	},
	getStyle: function (obj, name) {
		if (obj.currentStyle) {
			getStyle = function (obj, name) {
				return obj.currentStyle[name];
			};
		} else {
			getStyle = function (obj, name) {
				return getComputedStyle(obj, false)[name];
			};
		}
		return getStyle(obj, name);
	},
	// 合并空格并且移除首位空格
	combAndTrim: function (str) {
		return str.replace(/\s+/g, ' ').replace(/(^\s+)|(\s+$)/, "");
	}
};

var eventHandler = {
	//添加绑定事件
	addHandler: function (oElement, sEventType, fnHandler) {
		return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
	},
	//删除绑定事件
	removeHandler: function (oElement, sEventType, fnHandler) {
		return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
	},
	//绑定事件到对象
	bind: function (object, fnHandler) {
		return function () {
			return fnHandler.apply(object, arguments);
		}
	},
	getEvent: function (e) {
		return e || window.eventeventevent;
	},
	stopPropagation: function (e) {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			window.event.cancelBubble = true;
		}
	}

};


function isSupportFixed() {
	var userAgent = window.navigator.userAgent,
		ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
		ios5below = ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) < 5),
		operaMini = /Opera Mini/i.test(userAgent),
		body = document.body,
		div, isFixed;

	div = document.createElement('div');
	div.style.cssText = 'display:none;position:fixed;z-index:100;';
	body.appendChild(div);
	isFixed = window.getComputedStyle(div).position != 'fixed';
	body.removeChild(div);
	div = null;
	return !!(isFixed || ios5below || operaMini);
}

window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (c) {
			window.setTimeout(c, 1000 / 60);
		};
})();

window.requestNextAnimationFrame = (function () {
	var originalWebkitRequestAnimationFrame = undefined,
		wrapper = undefined,
		callback = undefined,
		geckoVersion = 0,
		userAgent = navigator.userAgent,
		index = 0,
		self = this;
	// Workaround for Chrome 10 bug where Chrome
	// does not pass the time to the animation function

	if (window.webkitRequestAnimationFrame) {
		// Define the wrapper
		wrapper = function (time) {
			if (time === undefined) {
				time = +new Date();
			}
			self.callback(time);
		};
		// Make the switch
		originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
		window.webkitRequestAnimationFrame = function (callback, element) {
			self.callback = callback;
			// Browser calls the wrapper and wrapper calls the callback
			originalWebkitRequestAnimationFrame(wrapper, element);
		}
	}
	// Workaround for Gecko 2.0, which has a bug in
	// mozRequestAnimationFrame() that restricts animations
	// to 30-40 fps.
	if (window.mozRequestAnimationFrame) {
		// Check the Gecko version. Gecko is used by browsers
		// other than Firefox. Gecko 2.0 corresponds to
		// Firefox 4.0.
		index = userAgent.indexOf('rv:');
		if (userAgent.indexOf('Gecko') != -1) {
			geckoVersion = userAgent.substr(index + 3, 3);
			if (geckoVersion === '2.0') {
				// Forces the return statement to fall through
				// to the setTimeout() function.
				window.mozRequestAnimationFrame = undefined;
			}
		}
	}

	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||

		function (callback, element) {
			var start,
				finish;

			window.setTimeout(function () {
				start = +new Date();
				callback(start);
				finish = +new Date();

				self.timeout = 1000 / 60 - (finish - start);

			}, self.timeout);
		};
}());

window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;

/*requestAnimationFrame*/
(function () {
	var lastTime = 0;
	var vendors = ['webkit', 'moz', 'ms'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
			window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	}
}());


var vendors = {
	Webkit: 'webkit',
	Moz: '',
	O: 'o'
},
	testEl = document.createElement('div'),
	prefix, eventPrefix;
$.each(vendors, function (key, val) {
	if (testEl.style[key + 'TransitionProperty'] !== undefined) {
		prefix = '-' + key.toLowerCase() + '-'
		eventPrefix = val
		return false
	}
})

function orientationChange() {
	switch (window.orientation) {
		case 0:
			alert("肖像模式 0,screen-width: " + screen.width + "; screen-height:" + screen.height);
			break;
		case -90:
			alert("左旋 -90,screen-width: " + screen.width + "; screen-height:" + screen.height);
			break;
		case 90:
			alert("右旋 90,screen-width: " + screen.width + "; screen-height:" + screen.height);
			break;
		case 180:
			alert("风景模式 180,screen-width: " + screen.width + "; screen-height:" + screen.height);
			break;
	};
};

function getVendorPrefix() {
	// 使用body是为了避免在还需要传入元素
	var body = document.body || document.documentElement,
		style = body.style,
		vendor = ['webkit', 'khtml', 'moz', 'ms', 'o'],
		i = 0,
		len = vendor.length;

	while (i < len) {
		// 此处进行判断是否有对应的内核前缀
		if (typeof style[vendor[i] + 'Transition'] === 'string') {
			return vendor[i];
		}
		i++;
	}
}

/*http://www.css88.com/archives/5040*/
/**
 * @param {HTMLElement} el
 * @param {String} where beforeBegin、afterBegin、beforeEnd、afterEnd
 * @param {String} html
 */
/*
<i>beforebegin</i>
<div class="wrap-text" id="testid">
	<i>afterbegin</i>
		答案没有对错之分，未免影响结果，请真实作答。
	<i>beforeend</i>
</div>
<i>afterend</i>
*/
function insertHTML(el, where, html) {
	if (!el) {
		return false;
	}
	where = where.toLowerCase();
	if (el.insertAdjacentHTML) { //IE
		el.insertAdjacentHTML(where, html);
	} else {
		var range = el.ownerDocument.createRange(),
			frag = null;
		switch (where) {
			case "beforebegin":
				range.setStartBefore(el);
				frag = range.createContextualFragment(html);
				el.parentNode.insertBefore(frag, el);
				return el.previousSibling;
			case "afterbegin":
				if (el.firstChild) {
					range.setStartBefore(el.firstChild);
					frag = range.createContextualFragment(html);
					el.insertBefore(frag, el.firstChild);
				} else {
					el.innerHTML = html;
				}
				return el.firstChild;
			case "beforeend":
				if (el.lastChild) {
					range.setStartAfter(el.lastChild);
					frag = range.createContextualFragment(html);
					el.appendChild(frag);
				} else {
					el.innerHTML = html;
				}
				return el.lastChild;
			case "afterend":
				range.setStartAfter(el);
				frag = range.createContextualFragment(html);
				el.parentNode.insertBefore(frag, el.nextSibling);
				return el.nextSibling;
		}
	}
}

// 判断是否为移动端运行环境
if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
	if (window.location.href.indexOf("?mobile") < 0) {
		try {
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				// 判断访问环境是 Android|webOS|iPhone|iPod|BlackBerry 则加载以下样式
				setActiveStyleSheet("style_mobile_a.css");
			} else if (/iPad/i.test(navigator.userAgent)) {
				// 判断访问环境是 iPad 则加载以下样式
				setActiveStyleSheet("style_mobile_iPad.css");
			} else {
				// 判断访问环境是 其他移动设备 则加载以下样式
				setActiveStyleSheet("style_mobile_other.css");
			}
		} catch (e) { }
	}
} else {
	// 如果以上都不是，则加载以下样式
	setActiveStyleSheet("style_mobile_no.css");
}

// 判断完毕后加载样式
function setActiveStyleSheet(filename) {
	document.write("＜link href=" + filename + " rel=stylesheet＞");
}
//全屏

function toggleFullScreen() {
	if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}

function launchFullScreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	}
}

function cancelFullScreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

// 高度无缝动画方法
/*var funTransitionHeight = function(element, time) { // time, 数值，可缺省
	if (typeof window.getComputedStyle == "undefined") return;
	//原本高度
	var height = window.getComputedStyle(element).height;
	element.style.height = "auto";
	//最后高度
	var targetHeight = window.getComputedStyle(element).height;
	//设置会当前高度
	element.style.height = height;
	setTimeout(function() {
		if (time) element.style.transition = "height " + time + "ms";
		//过度到最后高度
		element.style.height = targetHeight;
	}, 15);
};*/
//我的改版
function funTransitionHeight(element, time, newHeight) { // time, 数值，可缺省
	if (typeof window.getComputedStyle === "undefined") {
		return;
	}
	if (+newHeight === newHeight) {
		newHeight = newHeight + 'px'
	}
	var height = window.getComputedStyle(element).height;
	element.style.height = "auto";
	var styleObj = window.getComputedStyle(element)
	//再次获取高度
	var targetHeight = typeof newHeight !== 'undefined' ? newHeight : styleObj.height;
	if (targetHeight !== '0px') {
		targetHeight = parseInt(targetHeight, 10) + parseInt(element.dataset.paddingTop || 0, 10) + parseInt(element.dataset.paddingBottom || 0, 10) + 'px';
	}
	element.style.height = height;
	/*if (newHeight === 0) {
		var timmer, done = function () {
			element.removeEventListener("transitionend", done);
			clearTimeout(timmer);
			// element.style.display = "none";
		}
		element.addEventListener("transitionend", done, false);
		timmer = setTimeout(done, time);
	} */
	setTimeout(function () {
		if (time) {
			element.style.transition = "height " + time + "ms ease-in-out,padding-top " + time + "ms ease-in-out,padding-bottom " + time + "ms ease-in-out";
		}
		element.style.height = targetHeight;
		if (!element.dataset) {
			element.dataset = {};
		}
		if (targetHeight === '0px') {
			//cache old padding
			element.dataset.paddingTop = styleObj.paddingTop;
			element.dataset.paddingBottom = styleObj.paddingBottom;
			element.dataset.overflow = styleObj.overflow;
			element.style.paddingTop = 0;
			element.style.paddingBottom = 0;
			element.style.overflow = 'hidden';
		} else {
			element.style.paddingTop = element.dataset.paddingTop;
			element.style.paddingBottom = element.dataset.paddingBottom;
			element.style.overflow = 'hidden';
			setTimeout(function () {
				element.style.overflow = element.dataset.overflow;
			}, time)
		}
	}, 15);
};

//函数依赖注入
// 假设已定义好某些Service
var services = {
	abc: 123,
	def: 456,
	ghi: 789
},
	// 获取func的参数列表(依赖列表)
	getFuncParams = function (func) {
		var matches = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m);
		if (matches && matches.length > 1)
			return matches[1].replace(/\s+/, '').split(',');
		return [];
	},
	// 根据参数列表(依赖列表)填充参数(依赖项)
	setFuncParams = function (params) {
		for (var i in params) {
			params[i] = services[params[i]];
		}
		return params;
	};
// 激活器
function Activitor(func) {
	var obj = {};
	func.apply(obj, setFuncParams(getFuncParams(func)));
	return obj;
}
// 定义新Service
function Service(abc, ghi) {
	this.write = function () {
		console.log(abc, ghi);
	}
}
// 实例化Service并调用方法
var service = Activitor(Service);
service.write();
