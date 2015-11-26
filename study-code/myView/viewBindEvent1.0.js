/* @grunt-build */

/**
 * author           xj
 * @date            2015-9-23 10:08:00
 * @email           568915669@qq.com
 * @description
 */
;
(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.cmd) {
		define(factory);
	} else {
		root.MyView = factory(root, root.$);
	}
}(window, function() {
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
		toStr = ({}).toString,
		sl = [].slice,
		isString = function(o) {
			return toStr.call(o) === '[object String]';
		},
		isFunc = function(o) {
			return $.isFunction(o);
		},
		startsWith = function(target, str, ignorecase) {
			var startStr = target.substr(0, str.length);
			return ignorecase ? startStr.toLowerCase() === str.toLowerCase() : startStr === str;
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
		};

	function MyView() {
		/**
		 * 所有初始话之前执行
		 */
		isFunc(self.onInitBefore) && self.onInitBefore.call(self);
		//根节点this.$el
		isString(this.$el) && (this.$el = $(this.$el));
		this._init();
	}

	$.extend(MyView.prototype, {
		//修正constructor
		constructor: MyView,
		/**
		 * 初始话，在domReady之后执行
		 * @return {[type]} [description]
		 */
		_init: function() {
			var self = this;
			var handle = function() {
				self._initView()._initEvent();
				isFunc(self.init) && self.init.call(self);
			};
			//基本上百分之九十九的情况都是要走domReady的
			this.opts.isNotDomReady === true ? handle() : $(handle);
			return this;
		},
		/**
		 * 1、视图初始化前
		 * 2、视图初始话后
		 * 3、事件初始话前
		 * 4、事件初始话后
		 * @type {[type]}
		 */
		onBeforeViewInit: emptyFunc,
		onAfterViewInit: emptyFunc,
		onBeforeEventInit: emptyFunc,
		onAfterEventInit: emptyFunc,
		/**
		 * 视图初始话，取到对应的相关元素，附加到this对象上
		 * @return {[type]} [description]
		 */
		_initView: function() {
			var self = this;
			this.onBeforeViewInit.call(this);
			$.each(this.viewData || {}, function(key, sel) {
				self[key] = $(sel);
			});
			this.onAfterViewInit.call(this);
			return this;
		},
		/**
		 * 根据配置项，给相关元素绑定相关事件
		 * @return {[type]} [description]
		 */
		_initEvent: function() {
			this.onBeforeEventInit.call(this);
			var es = this.events;
			for (var item in es) {
				es.hasOwnProperty(item) && this._bindEvent(item, es[item]);
			}
			this.onAfterEventInit.call(this);
			return this;
		},
		/**
		 * 	"click .jp-test1": "test1",
		 *	"dblclick .jp-test2": "test2",
		 *	"click $jp-test3": "test3",
		 *	'click $$.jp-test4':'test4',
		 *	"click $$.jp-test5": "window.test5WindowFN",
		 *	"click #jp-test6": "test6"
		 * @param  {[type]} de   [description]
		 * @param  {[type]} func [description]
		 * @return {[type]}      [description]
		 */
		_bindEvent: function(de, func) {
			var key = de.split(/\s+/),
				//事件类型
				type = key[0],
				//选择器
				selector = key[1],
				//委托绑定
				delegate = $.trim(key[2] || ''),
				el;
			//"click tr td .sel":"fn" 委托事件,有多个空格隔开这种需要特殊处理。
			if (key.length >= 3) {
				key.shift();
				key.shift();
				//取到委托的selector，并且处理掉多个空格的情况
				delegate = key.join(' ');
			}

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
				el = $(selector.substr(2));
				//委托绑定和直接绑定
				delegate ? el.on(type, delegate, func) : el.on(type, func);
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
				el = this[selector];
				if (el && el.length) {
					delegate ? el.on(type, delegate, func) : el.on(type, func);
				}
				return;
			}

			/**
			 * 'click .btn':'fn'
			 * this.$el.on('click' , '.btn' , fn)
			 * 直接委托绑定到根节点上
			 * @param  {[type]}
			 */
			//委托绑定到根节点(this.$el)上
			this.$el && this.$el.length && this.$el.on(type, selector, func);
		}
	});

	/**
	 * 把obj  F.prototype 上，并且new一个F实例对象返回
	 * F继承于MyView
	 * @param  {[object]} o
	 * @return {[type]}
	 */
	MyView.extend = function(obj) {
		obj = obj || {};
		var parent = this;

		if (typeof obj !== 'object') {
			throw new Error('arguments[0] must be object');
		}

		//已经实例化
		//没有处理覆盖prototype的情况
		if (this instanceof MyView) {
			$.extend(true, this, obj);
			return this;
		}

		function F(args) {
			this.opts = $.extend(true, {}, this.opts || {}, args || {});
			//调用父类构造函数
			parent.call(this);
			//return parent.apply(this, sl.call(arguments));
		}

		F.prototype = Object.create(MyView.prototype);
		F.prototype.constructor = F;

		$.extend(true, F.prototype, obj);

		/**
		 * 附加对象到F上
		 * @param  {object} obj
		 * @return {this}
		 */
		F.prototype.extend = F.extend = function(obj) {
			$.extend(true, F.prototype, obj);
		};

		return F;
	};
	return MyView;
}));
