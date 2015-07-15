if (!Function.prototype.hasOwnProperty('bind')) {
	Function.prototype.bind = function(context) {
		var target = this;
		if (typeof target != "function") {
			throw new TypeError();
		}
		var sl = [].slice,
			args = sl.call(arguments, 1);
		return function() {
			return fn.apply(context || this, args.concat(sl.call(arguments)));
		};
	};
}

var $ = function(id) {
	return (typeof id === 'string' || id instanceof String) ? document.getElementById(id) : id;
};

//获取tagName
var $$ = function(tagName, oParent) {
	return (oParent || document).getElementsByTagName(tagName)
};

var each = function(obj, callback, context) {
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
};

var autoPlay = function(id, opts) {
	this.defOpts = {
		direction: 'h', //h   v 横纵
		time: 3000,
		sepTime: 500,
		isShowNP: true
	};

	opts = opts || {};
	for (var p in opts) {
		this.defOpts[p] = opts[p];
	}
	this.el = $(id);
	this.ul = $$('ul', this.el)[0];
	this.imgs = $$('img', this.ul);

	this.direction = this.defOpts.direction;

	this.direction === 'h' ? this.horizontal() : this.vertical();　
	this.oneMoveLen = this.direction === 'h' ? this.imgs[0].offsetWidth : this.imgs[0].offsetHeight;

	//记录切换动画
	this.timmer = null;
	//记录播放
	this.autoTimmer = null;
	this.curr = 0;
	this.initCss3();
	// next pre
	this.NP = $$('a', self.el);

	this.init();
};

autoPlay.version = '1.0.0';

autoPlay.prototype = {
	constructor: autoPlay,
	init: function() {
		var self = this;
		this.createBtn();
		this.aBtn = $$("li", this.oCount);
		this.toggle();

		this.autoTimmer = setInterval(self.next.bind(self), self.defOpts.time);

		this.el.onmouseover = function() {
			clearInterval(self.autoTimmer);
			self.defOpts.isShowNP && self.showNP();
		};

		this.el.onmouseout = function() {
			self.autoTimmer = setInterval(self.next.bind(self), self.defOpts.time);
			self.defOpts.isShowNP && self.hideNP();
		};

		each(this.aBtn, function(obj, index) {
			obj.index = index;
			obj.onmouseover = function() {
				self.curr = obj.index;
				self.toggle();
			};
		});
		this.initPreOrNext();
	},
	initCss3: function(flag) {
		if (!flag) {
			this.css3(this.ul, {
				'transform': 'translate3d(0,0,0)',
				'transition': 'all ' + this.defOpts.sepTime + 'ms ease-in-out'
			});
		} else {
			this.css3(this.ul, {
				'transform': 'none',
				'transition': 'none'
			});
		}

	},
	horizontal: function() {
		//设置样式课宽度
		this.ul.className = 'fl';
		this.ul.style.width = '8000px';
	},
	vertical: function() {

	},
	css3: function(obj, s, v) {
		var proArr = ['-moz-', '-webkit-', '-o-'],
			val,
			getArr = function(pro) {
				var arr = [];
				arr.push(pro);
				each(proArr, function(str, i) {
					arr.push(str + pro);
				});
				return arr;
			};

		if (typeof s === 'string') {
			each(getArr(s), function(str) {
				obj.style[str] = v;
			});
			return;
		}

		for (var p in s) {
			if (!s.hasOwnProperty(p)) {
				continue;
			}
			val = s[p];
			each(getArr(p), function(str) {
				obj.style[str] = val;
			});
		}
	},
	showNP: function() {
		each(this.NP, function(obj) {
			obj.style.opacity = 0.4;
		});
	},
	hideNP: function() {
		each(this.NP, function(obj) {
			obj.style.opacity = 0;
		});
	},
	initPreOrNext: function() {
		var self = this;
		each(this.NP, function(obj) {
			if (obj.className === 'pre') {
				obj.onclick = self.pre.bind(self);
			} else if (obj.className === 'next') {
				obj.onclick = self.next.bind(self);
			}
		});
	},
	createBtn: function() {
		this.oCount = document.createElement('ul');
		this.oCount.className = "count";
		var oFrag = document.createDocumentFragment(), //文档碎片
			oli, liHtmls;
		each(this.imgs, function(obj, i) {
			oli = document.createElement('li');
			oli.innerHTML = i + 1;
			oFrag.appendChild(oli);
		}, this);
		this.oCount.appendChild(oFrag);
		this.el.appendChild(this.oCount);
	},
	toggle: function() {
		each(this.aBtn, function(obj, i) {
			obj.className = '';
		});
		this.aBtn[this.curr].className = "current";
		this.doMove(-(this.curr * this.oneMoveLen));
	},
	next: function() {
		this.curr++;
		this.curr === this.aBtn.length && (this.curr = 0);
		this.toggle()
	},
	pre: function() {
		this.curr--;
		this.curr < 0 && (this.curr = this.aBtn.length - 1);
		this.toggle()
	},
	doMove: function(iTarget) {
		var self = this;
		/*	clearInterval(self.timmer);
		self.timmer = setInterval(function() {
			var iSpeed = (iTarget - self.ul.offsetTop) / 5;

			iSpeed = iSpeed > 0 ?
				Math.ceil(iSpeed) :
				Math.floor(iSpeed);

			self.ul.offsetTop == iTarget ?
				clearInterval(self.timmer) :
				(self.ul.style.top = self.ul.offsetTop + iSpeed + "px");
		}, 30);*/
		this.direction === 'h' ?
			(self.ul.style.left = iTarget + "px") :
			(self.ul.style.top = iTarget + "px");
		//self.ul.style.top = iTarget + "px";
	}
};

window.onload = function() {
	new autoPlay("box");
};

function log() {
	console.log.apply(console, arguments);
}
