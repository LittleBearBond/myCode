(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.drawLine = factory();
	}
}(window, function() {
	var drawLine,
		pX, pY,
		sX, sY,
		eX, eY,
		lineEl,
		circleEl,
		disX, disY,
		status = false;

	return drawLine = {
		init: function() {
			var rect = el.getBoundingClientRect();
			/*console.log(rect.left,rect.top);
			console.log(e.pageX,e.pageY);*/
			pX = e.pageX;
			pY = e.pageY;
			sX = pX - rect.left;
			sY = pY - rect.top;

			Svg.drawCircle(svg, sX, sY, 5, 'red', 'black', 0);

			circleEl = Svg.drawCircle(svg, sX, sY, 5, 'red', 'black', 0);

			lineEl = Svg.drawLine(svg, sX, sY, sX, sY, 'red', 2);
			drawLine.bindEvent();
			status = true;
		},
		status: function() {
			return status;
		},
		destory: function() {
			status = false;
			window._drawLine = false;
			document.removeEventListener('mousemove', drawLine.updateLine, false);
			document.removeEventListener('dblclick', drawLine.endLine, false);
		},
		updateLine: function(e) {
			disX = e.pageX - pX;
			disY = e.pageY - pY;

			eX = sX + disX;
			eY = sX + disY;

			lineEl.setAttribute('x2', eX);
			lineEl.setAttribute('y2', eY);

			circleEl.setAttribute('cx', eX);
			circleEl.setAttribute('cy', eY);
		},
		bindEvent: function() {
			document.addEventListener('mousemove', drawLine.updateLine, false);
			document.addEventListener('dblclick', drawLine.destory, false);
		}
	};
}))
