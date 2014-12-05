;
(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(['zepto'], factory);
	} else {
		root.MyView = factory(root, root.$);
	}
}(window, function(root, $) {
	var emptyFunc = function() {},
		defaultOpts = {
			initialize: emptyFunc,
			el: '',
			events: {},
		},
		toStr = ({}).toString,
		isString = function(o) {
			return toStr.call(o) === '[object String]';
		},
		isFunc = function(o) {
			return toStr.call(o) === '[object Function]';
		},
		getObj = function(obj, str) {
			return str.split('.').reduce(function(o, n) {
				return o && o[n];
			}, obj);
		},
		item;

	function MyView(options) {
		$.extend(this, defaultOpts, options || {});
		this.initialize.call(this);
		isString(this.el) && (this.el = $(this.el));
		this.init();
	}

	$.extend(MyView.prototype, {
		constructor: MyView,
		init: function() {
			this.initEvent();
		},
		initEvent: function() {
			var es = this.events;
			for (item in es) {
				if (!es.hasOwnProperty(item)) {
					continue;
				}
				this.bindEvent(item, es[item]);
			}
		},
		bindEvent: function(de, func) {
			var key = de.split(' '),
				type = key[0],
				selector = key[1];
			if (!type || !selector) {
				return;
			}
			isString(func) && (func = getObj(this, func.trim()));
			if (!isFunc(func)) {
				return;
			}
			if (selector.substr(0, 1) === '$') {
				$(selector.substr(1)).on(type, func);
				return;
			}
			this.el && this.el.on(type, selector, func);
		}
	});
	MyView.extend = function(o) {
		var parent = this,
			sl = [].slice;

		function F() {
			return parent.apply(this, [o].concat(sl.call(arguments)));
		}
		F.constructor = parent.constructor;
		F.prototype = MyView.prototype;
		$.extend(F, o || {});
		return F;
	};
	return MyView;
}));
