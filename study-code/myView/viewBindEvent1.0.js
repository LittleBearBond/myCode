;
(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else {
		root.MyView = factory(root, root.$);
	}
}(window, function(root) {
	if (!Object.create) {
		Object.create = function(o) {
			if (arguments.length > 1) {
				throw new Error('Object.create implementation only accepts the first parameter.');
			}

			function F() {}
			F.prototype = o;
			return new F();
		};
	}
	var emptyFunc = function() {},
		defaultOpts = {
			initialize: emptyFunc,
			el: '',
			events: {},
		},
		toStr = ({}).toString,
		sl = [].slice,
		isString = function(o) {
			return toStr.call(o) === '[object String]';
		},
		isFunc = function(o) {
			return toStr.call(o) === '[object Function]';
		},
		startsWith = function(target, str, ignorecase) {
			var start_str = target.substr(0, str.length);
			return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
		},
		getObj = function(obj, str) {
			if (startsWith(str, 'window')) {
				str = str.substr(7, str.length);
				obj = window;
			}
			var fn = str.split('.').reduce(function(o, n) {
				return o && o[n];
			}, obj);
			return fn && fn.bind(obj);
		},
		item;

	function MyView() {
		isFunc(this.initialize) && this.initialize.call(this);
		//根节点this.el
		isString(this.el) && (this.el = $(this.el));
		this._init();
	}

	$.extend(MyView.prototype, {
		constructor: MyView,
		_init: function() {
			var self = this;
			$(function() {
				self._initView()._initEvent();
			});
			return this;
		},
		_initView: function() {
			var self = this;
			$.each(this.viewData || {}, function(key, sel) {
				self[key] = $(sel);
			});
			return this;
		},
		_initEvent: function() {
			var es = this.events;
			for (item in es) {
				es.hasOwnProperty(item) && this._bindEvent(item, es[item]);
			}
			return this;
		},
		/**
		 * 		"click .jp-test1": "test1",
		 *		"dblclick .jp-test2": "test2",
		 *		"click $jp-test3": "test3",
		 *		'click $$.jp-test4':'test4',
		 *		"click $$.jp-test5": "window.test5WindowFN",
		 *		"click #jp-test6": "test6"
		 * @param  {[type]} de   [description]
		 * @param  {[type]} func [description]
		 * @return {[type]}      [description]
		 */
		_bindEvent: function(de, func) {
			var key = de.split(' '),
				//事件类型
				type = key[0],
				//选择器
				selector = key[1];
			if (!type || !selector) {
				return;
			}

			/**
			 * func如果是字符串就是从自身取，这里就是一个key
			 * 如果传递就是fn 那就直接绑定fn
			 * 如果字符串是window.XX 就是从window 下拿到func
			 * @type {[type]}
			 */
			isString(func) && (func = getObj(this, func.trim()));
			if (!isFunc(func)) {
				return;
			}

			/**
			 * 选择器是以$$开头，就是要找到这个元素再绑定上事件
			 * 'click $$.btn':'fn'
			 * $('.btn').on(type,fn)
			 * @param  {[type]}
			 */
			if (startsWith(selector, '$$')) {
				$(selector.substr(2)).on(type, func);
				return;
			}
			/**
			 * 选择器是以$开头，就是要从this 上找这个元素
			 * 'click $btn':'fn'
			 * this[$btn].on('click',fn)
			 * 之前视图初始话的时候就已经把相关的元素找到赋值到this上
			 * @param  {[type]}
			 */
			if (startsWith(selector, '$')) {
				this[selector] && this[selector].length && this[selector].on(type, func);
				return;
			}

			/**
			 * 'click $btn':'fn'
			 * this[$btn] 不存在就委托到根节点 this.el上面
			 * this[$btn].on('click',fn)
			 * @param  {[type]}
			 */
			//委托绑定
			this.el && this.el.length && this.el.on(type, selector, func);
		}
	});
	MyView.extend = function(o) {
		var parent = this;

		function F() {
			return parent.apply(this, sl.call(arguments));
		}

		F.prototype = Object.create(MyView.prototype);
		F.prototype.constructor = F;

		$.extend(F.prototype, o || {});

		return F;
	};
	return MyView;
}));
