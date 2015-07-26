(function(root, factory) {
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
