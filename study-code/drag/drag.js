var each = function (obj, callback, context) {
	if (obj == null) {
		return;
	}
	var nativeForEach = Array.prototype.forEach;
	if (nativeForEach && obj.forEach === nativeForEach) {
		obj.forEach(callback, context);
	} else if (obj.length === +obj.length) {
		//for循环迭代
		for (var i = 0, l = obj.length; i < l; i++) {
			if (callback.call(context, obj[i], i, obj) === false) {
				break;
			}
		}
	}
};

function $(id) {
	return typeof id === "string" ? document.getElementById(id) : id;
};

function $$(tagName, oParent) {
	return (oParent || document).getElementsByTagName(tagName);
};

function $$$(className, element, tagName) {
	var aClass = [];
	var reClass = new RegExp("(^|//s)" + className + "(//s|$)");
	var aElement = $$(tagName || "*", element || document);
	var len = aElement.length;
	each(aElement, function (obj, index) {
		reClass.test(obj.className) && aClass.push(obj);
	});
	return aClass
};

if (!Function.prototype.hasOwnProperty('bind')) {
	Function.prototype.bind = function (context) {
		var target = this;
		if (typeof target != "function") {
			throw new TypeError();
		}
		var sl = [].slice,
			args = sl.call(arguments, 1);
		return function () {
			return fn.apply(context || this, args.concat(sl.call(arguments)));
		};
	};
}

var eventHandler = {
	//添加绑定事件
	addHandler: function (oElement, sEventType, fnHandler) {
		return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
	},
	//删除绑定事件
	removeHandler: function (oElement, sEventType, fnHandler) {
		return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
	},
	//绑定事件到对象
	bind: function (object, fnHandler) {
		return function () {
			return fnHandler.apply(object, arguments)
		}
	},
	getEvent: function (e) {
		return e || window.eventeventevent;
	},
	stopPropagation: function (e) {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			window.event.cancelBubble = true;
		}
	}

};

//获取元素位置
function getPos(obj) {
	var iTop = obj.offsetTop;
	var iLeft = obj.offsetLeft;
	while (obj.offsetParent) {
		iTop += obj.offsetParent.offsetTop;
		iLeft += obj.offsetParent.offsetLeft;
		obj = obj.offsetParent;
	}
	return {
		top: iTop,
		left: iLeft
	}
};

function css(element, attr, value) {
	if (arguments.length == 2) {
		if (typeof arguments[1] === "string") {
			return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, null)[attr]
		} else {
			for (var property in attr) {
				property == "opacity" ?
					(element.style.filter = "alpha(opacity=" + attr[property] + ")", element.style.opacity = attr[property] / 100) :
					element.style[property] = attr[property];
			}
		}
	} else if (arguments.length == 3) {
		switch (attr) {
			case "width":
			case "height":
			case "top":
			case "left":
			case "right":
			case "bottom":
				element.style[attr] = value + "px";
				break;
			case "opacity":
				element.style.filter = "alpha(opacity=" + value + ")";
				element.style.opacity = value / 100;
				break;
			default:
				element.style[attr] = value;
				break
		}
	}
	return element
};


function Drag(opts) {
	this.el = $(opts.el);
	this.handle = $$$(opts.handle, this.el);
	this.body = $$$('body', this.el);
	this.b = $$('b', this.body);

	this.isDrag = false; //

	this.savePos = [];
	this.init();
}

Drag.prototype = {
	constructor: Drag,
	init: function () {
		initEvent();
	},
	initEvent: function () {
		var self = this;
		eventHandler.addHandler(this.handle, 'mousedown', function (e) {
			e = eventHandler.getEvent(e);
			self.isDrag = true;
			self.disX = e.clientX - self.offsetLeft;
			self.disY = e.clientY - self.offsetTop;

			this.setCaptrue && this.setCapture();
			eventHandler.stopPropagation(e);
			return false;
		});

		eventHandler.addHandler(document, 'mousemove', function (e) {
			if (!self.isDrag) {
				return;
			}
			e = eventHandler.getEvent(e);

			var il = e.clientX - self.disX,
				it = e.clientY - self.disY,
				win = getViewPortSize(),
				maxL = win.w - self.el.offsetWith,
				maxT = win.h - self.el.offsetheight;
			il = il < 0 ? 0 : il;
			il = il > maxL ? maxL : il;

			it = it < 0 ? 0 : it;
			it = it < maxT ? maxT : it;

			var objStyle = self.el.style;
			objStyle.left = il;
			objStyle.top = it;
			self.status(il, it);
			return false;
		});

		eventHandler.addHandler(document, 'mouseup', function (e) {
			self.isDrag = false;
			this.handle.releaseCapture && this.handle.releaseCapture();
			self.status();
		});


	},
	status: function (il, it) {
		this.b[0].innerHTML = this.isDrag;
		this.b[1].innerHTML = il;
		this.b[2].innerHTML = it;
	},
	getViewPortSize: function (w) {
		w = w || window;
		if (w.innerWidth != null) {
			return {
				w: w.innerWidth,
				h: w.innerHeight
			};
		}
		var d = w.document;
		if (document.compatMode == "CSS1Compat")
			return {
				w: d.documentElement.clientWidth,
				h: d.documentElement.clientHeight
			};
		return {
			w: d.body.clientWidth,
			h: d.body.clientHeight
		};
	}
};

window.onload = function () {
	new Drag({
		el: 'box',
		handle: 'header'
	});
};