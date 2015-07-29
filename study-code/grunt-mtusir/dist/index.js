/*! my-mtusi - v0.0.1 - 2015-07-29
author: xiongjian
* Copyright (c) 2015 xiongjian; Licensed  */
((function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(['zepto'], factory);
	} else {
		root.slidePage = factory(root.$);
	}
})(window, function($) {
	var defaultOpts = {
			//默认每个3秒播放一次
			time: 3000,
			//单次划过的时间
			sepTime: 500,
			//滑动超过30像素就翻页
			dis: 30,
			//当前第第几个
			current: 0,
			//是否显示小圆点
			isShowPoint: false,
			transitionEnd: function() {},
			//是否自动播放
			isAutoPlay: true
		},
		each = function(obj, callback, context) {
			if (obj == null) {
				return;
			}
			var nativeForEach = Array.prototype.forEach;
			if (nativeForEach && obj.forEach === nativeForEach) {
				obj.forEach(callback, context);
			} else if (obj.length === +obj.length) {
				for (var i = 0, l = obj.length; i < l; i++) {
					if (callback.call(context, obj[i], i, obj) === false) {
						break;
					}
				}
			}
		},
		geTransitionEnd = function() {
			var transitionEnd = (function() {
				var el = document.createElement('bootstrap'),
					transEndEventNames = {
						'WebkitTransition': 'webkitTransitionEnd',
						'MozTransition': 'transitionend',
						'OTransition': 'oTransitionEnd otransitionend',
						'transition': 'transitionend'
					};
				for (var name in transEndEventNames) {
					if (el.style[name] !== undefined) {
						return transEndEventNames[name];
					}
				}
			}());
			return transitionEnd;
		},
		fxTransitionEnd = geTransitionEnd(),
		translate = function(obj, dist, duration) {
			var style = obj && obj.style;
			if (!style) {
				return;
			}
			style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';
			style.webkitTransform = 'translate3d(' + dist + 'px,0,0)';
			style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + dist + 'px)';
		},
		extend = function() {
			var args = arguments,
				o = args[0],
				len = args.length,
				curr;
			for (var j = 1; j < len; j++) {
				curr = args[j];
				for (var i in curr) {
					o[i] = curr[i];
				}
			}
			return o;
		};

	function slidePage(el, opts) {
		opts = $.extend(defaultOpts, opts || {});
		this.opts = opts;
		el = el.get(0);
		this.el = el;
		this.els = $(el.children[0]).find('>div');
		this.elCount = this.els.length;
		//H horizontal水平   V vertical 垂直
		this.wh = el.getBoundingClientRect().width || el.offsetWidth || window.innerWidth;
		//高度自适应，这里是写死比例
		//this.el.style.height = (this.wh * 5) / 16 + 'px';
		//图片少于两张不自动滚动
		if (el == null || this.elCount <= 1) {
			return;
		}
		//当前显示元素和当前滑动的元素
		this.current = this.els[opts.current];
		this.currentShow = this.current;
		//页面偏移
		this.disX = 0;
		this.px = 0;
		//滑动操作多少就翻页，没有判断正负数
		this.dis = opts.dis;
		/*是否正在滑动中*/
		this.moving = false;
		/*记录自动播放*/
		this.timmer = null;
		//是否是向后滑动
		return this.init().initEvent().initsetTimeout(); //;
	}
	extend(slidePage.prototype, {
		createBtn: function() {
			this.nextUl = document.createElement('ul');
			this.nextUl.classList.add('list');
			var oFrag = document.createDocumentFragment(), //文档碎片
				oli,
				len = this.elCount,
				i = 0;
			oFrag.appendChild(document.createElement('i'));
			for (; i < len; i++) {
				oli = document.createElement('li');
				oFrag.appendChild(oli);
			}
			this.nextUl.appendChild(oFrag);
			this.el.appendChild(this.nextUl);
			return this;
		},
		init: function() {
			this.opts.isShowPoint && this.createBtn();
			var self = this;
			each(this.els, function(obj, index) {
				self.els[index].index = index;
				(index === self.opts.current) || translate(self.els[index], self.wh, 0);
			});
			if (this.opts.isShowPoint) {
				this.smallPoint = this.nextUl.children[0];
				this.points = [];
				each(this.nextUl.children, function(item) {
					item.tagName === 'LI' && self.points.push(item);
				});
			}
			return this;
		},
		initEvent: function() {
			var self = this;
			window.addEventListener('resize orientationchange', function() {
				self.wh = self.el.getBoundingClientRect().width || self.el.offsetWidth || window.innerWidth;
			});
			return this.touchstart().touchmove().touchend().touchcancel();
		},
		touchstart: function() {
			var self = this;
			//var con = $('#contenttt').get(0);
			this.els.on('touchstart', function(e) {
				if (self.moving) {
					//滑动事件开始的时候 目标处于滑动的状态
					self.startMoving = true;
					//con.innerHTML += '|';
					return;
				}
				//con.innerHTML += this.index;
				//e.preventDefault();
				self.startMoving = false;
				self.current = this;
				var p = e.touches[0];
				//开始滑动位置
				self.px = p.pageX;
			});
			return self;
		},
		touchmove: function() {
			var self = this;
			this.els.on('touchmove', function(e) {
				if (self.moving || self.startMoving) {
					return;
				}
				clearTimeout(self.timmer);
				e.preventDefault();
				e.stopPropagation();
				var p = e.touches[0],
					px = p.pageX,
					disX,
					next,
					pre;
				self.current = this;
				this.classList.add('moving');
				self.disX = disX = px - self.px;
				//向右滑动
				if (disX > 0 && this.index >= 0) {
					pre = this.index === 0 ? self.els[self.elCount - 1] : self.els[this.index - 1];
					pre.classList.add('moving');
					self.setTransform(pre, -self.wh + disX);
					//向左滑动
				} else if (disX < 0 && this.index < self.elCount) {
					next = this.index === self.elCount - 1 ? self.els[0] : self.els[this.index + 1];
					next.classList.add('moving');
					self.setTransform(next, self.wh + disX);
				}
				self.setTransform(this, disX);
			});
			return self;
		},
		touchend: function() {
			var self = this;
			this.els.on('touchend', function(e) {
				if (self.startMoving || self.moving) {
					//滑动事件开始的时候，目标处于滑动的状态，滑动设为false
					self.startMoving = false;
					return;
				}
				this.moving = true;
				clearTimeout(self.timmer);
				//e.preventDefault();
				self.current = this;
				self.reset();
				self.disX = 0;
			});
			return self;
		},
		touchcancel: function() {
			var self = this;
			this.els.on('touchcancel', function() {
				this.moving = true;
				self.current = this;
				self.reset();
				self.disX = 0;
			});
			return self;
		},
		initsetTimeout: function() {
			var self = this;
			if (self.opts.isAutoPlay !== true) {
				return self;
			}
			clearTimeout(this.timmer);
			self.timmer = setTimeout(function() {
				//没有在移动中 就开始移动
				self.moving || self.setTimeoutMove();
			}, self.opts.time);
			return self;
		},
		setTimeoutMove: function() {
			this.moving = true;
			var self = this,
				//当前显示的
				currShow = this.currentShow,
				currIndex = currShow.index,
				next = currShow.nextElementSibling;
			//当前元素是最后一个，那么接下来就是第一个元素
			if (currIndex == this.elCount - 1) {
				//把第一个元素设置到最后去
				next = this.els[0];
				currIndex = -1;
			}
			//把后面的一个元素放到屏幕右边
			self.setTransform(next, self.wh, 0);
			setTimeout(function() {
				//显示后面这个元素
				self.setTransform(next, 0);
				//当前显示元素从屏幕向左划出
				self.setTransform(self.currentShow, -self.wh);
				self.setTransform(self.smallPoint, (currIndex + 1) * 12);
				self.current = next;
				self.currentShow = next;
			}, 0);
		},
		reset: function() {
			var self = this,
				curr = this.current,
				next = curr.nextElementSibling,
				pre = curr.previousElementSibling;
			//如果是最后一个或、第一个就返回、偏移不够直接返回
			if ((self.disX > -self.dis && self.disX < self.dis)) {
				//恢复上次状态
				self.setTransform(this.current, 0);
				self.disX > 0 && pre && self.setTransform(pre, -self.wh);
				self.disX < 0 && next && self.setTransform(next, self.wh);
				self.initsetTimeout();
				self.currentShow = curr;
				this.moving = false;
				return;
			} else if (curr.index == self.elCount - 1 && self.disX < 0) {
				next = self.els[0];
			} else if (self.disX > 0 && curr.index == 0) {
				pre = self.els[self.elCount - 1];
			}
			curr.classList.remove('moving');
			next && next.classList.remove('moving');
			pre && pre.classList.remove('moving');
			this.move(pre, next);
		},
		move: function(pre, next) {
			this.moving = true;
			var self = this,
				curr = this.current,
				wh = self.wh,
				val = self.disX < -self.dis ? -wh : wh;
			//上一个、下一个
			var preOrNext = null,
				disPoint = 12;
			//向前滑动
			if (self.disX > 0 && curr.index >= 0) {
				preOrNext = pre;
				disPoint = curr.index === 0 ? 12 * (self.elCount - 1) : 12 * (curr.index - 1);
				//向后滑动
			} else if (self.disX < 0 && curr.index < self.elCount) {
				preOrNext = next;
				disPoint = (curr.index === self.elCount - 1) ? 0 : 12 * (curr.index + 1);
			}
			/*当前的滑动出去，显示前面或后面的那个*/
			self.setTransform(self.current, val);
			preOrNext && self.setTransform(preOrNext, 0);
			this.currentShow = preOrNext;
			/*小圆点滑动*/
			self.smallPoint && self.setTransform(self.smallPoint, disPoint);
		},
		moveEnd: function() {
			this.moving = false;
			this.opts.transitionEnd.call(this);
			this.initsetTimeout();
		},
		setTransform: function(el, dis, duration) {
			duration = typeof duration === 'undefined' ? this.opts.sepTime : 0;
			translate(el, dis, duration);
			//if (el == this.smallPoint) {
			var self = this,
				fired = false,
				endEvent = fxTransitionEnd,
				wrappedCallback = function(event) {
					if (typeof event !== 'undefined') {
						if (event.target !== event.currentTarget) {
							return;
						} // makes sure the event didn't bubble from "below"
						event.target.removeEventListener(endEvent, wrappedCallback);
					} else {
						this.removeEventListener(endEvent, wrappedCallback);
					} // triggered by setTimeout
					fired = true;
					self.moveEnd && self.moveEnd.call(self);
				};
			if (duration > 0) {
				el.addEventListener(endEvent, wrappedCallback, false);
				setTimeout(function() {
					if (fired) {
						return;
					}
					wrappedCallback.call(el);
				}, duration + 25);
			}
			//setTimeout(self.moveEnd.bind(self), duration);
			//}
			return el;
		}
	});
	return slidePage;
}));
;(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else {
		root.utils = factory();
	}
}(window, function() {
	var geTransitionEnd = function() {
			var transitionEnd = (function() {
				var el = document.createElement('bootstrap'),
					transEndEventNames = {
						'WebkitTransition': 'webkitTransitionEnd',
						'MozTransition': 'transitionend',
						'OTransition': 'oTransitionEnd otransitionend',
						'transition': 'transitionend'
					};
				for (var name in transEndEventNames) {
					if (el.style[name] !== undefined) {
						return transEndEventNames[name];
					}
				}
			}());
			return transitionEnd;
		},
		translate = function(obj, dist, duration, cb) {
			var style = obj && obj.style,
				wrappedCallback, fired = false,
				fixEvent = geTransitionEnd();
			duration = duration || 300;
			if (!style) {
				return;
			}
			style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';
			style.webkitTransform = 'translate3d(' + dist + 'px,0,0)';
			style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + dist + 'px)';
			wrappedCallback = function(event) {
				if (typeof event !== 'undefined') {
					if (event.target !== event.currentTarget) {
						return;
					}
					// makes sure the event didn't bubble from "below"
					event.target.removeEventListener(fixEvent, wrappedCallback);
				} else {
					obj.removeEventListener(fixEvent, wrappedCallback) // triggered by setTimeout
				}
				fired = true
				cb && cb.call(this)
			};

			if (duration > 0) {
				obj.addEventListener(fixEvent, wrappedCallback)
				// transitionEnd is not always firing on older Android phones
				// so make sure it gets fired
				setTimeout(function() {
					if (fired) return;
					wrappedCallback.call(obj)
				}, duration + 25);
			}
		};
	return {
		'geTransitionEnd': geTransitionEnd,
		'translate': translate
	};

}));
;(function(root, factory) {
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
