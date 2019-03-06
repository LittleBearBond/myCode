(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Svg = factory();
	}
}(window, function() {
	var Svg;

	function createChild(name, attrs, container) {
		var el = document.createElementNS("http://www.w3.org/2000/svg", name),
			currVal;
		for (var i in attrs) {
			currVal = attrs[i];
			currVal && 　el.setAttribute(i, currVal);
		}
		container && container.appendChild(el);
		return container;
	}

	//一共有八个参数：oPar表示父级，
	//x1,y1表示线的起始点的坐标；
	//x2,y2表示线的终点的坐标；
	//color表示线的颜色；
	//stroke_w表示线的宽度。
	//boolearn表示是否为虚线。
	function drawLine(oPar, x1, y1, x2, y2, color, stroke_w, isDotted) {
		var data = {
			'x1': x1 + "px",
			'y1': y1 + "px",
			'x2': x2 + "px",
			'y2': y2 + "px",
			"stroke": color,
			"stroke-width": stroke_w + "px"
		};
		/*设置虚线*/
		isDotted === true && (data['style'] = "stroke-dasharray:2");
		return createChild('line', data, oPar);
	}

	/*画折线*/
	//一共有五个参数：第一个参数表示父级
	//第二个参数表示折线的信息；
	//第三个参数表示折线的颜色；
	//第四个参数表示填充色；
	//第五个参数表示折线的宽度。
	function drawPath(oPar, str_ifo, stroke_color, fill_color, stroke_w) {
		var data = {
			"d": str_ifo,
			"stroke-width": stroke_w + "px",
			"stroke": stroke_color,
			"fill": fill_color,
		};
		return createChild('path', data, oPar);
	}

	/*画圆*/
	//一共有五个参数：第一个参数表示父级
	//cx,cy表示圆心的坐标；
	//r表示圆的半径；
	//fill_color表示填充色。
	function drawCircle(oPar, cx, cy, r, fill_color, stroke_color, width) {
		var data = {
			"cx": cx + "px",
			"cy": cy + "px",
			"r": r + "px",
			"fill": fill_color
		};
		if (stroke_color) {
			data.stroke = stroke_color;
			data['stroke-width'] = width + "px";
		}
		return createChild('circle', data, oPar);
	}

	/*画矩形*/
	//一共有8个参数：第一个参数表示父级，
	//x,y表示矩形的左上角的坐标；
	//width,height表示矩形的宽高；
	//fill_color表示矩形填充的颜色；
	//stroke_width表示矩形的边框宽度；
	//stroke_color表示矩形的边框颜色。
	function drawRect(oPar, x, y, width, height, fill_color, stroke_color, stroke_width, style) {
		/*设置所画矩形的属性。*/
		var data = {
			"x": x + "px",
			"width": width + "px",
			"y": y + "px",
			"height": height + "px",
			"fill": fill_color,
			"stroke-width": stroke_width + "px",
			"stroke": stroke_color,
			'style': style
		};
		return createChild('rect', data, oPar);
	}
	return Svg = {
		'drawLine': drawLine,
		'drawPath': drawPath,
		'drawCircle': drawCircle,
		'drawRect': drawRect
	};
}))
