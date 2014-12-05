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
		item, getObj = function(obj, str) {
			return str.split('.').reduce(function(o, n) {
				return o && o[n];
			}, obj);
		};

	function MyView(options) {
		$.extend(this, defaultOpts, options || {});
		this.initialize.call(this);
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
			toStr.call(func) === '[object String]' && (func = getObj(this, func.trim()));
			if (toStr.call(func) !== '[object Function]') {
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
		$.extend(F.prototype, o || {});
		return F;
	};
	return MyView;
}));
