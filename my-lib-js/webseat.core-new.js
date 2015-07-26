/*
 *Author  xj
 *utils.js
 */
var WebJs = window.WebJs || WebJs || {};
/******全局变量,存储全局变量var gData=******/
var gData = WebJs.Data = (function(gd) {
	return gd;
})(gData || {});
(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(factory);
	}
	/*else if (typeof exports === "object") {
	module.exports = factory(require("jquery"));
	} */
	else {
		root.utils = factory(root);
	}
}(window, function(window) {
	var utils = window.utils || {},
		classType = {},
		nativeForEach = Array.prototype.forEach;
	utils.str = utils.str || {};
	utils.arr = utils.arr || {};
	//判断是否是Object类型
	utils.isObject = function(source) {
		return (!!source) && (source.constructor === Object);
	};

	utils.toString = classType.toString;

	utils.hasOwn = classType.hasOwnProperty;

	utils.type = function(obj) {
		if (obj == null) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			classType[utils.toString.call(obj)] || "object" :
			typeof obj;
	};

	utils.isArray = Array.isArray || function(obj) {
		return utils.type(obj) === "array";
	};

	utils.isFunction = function(obj) {
		return utils.type(obj) === "function";
	};

	utils.each = function(obj, callback, context) {
		if (obj == null) {
			return;
		}
		if (nativeForEach && obj.forEach === nativeForEach) {
			obj.forEach(callback, context);
		} else if (obj.length === +obj.length) {
			//for循环迭代
			for (var i = 0, l = obj.length; i < l; i++) {
				if (!callback.call(context, obj[i], i, obj)) {
					break;
				}
			}
		}
	};

	utils.extend = function() {
		var o = {},
			c,
			curr,
			args = arguments,
			len = args.length,
			start = 1,
			src = args[0];
		//把第一个参数对象的值拷贝到 o上
		if (utils.isObject(src)) {
			for (c in src) {
				utils.hasOwn.call(src, c) && (o[c] = src[c]);
			}
		}
		//把后面每个参数的值拷贝到o上
		for (; start < len; start++) {
			curr = args[start];
			if (utils.isObject(curr)) {
				for (c in curr) {
					utils.hasOwn.call(curr, c) && (o[c] = curr[c]);
				}
			}
		}
		return o;
	};
	//处理模板替换对象
	utils.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(name) {
		classType["[object " + name + "]"] = name.toLowerCase();
	});
	utils.str = utils.extend(utils.str, {
		htmlEncode: function(str) {
			return str.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				//s = s.replace(/ /g, "&nbsp;");
				.replace(/'/g, "&apos;")
				.replace(/\"/g, "&quot;")
				.replace(/\\/g, "&#92;");
		},
		htmlDecode: function(str) {
			return str.replace(/&amp;/g, "&")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				//s = s.replace(/&nbsp;/g, " ");
				.replace(/&#39;/g, "\'")
				.replace(/&quot;/g, "\"")
				.replace(/&#92;/g, '\\');
		},
		cutStrings: function(str, length, hasEllipsis) {
			var newStr;
			newStr = str.length <= length ? str : str.substr(0, length);
			if (hasEllipsis) {
				newStr += "...";
			}
			return newStr;
		},
		trim: function(str, val) {
			if (!val) {
				return str == '' ? str : str.replace(/(^\s*)/g, '').replace(/(\s*$)/g, '');
			}
			var s = new RegExp('^' + val + '*', 'g'),
				e = new RegExp(val + '*$', 'g');
			return str == '' ? str : str.replace(s, '').replace(e, '');
		},
		ParseFloatAndToFixed: function(str, i) {
			return parseFloat(parseFloat(str).toFixed(i));
		},
		isNullOrWhiteSpace: function(str) {
			// null、 ''、'   '、undefinded  →→return true
			return str === null || str == '' || this.trim(str) == '';
		},
		startsWith: function(str, start, ignoreCase) { //start：欲判断字符， ignoreCase：是否忽略大小写
			if (str.isNullOrWhiteSpace()) {
				return false;
			}
			if (ignoreCase) {
				str = str.toLowerCase();
				start = start.toLowerCase();
			}
			return str.indexOf(start) == 0;
			//return s.isNullOrWhiteSpace() ? false : (ignoreCase && (s = s.toLowerCase(), start = start.toLowerCase()), s.substr(0, start.length) == start) ? true : false;
		},
		endsWith: function(str, end, ignoreCase) { //end：欲判断字符， ignoreCase：是否忽略大小写
			if (utils.str.isNullOrWhiteSpace(str)) {
				return false;
			}
			if (ignoreCase) {
				str = str.toLowerCase();
				end = end.toLowerCase();
			}
			if (str.substr(str.length - end.length) == end) {
				return true;
			}
			return false;
		},
		contains: function(str, arg) {
			return !!~str.indexOf(arg);
		},
		formatString: function() {
			for (var i = 1, len = arguments.length; i < len; i++) {
				var exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
				arguments[0] = arguments[0].replace(exp, arguments[i]);
			}
			return arguments[0];
		}
	});
	utils.arr = utils.extend(utils.arr, {
		//数据中是否包括指定对象
		contain: function(arr, fun) {
			for (var item in arr) {
				if (fun.constructor == Function) {
					if (fun(item)) return true;
				}
			}
			return false;
		},
		get: function(arr, fun) {
			for (var i in arr) {
				if (fun.constructor == Function) {
					if (fun(arr[i])) return arr[i];
				}
			}
			return null;
		},
		del: function(arr, n) { //n表示第几项，从0开始算起。
			//prototype为对象原型，注意这里为对象增加自定义方法的方法。
			if (n > arr.length - 1) {
				return arr;
			} else {
				//return  n < 0 ? this : this.slice(0, n).concat(this.slice(n + 1, this.length));
				var r = n < 0 ? arr : arr.splice(n, 1); //splice 先删除一段，再添加一段元素splice(开始，长度)  ，替换；//xj
				return arr;
			}
		},
		removeByValue: function(arr, val) {
			if (!val) {
				return arr;
			}
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == val) {
					return utils.arr.del(arr, i);
				}
			}
			return arr;
		},
		indexOf: function(arr, item, strict) { //strict：是否严格相等（===）
			var index = -1,
				length = arr.length;
			strict = strict ? true : false;
			var i = 0;
			if (strict) {
				for (; i < length; i++) {
					if (arr[i] === item) {
						index = i;
						break;
					}
				}
			} else {
				for (i = 0; i < length; i++) {
					if (arr[i] == item) {
						index = i;
						break;
					}
				}
			}
			return index;
		}
	});

	//ajax
	utils.Ajax = function(url, data, callback, cfg) {
		cfg = (cfg || {});
		cfg.hasOwnProperty("async") || (cfg.async = "true");
		cfg.hasOwnProperty("type") || (cfg.type = "post");
		cfg.hasOwnProperty("cache") || (cfg.cache = true);
		cfg.hasOwnProperty("dataType") || (cfg.dataType = "json"); //预期服务器返回的数据类型  xml, json, script, or html
		callback = callback || function() {};
		var error = cfg.hasOwnProperty("error") && typeof cfg.error == 'function' ? cfg.error : function(xmlHttpRequest, textStatus, errorThrow) {
			console.log(xmlHttpRequest);
		};
		//声明opts 方便调试
		var opts = {
			type: cfg.type,
			url: url,
			async: cfg.async,
			data: data,
			cache: cfg.cache,
			timeout: 6e4, //60000
			//headers: cfg.headers,
			dataType: cfg.dataType,
			//contentType: cfg.contentType,
			beforeSend: cfg.hasOwnProperty("before") ? cfg.before : function() {},
			success: function(result, textStatus, jqXHR) {
				/*if (!!result) {
				try {
				if (!!result.Type && result.Type == "string") {
				result = result.Str;
				}
				} catch (e) {
				}
				}*/
				if (textStatus == 'success') {
					callback(result, jqXHR);
				} else {
					alert('服务端错误');
				}
			},
			error: error
		};
		$.ajax(opts);
	};
	//内部调用WebJs.Ajax，这里统一处理返回结果的状态
	utils.AjaxHandle = function(url, data, callback, cfg) {
		var opts = {},
			errorcb;
		if (typeof cfg === 'function') {
			errorcb = cfg;
		} else {
			opts = cfg || {};
			cfg && typeof cfg.errorcb == 'function' && (errorcb = cfg.errorcb);
		}
		opts.hasOwnProperty("errorcb") && (delete opts.errorcb);
		utils.Ajax(url, data, function(result, jqXHR) {
			if (result && result.Success) {
				callback(result, jqXHR);
			} else {
				errorcb(result.Message);
				console.log(result.Message);
			}
		}, opts);
	};

	utils.GetRandomUrl = function(url) { //为url添加随机数
			url = url || window.location.href;
			return ~url.indexOf("?") ? url + "&r=" + Math.random() : url + "?r=" + Math.random();
		},
		utils.Open = function(url) {
			window.open(url);
		};
	utils.RedirectTo = function(url) { //跳转页面
		window.location.href = url;
		window.event ? window.event.returnValue = false : event.preventDefault(); //for firefox
	};
	utils.Cookie = function(cookieName, cookieValue, options) {
		options = options || {
			path: '/'
		};
		return $.cookie(cookieName, cookieValue, options);
	};
	utils.GetUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	};
	//解决上一个获取中文参数 encodeURI 乱码
	utils.GetUrlParam2 = function(paras) {
		var url = location.href,
			paraString = url.substring(url.indexOf("?") + 1, url.length).split("&"),
			paraObj = {},
			j;
		for (var i = 0; j = paraString[i]; i++) {
			paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
		}
		var returnValue = paraObj[paras.toLowerCase()];
		if (typeof(returnValue) == "undefined") {
			return "";
		} else {
			return returnValue;
		}
	};
	utils.SetUrlParam = function(name, value, url) {
		url = url || window.location.href;
		var re = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "ig"),
			m = url.match(re),
			endsWith = function(target, str, ignorecase) {
				var end_str = target.substring(target.length - str.length);
				return ignorecase ? end_str.toLowerCase() === str.toLowerCase() :
					end_str === str;
			};
		if (m) {
			return (url.replace(re, function($0, $1, $2, $3) {
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
	};
	//设置标签获得焦点时键盘按下事件
	utils.SetOnKeyUp = function(tag, opts) {
		opts = jQuery.extend({
			call: function() {
				return false;
			},
			params: -1
		}, opts || {});
		$(tag).on("focus", function() {
			this.keyup = function(e) {
				var keycode;
				if (navigator.appName == "Microsoft Internet Explorer") {
					keycode = event.keyCode;
				} else {
					keycode = e.which;
				}
				if (keycode == 13) {
					if (opts.params > 0)
						opts.call(opts.params);
					else
						opts.call();
				}
			};
		});
		$(tag).on("blur", function() {
			this.onkeyup = function() {
				return false;
			};
		});
	};
	//元素操作相关
	utils.HtmlUtils = ((function() {
		function getRect(element) {
			var rect = element.getBoundingClientRect();
			if (typeof rect.width === 'undefined') {
				return {
					width: rect.right - rect.left,
					height: rect.bottom - rect.top,
					top: rect.top,
					bottom: rect.bottom,
					left: rect.left,
					right: rect.right
				};
			}
			return rect;
		}

		function getElementCenterPos(obj, cfg) {
			var $obj = $(obj);
			cfg = cfg || {};
			cfg.maxWidth = cfg.maxWidth || 900;
			cfg.maxHeight = cfg.maxHeight || 800;
			var ww = $obj.width(), //window width
				wh = $obj.height(),
				sch = $(window).height() | 0, //scree clientHeight
				scw = $(window).width() | 0,
				height = wh < sch - 20 && wh > cfg.maxWidth + 20 ? cfg.maxHeight : sch - 20,
				width = ww < scw - 20 && ww > cfg.maxHeight + 20 ? cfg.maxWidth : scw - 20;
			width = width >= cfg.maxWidth ? cfg.maxWidth : width;
			height = height >= cfg.maxHeight ? cfg.maxHeight : height;
			var left = width < scw - 20 ? (scw - width) / 2 : 10,
				top = height < sch - 20 ? (sch - height) / 2 : 10;
			return {
				width: width,
				height: height,
				left: left,
				top: top
			};
		}

		function getElCenterPos(obj) {
			var $tp = $(obj);
			var width = $tp.width(),
				height = $tp.height(),
				$w = $(window),
				wh = $w.height(),
				ww = $w.width();
			return {
				left: (ww - width) / 2,
				top: (wh - height) / 2
			};
		}

		return {
			getElementCenterPos: getElementCenterPos,
			getElCenterPos: getElCenterPos
		};
	})());
	utils.islocalStroge = function() {
		return !!window.localStorage;
	}
	utils.store = function(key, val) {
		if (!top.window.localStorage) {
			return this;
		}
		val && top.window.localStorage.setItem(key, val);
		if (!val) {
			return top.window.localStorage.getItem(key);
		}
		return this;
	}
	utils.store.get = function(key) {
			localStorage.getItem(key);
		}
		//验证 暂时没用
	utils.validate = {
		//校验密码：只能输入6-15个字母、数字
		IsPasswd: function(s) {
			var patrn = /^[a-zA-Z0-9]{6,15}$/;
			return patrn.exec(s);
		},
		//校验手机号码：必须以数字开头
		IsMobile: function(s) {
			//00852验证香港区号
			var patrn = /^(13[0-9]|15[012356789]|18[0236789]|14[57]|00852)[0-9]{8}$/;
			return patrn.test(s);
		},
		//1-16个中文
		IsChinese: function(s) {
			var patrn = /^[a-zA-Z\u4E00-\u9FA5]{2,16}$/;
			return !!patrn.exec(s);
		},
		//检查email邮箱
		IsEmail: function(str) {
			var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
			//var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
			return reg.test(str);
		},
		//中英文数字下划线1-num个字符
		IsAccount: function(str, num) {
			return new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5]{1,' + num + '}$').test(str);
		},
		//检查长度
		CheckLength: function(obj, maxlength) {
			if (obj.value.length > maxlength) {
				obj.value = obj.value.substring(0, maxlength);
			}
		},
		IsURL: function(strUrl) {
			var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
			return regular.test(strUrl);
		},
		//判断是否有列表中的危险字符
		IsValidReg: function(chars) {
			var re = /<|>|\[|\]|\{|\}|『|』|※|○|●|◎|§|△|▲|☆|★|◇|◆|□|▼|㊣|﹋|⊕|⊙|〒|ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄚ|ㄛ|ㄜ|ㄝ|ㄞ|ㄟ|ㄢ|ㄣ|ㄤ|ㄥ|ㄦ|ㄧ|ㄨ|ㄩ|■|▄|▆|\*|@|#|\^|\\/;
			return re.test(chars) != true;
		}
	};
	return utils;
}));
