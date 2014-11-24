/*
 *20141022 操作外围的元素，而不是里面的每个元素，实现循环滚动的，自动播放加上拖动
 *
 */
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
					curr.hasOwnProperty(i) && (o[i] = curr[i]);
				}
			}
			return o;
		};

	function slidePage(el, opts) {
		opts = $.extend(defaultOpts, opts || {});
		this.opts = opts;
		el = el.get(0);
		this.wrapEl = el;
		this.el = this.wrapEl.children[0];
		this.$el = $(this.el);
		this.els = this.$el.find('>div');
		//前后克隆一个元素
		this.$el.append(this.els[0].cloneNode(true)).prepend(this.els[this.els.length - 1].cloneNode(true));
		this.els = this.$el.find('>div');
		this.elCount = this.els.length;
		//H horizontal水平   V vertical 垂直
		this.wh = this.wrapEl.getBoundingClientRect().width || this.wrapEl.offsetWidth || window.innerWidth;
		//图片少于两张不自动滚动
		if (this.elCount <= 1) {
			return null;
		}
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
		init: function() {
			each(this.els, function(obj, index) {
				obj.index = index;
				obj.style.float = "left";
				obj.style.position = "relative";
			});
			this.resize();
			return this;
		},
		resize: function() {
			var self = this;
			each(this.els, function(obj, index) {
				obj.style.width = self.wh + "px";
			});
			this.el.fullwidth = this.els.length * this.wh;
			this.el.style.width = this.el.fullwidth + 'px';
			//当前显示的是哪个与元素
			var currIndex = this.getData('currIndex');
			if (currIndex) {
				translate(this.el, -this.wh * currIndex, 0);
				this.setData(-this.wh * currIndex);
			}
		},
		initEvent: function() {
			var self = this,
				curr = this.opts.current,
				tdis = -this.wh * curr;
			"resize orientationchange".split(" ").forEach(function(t) {
				window.addEventListener(t, function() {
					self.wh = self.wrapEl.getBoundingClientRect().width || self.wrapEl.offsetWidth || window.innerWidth;
					self.resize();
				});
			});
			//初始显示的不是第一个
			if (curr > 0) {
				translate(this.el, tdis, 0);
				this.setData(tdis);
			}
			//时间绑定
			"touchstart touchmove touchend touchcancel".split(" ").forEach(function(t) {
				self.el.addEventListener(t, self[t].bind(self), false);
			});
			return this;
		},
		touchstart: function(e) {
			if (this.moving) {
				this.startMoving = true;
				return this;
			}
			e.preventDefault();
			this.startMoving = false;
			var p = e.touches[0];
			//开始滑动位置
			this.px = p.pageX;
			this.py = p.pageY;
			$('.swipe-wrap').find('b').html(+new Date());
			return this;
		},
		touchmove: function(e) {
			if (this.moving || this.startMoving) {
				return this;
			}
			clearTimeout(self.timmer);
			e.preventDefault();
			e.stopPropagation();
			var p = e.touches[0],
				px = p.pageX,
				disX,
				oldDis = this.getData(),
				nowDis;
			this.el.classList.add('moving');
			this.disX = disX = px - this.px;
			nowDis = disX + oldDis;
			translate(this.el, nowDis, 0);
			return this;
		},
		touchend: function(e) {
			if (this.startMoving || this.moving) {
				//滑动事件开始的时候，目标处于滑动的状态，滑动设为false
				this.startMoving = false;
				return this;
			}
			clearTimeout(this.timmer);
			e.preventDefault();
			this.el.classList.remove('moving');
			this.moving = true;
			this.move();
			return this;
		},
		touchcancel: function() {
			this.moving = true;
			this.move();
			return this;
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
			var self = this;
			this.moving = true;
			setTimeout(function() {
				var currIndex = self.getData('currIndex'),
					pos = -(currIndex += 1) * self.wh;
				//更新距离
				self.setData(pos);
				self.setTransform(self.el, pos);
			}, 0);
		},
		move: function() {
			clearTimeout(this.timmer);
			var oldDis = this.getData();
			//如果是最后一个或、第一个就返回、偏移不够直接返回
			if (Math.abs(this.disX) < this.opts.dis) {
				//恢复上次状态
				this.setTransform(this.el, oldDis);
				this.initsetTimeout();
				this.moving = false;
				return;
			}
			//是向前滑动 还是向后滑动
			oldDis = this.disX > 0 ? (oldDis + this.wh) : (oldDis - this.wh);
			//更新距离
			this.setData(oldDis);
			this.setTransform(this.el, oldDis);
			this.disX = 0;
		},
		moveEnd: function() {
			this.moving = false;
			this.opts.transitionEnd.call(this);
			this.initsetTimeout();
			this.resetPos();
		},
		setTransform: function(el, dis, duration) {
			duration = typeof duration === 'undefined' ? this.opts.sepTime : 0;
			translate(el, dis, duration);
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
			return el;
		},
		setData: function(dis) {
			this.$el.data({
				'translate': dis,
				"currIndex": Math.abs(dis / this.wh)
			});
		},
		getData: function(pro) {
			return this.$el.data(pro || 'translate');
		},
		resetPos: function() {
			var num = this.getData() / this.wh,
				tdis;
			//重置元素的位置，让其能够循环滚动，到底第一个最后一个的是都要进行位置的重置
			if (num == 0) {
				tdis = -this.wh * (this.elCount - 2);
				translate(this.el, tdis, 0);
				this.setData(tdis);
			} else if (num == -(this.elCount - 1)) {
				translate(this.el, -this.wh, 0);
				this.setData(-this.wh);
			}
		}
	});
	return slidePage;
}));
