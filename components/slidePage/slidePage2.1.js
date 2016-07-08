/*
 *20141022 操作外围的元素，而不是里面的每个元素，实现循环滚动的，自动播放加上拖动
 *20141107修复三星S4在微信当中不能滑动的bug 支持不了find('>div')  增加：第一个是否能下拉回弹的配置
 *支持局部滚动，指定touch元素，滑动翻页，暂时只是拷贝的业务组件，改组件没有完全和项目的业务进行分离
 *20141209 修正不是循环滚动的时候，元素自动播放到最后一个的时候自动切换到第一个
 *20150120 当元素进入页面的时候加上inClass这个class
 *20150120 加上next pre两个方法，可以外部调用者两个方法实现翻页
 *20150124 $(this.els).eq(opts.current).addClass(opts.inClass);进入的时候 当前页添加动画
 */
((function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(['zepto'], factory);
	} else {
		root.slidePage = factory(root.$);
	}
})(window, function($) {
	var emptyFunc = function() {},
		defaultOpts = {
			touchTarget: '', //滑动事件绑定到哪个元素上
			time: 3000, //默认每个3秒播放一次
			sepTime: 500, //单次划过的时间
			dis: 30, //滑动超过30像素就翻页
			current: 0, //当前第第几个
			transitionEnd: emptyFunc, //每次transform之后的回调,用于进入之后添加动画
			isAutoPlay: false, //是否自动播放
			round: true, //是否循环滚动
			horizontal: true, //横向滚动
			endCallBack: emptyFunc, //滑动到最后一个时候的回调函数
			startCallBack: emptyFunc, //滑到第一个时候
			beforeInit: emptyFunc, //开始初始化之前
			isStartRebound: false, //当滑动到第一个的时候是否允许继续滑动回弹
			isEndRebound: false, //当滑动到最后一个的时候是否允许继续滑动回弹
			lastPageCallBack: emptyFunc, //最后一页的回调
			totalPage: 100, //总共可以翻多少页
			inClass: 'in' //元素进入页面加上class
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
		fxTransitionEnd = (function() {
			var el = document.createElement('div'),
				transEndEventNames = {
					'WebkitTransition': 'webkitTransitionEnd',
					'MozTransition': 'transitionend',
					'OTransition': 'oTransitionEnd otransitionend',
					'transition': 'transitionend'
				};
			for (var name in transEndEventNames) {
				if (el.style[name] !== undefined) {
					el = null;
					return transEndEventNames[name];
				}
			}
		}()),
		translateX = function(obj, dist, duration) {
			var style = obj.style;
			style.webkitTransform = 'translate3d(' + dist + 'px,0,0)';
			style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + dist + 'px)';
		},
		translateY = function(obj, dist, duration) {
			var style = obj.style;
			style.webkitTransform = 'translate3d(0,' + dist + 'px,0)';
			style.msTransform = style.MozTransform = style.OTransform = 'translateY(' + dist + 'px)';
		},
		getChilds = function(el) {
			var result = [],
				firstChild = el.firstElementChild,
				next = firstChild && firstChild.nextElementSibling;
			firstChild.nodeType === 1 && firstChild.nodeName === 'DIV' && result.push(firstChild);
			while (next) {
				next.nodeType === 1 && next.nodeName === 'DIV' && result.push(next);
				next = next.nextElementSibling;
			}
			return result;
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
		opts = $.extend({}, defaultOpts, opts || {});
		this.opts = opts;
		this.wrapEl = el.get(0);
		this.$el = $(getChilds(el.get(0))[0]); //el.find('>div');//$(getChilds(el.get(0)));
		this.el = this.$el.get(0);
		this.els = getChilds(this.$el.get(0)); //this.$el.find('>div');
		if (opts.round) {
			//前后克隆一个元素
			this.$el.append(this.els[0].cloneNode(true)).prepend(this.els[this.els.length - 1].cloneNode(true));
			//重新设置els
			this.els = getChilds(this.$el.get(0)); //this.$el.find('>div');
		}
		this.elCount = this.els.length;
		//H horizontal水平   V vertical 垂直
		this.wh = this.getWidthOrHeight();
		//图片少于两张不自动滚动
		if (this.elCount <= 1) {
			return null;
		}
		//页面偏移
		this.disX = 0;
		this.px = 0;
		this.py = 0;
		//是否允许移动翻页，这个标志可以控制是否允许向下回弹
		this.allowMoveDown = true;
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
		constructor: slidePage,
		init: function() {
			var opts = this.opts;
			opts.beforeInit && opts.beforeInit.call(this);
			each(this.els, function(obj, index) {
				obj.index = index;
				obj.style.position = "relative";
				opts.horizontal === true && (obj.style['float'] = "left");
			});
			this.resize();
			this.el.style.webkitTransform = "translate3d(0,0,0)";
			$(this.els).eq(opts.current).addClass(opts.inClass);
			return this;
		},
		resize: function() {
			var self = this;
			this.els = getChilds(this.$el.get(0)); //this.$el.find('>div');
			this.elCount = this.els.length;
			each(this.els, function(obj, index) {
				self.opts.horizontal ? (obj.style.width = self.wh + "px") : (obj.style.height = self.wh + "px");
			});
			this.el.style[self.opts.horizontal ? "width" : "height"] = (this.els.length * this.wh) + 'px';
			//当前显示的是哪个与元素
			var currIndex = this.getCurrentIndex();
			if (currIndex) {
				this.translate(this.el, -this.wh * currIndex, 0);
				this.setData(-this.wh * currIndex);
			}
			return this;
		},
		initEvent: function() {
			var self = this,
				curr = this.opts.current,
				tdis = -this.wh * (curr | 0),
				touchTarget = this.opts.touchTarget || self.el;

			"resize orientationchange".split(" ").forEach(function(t) {
				window.addEventListener(t, function() {
					self.wh = self.getWidthOrHeight();
					self.resize();
				});
			});

			//循环滚动距离要多加一个宽度
			this.opts.round && (tdis -= this.wh);
			//初始显示的不是第一个
			this.translate(this.el, tdis, 0);
			this.setData(tdis);
			//事件绑定
			"touchstart touchmove touchend touchcancel".split(" ").forEach(function(t) {
				touchTarget.addEventListener(t, self[t].bind(self), false);
			});
			return this;
		},
		touchstart: function(e) {
			if (this.moving) {
				this.startMoving = true;
				return this;
			}
			//e.preventDefault();
			this.startMoving = false;
			var p = e.touches[0];
			//开始滑动位置
			this.px = p.pageX;
			this.py = p.pageY;
			return this;
		},
		touchmove: function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (this.moving || this.startMoving) {
				return this;
			}
			clearTimeout(this.timmer);
			var p = e.touches[0],
				px = p.pageX,
				py = p.pageY,
				disX,
				oldDis = this.getData(),
				currIndex = this.getCurrentIndex();
			disX = this.opts.horizontal ? (px - this.px) : (py - this.py);
			this.disX = disX;
			var nowDis, isLast = this.opts.totalPage === this.elCount && disX < 0,
				isLastElment = currIndex === this.elCount - 1 && disX < 0;
			//不允许继续滑动回弹
			if (!this.opts.isStartRebound && currIndex === 0 && disX > 0) { /*|| (isLast && !this.opts.isRebound && disX < 0)*/
				return;
			}
			//最后一个元素，不允许滑动回弹
			if (!this.opts.isEndRebound && isLast && isLastElment) { /*|| (isLast && !this.opts.isRebound && disX < 0)*/
				this.opts.lastPageCallBack && this.opts.lastPageCallBack.call(this);
				return;
			}
			this.el.classList.add('moving');
			//是最后一个 向上滑动超过多少就没效果
			nowDis = disX + oldDis;
			this.translate(this.el, nowDis, 0);
			isLastElment && this.opts.endCallBack.call(this, disX);
			return this;
		},
		touchend: function(e) {
			if (this.startMoving || this.moving) {
				//滑动事件开始的时候，目标处于滑动的状态，滑动设为false
				this.startMoving = false;
				return this;
			}
			clearTimeout(this.timmer);
			var disX = this.disX,
				currIndex = this.getCurrentIndex(),
				isLast = this.opts.totalPage === this.elCount && disX < 0,
				isLastElment = currIndex === this.elCount - 1 && disX < 0;
			if (!this.opts.isStartRebound && currIndex === 0 && disX > 0) { /*|| (!this.opts.isRebound && currIndex === this.elCount - 1 && this.disX < 0)*/
				return;
			}
			//最后一个元素，不允许滑动回弹
			if (!this.opts.isEndRebound && isLast && isLastElment) {
				return;
			}
			//e.preventDefault();
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
				var currIndex = self.getCurrentIndex(),
					pos = -(currIndex += 1) * self.wh;
				//不是循环滚动，并且滚到最后一个的时候应该切换到第一个
				pos = !self.opts.round && currIndex === self.elCount ? 0 : pos;
				//更新距离
				self.setData(pos);
				self.setTransform(self.el, pos);
			}, 0);
		},
		move: function() {
			clearTimeout(this.timmer);
			var oldDis = this.getData(),
				currIndex = this.getCurrentIndex();
			/* 打补丁 哎呀########################*/
			if (Math.abs(this.disX) > 10) {
				var self = this;
				this.el.classList.add('touchmovend');
				setTimeout(function() {
					self.el.classList.remove('touchmovend');
				}, 300);
			}
			/* 打补丁 哎呀########################*/
			//如果是最后一个或、第一个就返回、偏移不够直接返回 ，
			//或者不是循环滚动,在第一个或者最后一个时候就应该返回，而不发生翻页事件
			if (Math.abs(this.disX) < this.opts.dis) {
				this.resetLastPos();
				return this;
			} else if (!this.opts.round && this.disX > 0 && currIndex == 0) {
				this.resetLastPos();
				return this;
			} else if (!this.opts.round && this.disX < 0 && currIndex == this.elCount - 1) {
				this.resetLastPos();
				return this;
			}
			//距离取整，可能之前滑到一般被阻止滑动了
			oldDis = ((oldDis / this.wh) | 0) * this.wh;
			//是向前滑动 还是向后滑动
			oldDis = this.disX > 0 ? (oldDis + this.wh) : (oldDis - this.wh);
			//更新距离
			this.setData(oldDis);
			this.setTransform(this.el, oldDis);
			this.disX = 0;
			return this;
		},
		moveEnd: function() {
			this.moving = false;
			this.opts.transitionEnd.call(this);
			this.initsetTimeout();
			//元素位置重置
			this.resetPos();
			this.handleClass();
		},
		setTransform: function(el, dis, duration) {
			duration = typeof duration === 'undefined' ? this.opts.sepTime : 0;
			this.translate(el, dis, duration);
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
		getCurrentIndex: function() {
			return Math.floor(Math.abs(this.getData() / this.wh));
		},
		resetPos: function() {
			var num = this.getCurrentIndex(),
				tdis;
			//重置元素的位置，让其能够循环滚动，到第一个最后一个的是都要进行位置的重置
			if (this.opts.round) {
				//循环滚动
				if (num == 0) {
					tdis = -this.wh * (this.elCount - 2);
					this.translate(this.el, tdis, 0);
					this.setData(tdis);
				} else if (num == this.elCount - 1) {
					this.translate(this.el, -this.wh, 0);
					this.setData(-this.wh);
				}
			} else {
				//不是循环滚动
				if (num == 0) {
					this.setData(0);
				} else if (num == this.elCount - 1) {
					this.setData(-this.wh * (this.elCount - 1));
				}
			}
		},
		resetLastPos: function() {
			var oldDis = this.getData();
			//恢复上次状态
			this.setTransform(this.el, oldDis);
			this.initsetTimeout();
			this.moving = false;
			this.getCurrentIndex() === this.elCount - 1 && this.opts.endCallBack.call(this, 0, true);
		},
		handleClass: function() {
			var cls = this.opts.inClass,
				num = this.getCurrentIndex();
			each(this.els, function(obj) {
				obj.classList.remove(cls);
			});
			this.els[num] && this.els[num].classList.add(cls);
		},
		next: function() {
			this.disX = -(this.opts.dis + 10);
			this.move();
		},
		pre: function() {
			this.disX = this.opts.dis + 10;
			this.move();
		},
		translate: function(obj, dist, duration) {
			var style = obj && obj.style;
			if (!style) {
				return;
			}
			style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';
			this.opts.horizontal ? translateX(obj, dist, duration) : translateY(obj, dist, duration);
		},
		getWidthOrHeight: function() {
			if (this.opts.horizontal) {
				return this.wrapEl.getBoundingClientRect().width || this.wrapEl.offsetWidth || window.innerWidth;
			}
			return this.wrapEl.getBoundingClientRect().height || this.wrapEl.offsetHeight || window.innerHeight;
		}
	});
	return slidePage;
}));
