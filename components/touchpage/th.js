(function() {
	function slidePage(els, dis) {
		if ($.type(els) != 'array' || !els.length) {
			return;
		}
		this.els = els;
		this.elCount = els.length;
		this.wh = window.innerHeight;
		this.current = els[0];
		//页面偏移
		this.disY = this.py = 0;
		//滑动操作多少就翻页，没有判断正负数
		this.dis = dis || 30;
		this.init().initEvent();
	}
	$.extend(slidePage.prototype, {
		init: function() {
			var self = this;
			this.els.forEach(function(c, i) {
				self.els[i].index = i;
			});
			return this;
		},
		initEvent: function() {
			var self = this;
			this.els.on('touchstart', function(e) {
				e.preventDefault();
				var p = e.touches[0];
				/*next = this.nextElementSibling,
					pre = this.previousElementSibling;*/
				//开始滑动位置
				self.py = p.pageY;
				//这个最好移动到touchmove中去 不然在安卓微信中会有问题
				/*$(this).addClass('moving');
				next && $(next).addClass('moving');
				pre && $(pre).addClass('moving');*/
			});

			this.els.on('touchmove', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var p = e.touches[0],
					$this = $(this),
					py = p.pageY,
					disY, $next, $pre;
				self.current = this;
				self.disY = disY = py - self.py;
				$this.addClass('moving');
				self.setTransform($this, disY);

				if (disY > 0 && this.index > 0) {
					$pre = $(self.els[this.index - 1]);
				 	$pre.addClass('moving');
					self.setTransform($pre, -self.wh + disY);
				} else if (disY < 0 && this.index < self.elCount - 1) {
					$next = $(self.els[this.index + 1]);
					$next.addClass('moving');
					self.setTransform($next, self.wh + disY);
				}
			});

			this.els.on('touchend', function(e) {
				e.preventDefault();
				self.current = this;
				self.reset();
				self.disY = 0;
			});

			this.els.on('touchcancel', function(e) {
				e.preventDefault();
				self.current = this;
				self.reset();
			});
			return self;
		},
		reset: function() {
			var self = this,
				$thiscurrent = $(this.current),
				curr = this.current,
				$next = $(this.current.nextElementSibling),
				$pre = $(this.current.previousElementSibling);
			$next.length && $next.removeClass('moving');
			$pre.length && $pre.removeClass('moving');
			$thiscurrent.removeClass('moving');

			//如果是最后一个或、第一个就返回、偏移不够直接返回
			if ((curr.index == self.elCount - 1 && self.disY < 0) || (self.disY > 0 && curr.index == 0) || (self.disY > -self.dis && self.disY < self.dis)) {
				//恢复上次状态
				self.setTransform($thiscurrent, 0);
				self.disY > 0 && $pre.length && self.setTransform($pre, -self.wh);
				self.disY < 0 && $next.length && self.setTransform($next, self.wh);
				return;
			}
			var wh = self.wh,
				val = self.disY < -self.dis ? -wh : wh;
			//上一个、下一个
			var preOrNext;
			if (self.disY > 0 && curr.index > 0) {
				preOrNext = $pre;
			} else if (self.disY < 0 && curr.index < self.elCount - 1) {
				preOrNext = $next;
			}
			//setTimeout(function() {
			self.setTransform($(self.current), val);
			preOrNext && self.setTransform($(preOrNext), 0);
			//}, 0);
		},
		setTransform: function($el, y) {
			$el.css({
				'transform': 'translate3d(0, ' + y + 'px, 0)',
				'-webkit-transform': 'translate3d(0, ' + y + 'px, 0)',
			});
			return $el;
		}
	});
	$(function() {
		new slidePage($('body').find('section'));
	});

})();
