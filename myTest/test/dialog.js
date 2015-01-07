! function(a) {
	var b = function() {
		function a(a) {
			return null == a ? String(a) : U[V.call(a)] || "object"
		}

		function b(b) {
			return "function" == a(b)
		}

		function c(a) {
			return null != a && a == a.window
		}

		function d(a) {
			return null != a && a.nodeType == a.DOCUMENT_NODE
		}

		function e(b) {
			return "object" == a(b)
		}

		function f(a) {
			return e(a) && !c(a) && Object.getPrototypeOf(a) == Object.prototype
		}

		function g(a) {
			return "number" == typeof a.length
		}

		function h(a) {
			return D.call(a, function(a) {
				return null != a
			})
		}

		function i(a) {
			return a.length > 0 ? x.fn.concat.apply([], a) : a
		}

		function j(a) {
			return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
		}

		function k(a) {
			return a in G ? G[a] : G[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
		}

		function l(a, b) {
			return "number" != typeof b || H[j(a)] ? b : b + "px"
		}

		function m(a) {
			var b, c;
			return F[a] || (b = E.createElement(a), E.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), F[a] = c), F[a]
		}

		function n(a) {
			return "children" in a ? C.call(a.children) : x.map(a.childNodes, function(a) {
				return 1 == a.nodeType ? a : void 0
			})
		}

		function o(a, b, c) {
			for (w in b)
				c && (f(b[w]) || Z(b[w])) ? (f(b[w]) && !f(a[w]) && (a[w] = {}), Z(b[w]) && !Z(a[w]) && (a[w] = []), o(a[w], b[w], c)) : b[w] !== v && (a[w] = b[w])
		}

		function p(a, b) {
			return null == b ? x(a) : x(a).filter(b)
		}

		function q(a, c, d, e) {
			return b(c) ? c.call(a, d, e) : c
		}

		function r(a, b, c) {
			null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
		}

		function s(a, b) {
			var c = a.className,
				d = c && c.baseVal !== v;
			return b === v ? d ? c.baseVal : c : void(d ? c.baseVal = b : a.className = b)
		}

		function t(a) {
			var b;
			try {
				return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null : /^0/.test(a) || isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? x.parseJSON(a) : a : b) : a
			} catch (c) {
				return a
			}
		}

		function u(a, b) {
			b(a);
			for (var c = 0, d = a.childNodes.length; d > c; c++)
				u(a.childNodes[c], b)
		}
		var v, w, x, y, z, A, B = [],
			C = B.slice,
			D = B.filter,
			E = window.document,
			F = {},
			G = {},
			H = {
				"column-count": 1,
				columns: 1,
				"font-weight": 1,
				"line-height": 1,
				opacity: 1,
				"z-index": 1,
				zoom: 1
			},
			I = /^\s*<(\w+|!)[^>]*>/,
			J = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			K = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			L = /^(?:body|html)$/i,
			M = /([A-Z])/g,
			N = ["val", "css", "html", "text", "data", "width", "height", "offset"],
			O = ["after", "prepend", "before", "append"],
			P = E.createElement("table"),
			Q = E.createElement("tr"),
			R = {
				tr: E.createElement("tbody"),
				tbody: P,
				thead: P,
				tfoot: P,
				td: Q,
				th: Q,
				"*": E.createElement("div")
			},
			S = /complete|loaded|interactive/,
			T = /^[\w-]*$/,
			U = {},
			V = U.toString,
			W = {},
			X = E.createElement("div"),
			Y = {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			Z = Array.isArray || function(a) {
				return a instanceof Array
			};
		return W.matches = function(a, b) {
			if (!b || !a || 1 !== a.nodeType)
				return !1;
			var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
			if (c)
				return c.call(a, b);
			var d, e = a.parentNode,
				f = !e;
			return f && (e = X).appendChild(a), d = ~W.qsa(e, b).indexOf(a), f && X.removeChild(a), d
		}, z = function(a) {
			return a.replace(/-+(.)?/g, function(a, b) {
				return b ? b.toUpperCase() : ""
			})
		}, A = function(a) {
			return D.call(a, function(b, c) {
				return a.indexOf(b) == c
			})
		}, W.fragment = function(a, b, c) {
			var d, e, g;
			return J.test(a) && (d = x(E.createElement(RegExp.$1))), d || (a.replace && (a = a.replace(K, "<$1></$2>")), b === v && (b = I.test(a) && RegExp.$1), b in R || (b = "*"), g = R[b], g.innerHTML = "" + a, d = x.each(C.call(g.childNodes), function() {
				g.removeChild(this)
			})), f(c) && (e = x(d), x.each(c, function(a, b) {
				N.indexOf(a) > -1 ? e[a](b) : e.attr(a, b)
			})), d
		}, W.Z = function(a, b) {
			return a = a || [], a.__proto__ = x.fn, a.selector = b || "", a
		}, W.isZ = function(a) {
			return a instanceof W.Z
		}, W.init = function(a, c) {
			var d;
			if (!a)
				return W.Z();
			if ("string" == typeof a)
				if (a = a.trim(), "<" == a[0] && I.test(a))
					d = W.fragment(a, RegExp.$1, c), a = null;
				else {
					if (c !== v)
						return x(c).find(a);
					d = W.qsa(E, a)
				} else {
				if (b(a))
					return x(E).ready(a);
				if (W.isZ(a))
					return a;
				if (Z(a))
					d = h(a);
				else if (e(a))
					d = [a], a = null;
				else if (I.test(a))
					d = W.fragment(a.trim(), RegExp.$1, c), a = null;
				else {
					if (c !== v)
						return x(c).find(a);
					d = W.qsa(E, a)
				}
			}
			return W.Z(d, a)
		}, x = function(a, b) {
			return W.init(a, b)
		}, x.extend = function(a) {
			var b, c = C.call(arguments, 1);
			return "boolean" == typeof a && (b = a, a = c.shift()), c.forEach(function(c) {
				o(a, c, b)
			}), a
		}, W.qsa = function(a, b) {
			var c, e = "#" == b[0],
				f = !e && "." == b[0],
				g = e || f ? b.slice(1) : b,
				h = T.test(g);
			return d(a) && h && e ? (c = a.getElementById(g)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : C.call(h && !e ? f ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b))
		}, x.contains = E.documentElement.contains ? function(a, b) {
			return a !== b && a.contains(b)
		} : function(a, b) {
			for (; b && (b = b.parentNode);)
				if (b === a)
					return !0;
			return !1
		}, x.type = a, x.isFunction = b, x.isWindow = c, x.isArray = Z, x.isPlainObject = f, x.isEmptyObject = function(a) {
			var b;
			for (b in a)
				return !1;
			return !0
		}, x.inArray = function(a, b, c) {
			return B.indexOf.call(b, a, c)
		}, x.camelCase = z, x.trim = function(a) {
			return null == a ? "" : String.prototype.trim.call(a)
		}, x.uuid = 0, x.support = {}, x.expr = {}, x.map = function(a, b) {
			var c, d, e, f = [];
			if (g(a))
				for (d = 0; d < a.length; d++)
					c = b(a[d], d), null != c && f.push(c);
			else
				for (e in a)
					c = b(a[e], e), null != c && f.push(c);
			return i(f)
		}, x.each = function(a, b) {
			var c, d;
			if (g(a)) {
				for (c = 0; c < a.length; c++)
					if (b.call(a[c], c, a[c]) === !1)
						return a
			} else
				for (d in a)
					if (b.call(a[d], d, a[d]) === !1)
						return a;
			return a
		}, x.grep = function(a, b) {
			return D.call(a, b)
		}, window.JSON && (x.parseJSON = window.JSON.parse), x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
			U["[object " + b + "]"] = b.toLowerCase()
		}), x.fn = {
			forEach: B.forEach,
			reduce: B.reduce,
			push: B.push,
			sort: B.sort,
			indexOf: B.indexOf,
			concat: B.concat,
			map: function(a) {
				return x(x.map(this, function(b, c) {
					return a.call(b, c, b)
				}))
			},
			slice: function() {
				return x(C.apply(this, arguments))
			},
			ready: function(a) {
				return S.test(E.readyState) && E.body ? a(x) : E.addEventListener("DOMContentLoaded", function() {
					a(x)
				}, !1), this
			},
			get: function(a) {
				return a === v ? C.call(this) : this[a >= 0 ? a : a + this.length]
			},
			toArray: function() {
				return this.get()
			},
			size: function() {
				return this.length
			},
			remove: function() {
				return this.each(function() {
					null != this.parentNode && this.parentNode.removeChild(this)
				})
			},
			each: function(a) {
				return B.every.call(this, function(b, c) {
					return a.call(b, c, b) !== !1
				}), this
			},
			filter: function(a) {
				return b(a) ? this.not(this.not(a)) : x(D.call(this, function(b) {
					return W.matches(b, a)
				}))
			},
			add: function(a, b) {
				return x(A(this.concat(x(a, b))))
			},
			is: function(a) {
				return this.length > 0 && W.matches(this[0], a)
			},
			not: function(a) {
				var c = [];
				if (b(a) && a.call !== v)
					this.each(function(b) {
						a.call(this, b) || c.push(this)
					});
				else {
					var d = "string" == typeof a ? this.filter(a) : g(a) && b(a.item) ? C.call(a) : x(a);
					this.forEach(function(a) {
						d.indexOf(a) < 0 && c.push(a)
					})
				}
				return x(c)
			},
			has: function(a) {
				return this.filter(function() {
					return e(a) ? x.contains(this, a) : x(this).find(a).size()
				})
			},
			eq: function(a) {
				return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
			},
			first: function() {
				var a = this[0];
				return a && !e(a) ? a : x(a)
			},
			last: function() {
				var a = this[this.length - 1];
				return a && !e(a) ? a : x(a)
			},
			find: function(a) {
				var b, c = this;
				return b = a ? "object" == typeof a ? x(a).filter(function() {
					var a = this;
					return B.some.call(c, function(b) {
						return x.contains(b, a)
					})
				}) : 1 == this.length ? x(W.qsa(this[0], a)) : this.map(function() {
					return W.qsa(this, a)
				}) : []
			},
			closest: function(a, b) {
				var c = this[0],
					e = !1;
				for ("object" == typeof a && (e = x(a)); c && !(e ? e.indexOf(c) >= 0 : W.matches(c, a));)
					c = c !== b && !d(c) && c.parentNode;
				return x(c)
			},
			parents: function(a) {
				for (var b = [], c = this; c.length > 0;)
					c = x.map(c, function(a) {
						return (a = a.parentNode) && !d(a) && b.indexOf(a) < 0 ? (b.push(a), a) : void 0
					});
				return p(b, a)
			},
			parent: function(a) {
				return p(A(this.pluck("parentNode")), a)
			},
			children: function(a) {
				return p(this.map(function() {
					return n(this)
				}), a)
			},
			contents: function() {
				return this.map(function() {
					return C.call(this.childNodes)
				})
			},
			siblings: function(a) {
				return p(this.map(function(a, b) {
					return D.call(n(b.parentNode), function(a) {
						return a !== b
					})
				}), a)
			},
			empty: function() {
				return this.each(function() {
					this.innerHTML = ""
				})
			},
			pluck: function(a) {
				return x.map(this, function(b) {
					return b[a]
				})
			},
			show: function() {
				return this.each(function() {
					"none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = m(this.nodeName))
				})
			},
			replaceWith: function(a) {
				return this.before(a).remove()
			},
			wrap: function(a) {
				var c = b(a);
				if (this[0] && !c)
					var d = x(a).get(0),
						e = d.parentNode || this.length > 1;
				return this.each(function(b) {
					x(this).wrapAll(c ? a.call(this, b) : e ? d.cloneNode(!0) : d)
				})
			},
			wrapAll: function(a) {
				if (this[0]) {
					x(this[0]).before(a = x(a));
					for (var b;
						(b = a.children()).length;)
						a = b.first();
					x(a).append(this)
				}
				return this
			},
			wrapInner: function(a) {
				var c = b(a);
				return this.each(function(b) {
					var d = x(this),
						e = d.contents(),
						f = c ? a.call(this, b) : a;
					e.length ? e.wrapAll(f) : d.append(f)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					x(this).replaceWith(x(this).children())
				}), this
			},
			clone: function() {
				return this.map(function() {
					return this.cloneNode(!0)
				})
			},
			hide: function() {
				return this.css("display", "none")
			},
			toggle: function(a) {
				return this.each(function() {
					var b = x(this);
					(a === v ? "none" == b.css("display") : a) ? b.show(): b.hide()
				})
			},
			prev: function(a) {
				return x(this.pluck("previousElementSibling")).filter(a || "*")
			},
			next: function(a) {
				return x(this.pluck("nextElementSibling")).filter(a || "*")
			},
			html: function(a) {
				return 0 in arguments ? this.each(function(b) {
					var c = this.innerHTML;
					x(this).empty().append(q(this, a, b, c))
				}) : 0 in this ? this[0].innerHTML : null
			},
			text: function(a) {
				return 0 in arguments ? this.each(function(b) {
					var c = q(this, a, b, this.textContent);
					this.textContent = null == c ? "" : "" + c
				}) : 0 in this ? this[0].textContent : null
			},
			attr: function(a, b) {
				var c;
				return "string" != typeof a || 1 in arguments ? this.each(function(c) {
					if (1 === this.nodeType)
						if (e(a))
							for (w in a)
								r(this, w, a[w]);
						else
							r(this, a, q(this, b, c, this.getAttribute(a)))
				}) : this.length && 1 === this[0].nodeType ? !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c : v
			},
			removeAttr: function(a) {
				return this.each(function() {
					1 === this.nodeType && r(this, a)
				})
			},
			prop: function(a, b) {
				return a = Y[a] || a, 1 in arguments ? this.each(function(c) {
					this[a] = q(this, b, c, this[a])
				}) : this[0] && this[0][a]
			},
			data: function(a, b) {
				var c = "data-" + a.replace(M, "-$1").toLowerCase(),
					d = 1 in arguments ? this.attr(c, b) : this.attr(c);
				return null !== d ? t(d) : v
			},
			val: function(a) {
				return 0 in arguments ? this.each(function(b) {
					this.value = q(this, a, b, this.value)
				}) : this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function() {
					return this.selected
				}).pluck("value") : this[0].value)
			},
			offset: function(a) {
				if (a)
					return this.each(function(b) {
						var c = x(this),
							d = q(this, a, b, c.offset()),
							e = c.offsetParent().offset(),
							f = {
								top: d.top - e.top,
								left: d.left - e.left
							};
						"static" == c.css("position") && (f.position = "relative"), c.css(f)
					});
				if (!this.length)
					return null;
				var b = this[0].getBoundingClientRect();
				return {
					left: b.left + window.pageXOffset,
					top: b.top + window.pageYOffset,
					width: Math.round(b.width),
					height: Math.round(b.height)
				}
			},
			css: function(b, c) {
				if (arguments.length < 2) {
					var d = this[0],
						e = getComputedStyle(d, "");
					if (!d)
						return;
					if ("string" == typeof b)
						return d.style[z(b)] || e.getPropertyValue(b);
					if (Z(b)) {
						var f = {};
						return x.each(Z(b) ? b : [b], function(a, b) {
							f[b] = d.style[z(b)] || e.getPropertyValue(b)
						}), f
					}
				}
				var g = "";
				if ("string" == a(b))
					c || 0 === c ? g = j(b) + ":" + l(b, c) : this.each(function() {
						this.style.removeProperty(j(b))
					});
				else
					for (w in b)
						b[w] || 0 === b[w] ? g += j(w) + ":" + l(w, b[w]) + ";" : this.each(function() {
							this.style.removeProperty(j(w))
						});
				return this.each(function() {
					this.style.cssText += ";" + g
				})
			},
			index: function(a) {
				return a ? this.indexOf(x(a)[0]) : this.parent().children().indexOf(this[0])
			},
			hasClass: function(a) {
				return a ? B.some.call(this, function(a) {
					return this.test(s(a))
				}, k(a)) : !1
			},
			addClass: function(a) {
				return a ? this.each(function(b) {
					y = [];
					var c = s(this),
						d = q(this, a, b, c);
					d.split(/\s+/g).forEach(function(a) {
						x(this).hasClass(a) || y.push(a)
					}, this), y.length && s(this, c + (c ? " " : "") + y.join(" "))
				}) : this
			},
			removeClass: function(a) {
				return this.each(function(b) {
					return a === v ? s(this, "") : (y = s(this), q(this, a, b, y).split(/\s+/g).forEach(function(a) {
						y = y.replace(k(a), " ")
					}), void s(this, y.trim()))
				})
			},
			toggleClass: function(a, b) {
				return a ? this.each(function(c) {
					var d = x(this),
						e = q(this, a, c, s(this));
					e.split(/\s+/g).forEach(function(a) {
						(b === v ? !d.hasClass(a) : b) ? d.addClass(a): d.removeClass(a)
					})
				}) : this
			},
			scrollTop: function(a) {
				if (this.length) {
					var b = "scrollTop" in this[0];
					return a === v ? b ? this[0].scrollTop : this[0].pageYOffset : this.each(b ? function() {
						this.scrollTop = a
					} : function() {
						this.scrollTo(this.scrollX, a)
					})
				}
			},
			scrollLeft: function(a) {
				if (this.length) {
					var b = "scrollLeft" in this[0];
					return a === v ? b ? this[0].scrollLeft : this[0].pageXOffset : this.each(b ? function() {
						this.scrollLeft = a
					} : function() {
						this.scrollTo(a, this.scrollY)
					})
				}
			},
			position: function() {
				if (this.length) {
					var a = this[0],
						b = this.offsetParent(),
						c = this.offset(),
						d = L.test(b[0].nodeName) ? {
							top: 0,
							left: 0
						} : b.offset();
					return c.top -= parseFloat(x(a).css("margin-top")) || 0, c.left -= parseFloat(x(a).css("margin-left")) || 0, d.top += parseFloat(x(b[0]).css("border-top-width")) || 0, d.left += parseFloat(x(b[0]).css("border-left-width")) || 0, {
						top: c.top - d.top,
						left: c.left - d.left
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var a = this.offsetParent || E.body; a && !L.test(a.nodeName) && "static" == x(a).css("position");)
						a = a.offsetParent;
					return a
				})
			}
		}, x.fn.detach = x.fn.remove, ["width", "height"].forEach(function(a) {
			var b = a.replace(/./, function(a) {
				return a[0].toUpperCase()
			});
			x.fn[a] = function(e) {
				var f, g = this[0];
				return e === v ? c(g) ? g["inner" + b] : d(g) ? g.documentElement["scroll" + b] : (f = this.offset()) && f[a] : this.each(function(b) {
					g = x(this), g.css(a, q(this, e, b, g[a]()))
				})
			}
		}), O.forEach(function(b, c) {
			var d = c % 2;
			x.fn[b] = function() {
				var b, e, f = x.map(arguments, function(c) {
						return b = a(c), "object" == b || "array" == b || null == c ? c : W.fragment(c)
					}),
					g = this.length > 1;
				return f.length < 1 ? this : this.each(function(a, b) {
					e = d ? b : b.parentNode, b = 0 == c ? b.nextSibling : 1 == c ? b.firstChild : 2 == c ? b : null;
					var h = x.contains(E.documentElement, e);
					f.forEach(function(a) {
						if (g)
							a = a.cloneNode(!0);
						else if (!e)
							return x(a).remove();
						e.insertBefore(a, b), h && u(a, function(a) {
							null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
						})
					})
				})
			}, x.fn[d ? b + "To" : "insert" + (c ? "Before" : "After")] = function(a) {
				return x(a)[b](this), this
			}
		}), W.Z.prototype = x.fn, W.uniq = A, W.deserializeValue = t, x.zepto = W, x
	}();
	window.Zepto = b, window.$ === a && (window.$ = b),
		function(a) {
			function b(a) {
				return a._zid || (a._zid = m++)
			}

			function c(a, c, f, g) {
				if (c = d(c), c.ns)
					var h = e(c.ns);
				return (q[b(a)] || []).filter(function(a) {
					return !(!a || c.e && a.e != c.e || c.ns && !h.test(a.ns) || f && b(a.fn) !== b(f) || g && a.sel != g)
				})
			}

			function d(a) {
				var b = ("" + a).split(".");
				return {
					e: b[0],
					ns: b.slice(1).sort().join(" ")
				}
			}

			function e(a) {
				return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
			}

			function f(a, b) {
				return a.del && !s && a.e in t || !!b
			}

			function g(a) {
				return u[a] || s && t[a] || a
			}

			function h(c, e, h, i, k, m, n) {
				var o = b(c),
					p = q[o] || (q[o] = []);
				e.split(/\s/).forEach(function(b) {
					if ("ready" == b)
						return a(document).ready(h);
					var e = d(b);
					e.fn = h, e.sel = k, e.e in u && (h = function(b) {
						var c = b.relatedTarget;
						return !c || c !== this && !a.contains(this, c) ? e.fn.apply(this, arguments) : void 0
					}), e.del = m;
					var o = m || h;
					e.proxy = function(a) {
						if (a = j(a), !a.isImmediatePropagationStopped()) {
							a.data = i;
							var b = o.apply(c, a._args == l ? [a] : [a].concat(a._args));
							return b === !1 && (a.preventDefault(), a.stopPropagation()), b
						}
					}, e.i = p.length, p.push(e), "addEventListener" in c && c.addEventListener(g(e.e), e.proxy, f(e, n))
				})
			}

			function i(a, d, e, h, i) {
				var j = b(a);
				(d || "").split(/\s/).forEach(function(b) {
					c(a, b, e, h).forEach(function(b) {
						delete q[j][b.i], "removeEventListener" in a && a.removeEventListener(g(b.e), b.proxy, f(b, i))
					})
				})
			}

			function j(b, c) {
				return (c || !b.isDefaultPrevented) && (c || (c = b), a.each(y, function(a, d) {
					var e = c[a];
					b[a] = function() {
						return this[d] = v, e && e.apply(c, arguments)
					}, b[d] = w
				}), (c.defaultPrevented !== l ? c.defaultPrevented : "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = v)), b
			}

			function k(a) {
				var b, c = {
					originalEvent: a
				};
				for (b in a)
					x.test(b) || a[b] === l || (c[b] = a[b]);
				return j(c, a)
			}
			var l, m = 1,
				n = Array.prototype.slice,
				o = a.isFunction,
				p = function(a) {
					return "string" == typeof a
				},
				q = {},
				r = {},
				s = "onfocusin" in window,
				t = {
					focus: "focusin",
					blur: "focusout"
				},
				u = {
					mouseenter: "mouseover",
					mouseleave: "mouseout"
				};
			r.click = r.mousedown = r.mouseup = r.mousemove = "MouseEvents", a.event = {
				add: h,
				remove: i
			}, a.proxy = function(c, d) {
				var e = 2 in arguments && n.call(arguments, 2);
				if (o(c)) {
					var f = function() {
						return c.apply(d, e ? e.concat(n.call(arguments)) : arguments)
					};
					return f._zid = b(c), f
				}
				if (p(d))
					return e ? (e.unshift(c[d], c), a.proxy.apply(null, e)) : a.proxy(c[d], c);
				throw new TypeError("expected function")
			}, a.fn.bind = function(a, b, c) {
				return this.on(a, b, c)
			}, a.fn.unbind = function(a, b) {
				return this.off(a, b)
			}, a.fn.one = function(a, b, c, d) {
				return this.on(a, b, c, d, 1)
			};
			var v = function() {
					return !0
				},
				w = function() {
					return !1
				},
				x = /^([A-Z]|returnValue$|layer[XY]$)/,
				y = {
					preventDefault: "isDefaultPrevented",
					stopImmediatePropagation: "isImmediatePropagationStopped",
					stopPropagation: "isPropagationStopped"
				};
			a.fn.delegate = function(a, b, c) {
				return this.on(b, a, c)
			}, a.fn.undelegate = function(a, b, c) {
				return this.off(b, a, c)
			}, a.fn.live = function(b, c) {
				return a(document.body).delegate(this.selector, b, c), this
			}, a.fn.die = function(b, c) {
				return a(document.body).undelegate(this.selector, b, c), this
			}, a.fn.on = function(b, c, d, e, f) {
				var g, j, m = this;
				return b && !p(b) ? (a.each(b, function(a, b) {
					m.on(a, c, d, b, f)
				}), m) : (p(c) || o(e) || e === !1 || (e = d, d = c, c = l), (o(d) || d === !1) && (e = d, d = l), e === !1 && (e = w), m.each(function(l, m) {
					f && (g = function(a) {
						return i(m, a.type, e), e.apply(this, arguments)
					}), c && (j = function(b) {
						var d, f = a(b.target).closest(c, m).get(0);
						return f && f !== m ? (d = a.extend(k(b), {
							currentTarget: f,
							liveFired: m
						}), (g || e).apply(f, [d].concat(n.call(arguments, 1)))) : void 0
					}), h(m, b, e, d, c, j || g)
				}))
			}, a.fn.off = function(b, c, d) {
				var e = this;
				return b && !p(b) ? (a.each(b, function(a, b) {
					e.off(a, c, b)
				}), e) : (p(c) || o(d) || d === !1 || (d = c, c = l), d === !1 && (d = w), e.each(function() {
					i(this, b, d, c)
				}))
			}, a.fn.trigger = function(b, c) {
				return b = p(b) || a.isPlainObject(b) ? a.Event(b) : j(b), b._args = c, this.each(function() {
					"dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
				})
			}, a.fn.triggerHandler = function(b, d) {
				var e, f;
				return this.each(function(g, h) {
					e = k(p(b) ? a.Event(b) : b), e._args = d, e.target = h, a.each(c(h, b.type || b), function(a, b) {
						return f = b.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0
					})
				}), f
			}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
				a.fn[b] = function(a) {
					return a ? this.bind(b, a) : this.trigger(b)
				}
			}), ["focus", "blur"].forEach(function(b) {
				a.fn[b] = function(a) {
					return a ? this.bind(b, a) : this.each(function() {
						try {
							this[b]()
						} catch (a) {}
					}), this
				}
			}), a.Event = function(a, b) {
				p(a) || (b = a, a = b.type);
				var c = document.createEvent(r[a] || "Events"),
					d = !0;
				if (b)
					for (var e in b)
						"bubbles" == e ? d = !!b[e] : c[e] = b[e];
				return c.initEvent(a, d, !0), j(c)
			}
		}(b),
		function(b) {
			function c(a, c, d) {
				var e = b.Event(c);
				return b(a).trigger(e, d), !e.isDefaultPrevented()
			}

			function d(a, b, d, e) {
				return a.global ? c(b || t, d, e) : void 0
			}

			function e(a) {
				a.global && 0 === b.active++ && d(a, null, "ajaxStart")
			}

			function f(a) {
				a.global && !--b.active && d(a, null, "ajaxStop")
			}

			function g(a, b) {
				var c = b.context;
				return b.beforeSend.call(c, a, b) === !1 || d(b, c, "ajaxBeforeSend", [a, b]) === !1 ? !1 : void d(b, c, "ajaxSend", [a, b])
			}

			function h(a, b, c, e) {
				var f = c.context,
					g = "success";
				c.success.call(f, a, g, b), e && e.resolveWith(f, [a, g, b]), d(c, f, "ajaxSuccess", [b, c, a]), j(g, b, c)
			}

			function i(a, b, c, e, f) {
				var g = e.context;
				e.error.call(g, c, b, a), f && f.rejectWith(g, [c, b, a]), d(e, g, "ajaxError", [c, e, a || b]), j(b, c, e)
			}

			function j(a, b, c) {
				var e = c.context;
				c.complete.call(e, b, a), d(c, e, "ajaxComplete", [b, c]), f(c)
			}

			function k() {}

			function l(a) {
				return a && (a = a.split(";", 2)[0]), a && (a == y ? "html" : a == x ? "json" : v.test(a) ? "script" : w.test(a) && "xml") || "text"
			}

			function m(a, b) {
				return "" == b ? a : (a + "&" + b).replace(/[&?]{1,2}/, "?")
			}

			function n(c) {
				c.processData && c.data && "string" != b.type(c.data) && (c.data = b.param(c.data, c.traditional)), !c.data || c.type && "GET" != c.type.toUpperCase() || (c.url = m(c.url, c.data), c.data = a)
			}

			function o(c, d, e, f) {
				return b.isFunction(d) && (f = e, e = d, d = a), b.isFunction(e) || (f = e, e = a), {
					url: c,
					data: d,
					success: e,
					dataType: f
				}
			}

			function p(a, c, d, e) {
				var f, g = b.isArray(c),
					h = b.isPlainObject(c);
				b.each(c, function(c, i) {
					f = b.type(i), e && (c = d ? e : e + "[" + (h || "object" == f || "array" == f ? c : "") + "]"), !e && g ? a.add(i.name, i.value) : "array" == f || !d && "object" == f ? p(a, i, d, c) : a.add(c, i)
				})
			}
			var q, r, s = 0,
				t = window.document,
				u = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
				v = /^(?:text|application)\/javascript/i,
				w = /^(?:text|application)\/xml/i,
				x = "application/json",
				y = "text/html",
				z = /^\s*$/;
			b.active = 0, b.ajaxJSONP = function(c, d) {
				if (!("type" in c))
					return b.ajax(c);
				var e, f, j = c.jsonpCallback,
					k = (b.isFunction(j) ? j() : j) || "jsonp" + ++s,
					l = t.createElement("script"),
					m = window[k],
					n = function(a) {
						b(l).triggerHandler("error", a || "abort")
					},
					o = {
						abort: n
					};
				return d && d.promise(o), b(l).on("load error", function(g, j) {
					clearTimeout(f), b(l).off().remove(), "error" != g.type && e ? h(e[0], o, c, d) : i(null, j || "error", o, c, d), window[k] = m, e && b.isFunction(m) && m(e[0]), m = e = a
				}), g(o, c) === !1 ? (n("abort"), o) : (window[k] = function() {
					e = arguments
				}, l.src = c.url.replace(/\?(.+)=\?/, "?$1=" + k), t.head.appendChild(l), c.timeout > 0 && (f = setTimeout(function() {
					n("timeout")
				}, c.timeout)), o)
			}, b.ajaxSettings = {
				type: "GET",
				beforeSend: k,
				success: k,
				error: k,
				complete: k,
				context: null,
				global: !0,
				xhr: function() {
					return new window.XMLHttpRequest
				},
				accepts: {
					script: "text/javascript, application/javascript, application/x-javascript",
					json: x,
					xml: "application/xml, text/xml",
					html: y,
					text: "text/plain"
				},
				crossDomain: !1,
				timeout: 0,
				processData: !0,
				cache: !0
			}, b.ajax = function(c) {
				var d = b.extend({}, c || {}),
					f = b.Deferred && b.Deferred();
				for (q in b.ajaxSettings)
					d[q] === a && (d[q] = b.ajaxSettings[q]);
				e(d), d.crossDomain || (d.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(d.url) && RegExp.$2 != window.location.host), d.url || (d.url = window.location.toString()), n(d);
				var j = d.dataType,
					o = /\?.+=\?/.test(d.url);
				if (o && (j = "jsonp"), d.cache !== !1 && (c && c.cache === !0 || "script" != j && "jsonp" != j) || (d.url = m(d.url, "_=" + Date.now())), "jsonp" == j)
					return o || (d.url = m(d.url, d.jsonp ? d.jsonp + "=?" : d.jsonp === !1 ? "" : "callback=?")), b.ajaxJSONP(d, f);
				var p, s = d.accepts[j],
					t = {},
					u = function(a, b) {
						t[a.toLowerCase()] = [a, b]
					},
					v = /^([\w-]+:)\/\//.test(d.url) ? RegExp.$1 : window.location.protocol,
					w = d.xhr(),
					x = w.setRequestHeader;
				if (f && f.promise(w), d.crossDomain || u("X-Requested-With", "XMLHttpRequest"), u("Accept", s || "*/*"), (s = d.mimeType || s) && (s.indexOf(",") > -1 && (s = s.split(",", 2)[0]), w.overrideMimeType && w.overrideMimeType(s)), (d.contentType || d.contentType !== !1 && d.data && "GET" != d.type.toUpperCase()) && u("Content-Type", d.contentType || "application/x-www-form-urlencoded"), d.headers)
					for (r in d.headers)
						u(r, d.headers[r]);
				if (w.setRequestHeader = u, w.onreadystatechange = function() {
						if (4 == w.readyState) {
							w.onreadystatechange = k, clearTimeout(p);
							var a, c = !1;
							if (w.status >= 200 && w.status < 300 || 304 == w.status || 0 == w.status && "file:" == v) {
								j = j || l(d.mimeType || w.getResponseHeader("content-type")), a = w.responseText;
								try {
									"script" == j ? (1, eval)(a) : "xml" == j ? a = w.responseXML : "json" == j && (a = z.test(a) ? null : b.parseJSON(a))
								} catch (e) {
									c = e
								}
								c ? i(c, "parsererror", w, d, f) : h(a, w, d, f)
							} else
								i(w.statusText || null, w.status ? "error" : "abort", w, d, f)
						}
					}, g(w, d) === !1)
					return w.abort(), i(null, "abort", w, d, f), w;
				if (d.xhrFields)
					for (r in d.xhrFields)
						w[r] = d.xhrFields[r];
				var y = "async" in d ? d.async : !0;
				w.open(d.type, d.url, y, d.username, d.password);
				for (r in t)
					x.apply(w, t[r]);
				return d.timeout > 0 && (p = setTimeout(function() {
					w.onreadystatechange = k, w.abort(), i(null, "timeout", w, d, f)
				}, d.timeout)), w.send(d.data ? d.data : null), w
			}, b.get = function() {
				return b.ajax(o.apply(null, arguments))
			}, b.post = function() {
				var a = o.apply(null, arguments);
				return a.type = "POST", b.ajax(a)
			}, b.getJSON = function() {
				var a = o.apply(null, arguments);
				return a.dataType = "json", b.ajax(a)
			}, b.fn.load = function(a, c, d) {
				if (!this.length)
					return this;
				var e, f = this,
					g = a.split(/\s/),
					h = o(a, c, d),
					i = h.success;
				return g.length > 1 && (h.url = g[0], e = g[1]), h.success = function(a) {
					f.html(e ? b("<div>").html(a.replace(u, "")).find(e) : a), i && i.apply(f, arguments)
				}, b.ajax(h), this
			};
			var A = encodeURIComponent;
			b.param = function(a, b) {
				var c = [];
				return c.add = function(a, b) {
					this.push(A(a) + "=" + A(b))
				}, p(c, a, b), c.join("&").replace(/%20/g, "+")
			}
		}(b),
		function(a) {
			a.fn.serializeArray = function() {
				var b, c = [];
				return a([].slice.call(this.get(0).elements)).each(function() {
					b = a(this);
					var d = b.attr("type");
					"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != d && "reset" != d && "button" != d && ("radio" != d && "checkbox" != d || this.checked) && c.push({
						name: b.attr("name"),
						value: b.val()
					})
				}), c
			}, a.fn.serialize = function() {
				var a = [];
				return this.serializeArray().forEach(function(b) {
					a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
				}), a.join("&")
			}, a.fn.submit = function(b) {
				if (b)
					this.bind("submit", b);
				else if (this.length) {
					var c = a.Event("submit");
					this.eq(0).trigger(c), c.isDefaultPrevented() || this.get(0).submit()
				}
				return this
			}
		}(b),
		function(b) {
			"__proto__" in {} || b.extend(b.zepto, {
				Z: function(a, c) {
					return a = a || [], b.extend(a, b.fn), a.selector = c || "", a.__Z = !0, a
				},
				isZ: function(a) {
					return "array" === b.type(a) && "__Z" in a
				}
			});
			try {
				getComputedStyle(a)
			} catch (c) {
				var d = getComputedStyle;
				window.getComputedStyle = function(a) {
					try {
						return d(a)
					} catch (b) {
						return null
					}
				}
			}
		}(b);
	var c, d;
	! function(a, b) {
		function e(a, c) {
			var d, e = f[a] || {},
				j = e.pkg;
			d = j ? g[j].url : e.url || a;
			var k = i[a];
			if (!k) {
				k = i[a] = [];
				var l = b.createElement("script");
				l.type = "text/javascript", l.src = d, h.appendChild(l)
			}
			k.push(c)
		}
		var f, g, h = b.getElementsByTagName("head")[0],
			i = {},
			j = {},
			k = {};
		d = function(a, b) {
			j[a] = b;
			var c = i[a];
			if (c) {
				for (var d = c.length - 1; d >= 0; --d)
					c[d]();
				delete i[a]
			}
		}, c = function(a) {
			a = c.alias(a);
			var b = k[a];
			if (b)
				return b.exports;
			var d = j[a];
			if (!d)
				throw Error("Cannot find module `" + a + "`");
			b = k[a] = {
				exports: {}
			};
			var e = "function" == typeof d ? d.apply(b, [c, b.exports, b]) : d;
			return e && (b.exports = e), b.exports
		}, c.async = function(b, d) {
			function g(a) {
				for (var b = a.length - 1; b >= 0; --b) {
					var c = a[b];
					if (!(c in j || c in k)) {
						k[c] = !0, l++, e(c, h);
						var d = f[c];
						d && d.deps && g(d.deps)
					}
				}
			}

			function h() {
				if (0 == l--) {
					var e, f = [];
					for (e = b.length - 1; e >= 0; --e)
						f[e] = c(b[e]);
					d && d.apply(a, f)
				}
			}
			"string" == typeof b && (b = [b]);
			for (var i = b.length - 1; i >= 0; --i)
				b[i] = c.alias(b[i]);
			var k = {},
				l = 0;
			g(b), h()
		}, c.resourceMap = function(a) {
			f = a.res || {}, g = a.pkg || {}
		}, c.alias = function(a) {
			return a
		}, d.amd = {
			version: "1.0.0"
		}
	}(window, document),
	function(a) {
		var b = [];
		a.loadScript = function() {
			if (arguments.length)
				for (var a, c = 0, d = 0, e = 0, f = arguments.length; f > e; e++) {
					var g = arguments[e];
					if ("function" == typeof g) {
						a = g, c = e, d === c && a();
						break
					}
					if (g = g.toString(), b[g])
						d++, a && d === c && a();
					else {
						var h = document.createElement("script");
						h.type = "text/javascript", h.onload = h.onreadystatechange = function() {
							return h.readyState && "complete" !== h.readyState && "loaded" !== h.readyState ? !1 : (h.onload = h.onreadystatechange = null, d++, b[g] = !0, void(a && d === c && a()))
						}, h.async = !0, h.src = g, document.getElementsByTagName("head")[0].appendChild(h)
					}
				}
		}
	}(this), d("binnng/url.js", function(a, b, c) {
			var d, e, f, g, h, i, j;
			return f = window, d = document, g = f.decodeURIComponent, i = function(a) {
				var b, c, d, e, f, h;
				for (d = {}, c = a.split("&"), e = function(a) {
						var b, c, e;
						a = a.split("="), c = a[0], e = a[1] || "";
						try {
							return d[g(c)] = g(e)
						} catch (f) {
							return b = f, d[g(c)] = e
						}
					}, f = 0, h = c.length; h > f; f++)
					b = c[f], e(b);
				return d
			}, j = function() {
				function a(a) {
					var b, c, d, e;
					this.url = a, this.search = this.hash = null, c = null != (d = a.split("?")) ? d[1] : void 0, c && (this.search = "#" + c), b = null != (e = a.split("#")) ? e[1] : void 0, b && (this.hash = "#" + b)
				}
				var b, c;
				return b = f.URL, c = "function" == typeof b, a
			}(), e = {
				parse: function(a) {
					return new j(a)
				},
				search: function(a) {
					var b, c;
					return null == a && (a = ""), a = e.parse(a), c = a.search, b = c ? i(c.substr(1)) : null
				},
				hash: function(a) {
					var b, c;
					return null == a && (a = ""), a = e.parse(a), b = a.hash, c = b ? i(b.substr(1)) : null
				},
				getDataFromParams: i
			}, h = e, c.exports = h
		}),
		function(a, b) {
			var c = function() {},
				d = function() {
					this.calls = [], this.map = {
						events: {
							friend: "menu:share:appmessage",
							timeline: "menu:share:timeline",
							weibo: "menu:share:weibo"
						},
						actions: {
							friend: "sendAppMessage",
							timeline: "shareTimeline",
							weibo: "shareWeibo"
						},
						direct: {
							network: "getNetworkType",
							hideToolbar: "hideToolbar",
							hideOptionMenu: "hideOptionMenu",
							showOptionMenu: "showOptionMenu"
						}
					}
				};
			d.prototype._data = function(a) {
				var b = {};
				for (var c in a) {
					if (!a.hasOwnProperty(c))
						return;
					b[c] = "function" == typeof a[c] ? a[c]() : a[c]
				}
				return b.appid = b.app, b.img_url = b.img, delete b.app, delete b.img, b
			}, d.prototype._make = function(a) {
				if ("undefined" == typeof WeixinJSBridge)
					return this.calls.push(a);
				var b = a.name,
					c = this.map.direct[b],
					d = a.data,
					e = a.callback;
				if (c)
					return "network" === b ? WeixinJSBridge.invoke(c, {}, e) : WeixinJSBridge.call(c, e);
				"weibo" === b ? (d.content = d.desc, d.url = d.link) : "timeline" === b && (d.title = d.title + " - " + d.desc, d.desc = d.title);
				var f = this;
				alert(JSON.stringify(d))
				debugger
				WeixinJSBridge.on(this.map.events[b], function() {
					WeixinJSBridge.invoke(f.map.actions[b], d, e)
				})
			}, d.prototype.on = function(a, b, d) {
				return a ? ("function" == typeof b && (d = b, b = null), this._make({
					name: a,
					data: b ? this._data(b) : {},
					callback: d || c
				}), this) : void 0
			};
			var e = function() {
					for (var a = 0, b = f.calls.length; b > a; a++)
						f._make(f.calls[a])

				},
				f = new d;
			a.wechat = a.wechat || function() {
				return f.on.apply(f, arguments)
			}, "undefined" == typeof WeixinJSBridge ? b.addEventListener ? b.addEventListener("WeixinJSBridgeReady", e, !1) : (b.attachEvent("WeixinJSBridgeReady", e), b.attachEvent("onWeixinJSBridgeReady", e)) : e()
		}(window, document),
		function(a) {
			var b, c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A;
			return p = void 0, k = null, t = "x", v = "y", u = "xy", g = "left", m = "right", q = "up", c = "down", i = 10, h = 40, b = ["webkit", "moz", "ms", "o", ""], l = /\-?[0-9]+\.?[0-9]*/g, f = "ontouchend" in a, n = f ? "touchstart" : "mousedown", j = f ? "touchmove" : "mousemove", e = f ? "touchend" : "mouseup", r = a.innerHeight, s = a.innerWidth, y = function() {}, z = function(a, c) {
				var d, e, f, g, h;
				for (h = [], f = 0, g = b.length; g > f; f++)
					e = b[f], d = e ? "" + e + "Transition" : "transition", h.push(a.style[d] = c);
				return h
			}, A = function(a, c, d, e) {
				var f, g, h, i, j;
				for (j = [], h = 0, i = b.length; i > h; h++)
					g = b[h], f = g ? "" + g + "Transform" : "transform", j.push(a.style[f] = "translate3d(" + (c || 0) + "px, " + (d || 0) + "px, " + (e || 0) + "px)");
				return j
			}, x = function(a) {
				var c, d, e, f, g, h, i;
				for (g = [], d = "", c = "", h = 0, i = b.length; i > h; h++)
					if (f = b[h], e = f ? "" + f + "Transform" : "transform", d = a.style[e], d && "string" == typeof d) {
						c = d.match(/\((.*)\)/g)[0], g = c && c.match(l);
						break
					}
				return g.length ? {
					x: g[0] || 0,
					y: g[1] || 0,
					z: g[2] || 0
				} : void 0
			}, o = function() {
				function a(a, b) {
					this.ele = a, this.direction = b, this._isPressed = !1, this.onStart = this.onMove = this.onEnd = y, this.coord = this.eventCoords = this.cacheCoords = this.finger = this.absFinger = k, this.orient = [], this.isSlider = !1, this.isWebapp = !1, this.duration = "400"
				}
				var b, d;
				return d = [function(a) {
					var b, c;
					return c = a.touches && (a.touches.length ? a.touches : [a]), b = a.changedTouches && a.changedTouches[0] || a.originalEvent && a.originalEvent.changedTouches && a.originalEvent.changedTouches[0] || c[0].originalEvent || c[0], {
						x: b.clientX,
						y: b.clientY
					}
				}, function(a) {
					var b;
					return b = a, {
						x: b.clientX,
						y: b.clientY
					}
				}], b = f ? d[0] : d[1], a.prototype.start = function(a) {
					return (this.onStart = a) && this
				}, a.prototype.move = function(a) {
					return (this.onMove = a) && this
				}, a.prototype.end = function(a) {
					return (this.onEnd = a) && this
				}, a.prototype.setCoord = function(a) {
					var b, c, d;
					c = this.coord = {
						x: a[t] || 0,
						y: a[v] || 0
					}, d = this.ele, A(d, c[t], c[v]);
					for (b in c)
						d.setAttribute(b, c[b]);
					return this
				}, a.prototype.onTouchStart = function(a) {
					var c;
					return this._isPressed = !0, this.eventCoords = b(a), this.cacheCoords = this.coord, this.finger = this.absFinger = k, this.isSlider && this.onSliderStart(a), c = this.onStart.apply(this, [a])
				}, a.prototype.onTouchMove = function(a) {
					var d, e, f, j, k, l, n, o, p, r, s;
					if (a.preventDefault(), !this._isPressed)
						return !1;
					if (n = b(a), f = this.direction, l = this.finger = {
							x: n.x - this.eventCoords.x,
							y: n.y - this.eventCoords.y
						}, d = this.absFinger = {
							x: Math.abs(l.x),
							y: Math.abs(l.y)
						}, f !== u && (o = f === t ? v : t, d[f] < i || d[o] > h))
						return !1;
					if (p = [], d.x > i && p.push(l.x < 0 ? g : m), d.y > i && p.push(l.y < 0 ? q : c), this.orient = p, r = this.onMove.apply(this, [a]), r === !1)
						return !1;
					j = this.ele, k = this.coord = {
						x: f.indexOf(t) < 0 ? this.cacheCoords[t] : this.cacheCoords[t] - 0 + l.x,
						y: f.indexOf(v) < 0 ? this.cacheCoords[v] : this.cacheCoords[v] - 0 + l.y
					}, A(j, k[t], k[v]), s = [];
					for (e in k)
						s.push(j.setAttribute(e, k[e]));
					return s
				}, a.prototype.onTouchEnd = function(a) {
					var b, c, d;
					return this._isPressed = !1, b = this.ele, this.isSlider && this.onSliderEnd(a), c = this.onEnd.apply(this, [a]), d = x(this.ele), d && this.setCoord(d), this.orient = []
				}, a.prototype.onSliderStart = function() {
					return z(this.ele, k)
				}, a.prototype.onSliderEnd = function() {
					var a, b, d, e, f, h, i, j, k, l, n, o, p;
					return l = this.orient.join(""), p = 0, h = !1, n = this.page, o = this.pageNum, d = this.ele, b = this.duration, a = this.absFinger, j = l.indexOf(q) > -1, e = l.indexOf(c) > -1, f = l.indexOf(g) > -1, i = l.indexOf(m) > -1, k = this.direction === v, k ? (j && n++, e && n--) : (f && n++, i && n--), n === o && (n = o - 1, h = !0), -1 === n && (n = 0, h = !0), h === !0 && (b *= k ? a[v] / this.pageHeight : a[t] / this.pageWidth), z(d, "all " + b + "ms ease-in"), k ? (p = "-" + n * this.pageHeight, A(d, 0, p, 0)) : (p = "-" + n * this.pageWidth, A(d, p, 0, 0)), this.page = n
				}, a.prototype.init = function() {
					var a, b, c, d, f, g, h;
					this.coord = {
						x: 0,
						y: 0
					}, h = this._onTouchStart = function(a) {
						return function(b) {
							return a.onTouchStart(b)
						}
					}(this), g = this._onTouchMove = function(a) {
						return function(b) {
							return a.onTouchMove(b)
						}
					}(this), f = this._onTouchEnd = function(a) {
						return function(b) {
							return a.onTouchEnd(b)
						}
					}(this), c = this.ele, c.addEventListener(n, h, !1), c.addEventListener(j, g, !1), c.addEventListener(e, f, !1), d = this.coord = {
						x: 0,
						y: 0
					}, b = this.direction, A(c, d[t], d[v]);
					for (a in d)
						c.setAttribute(a, d[a]);
					return this
				}, a.prototype.destroy = function() {
					var a;
					return a = this.ele, a.removeEventListener(n, this._onTouchStart, !1), a.removeEventListener(j, this._onTouchMove, !1), a.removeEventListener(e, this._onTouchEnd, !1), this
				}, a.prototype.slider = function(a) {
					var b, c, d, e, f, h, i, j, k, l;
					if (f = this.ele, "string" == typeof a)
						a = f.querySelectorAll(a);
					else if (!a)
						for (a = [], c = f.childNodes, i = 0, k = c.length; k > i; i++)
							b = c[i], 1 === b.nodeType && a.push(b);
					if (this.isSlider = !0, this.page = 0, this.elPages = a, e = a.length, h = this.pageNum = e ? e : 0, this.direction === t)
						for (j = 0, l = a.length; l > j; j++)
							d = a[j], d.style.cssFloat = g;
					return this
				}, a.prototype.webapp = function(a) {
					var b, c;
					return this.isWebapp = !0, this.slider(a).fullscreen(), a = this.elPages, b = this.ele, c = this.pageNum, b.style.height = "" + r * c + "px", this.height(r), this.direction === t && this.width(s), this
				}, a.prototype.height = function(a) {
					var b, c, d, e, f, g;
					for (d = this.ele, c = this.elPages, e = this.pageNum, a = String(a).replace("px", ""), "100%" === a && (a = r), this.pageHeight = a, this.direction === t && (d.style.height = "" + a + "px"), f = 0, g = c.length; g > f; f++)
						b = c[f], b.style.height = "" + a + "px";
					return this
				}, a.prototype.width = function(a) {
					var b, c, d, e, f, g;
					for (d = this.ele, c = this.elPages, e = this.pageNum, a = String(a).replace("px", ""), "100%" === a && (a = s), this.pageWidth = a, this.direction === t && (d.style.width = "" + a * e + "px"), f = 0, g = c.length; g > f; f++)
						b = c[f], b.style.width = "" + a + "px";
					return this
				}, a.prototype.fullscreen = function() {
					var a, b, c;
					for (b = this.ele, a = b; c = a.parentNode;)
						1 === c.nodeType && (c.style.height = "100%", c.style.overflow = "hidden"), a = c;
					return this
				}, a.prototype.time = function(a) {
					return this.duration = String(a).replace("ms", ""), this
				}, a
			}(), w = function(a, b) {
				var c;
				return c = new o(a, b || t), c.init()
			}, "function" == typeof d ? d("binnng/slip.js", function() {
				return w
			}) : a.Slip = w
		}(window, document), d("binnng/broadcast", function(a, b, c) {
			var d, e;
			return d = window, e = {
				on: function(a, b) {
					var c;
					return c = e.data, c.hasOwnProperty(a) ? c[a].push(b) : c[a] = [b]
				},
				fire: function(a, b, c) {
					var f, g, h, i, j;
					for (c = c || d, g = e.data[a] || [], j = [], h = 0, i = g.length; i > h; h++)
						f = g[h], j.push(f.apply(c, [a, b]));
					return j
				},
				data: {}
			}, c.exports = e
		}),
		function(a) {
			var b, c, e, f, g, h, i, j, k;
			return b = a.$, f = b("body"), g = b("html"), c = "click", j = "in-wallet-fancy", k = !1, i = function(a) {
				var b;
				return null == a && (a = []), b = a.sort(function(a, b) {
					return b - a
				}), b[0]
			}, e = function() {
				function d(a) {
					this.config = null != a ? a : {}, this.content = this.config.content || "", this.name = this.config.name || "", this.time = this.config.time || 50, this.elFancy = null, this.width = a.width
				}
				var e, h, l, m, n, o, p, q, r, s;
				return o = "<div class='wallet-mask'></div>", n = ["<div class='wallet-fancy'>", "<em>X</em>", "</div>"], s = "all .3s ease", r = {
					position: "absolute",
					webkitTransition: s,
					transition: s,
					opacity: 0,
					display: "none"
				}, q = {
					left: 0,
					top: 0,
					width: "100%",
					background: "rgba(0, 0, 0, .6)",
					zIndex: 10
				}, b.extend(q, r), m = {
					zIndex: 20,
					width: "80%",
					left: "50%",
					marginLeft: "-40%",
					top: "100px",
					background: "rgba(0, 0, 0, .6)",
					paddingTop: "20px"
				}, b.extend(m, r), h = function(a, b) {
					return null == b && (b = 50), a.show(), setTimeout(function() {
						return a.css("opacity", 1)
					}, b)
				}, e = function(a, b) {
					return null == b && (b = 50), a.css("opacity", 0), setTimeout(function() {
						return a.hide()
					}, b)
				}, l = null, p = {
					init: function(a) {
						return l = b(o), b.extend(q, a.maskStyles || {}), l.css(q), f.append(l)
					},
					show: function(a) {
						return null == a && (a = 50), h(l, a)
					},
					hide: function(a) {
						return null == a && (a = 50), e(l, a)
					}
				}, d.prototype.init = function() {
					var a, d, e;
					return a = this.config, k || p.init(a), k = !0, n.splice(1, 0, this.content), this.elFancy = e = b(n.join("")), b.extend(m, a.fancyStyles || {}), e.css(m), this.name && e.attr("name", this.name), this.config.onlyMask || f.append(e), this.elClose = d = b("em", e), d.on(c, function(a) {
						return function() {
							return a.hide()
						}
					}(this)), n.splice(1, 1), this
				}, d.prototype.show = function() {
					var c;
					return l.height(i([b(a).height(), g.height(), f.height()])), c = this.elFancy, p.show(this.time), h(c, this.time), g.addClass(j), b(a).scrollTop(0), this
				}, d.prototype.hide = function() {
					var a;
					return a = this.elFancy, p.hide(this.time), e(a), g.removeClass(j)
				}, d
			}(), h = function(a) {
				return new e(a).init()
			}, h.mask = function() {
				return new e({
					onlyMask: !0
				}).init().show()
			}, "function" == typeof d ? d("wallet/fancy", function() {
				return h
			}) : a.Fancy = h
		}(window, document), d("wallet/toast", function(a, b, c) {
			var d, e, f, g, h, i;
			return g = window, e = document, d = g.$, h = d("body"), f = function() {
				function a(a) {
					this.config = a, this.msg = a.msg, this.dur = a.time, this.bottom = a.bottom
				}
				var b, c, e;
				return b = ["<p class='wallet-toast'>", "</p>"], e = "opacity .3s ease", c = {
					zIndex: 20,
					background: "rgba(0, 0, 0, .6)",
					padding: "6px 14px",
					position: "absolute",
					webkitTransition: e,
					transition: e,
					opacity: 0,
					color: "#fff",
					borderRadius: "2px",
					left: "50%"
				}, a.prototype.init = function() {
					var a, e;
					return b.splice(1, 0, this.msg), this.el = a = d(b.join("")), a.css(c), h.append(a), e = a.width(), a.css({
						bottom: "" + this.bottom + "px",
						marginLeft: "-" + e / 2 + "px"
					}), b.splice(1, 1), this
				}, a.prototype.show = function() {
					var a;
					return a = this.el, setTimeout(function() {
						return a.css({
							opacity: 1
						})
					}, this.dur), this
				}, a.prototype.hide = function() {
					var a;
					return a = this.el, a.css({
						opacity: 0
					}), setTimeout(function() {
						return a.remove()
					}, this.dur), this
				}, a.prototype.remove = function() {
					return this.el.remove(), this
				}, a
			}(), i = function(a, b) {
				var c;
				return null == a && (a = ""), null == b && (b = 3e3), c = new f({
					msg: a,
					time: 50,
					bottom: 100
				}).init().show(), setTimeout(function() {
					return c.remove()
				}, b)
			}, i.constructor = f, c.exports = i
		}),
		function(a) {
			var b, c, e, f, g, h, i, j, k, l, m, n, o, p;
			return b = a.$, k = b("body"), e = 1e3, c = 800, f = 150, p = ["unstart", "ing", "stop", "end"], i = "cubic-bezier(0.550, 0.085, 0.680, 0.530)", j = "cubic-bezier(0.250, 0.460, 0.450, 0.940)", h = "ease", o = function(a, b) {
				return a.css({
					"-webkit-transition": b,
					transition: b
				})
			}, n = function(a, b) {
				return a.css({
					"-webkit-transform": "translate3d(0, " + b + "px, 0)",
					transform: "translate3d(0, " + b + "px, 0)"
				})
			}, g = function() {
				function a(a) {
					this.config = null != a ? a : {}, this.el = a.el, this.status = p[0], this.easing = a.easing || "ease", this.expire = a.dur || e, this.buffer = a.buffer || c, this.direction = a.direction || "down", this.isBuffered = this.isStopBuffering = !1, this.isPositive = !0
				}
				return a.prototype.init = function() {
					var a, b, c, d, e;
					return a = this.el, c = this.isDown = "down" === this.direction, this.childHTML = a.html(), this.insertEl(!0), b = a.height(), e = this._scrollHeight = (c ? "" : "-") + b / 2, n(a, (c ? "-" : "") + e), d = this._onTransEnd = function(a) {
						return function() {
							return a.onTransEnd.call(a)
						}
					}(this), a.on("webkitTransitionEnd msTransitionEnd", d), this
				}, a.prototype.initNew = function() {
					var a, b, c, d;
					return a = this.el, c = this.isDown = "down" === this.direction, this.childHTML = a.html(), d = a.height(), this.fullEl(!0), b = this.elHeight = a.height(), n(a, (c ? "-" : "") + (b - d)), a.on("webkitTransitionEnd", function(a) {
						return function() {
							return a._onTransEnd.call(a)
						}
					}(this)), this
				}, a.prototype.bufferStart = function() {
					var a, b, c;
					return a = this.el, c = this._scrollHeight, b = this.height, setTimeout(function(b) {
						return function() {
							return o(a, "all " + b.buffer + "ms " + i), n(a, 0)
						}
					}(this), 1), this.isBuffered = !0, setTimeout(function(a) {
						return function() {
							return a.stop()
						}
					}(this), this.expire)
				}, a.prototype.scrolling = function() {
					var a, b;
					return a = this.el, b = this._scrollHeight, setTimeout(function() {
						return function() {
							return o(a, "all " + f + "ms " + h), n(a, 0)
						}
					}(this), 1)
				}, a.prototype.start = function() {
					return this.isBuffered ? this.scrolling() : this.bufferStart(), this
				}, a.prototype.stop = function() {
					var a;
					return a = this.stopEl, this.isStopBuffering = !0, this
				}, a.prototype.stopAt = function(a) {
					var b;
					return this.stopEl = a, b = this.el, this
				}, a.prototype.dur = function(a) {
					return this.expire = a, this
				}, a.prototype.onTransEnd = function() {
					var a, b, c, d;
					return c = this.el, d = this._scrollHeight, a = this.buffer, b = h, this.isBuffering && (b = b, this.isBuffering = !1), o(c, "all 0ms " + b), n(c, 0), this.insertEl(), this.isPositive = c.children().eq(0).hasClass("up"), this.isStopBuffering && this.isPositive ? this.stopBuffer() : this.start(), this
				}, a.prototype.fullEl = function() {
					var a, b, c, d, e;
					for (b = this.childHTML, a = this.el, c = d = 0, e = this.expire / this.buffer; e >= 0 ? e >= d : d >= e; c = e >= 0 ? ++d : --d)
						a.prepend(b);
					return this
				}, a.prototype.insertEl = function(a) {
					var c, d, e, f, g, h, i;
					return f = this.el, c = this.childHTML, d = "<div></div>", a ? (g = f.children(), i = this.upEl = b("<div class='up'></div>").appendTo(f), e = this.downEl = b("<div class='down'></div>").appendTo(f), g.each(function(a, c) {
						var d;
						return d = b(c), i.append(d.clone()), e.append(d.clone()), d.remove()
					})) : (f.prepend(this.downEl), h = this.upEl, this.upEl = this.downEl, this.downEl = h, o(f, "all 0ms ease"), n(f, (this.isDown ? "-" : "") + this._scrollHeight))
				}, a.prototype.stopBuffer = function() {
					var a, c, d, e, f, g, h, i;
					return c = this.el, e = this.stopEl, h = this.upEl, d = this._scrollHeight, g = 0, f = 0, c.off("webkitTransitionEnd", this._onTransEnd), i = h.children(), a = i.eq(0).height(), i.each(function() {
						return function(a, c) {
							var d;
							return d = b(c), d.html() === e.html() ? f = a : void 0
						}
					}(this)), g = -f * a, o(c, "all " + this.buffer + "ms " + j), n(c, g)
				}, a
			}(), l = function(a) {
				return new g({
					el: a,
					direction: "down",
					dur: 3e3
				}).init()
			}, "undefined" != typeof m && module.exports ? module.exports = m = l : "function" == typeof d ? d("wallet/tiger", function(a, b, c) {
				return c.exports = b = l
			}) : a.Tiger = l
		}(window, document),
		function(a, b) {
			"use strict";
			var c, e, f, g, h, i;
			return i = function() {}, f = b.body || b.getElementsByTagName("html")[0], e = function(a, b, c) {
				return a.addEventListener(b, c, !1)
			}, c = function() {
				function a(a) {
					this.config = a, this.currentTime = 0, this.status = "ready", this.media = a.media, this.startFn = a.start || i, this.loadingFn = a.loading || i, this.timeupdateFn = a.timeupdate || i, this.endFn = a.end || a.stop || i, this.pauseFn = a.pause || i, this.elAudio = c
				}
				var c;
				return c = b.createElement("audio"), f.appendChild(c), a.prototype.play = function() {
					return c.play(), this
				}, a.prototype.pause = function() {
					return c.pause(), this.status = "paused", this
				}, a.prototype.stop = function() {
					return this.pause.call(this)
				}, a.prototype.end = function() {
					return c.src = c.currentSrc, this.status = "ended", this.endFn.call(this), this
				}, a.prototype.init = function() {
					return "paused" !== this.status && (c.src = this.media), e(c, "play", function(a) {
						return function() {
							return a.startFn()
						}
					}(this)), e(c, "playing", function(a) {
						return function() {
							return a.status = "playing"
						}
					}(this)), e(c, "waiting", function(a) {
						return function() {
							return a.status = "loading", a.loadingFn()
						}
					}(this)), e(c, "ended", function(a) {
						return function() {
							return a.end(), a.status = "ended"
						}
					}(this)), e(c, "timeupdate", function(a) {
						return function() {
							return a.currentTime = c.currentTime, a.duration = c.duration, a.timeupdateFn()
						}
					}(this)), this
				}, a
			}(), g = function(a) {
				return new c(a).init()
			}, "undefined" != typeof h && module.exports ? module.exports = h = g : "function" == typeof d ? d("binnng/bugoo", function(a, b, c) {
				return c.exports = b = g
			}) : "object" == typeof angular ? angular.module("binnng/bugoo", []).factory("$bugoo", function() {
				return g
			}) : a.Bugoo = g
		}(window, document), Function.prototype.hasOwnProperty("bind") || (Function.prototype.bind = function(a) {
			var b = this,
				c = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
			return function() {
				return b.apply(a || this, c)
			}
		}),
		function() {
			var a = document,
				b = {
					isEnabled: !1,
					set: function(b, c, d, e) {
						var f = "";
						if (0 !== d) {
							var g = new Date;
							g.setTime(g.getTime() + 36e5 * (d || 24)), f = ";expires=" + g.toGMTString()
						}
						var h = escape(b) + "=" + escape(c) + f + ";path=/" + (e ? ";domain=" + e : "");
						a.cookie = h
					},
					get: function(b) {
						for (var c, d = a.cookie.split(";"), e = 0; e < d.length; e++)
							if (c = d[e].split("="), c[0].trim() == b)
								return unescape(c[1]);
						return null
					},
					remove: function(a) {
						b.set(a, "", -1e3)
					},
					test: function() {
						var a = "_c_t_";
						b.set(a, "1"), b.isEnabled = "1" === b.get(a), b.remove(a)
					}
				};
			d("Cookie", function(a, c, d) {
				d.exports = b
			})
		}(), d("wechat", function(a, b, c) {
			c.exports = window.wechat
		}), d("loadScript", function(a, b, c) {
			return c.exports = window.loadScript
		}), d("random", function(a, b, c) {
			var d;
			return d = function(a, b) {
				return a + Math.random() * (b - a)
			}, c.exports = d
		}), d("template", function(a, b, c) {
			var d;
			return d = {
				init: function() {},
				parse: function(a, b) {
					return a.each(function(a, c) {
						var f, g, h, i, j, k, l;
						return f = e(c), h = null != (k = f.html()) && null != (l = k.match(/\{(.*?)\}/)) ? l[1] : void 0, j = b[h], void 0 === j && (j = ""), g = f.html(), i = {}, i[h] = j, h && "" !== j ? f.html(d.replace(g, i)) : void 0
					})
				},
				replace: function(a, b) {
					var c, d, e;
					a = "" + a;
					for (c in b)
						e = b[c], d = new RegExp("{" + c + "}", "g"), a = a.replace(d, e);
					return a
				}
			}, c.exports = d
		}), d("box/lightapp", function(a, b, c) {
			var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, v, w, x, y, z, A;
			return p = window, f = document, l = location, n = l.protocol, o = p.navigator.userAgent, g = /baiduboxapp/i.test(o), k = l.search.match(/lightapp/), i = !u && /iPad/i.test(o), j = !u && /iPod|iPhone/i.test(o), h = i || j, t = encodeURIComponent, s = decodeURIComponent, d = p.$, e = "click", q = "" + n + "//static1.searchbox.baidu.com/static/searchbox/openjs/aio.js", r = "" + n + "//apps.bdimg.com/cloudaapi/lightapp.js", y = a("loadScript"), x = function(b) {
				return b = "" + b, b.match(/^\?/) && (b = b.substring(1)), a("binnng/url.js").getDataFromParams(b)
			}, w = d.extend.bind(d), A = d.param.bind(d), z = function() {}, m = {
				appid: "",
				appkey: "",
				parterId: "",
				orderInfo: "",
				onPaySuccess: z,
				onPayFail: z,
				_onPaySuccess: function(a) {
					var b, c, d, e;
					return b = function(a) {
						var b;
						return b = a.match(/notify=\{(.*)\}/), b && b[1] || ""
					}(a), c = m.pageUrl, c && b && (c = s(c), d = ~c.indexOf("?") ? "&" : "?", e = c + d + b, setTimeout(function() {
						return l.href = e
					}, 500)), m.onPaySuccess()
				},
				_onPayFail: function() {
					return m.onPayFail()
				},
				isVIP: !1,
				pageUrl: "",
				isInit: !1,
				init: function() {
					var a, b, c, d;
					return d = m.isVIP, a = p.Box, c = p.clouda, g && (d ? k ? c || y(r) : (b = function() {
						return m.invoke()
					}, p.Box ? b() : y(q, b)) : c || y(r)), this
				},
				config: function(a) {
					return w(m, a), m.init(), this
				},
				doPay: function(a) {
					var b, c, d, e;
					return c = p.clouda, d = {
						orderInfo: a,
						hide_loading: !1,
						onsuccess: function(a) {
							return m._onPaySuccess(a)
						},
						onfail: function(a) {
							return m._onPayFail(a)
						}
					}, m.orderInfo = a, m.pageUrl = m.getVipURL((null != (e = x(a)) ? e.page_url : void 0) || ""), b = function() {
						return c = p.clouda, m.isInit || (c.lightapp(m.appkey, function() {
							return c.mbaas.pay.init(m.parterId, {
								onsuccess: z,
								onfail: z
							})
						}), m.isInit = !0), setTimeout(function() {
							return c.mbaas.pay.doPay(d)
						}, 50)
					}, c ? b() : y(r, b), this
				},
				invoke: function(a) {
					var b, c, d, e;
					return b = p.Box, e = m.getVipURL(l.href, a), c = m.appid, d = function() {
						var a;
						return a = "http://m.baidu.com/lightapp/" + c + "?page=" + t(e), setTimeout(function() {
							return b ? (b.lightapp.invoke({
								appid: c,
								url: a
							}), b.os.ios || b.android.invokeApp("Bdbox_android_utils", "closeWindow")) : void 0
						}, 50)
					}, b ? d() : y(q, d), this
				},
				getVipURL: function(a, b) {
					var c, d, e, f;
					return null == b && (b = ""), e = a, d = ~a.indexOf("?") ? "&" : "?", c = (null != (f = a.match(/#.*/)) ? f[0] : void 0) || "", c && (a = a.replace(c, "")), h ? e = "" + a + d + "lightapp=1" : a.match(/bd_vip|bd_framework/) || (e = "" + a + d + "bd_framework=1&bd_vip=1&lightapp=1"), e = "" + e + b + c
				},
				setLightLink: function() {
					return d("a").on(e, function(a) {
						var b, c, e;
						return null != a && "function" == typeof a.preventDefault && a.preventDefault(), b = d(this), c = b.attr("href"), c && !~c.indexOf("lightapp") && 0 !== c.indexOf("#") ? (e = m.getVipURL(c), b.attr("href", e), setTimeout(function() {
							return l.href = e
						}, 5e3)) : l.href = c
					}), !1
				},
				setLightLink2: function() {
					return d("a").each(function(a, b) {
						var c;
						return b = d(b), c = b.attr("href"), c && !~c.indexOf("lightapp") && 0 !== c.indexOf("#") ? b.attr("href", m.getVipURL(c)) : void 0
					})
				}
			}, v = m, c.exports = v
		}), d("api", function(a, b, c) {
			var d, e, f, g, h, i, j, k, l;
			for (f = "9000" === location.port, i = "http://qianbao.baidu.com/is/hongbao/", f && (i = "/api/"), e = ["distribute_package", "query_package_info", "get_package_pay_url", "get_package_distribute_detail", "get_package_distribute_list", "get_package_receive_list", "query_receive_package_top", "get_package_distribute_detail", "pay_package_return", "get_package_qrcode", "get_package_receive_totaltop"], d = {}, k = 0, l = e.length; l > k; k++)
				h = e[k], d[h] = h;
			for (g in d)
				j = d[g], d[g] = "" + i + j;
			return d.checkLogin = f ? "" + i + "login_info" : "/huodong/0/login_info/0", f && (d.get_package_qrcode += ".png"), c.exports = d
		});
	var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db;
	R = window, o = document, bb = function() {}, K = R.location, M = o.referrer, s = R.history, Q = R.navigator.userAgent, E = "ontouchend" in R, t = "ondevicemotion" in R, u = /Android|HTC/i.test(Q) || /Linux/i.test(R.navigator.platform + ""), z = !u && /iPad/i.test(Q), A = !u && /iPod|iPhone/i.test(Q), y = z || A, H = u && /mi\s+/i.test(Q), F = /UCBrowser/i.test(Q), G = /MicroMessenger/i.test(Q), v = /baidubrowser/i.test(Q), w = R.chrome, B = /baiduboxapp/i.test(Q), C = K.search.match(/bd_framework|bd_vip|lightapp/) || ~M.indexOf("lightapp"), l = E ? "tap" : "click", l = "click", x = "9000" === K.port, D = null != (db = R.history) ? db.pushState : void 0, cb = D ? function(a) {
		return R.history.pushState(null, null, a)
	} : bb, U = R.console, V = R.debug, x || (V && "function" == typeof V.guai && V.guai(), U = V = {
		log: bb,
		debug: bb
	}), n = c("Cookie"), T = c("wechat"), g = c("api"), i = c("binnng/broadcast"), j = x ? bb : function(a, b) {
		return c("binnng/bugoo")({
			media: a,
			start: b ? function() {
				return setTimeout(function(a) {
					return function() {
						return a.elAudio.src = "about:blank"
					}
				}(this), b)
			} : bb,
			end: function() {}
		}).play()
	}, P = c("wallet/toast"), L = c("box/lightapp"), e = R.$, I = R.JSON, Z = e.getJSON.bind(e), Y = e.extend.bind(e), $ = ab = R.loadScript, _ = x ? "/images/" : "", r = x ? "http://" + K.host : "http://qianbao.baidu.com/hd/money", k = "https://www.baifubao.com/api/0/pay/0/wapdirect/0", m = "http://co.baifubao.com/content/mywallet/h5/red_package/", S = "" + m + "share_wechat.png", q = "" + m + "rule.js", N = "" + m + "share_image.jpg", O = "" + m + "share_image_QR.jpg", h = "http://static1.searchbox.baidu.com/static/searchbox/openjs/aio.js", J = "http://openapi.baidu.com/cloudaapi/lightapp.js", f = "3e33d35161289dd851dd1b77", p = {
		IsLogin: !1
	}, X = "出错了，一会再来吧", W = {
		990201: "红包错误啦，检查后再来哟",
		990202: X,
		990206: "别太贪心，你已经抢过啦！",
		990207: "红包已经过期",
		990208: "红包已被抢完，你也领一个红包与好友一起瓜分！",
		"990208-1": "来晚啦，现金红包已被抢光！您的一分钱将7日内退回您的账户。",
		990209: X,
		"default": X
	};
	var eb, fb, gb, hb;
	fb = function(a) {
		return "/" === a ? "" + r : (a = a.replace(/^\//, ""), "" + r + "/" + a + (x ? ".html" : "/"))
	}, gb = function(a) {
		var b;
		return b = /[0-9]{4}-/, a.match(b) ? a.replace(b, "") : void 0
	}, eb = function(a) {
		var b;
		return null == a && (a = []), b = a.sort(function(a, b) {
			return b - a
		}), b[0]
	}, hb = function(a, b, c) {
		var d, e;
		return null == b && (b = l), null == c && (c = ""), "pv" !== b && (a = "" + p.page + "_" + a), ~a.indexOf("share" && G) && (a += "_weixin"), a += "_" + b, c = "" + a + "|" + c, d = 0, null != (e = R._hmt) ? e.push(["_trackEvent", a, b, c, d]) : void 0
	};
	var ib, jb, kb, lb, mb, nb, ob, pb, qb, rb;
	lb = e("html"), jb = e("body"), rb = e(R), ob = e(".root"), kb = e(".footer"), nb = e(".ling .btn.get"), pb = e(".ling .btn.send"), qb = e(".tpl"), mb = e(".header"), ib = e(".hd-backer"), d("share/content", function(a, b, c) {
		var d, e, f, g, h;
		return d = "http://qianbao.baidu.com/hd/hb", g = window, f = g.navigator.userAgent, e = /baiduboxapp/i.test(f), h = {
			"index/default": {
				content: "#百度钱包立抢现金#有钱就是任性！好朋友快来瓜分100元红包！可以提现！"
			},
			"wx/index/default": {
				title: "抢100元现金红包！呼朋唤友来拿钱！",
				desc: "百度钱包有钱任性！"
			},
			"me/receive": {
				content: "现金红包！我抢到{rec_amount}元现金，可以提现哦，你也赶快参加吧！" + (e ? "" : "{url}")
			},
			"me/distribute": {
				content: "我是土豪，已发{dis_amount}元现金红包，你也赶紧来发吧！" + (e ? "" : "{url}")
			},
			"wx/me/receive": {
				title: "现金红包！我抢到{amount}元现金，可以提现哦，你也赶快参加吧！",
				desc: ""
			},
			"wx/me/distribute": {
				title: "我是土豪，已发{amount}元现金红包，你也赶紧来发吧！",
				desc: ""
			}
		}, c.exports = h
	}), d("global/audio", function(a, b, c) {
		var d, e, f, g, h, i;
		for (g = "//co.baifubao.com/content/mywallet/h5/red_package/", d = ["shake", "coin", "1fen", "5yuan", "10yuan", "large", "tiger"], e = {}, h = 0, i = d.length; i > h; h++)
			f = d[h], e[f] = "" + g + f + ".mp3";
		return c.exports = e
	}), d("global/status", function(a, b, c) {
		var d, e, f;
		return f = {
			1: "未付款",
			2: "已付款",
			3: "派送中",
			4: "已到账",
			5: "已到账",
			7: "申请退款",
			8: "退款中",
			9: "退款成功",
			10: "退款失败"
		}, e = {
			1: "未发放",
			2: "部分发放",
			3: "完全开启",
			4: "已抢光",
			5: "已过期"
		}, d = {
			smallPackage: f,
			bigPackage: e,
			get: function(a, b) {
				var c;
				return c = d[("big" === a ? "big" : "small") + "Package"], c[b] || ""
			}
		}, c.exports = d
	}), d("global/sns", function(a, b, c) {
		var d, e, f, g, h, i, j, k, l, m, n;
		return j = encodeURIComponent, n = N, g = a("template"), h = {
			weibo: "http://service.weibo.com/share/share.php",
			qq: "http://connect.qq.com/widget/shareqq/index.html",
			renren: "http://widget.renren.com/dialog/share",
			baidu: "http://tieba.baidu.com/f/commit/share/openShareApi",
			qzone: "http://openmobile.qq.com/oauth2.0/m_jump",
			baidu_c: "http://openapi.baidu.com/social/widget/share"
		}, d = "ZVEpDSsmZ0qxa1gmgDAh1Fje", e = "100312028", i = ["qqdenglu", "sinaweibo", "qqweibo", "renren", "kaixin", "baidu"], k = {
			weibo: "sinaweibo",
			qq: "qqdenglu"
		}, l = function(a) {
			var b, c, d;
			c = [];
			for (b in a)
				d = a[b], c.push("" + b + "=" + d);
			return c.join("&")
		}, m = function(a) {
			var b, c, d;
			d = [];
			for (b in a)
				c = a[b], d.push(a[b] = g.replace(c, a));
			return d
		}, f = {
			init: function() {},
			api: h,
			getURL: function(a, b) {
				var c;
				return null == a && (a = "weibo"), null == b && (b = {}), c = "", Y(b, {
					media: a
				}), m(b), f.getBaiduCURL(b)
			},
			getRRURL: function(a) {
				var b, c;
				return c = a.url, b = {
					url: c,
					description: j(a.content),
					srcUrl: c,
					resourceUrl: c,
					title: j(a.title || a.content || ""),
					pic: a.pic || n
				}, "" + h.renren + "?" + l(b)
			},
			getQQURL: function(a) {
				var b, c;
				return c = a.url, b = {
					url: c,
					desc: j(a.content),
					pics: a.pic || n
				}, "" + h.qq + "?" + l(b)
			},
			getBaiduURL: function(a) {
				var b, c;
				return c = a.url, b = {
					url: c,
					desc: j(a.content),
					title: j(a.title || a.content || ""),
					pic: a.pic || n
				}, "" + h.baidu + "?" + l(b)
			},
			getWxURL: function() {
				return !1
			},
			getWeiboURL: function(a) {
				var b, c;
				return c = a.url, b = {
					url: c,
					content: j(a.content),
					pic: a.pic || n,
					searchPic: !1,
					title: j(a.title || a.content || "")
				}, "" + h.weibo + "?" + l(b)
			},
			getQzoneURL: function(a) {
				var b, c;
				return c = a.url, b = {
					page: "qzshare.html",
					loginpage: "loginindex.html",
					logintype: "qzone",
					site: "百度",
					appName: "百度",
					summary: j(a.title || a.content || ""),
					appId: e,
					action: "shareToQQ",
					targetUrl: a.url
				}, "" + h.baidu_c + "?" + l(b)
			},
			getBaiduCURL: function(a) {
				var b, c, e;
				return b = a.media, e = a.url, c = {
					method: "share",
					media_type: k[b] || b || "sinaweibo",
					client_id: d,
					url: e,
					pic_url: a.pic || n,
					content: j(a.title || a.content || ""),
					title: j(a.title || a.content || ""),
					enabled_medias: i.join("%2C")
				}, "" + h.baidu_c + "?" + l(c)
			}
		}, c.exports = f
	}), d("login", function(a, b, c) {
		var d, f, h, i, j, k;
		return k = encodeURIComponent, d = a("binnng/broadcast"), j = window, i = j.navigator.userAgent, f = /baiduboxapp/i.test(i), h = {
			isLogin: !1,
			init: function() {},
			isChecked: !1,
			check: function(a) {
				return null == a && (a = bb), h.callback = a, h.isChecked ? h.checkCb({
					is_login: 1
				}) : e.getJSON("" + g.checkLogin + "?t=" + +new Date, h.checkCb)
			},
			checkCb: function(a) {
				var b;
				return b = a.is_login, h.isLogin = b = !!(b - 0), d.fire("onCheckLogin", b), b && (h.jump(), d.fire("onLogin")), h.callback(b), h.isChecked = !0
			},
			getURL: function(a) {
				return a = k(a), "http://wappass.baidu.com/passport/?sms=2&login&tpl=bp&u=" + a
			},
			goToLogin: function(a) {
				var b;
				return null == a && (a = K.href), hb("login", "login"), b = "http://baifubao.baidu.com/jump?uri=" + k(a), K.href = h.getURL(b)
			},
			jump: function() {
				return (new Image).src = "//baifubao.baidu.com/jump?uri=/content/mywallet/h5/red_package/jump.png&t=" + +new Date
			}
		}, c.exports = h
	}), d("fancy", function(a, b, c) {
		var d, f, g, h;
		return g = a("wallet/fancy"), d = a("binnng/broadcast"), h = function() {}, f = {
			init: function() {
				return f.temp = f.getTemp(), d.on("onSetFancy", function(a, b) {
					var c, d;
					null == b && (b = h), c = {};
					for (d in f.temp)
						c[d] = f.set(d);
					return b(c)
				})
			},
			temp: {},
			set: function(a) {
				var b;
				return b = f.temp[a] || "", g({
					content: b,
					name: a,
					time: 10,
					fancyStyles: {
						width: "260px",
						marginLeft: "-130px"
					}
				})
			},
			getTemp: function() {
				var a;
				return a = {}, e("[type='text/fancy']").each(function(b, c) {
					var d, f;
					return d = e(c), f = d.attr("name"), a[f] = d.html(), d.remove()
				}), a
			}
		}, f.init(), c.exports = f
	}), d("lingHb", function(a, b, c) {
		var d, g, h, i, j, k, l;
		return g = a("api"), d = f, l = K.href.match(/ssid=/), h = a("binnng/broadcast"), j = a("wallet/toast"), k = e(".ling .btn.get"), i = {
			ling: function() {
				return Z(g.distribute_package, {
					activity_id: d
				}, i.lingCb), k.addClass(Cb)
			},
			lingCb: function(a) {
				var b, c, d, e, f;
				return e = a.result, b = a.package_amount, d = a.package_title, c = a.package_no, f = a.result_info, k.removeClass(Cb), 0 === e ? (h.fire("onGetedHb", a), i.setStatus(a)) : j(W[e] || f || W["default"])
			},
			setStatus: function(a) {
				var b, c;
				switch (b = a.result, c = "", b) {
					case 0:
						c = "success";
						break;
					default:
						c = "fail"
				}
				return i.status = c, jb.addClass("hb-" + c), h.fire("onPageChange")
			}
		}, c.exports = i
	}), d("gonglue", function(a, b, c) {
		var d, f, g;
		return f = a("binnng/slip.js"), g = function(a) {
			var b;
			return b = d.el, e(b).css({
				"-webkit-transform": "translate3d(" + a + "px,0,0)",
				transform: "translate3d(" + a + "px,0,0)"
			})
		}, d = {
			init: function(a) {
				var b, c, h;
				return d.el = a, b = e(".box", a), d.width = h = b.width(), c = f(a[0], "x"), c.slider(".box").time(200), c.end(function() {
					var b;
					return b = this.orient.join(""), ~b.indexOf("right") && (g(0), d.num = 1), ~b.indexOf("left") && (g("-" + h), d.num = 2), a.parent().removeClass("box1 box2").addClass("box" + d.num)
				})
			},
			num: 1
		}, c.exports = d
	}),
	d("global/weixin", function(a, b, c) {
		var d, f, g, h, i, j, k, l, m, n, o, p, q;
		return f = window, g = a("binnng/broadcast"), k = a("wallet/fancy"), d = a("template"), p = f.wechat, o = "点此分享", h = e("body"), i = e("html"), m = "on-weixin-share", n = a("share/content"), j = null, l = function(a) {
			var b, c, e;
			e = [];
			for (b in a)
				c = a[b], e.push(a[b] = d.replace(c, a));
			return e
		}, q = {
			init: function(a) {
				return h.append("<div class='weixin-share'><i></i><p>" + o + "</p></div>"), h.append("<div class='weixin-mask'></div>"), e(".weixin-share").addClass("box" === a ? "weixin-share-box" : void 0).on("click", q.onShareClose), q.elMask = e(".weixin-mask"), q.elMask.height(eb([e(f).height(), h.height(), i.height()])).on("click", q.onShareClose), q.regEvent(), j = e(".weixin-share")
			},
			onShare: function() {
				return q.elMask.show(), e(f).scrollTop(0), setTimeout(function() {
					return h.addClass(m)
				}, 10)
			},
			onShareClose: function() {
				return h.removeClass(m), setTimeout(function() {
					return q.elMask.hide()
				}, 10)
			},
			content: function(a, b) {
				return null == b && (b = q.onShareEnd), l(a), e("p", j).html(a.tip || o), p("friend", a, b), p("timeline", a, b)
			},
			regEvent: function() {
				var a, b, c;
				c = [];
				for (a in n)
					b = n[a], c.push(g.on(a, function() {}));
				return c
			},
			onShareEnd: function() {
				var a, b;
				return a = null != arguments && null != (b = arguments[0]) ?
				b.err_msg : void 0,
				 a && (a.match(/confirm/) && q.onShareSuccess(), a.match(/cancel/)) ? q.onShareCancel() : void 0
			},
			onShareSuccess: function() {
				return q.onShareClose(), hb("weixin_share_success")
			},
			onShareCancel: function() {
				return hb("weixin_share_cancel")
			}
		}, c.exports = q
	});
	var sb, tb;
	tb = c("fancy"), p.fancys = p.fancys || {}, i.fire("onSetFancy", function(a) {
		return Y(p.fancys, a)
	}), i.on("onSetMainShareFancyData", function(a, b) {
		var d, f, h, i, j, k, l, m, n, o, q, r, s, t, u, v, w, x, y, z, A;
		if (null == b && (b = {
				url: "",
				package_no: ""
			}), w = b.url, n = b.package_no, o = b.qrcode, d = b.content, i = null != (A = p.fancys["index/share"]) ? A.elFancy : void 0, !i)
			return !1;
		for (k = e(".sns", i), l = e(".icon", k), t = function() {
				var a, b, c;
				for (c = [], a = 0, b = l.length; b > a; a++)
					f = l[a], c.push(e(f).attr("class").replace("icon ", ""));
				return c
			}(), x = c("global/weixin"), q = c("share/content"), r = c("global/sns"), v = c("template"), h = e(".copy span", i), j = e("img.qrcode", i), h.length || (h = e(".copy", i)), n && j.attr("src", "" + g.get_package_qrcode + "?package_no=" + n), o && j.attr("src", o), h.html(w), y = 0, z = t.length; z > y; y++)
			u = t[y], m = e("." + u, k), s = r.getURL(u, b), s && m.attr("href", s).attr("target", "_blank");
		return v.parse(e("*", i), b)
	}), sb = {}, i.on("onBoxShare", function(a, b) {
		var c, d, f, g, j, k, l, m, n, p, q;
		return null == b && (b = {}), q = b.url, l = b.package_no, m = b.qrcode, f = b.content, j = b.id, p = b.title, n = b.success, g = b.fail, k = b.image, c = sb, j && !e("#" + j).length && e("<i id=" + j + " style='height:0'></i>").appendTo(jb), d = c[j] ? bb : function() {
			var a;
			return c[j] = j, a = {
				content: f || o.title,
				id: j || "box-share-btn",
				url: q || K.href,
				success: function() {
					return i.fire("onSetBoxShareSuccess", {
						qrcode: m,
						package_no: l,
						content: a.content,
						url: a.url
					}), "function" == typeof n ? n() : void 0
				},
				fail: function() {
					return "function" == typeof g ? g() : void 0
				}
			}, p && (a.title = p), u && B || (a.image = k || N), R.Box.share(a)
		}, R.Box ? d() : $(h, function() {
			return "function" == typeof d ? d() : void 0
		})
	}), i.on("onSetBoxShareSuccess", function(a, b) {
		var d, f, h, i, j, k, m, n, o, q, r, s, t, u, v, w, x, y, z, A;
		for (null == b && (b = {}), s = b.qrcode, o = b.package_no, d = b.content, v = b.url, o && (s = "" + g.get_package_qrcode + "?package_no=" + o), w = c("global/weixin"), f = e("#bd_share_mediaes"), f.append("<li class='media'><a id='bd_share_mediaes_weixin'>微信</a></li>"), f.append("<li class='media'><a id='bd_share_mediaes_qrcode'>二维码</a></li>"), j = c("wallet/fancy"), k = j({
				content: "<div class='box-share-fancy-qrcode" + (s ? " has-img" : "") + "'>" + (s ? "<img src='" + s + "'>" : "") + "</div>",
				name: "box-share-qrcode"
			}), "me" === p.page && (v = ""), m = j({
				content: "<div class='sns-share'><p class='title'>复制内容发送给微信好友</p><div class='content'>" + d + " " + v + "</div></div>",
				name: "index/share"
			}), h = e("#bd_share_popup_layer").parent(), u = function() {
				return h.hide()
			}, e("#bd_share_mediaes_qrcode").on(l, function() {
				return k.show(), u(), hb("box_qrcode", l, "框分享二维码点击")
			}), e("#bd_share_mediaes_weixin").on(l, function() {
				return m.show(), u(), hb("box_weixin", l, "框分享微信点击")
			}), t = ["kaixin", "mail", "sms"], x = 0, y = t.length; y > x; x++)
			n = t[x], null != (z = e("#bd_share_mediaes_" + n).parent()) && z.remove();
		return i = e("#bd_share_mediaes_qqdenglu"), q = i.attr("href") || "", r = null != (A = q.match(/targetUrl=(.*?)&/)) ? A[1] : void 0, r && i.attr("href", q.replace(r, encodeURIComponent(r))), h = e("#bd_share_popup_layer").parent()
	}), i.on("onSetUiLoading", function(a, b) {
		var c, d, f, g, h, i;
		for (b.length || (b = [b]), i = [], g = 0, h = b.length; h > g; g++)
			f = b[g], c = e(f), d = c.html(), i.push(c.html("<b>" + d + "</b><u class='ui-loading'></u>"));
		return i
	}), i.on("onPageChange", function() {
		return setTimeout(function() {
			return ob.css("min-height", e(R).height()), kb.addClass("ready")
		}, 0)
	}), i.on("onLogin", function() {
		var a;
		return a = c("login"), p.IsLogin = a.isLogin
	}), i.on("onSetTitle", function(a, b) {
		return G ? !1 : (o.title = b, e("title").html(b))
	}), i.on("onSetHbReceiveList", function(a, b) {
		var c, d, f, g, h;
		for (c = [], g = 0, h = b.length; h > g; g++)
			d = b[g], f = d.reply_message || d.replay_message || "", d.is_private_get - 0 === 1 && (f = "<q>(私藏)</q>" + f), d.is_private_get - 0 === 2 && (f = "<q>(分享奖励)</q>" + f), c.push(["<li>", "<img src='//himg.baidu.com/sys/portraitm/item/" + d.buyer_face + "'/>", "<b>" + d.buyer_login_name + "<span>" + (gb(d.receive_time) || "") + "</span></b>", "<p>" + f + "</p>", "<em>抢到<i>" + (d.gain_amount || "") + "</i>元</em>", "</li>"].join(""));
		return e(".hb-list").append(c.join(""))
	}), i.on("onSetHbMeList", function(a, b) {
		var d, f, g, h, i, j, k, l, m, n;
		if (d = b.data, l = b.type, !d)
			return !1;
		for (i = c("global/status"), k = function(a) {
				return i.get("small", a)
			}, j = function(a) {
				return i.get("big", a)
			}, g = [], f = function(a, b) {
				var c, d, e, f, g, h, i, l, m, n, o, p;
				return l = b.package_title, d = b.create_time, n = b.remain_amount, o = b.status, i = b.package_no, h = b.package_amount, e = b.gain_amount, m = b.receive_time, f = b.is_private_get, o -= 0, g = "", f - 0 === 1 && (g = "私藏"), f - 0 === 2 && (g = "分享奖励"), g && (l += "<q>(" + g + ")</q>"), "receive" === a ? p = ["<b>" + l + "</b>", "<p>" + gb(m) + "</p>", "<em><i>" + e + "</i>元</em>", "<small>" + k(o) + "</small>"] : (c = 4 === o ? j(o) : "还剩<i>" + n + "</i>元", p = ["<b>" + l + "</b>", "<p>" + gb(d) + "</p>", "<em><i>" + (h || 100) + "</i>元</em>", "<small>" + c + "</small>", "<i class='arrow-r'></i>", "<a href='" + fb("detail") + "?no=" + i + "'></a>"]), p.join("")
			}, m = 0, n = d.length; n > m; m++)
			h = d[m], g.push(["<li>", f(l, h), "</li>"].join(""));
		return e(".me-" + l + " .hb-list").append(g.join(""))
	}), i.on("onGetPackageInfo", function(a, b) {
		var c, d;
		return d = b.packageNo, c = b.callback, Z(g.query_package_info, {
			package_no: d
		}, c)
	}), i.on("onGetPackageDistributeDetail", function(a, b) {
		var c, d, e, f;
		return d = b.packageNo, f = b.pn, c = b.callback, e = b.pc, Z(g.get_package_distribute_detail, {
			package_no: d,
			pn: f,
			pc: e
		}, c)
	}), i.on("onGetPackageReceiveList", function(a, b) {
		var c, d;
		return d = b.pn, c = b.callback, Z(g.get_package_receive_list, {
			activity_id: f,
			pn: d
		}, c)
	}), i.on("onGetPackageDistributeList", function(a, b) {
		var c, d, e;
		return e = b.pn, d = b.pc, c = b.callback, e = e || 0, d = d || 10, Z(g.get_package_distribute_list, {
			activity_id: f,
			pn: e,
			pc: d
		}, c)
	}), i.on("onQueryReceivePackageTop", function(a, b) {
		var c, d;
		return d = b.packageNo, c = b.callback, Z(g.query_receive_package_top, {
			package_no: d
		}, c)
	}), i.on("onGetUserIsDistributePackage", function(a, b) {
		var c;
		return c = b.callback, i.fire("onGetPackageDistributeList", {
			callback: c,
			pc: 1
		})
	}), i.on("onGetTotalTop", function(a, b) {
		var c;
		return c = b.callback, Z(g.get_package_receive_totaltop, {
			activity_id: f
		}, c)
	}), i.on("onGetHbRule", function(a, b) {
		var c;
		return null == b && (b = bb), c = R.HB_RULE, c ? b(c) : $(q, function() {
			var a;
			return b(null != (a = R.HB_RULE) ? a.replace("<p></p>", "<p>&nbsp;</p>") : void 0)
		})
	});
	var ub, vb, wb, xb, yb, zb;
	e("*").on("touchstart", bb, !1), G ? R.Box = {
		share: bb
	} : $(h), i.fire("onSetUiLoading", e(".btn")), e(R).on("resize", function() {
		return i.fire("onPageChange")
	}), i.fire("onPageChange"), zb = c("binnng/url.js").search(K.href), xb = !!(null != zb ? zb.ssid : void 0), p.page = jb.attr("data-page"), G && c("global/weixin").init(), (G || C) && mb.remove(), M && M !== K.href ? (ib.attr("href", "javascript: void 0"), ib.on(l, function() {
		return "function" == typeof s.back ? s.back() : s.go(-1)
	})) : ib.remove(), e("a").each(function(a, b) {
		var c, d, f, g;
		return c = e(b), f = c.attr("data-href"), f && (f = f.replace(/^\\/, ""), "index" === f && (f = "/"), e(b).attr("href", fb(f))), d = c.attr("href"), g = /https?:\/\/www.baifubao.com/, d.match(g) ? (d = d.replace(g, "http://baifubao.baidu.com/jump?uri="), c.attr("href", d)) : void 0
	}), e(".tpl").each(function(a, b) {
		var c;
		return c = e(b), c.attr("data-tpl", c.html())
	}), e("*").each(function(a, b) {
		var c, d, f;
		return c = e(b), d = c.attr("data-track"), f = ("" + c.text()).replace(/\s|\n/g, ""), f = f.substring(0, 10), d ? c.on(l, function() {
			return hb(d, l, f)
		}) : void 0
	}), wb = 0, yb = !1, vb = setInterval(function() {
		return wb++, R._hmt && (hb("" + p.page + "_pv", "pv"), yb = !0), yb || wb > 20 ? clearInterval(vb) : void 0
	}, 500), ub = {
		appid: "3284036",
		appkey: "qYE7x7r5v4YhcohYsDKDploG",
		parterId: "3300000186",
		isVIP: !0
	}, ~M.indexOf("lightapp") || L.config(ub), C && (setTimeout(L.setLightLink2, 500), setInterval(L.setLightLink, 800)), d("my/tiger", function(a, b, c) {
		var d, f, g, h, i, j, k, l, m;
		return i = a("wallet/tiger"), g = 4, f = 1e3, d = 200, m = function() {
			var a, b;
			for (b = [], j = a = 0; 9 >= a; j = ++a)
				b.push("<i n='" + j + "'>" + j + "</i>");
			return b
		}().join(""), k = function() {}, l = function(a) {
			var b, c, d, e, f, g;
			return a += "", f = g = "", b = a.split("."), b.length > 1 ? (d = b[0], e = b[1], f = d.length < 2 ? "0" + d : d, g = e.length < 2 ? "" + e + "0" : e) : (c = b[0], f = b[0].length < 2 ? "0" + c : c, g = "00"), "" + f + g
		}, h = {
			callback: k,
			parseAmount: l,
			init: function(a) {
				var b, c, d;
				for (h.parentEl = a, a.css({
						overflow: "hidden"
					}), j = d = 0; g >= 0 ? g > d : d > g; j = g >= 0 ? ++d : --d)
					b = e("<div class='my-tiger'>" + m + "</div>"), c = e("<div class='tiger-item'></div>"), c.append(b), a.append(c), h.tigerEls.push(b);
				return h
			},
			onend: function(a) {
				return null == a && (a = k), h.callback = a, this
			},
			"default": function(a) {
				var b, c;
				for (h.isDefault = !0, j = c = 0; g >= 0 ? g > c : c > g; j = g >= 0 ? ++c : --c)
					b = e("<div class='tiger-item'></div>"), a.append(b);
				return h
			},
			start: function(a, b) {
				var c, e, g, j, k, m, n, o, p, q;
				for (null == b && (b = f), n = h.tigerEls, o = h.tigers, j = l(a).split(""), k = 0, g = p = 0, q = n.length; q > p; g = ++p)
					e = n[g], m = e.children().eq(j[g] || 0), c = i(e).dur(b).stopAt(m), h.tigers.push(c), setTimeout(function(a) {
						return function() {
							return a.start()
						}
					}(c), k), k += d;
				return setTimeout(function() {
					return h.callback()
				}, b + 2e3)
			},
			tigerEls: [],
			tigers: [],
			isDefault: !1,
			parentEl: null
		}, c.exports = h
	}), d("tiger/flash", function(a, b, c) {
		var d, f, g, h;
		return d = 6, g = 400, f = 4, h = {
			el: null,
			dotWidth: d,
			flashSep: g,
			total: 0,
			dots: [],
			focusDot: 0,
			flashCount: f,
			init: function(a) {
				var b, c, d, e;
				return null == a && (a = {}), c = a.el, b = a.dotWidth, e = a.flashSep, d = a.flashCount, b && (h.dotWidth = b), e && (h.flashSep = e), d && (h.flashCount = d), h.el = c, h.set()
			},
			set: function(a) {
				var b, c, d;
				return null == a && (a = {
					x: 4,
					y: 1
				}), b = h.el, h.nums = a, c = a.x, d = a.y, h.total = 2 * (c + d), h.insertEl()
			},
			insertEl: function(a) {
				var b, c, d, f;
				for (d = a || h.total, b = h.el, c = f = 0; d >= 0 ? d > f : f > d; c = d >= 0 ? ++f : --f)
					h.dots.push(e("<i class='dot' i='" + c + "'></i>").appendTo(b));
				return h.setPos()
			},
			setPos: function() {
				var a, b, c, d, e, f, g, i, j, k, l, m, n, o, p, q, r;
				for (c = h.el, b = h.dots, a = h.dotWidth, k = h.total, f = a / 2, r = h.nums, l = r.x, n = r.y, e = c.width(), d = c.height(), m = e / (l - 1), o = d / (n + 1), g = p = 0, q = b.length; q > p; g = ++p)
					c = b[g], l > g && (j = 0, i = m * g - f), g >= l && (i = e - f, j = o * (g + 1 - l) - f), g >= l + n && (j = d - f - 3, i = m * (k - g - 2) - f), g >= 2 * l + n && (i = -f, j = o * (k - g) - f), c.css({
						left: i,
						top: j
					});
				return h.start()
			},
			start: function() {
				var a, b, c;
				return a = h.dots, c = h.total, b = h.flashSep, setInterval(function() {
					var b, d, e, f, g, i, j;
					for (e = 0, g = a.length; g > e; e++)
						b = a[e], b.removeClass("focus");
					for (j = h.getIndexByFocus(h.focusDot), f = 0, i = j.length; i > f; f++)
						d = j[f], a[d].addClass("focus");
					return h.focusDot++, h.focusDot >= c ? h.focusDot = 0 : void 0
				}, b)
			},
			getIndexByFocus: function(a) {
				var b, c, d, e, f, g;
				for (c = [], f = h.total, d = h.flashCount, e = g = 0; d >= 0 ? d > g : g > d; e = d >= 0 ? ++g : --g)
					b = a + 3 * e, b >= f && (b -= f), c.push(b);
				return c
			}
		}, c.exports = h
	});
	var tb, Ab, Bb, Cb, Db, Eb, Fb, Gb, Hb, Ib, Jb, Kb, Lb, Mb, Nb, Ob, Pb, Qb, Rb, db;
	Db = c("lingHb"), tb = c("fancy"), Ab = c("gonglue"), Gb = c("global/weixin"), tb = c("fancy"), Fb = c("template"), Eb = c("login"), Cb = "loading", Ob = e("a.strategy"), Kb = e(".ling .rule"), Lb = e(".hb-rule-content"), Nb = e(".ling .share"), Jb = e(".ling .btn"), Mb = e(".see-me"), Rb = c("share/content"), Hb = Rb["index/default"], Ib = Rb["wx/index/default"], Pb = "onSetMainShareFancyData", Qb = null != (db = c("binnng/url.js").hash(K.href)) ? db.no : void 0, Bb = {
		init: function() {
			return nb.on(l, Bb.onLingClick), pb.on(l, Bb.onSendClick), Ob.on(l, Bb.onStrategyClick), Kb.on(l, Bb.onRuleClick), Nb.on(l, Bb.onShareClick), i.on("onGetedHb", Bb.onGetedHb), i.fire("onPageChange"), Gb.content({
				img: S,
				link: r,
				desc: Ib.desc,
				title: Ib.title
			}), xb && (Bb.onSendClick(), x || cb(fb("/"))), i.on("onSendPackageClick", Bb.onSendClick.bind(Bb)), i.on("onCheckLogin", Bb.onCheckLogin), setTimeout(Bb.preLoadImg, 1e3), i.fire("onGetHbRule", function(a) {
				return e(".foot-text-rule").html(a)
			}), Qb && !x ? K.href = fb("share") + ("?no=" + Qb) : void 0
		},
		strategyInit: !1,
		fancy: {},
		data: {},
		onLingClick: function() {
			var a;
			return a = e(this), a.hasClass(Cb) ? void 0 : (p.IsLogin ? Bb.onSendClick : Eb.goToLogin)()
		},
		onGetedHb: function(a, b) {
			var c, d, e;
			return hb("get_big_package_success", "network"), Bb.id = d = (null != b ? b.package_no : void 0) || "", Bb.data = b, e = Bb.shareURL = "" + r + "/share/?no=" + Bb.id, Bb.onShareOpen(), c = {
				content: null != Hb ? Hb.content : void 0,
				id: "box-share-btn",
				url: e,
				package_no: d
			}, i.fire("onBoxShare", c), B ? void 0 : K.hash = "no=" + d
		},
		onSendClick: function() {
			return "success" === Db.status ? Bb.onGetedHb("", Bb.data) : Db.ling()
		},
		onStrategyClick: function() {
			var a;
			return null != (a = p.fancys["index/strategy"]) && a.show(), Bb.strategyInit || Ab.init(e(".strategy-box")), Bb.strategyInit = !0
		},
		onShareOpen: function() {
			var a, b;
			return a = Bb.id, b = Bb.shareURL, Gb.content({
				img: S,
				link: "" + fb("share") + "?no=" + a,
				desc: Ib.desc,
				title: Ib.title,
				tip: "红包已开启，点此分享吧！一起瓜分，好友中你也中！"
			}), G ? Gb.onShare() : void 0
		},
		onGetIsDistributeCb: function(a) {
			var b, c;
			return c = a.package_list, p.isUserDistributePackage = b = (null != c ? c.length : void 0) > 0, b && Jb.addClass("again").find("b").html("再来一个红包分享给好友"), jb.addClass("hd-btn-data-ready"), Jb.removeClass(Cb)
		},
		onCheckLogin: function(a, b) {
			return jb.addClass("hd-btn-data-ready"), Jb.removeClass(Cb), Mb.attr("href", Bb.getSeeMeLink(b))
		},
		getSeeMeLink: function(a) {
			var b, c;
			return c = "", b = fb("me"), c = a ? b : Eb.getURL(b)
		},
		onRuleClick: function() {
			var a;
			return a = e(this), a.addClass(Cb), i.fire("onGetHbRule", function(b) {
				var c;
				return null == b && (b = ""), Lb.html(b), a.removeClass(Cb), null != (c = p.fancys["index/rule"]) ? c.show() : void 0
			})
		},
		preLoadImg: function() {
			var a, b, c, d, f, g, h;
			for (c = /url\((.*)\)/, b = [null != (g = e(".pack-s").css("background-image").match(c)) ? g[1] : void 0], h = [], d = 0, f = b.length; f > d; d++)
				a = b[d], h.push(a ? (new Image).src = a : void 0);
			return h
		},
		onShareClick: function() {
			return Bb.onShareOpen()
		}
	}, "index" === p.page && Bb.init();
	var Sb, Tb, Ub, Vb, Wb, Gb, Xb, Yb, Zb, $b, _b, ac, bc, cc, dc, ec, fc, gc, hc, ic, jc, kc, lc, mc, nc, oc, pc, qc, rc, zb;
	cc = e(".fancy-pay"), ac = e(".fancy-get-money"), lc = e(".shake-tip"), ic = e(".btn", lc), oc = e(".big-tree"), $b = e(".big-tiger"), mc = e(".tiger-flash"), gc = e(".hb-fail", $b), hc = e(".package .pack p", gc), nc = e(".tiger-numbers"), jc = e(".package-money"), Xb = c("global/audio"), rc = c("my/tiger"), Gb = c("global/weixin"), bc = e(".btn", ac), fc = e("[others='1']", $b), ec = e("[mine='1']", ac), dc = e(".btn", cc), _b = e(".dopay", $b), Yb = e(".again", $b), kc = e(".see-other"), Zb = e(".all-top"), Vb = c("template"), Wb = c("binnng/url.js"), zb = Wb.search(K.href), qc = {
		1: "一分耕耘，一分收获",
		5: "不错哦，赢了{xx}倍，下次可以抢得更多！",
		"default": "你以为抢得很多？隔壁老王抢得比你多多了。"
	}, Sb = 14, Ub = 3e3, pc = function() {
		return {
			minTop: oc.offset().top + 40,
			maxTop: oc.offset().top + 200,
			minLeft: oc.offset().left,
			maxLeft: oc.offset().left + oc.width() - 80
		}
	},
	Tb = {
		init: function() {
			return Tb.packageNo && !Tb.isPayed && (Tb.getPackInfo(), i.fire("onGetTotalTop", {
				callback: Tb.onGetTotalTopCb
			})), dc.on(l, Tb.onPayClick), _b.on(l, Tb.onPayClick), Tb.isPayed && Tb.onPaySuccess(), bc.on(l, function() {
				return K.href = r
			}), Tb.setSeeMineLink(), Tb.setSeeOthersLink(), jb.addClass(Tb.isPayed ? "user-payed" : "user-unpay"), Tb.isPayed || (jb.addClass("tiger-default"), rc["default"](nc)), c("tiger/flash").init({
				el: mc,
				flashSep: 150,
				dotWidth: 6
			}), Gb.content({
				img: S,
				desc: "百度钱包desc",
				title: "百度现金红包大放送-tittle",
				link: K.href
			}), zb.dopay ? Tb.onPay() : void 0
		},
		bindDevieMotion: function() {
			var a;
			return w && (a = !1), a && E ? rb.on("shake", Tb.onShake) : (jb.addClass("no-device-motion"), ic.on(l, Tb.onShake))
		},
		isShaked: !1,
		isPayed: !!(null != zb ? zb.sign : void 0),
		packageNo: null != zb ? zb.no : void 0,
		getPackInfo: function() {
			return i.fire("onGetPackageInfo", {
				packageNo: Tb.packageNo,
				callback: Tb.getPackInfoCb
			})
		},
		getPackInfoCb: function(a) {
			var b, c, d, e;
			return e = a.result, c = a.owner_login_name, d = a.package_title, b = a.has_receive, 0 === e ? (Vb.parse(qb, a), setTimeout(function() {
				return lc.css({
					opacity: 1
				})
			}, 100), (b - 0 === 1 ? Tb.error : Tb.onPayFancyShow)("990206"), Tb.bindDevieMotion(), jb.addClass("package-info-data-ready")) : (Bb.getPackInfoTime < 3 && setTimeout(Tb.getPackInfo, 100), Bb.getPackInfoTime++, Tb.error(e))
		},
		getPackInfoTime: 0,
		error: function(a, b) {
			var d;
			return null == b && (b = ""), d = W["" + a] || b || W["default"], hc.html(d), gc.show(), c("wallet/fancy").mask(), jb.addClass("error-fancy-show package-error-" + a), hb("error", l, d)
		},
		onShake: function() {
			return Tb.isShaked ? 0 : (Tb.isShaked = !0, j(Xb.shake))
		},
		onMoneyRainCb: function() {},
		onPayFancyShow: function() {
			return cc.show(), setTimeout(function() {
				return jb.addClass("pay-fancy-show")
			}, 100)
		},
		onPayClick: function(a) {
			return null != a && "function" == typeof a.stopPropagation && a.stopPropagation(), (p.IsLogin ? Tb.onPay : Eb.goToLogin)()
		},
		onPay: function() {
			return B && !C ? (L.invoke("&dopay=1"), !1) : (dc.addClass("loading"), _b.addClass("loading"), Z(g.get_package_pay_url, {
				package_no: Tb.packageNo
			}, Tb.onPayCb))
		},
		onPayCb: function(a) {
			var b, c;
			return c = a.result, b = a.pay_url, dc.removeClass("loading"), _b.removeClass("loading"), 0 === c ? B ? L.doPay(b) : K.href = "" + k + "?" + b : (Tb.error(c), cc.hide())
		},
		onPaySuccess: function() {
			var a, b, c;
			b = {};
			for (a in zb)
				c = zb[a], a.match(/lightapp|bd_/) || (b[a] = c);
			return Z(g.pay_package_return, b, Tb.onPaySuccessCb)
		},
		onPaySuccessCb: function(a) {
			var b, c, d, e, f, g, h, i, k, l;
			return h = a.result, g = a.receive_status, f = a.receive_amount, e = a.package_no, l = a.transfer_type, i = a.result_info, k = a.result_string, 0 === h ? (hb("pay_success", "network"), Tb.getedHbData = a, Tb.recAmount = f, c = Tb.onGetMoney(f), b = c.audio, d = c.moneyText, Y(a, {
				money_text: d,
				transfer_type: "10分钟"
			}), Vb.parse(qb, a), ac.show(), setTimeout(function() {
				return jb.addClass("get-money-data-ready")
			}, 1e3), j(Xb.tiger, 6e3), Tb.packageNo = e, Tb.setSeeOthersLink(), x || cb(fb("share") + ("?no=" + e)), Gb.content({
				img: S,
				desc: "百度钱包",
				title: "百度现金红包大放送",
				link: K.href
			}), setTimeout(function() {
				return rc.init(nc).onend(function() {
					return jc.addClass("show"), Tb.onTigerEnd()
				}).start(f)
			}, 200)) : ("990208" === h && (h += "-1"), Tb.error(h, i || k))
		},
		onGetMoney: function(a) {
			var b, c;
			return b = "1fen", a = 100 * (a - 0), c = "", a > 0 && 500 >= a && (b = "5yuan", c = qc[1]), a > 1 && (c = Vb.replace(qc[5], {
				xx: parseInt(a)
			})), a > 500 && (c = qc["default"]), a > 500 && 1e3 >= a && (b = "10yuan"), a > 1e3 && (b = "large"), {
				audio: b,
				moneyText: c
			}
		},
		setSeeOthersLink: function() {
			var a, b, c, d, e;
			for (d = [kc, fc], e = [], b = 0, c = d.length; c > b; b++)
				a = d[b], e.push(a.attr("href", "" + fb("detail") + "?no=" + Tb.packageNo + "&others=1"));
			return e
		},
		setSeeMineLink: function() {
			return ec.attr("href", "" + fb("me"))
		},
		onTigerEnd: function() {
			var a, b, c, d, f, g, h, i, j;
			for (b = e(".tiger-item", nc), a = Tb.recAmount, f = rc.parseAmount(a), i = f.split(""), j = [], d = g = 0, h = i.length; h > g; d = ++g)
				c = i[d], j.push(b.eq(d).html("<i n=" + c + ">" + c + "</i>"));
			return j
		},
		onGetTotalTopCb: function(a) {
			var b, c, d;
			return c = a.result, d = a.result_info, b = a.rank_list, b || (b = []), c - 0 === 0 ? (Tb.rankList = b, Tb.setTotalTop(), jb.addClass("rank-data-ready")) : P(d)
		},
		setTotalTop: function() {
			var a, b, c, d, e, f;
			for (a = Zb, b = [], f = Tb.rankList, d = 0, e = f.length; e > d; d++)
				c = f[d], b.push("<dd><b>" + c.user_login_name + "</b><em>" + c.rank_score + "元</em></dd>");
			return a.append(b.join(""))
		}
	},
	"share" === p.page && Tb.init();
	var sc, tc, uc, vc, wc, Vb, Wb, Gb, xc, yc, zc, Ac, Bc, Cc, Dc, Qb, zb;
	Wb = c("binnng/url.js"), zb = Wb.search(K.href), Cc = (null != zb ? zb.others : void 0) || (null != zb ? zb.other : void 0), Qb = null != zb ? zb.no : void 0, Bc = !!Qb, Vb = c("template"), wc = c("global/status"), vc = c("share/content"), Gb = c("global/weixin"), zc = "detail-box-share", yc = e(".detail-share .btn"), Dc = ' <b class="loading-more btn">加载更多</b>', Ac = e(Dc).insertAfter(e(".hb-list")), tc = 10, uc = "has-more", xc = "detail-box-share", sc = {
		init: function() {
			return Qb ? (Cc ? (Vb.parse(qb, {
				title: "看看大家手气",
				sub_title: "红包排行榜"
			}), sc.onTitleOk(), i.fire("onQueryReceivePackageTop", {
				packageNo: Qb,
				callback: sc.getPackageDistributeTopCb
			}), jb.addClass("page-others-detail")) : sc.onGetDisDetail(0), yc.on(l, sc.onDetailShareClick), Ac.on(l, sc.onLoadMoreClick), sc.setShareContent()) : !1
		},
		totalDetailPage: 0,
		curDetailPage: 0,
		onTitleOk: function() {
			return jb.addClass("page-title-ready")
		},
		getPackageReceiveDetailCb: function(a) {
			var b, c, d, f, g, h, j, k, l;
			return j = a.result, d = a.package_title, c = a.owner_login_name, h = a.remain_amount, g = a.receive_total_number, f = a.receive_list, l = a.status, k = a.result_info, 0 === j ? (Vb.parse(qb, {
				title: "" + d + "的红包详情",
				sub_title: "已有<b>" + g + "</b>人领取 还剩<b>" + h + "</b>元",
				receive_total_num: g
			}), sc.onTitleOk(), i.fire("onSetHbReceiveList", f), b = !!~"4|5".indexOf("" + l), b && (jb.addClass("package-unusual"), Vb.parse(qb, {
				unusual_txt: wc.bigPackage[l]
			})), jb.addClass("page-package-detail"), sc.totalDetailPage = Math.ceil(g / tc), sc.curDetailPage + 1 < sc.totalDetailPage ? Ac.addClass(uc) : Ac.removeClass(uc), 0 === sc.curDetailPage && i.fire("onSetTitle", e(".header h1").html()), sc.curDetailPage++) : P(k)
		},
		getPackageDistributeTopCb: function(a) {
			var b, c, d, f;
			return d = a.result, b = a.receive_list, c = a.receive_total_num, f = a.result_info, 0 === d ? ((null != b ? b.length : void 0) ? i.fire("onSetHbReceiveList", b) : jb.addClass("none-top-buyer"), Vb.parse(qb, {
				receive_total_num: c
			}), i.fire("onSetTitle", e(".header h1").html())) : P(f)
		},
		onDetailShareClick: function() {
			return G ? Gb.onShare() : void 0
		},
		onGetDisDetail: function(a) {
			return null == a && (a = 0), i.fire("onGetPackageDistributeDetail", {
				packageNo: Qb,
				pn: a,
				pc: tc,
				callback: sc.getPackageReceiveDetailCb
			})
		},
		onLoadMoreClick: function() {
			return sc.onGetDisDetail(sc.curDetailPage)
		},
		setShareContent: function() {
			var a, b, c;
			return b = "" + fb("share") + "?no=" + Qb, a = {
				url: b,
				package_no: Qb,
				content: (null != (c = vc["index/default"]) ? c.content : void 0) || ""
			}, Gb.content({
				img: S,
				link: b,
				desc: vc["wx/index/default"].desc,
				title: vc["wx/index/default"].title
			}), i.fire("onBoxShare", Y(a, {
				id: "box-share-btn"
			}))
		}
	}, "detail" === p.page && sc.init();
	var i, tc, uc, Cb, Ec, vc, Vb, Gb, Fc, Gc, Hc, Ic, Jc, Kc, Lc, Mc, Nc, Dc, Oc, Pc, Qc, Pb;
	Nc = e(".me-package-nav span"), Jc = e(".me-receive"), Fc = e(".me-distribute"), Mc = e(".share", Jc), Ic = e(".share", Fc), Kc = e(".hb-list", Jc), Gc = e(".hb-list", Fc), i = c("binnng/broadcast"), Gb = c("global/weixin"), vc = c("share/content"), Vb = c("template"), Pb = "onSetMainShareFancyData", Dc = ' <b class="loading-more btn">加载更多</b>', Lc = e(Dc).insertAfter(Kc), Hc = e(Dc).insertAfter(Gc), i.fire("onSetUiLoading", e(".loading-more")), tc = 10, uc = "has-more", Cb = "loading", Qc = "请重新登录", Oc = "me-dis-box-share", Pc = "me-rec-box-share", Ec = {
		init: function() {
			var a;
			return Nc.on(l, Ec.onNavClick), Mc.on(l, Ec.onShareClick), Ic.on(l, function() {
				return Ec.onShareClick("dis")
			}), Lc.on(l, Ec.onRecMoreClick), Hc.on(l, Ec.onDisMoreClick), i.on("onCheckLogin", function(a, b) {
				return b ? (Ec.onRecMoreClick(), Ec.onDisMoreClick()) : (c("wallet/toast")(Qc), setTimeout(function() {
					return c("login").goToLogin()
				}, 3e3))
			}), "#s" === K.hash && (Ec.onNavClick.call(Nc[1]), Ec.onHashChange()), e(R).on("hashchange", Ec.onHashChange), null != (a = p.fancys["index/share"].elFancy) ? a.addClass("me-fancy-" + Ec.page) : void 0
		},
		recTotalPage: 0,
		disTotalPage: 0,
		recCurPage: 0,
		disCurPage: 0,
		isDataReady: [],
		page: "f",
		onNavClick: function() {
			var a, b;
			return b = e(this).index(), a = 0 === b ? "f" : "s", K.hash = a
		},
		getReceiveList: function(a) {
			return null == a && (a = 0), Lc.addClass(Cb), i.fire("onGetPackageReceiveList", {
				pn: a,
				pc: tc,
				callback: Ec.getReceiveListCb
			})
		},
		getReceiveListCb: function(a) {
			var b, c, d, e, f, g;
			return c = a.result, b = a.package_list, f = a.total_amount, g = a.total_number, d = a.result_info, Lc.removeClass(Cb), 0 !== c ? P(d || W["default"]) : (Ec.isDataReady.push(1), Vb.parse(qb, {
				receive_amount: f
			}), Ec.receiveAmount = f, i.fire("onSetHbMeList", {
				data: b,
				type: "receive"
			}), Ec.recTotalPage = e = Math.ceil(g / tc), Ec.recCurPage + 1 < Ec.recTotalPage ? Lc.addClass(uc) : Lc.removeClass(uc), 0 === Ec.recCurPage && (Ec.setShareContent("rec"), Ec.setBoxShareContent("rec")), 0 === Ec.recCurPage && jb.addClass("receive-" + f), Ec.recCurPage++, Ec.isDataReady.length > 1 ? jb.addClass("me-data-ready") : void 0)
		},
		getDistributeList: function(a) {
			return null == a && (a = 0), Hc.addClass(Cb), i.fire("onGetPackageDistributeList", {
				pn: a,
				pc: tc,
				callback: Ec.getDistributeListCb
			})
		},
		getDistributeListCb: function(a) {
			var b, c, d, e, f, g;
			return Hc.removeClass(Cb), c = a.result, b = a.package_list, f = a.total_amount, g = a.total_number, d = a.result_info, 0 !== c ? P(d || W["default"]) : (Ec.isDataReady.push(1), jb.addClass("distribute-" + g), Vb.parse(qb, {
				distribute_amount: f
			}), Ec.distributeAmount = f, i.fire("onSetHbMeList", {
				data: b,
				type: "distribute"
			}), Ec.disTotalPage = e = Math.ceil(g / tc), Ec.disCurPage + 1 < Ec.disTotalPage ? Hc.addClass(uc) : Hc.removeClass(uc), 0 === Ec.disCurPage && (Ec.setShareContent("dis"), Ec.setBoxShareContent("dis")), Ec.disCurPage++, Ec.isDataReady.length > 1 ? jb.addClass("me-data-ready") : void 0)
		},
		onShareClick: function() {
			var a, b;
			return Ec.setShareContent(), b = e(this), a = b.parents(".me-receive").length ? Pc : Oc, G && Gb.onShare(), !1
		},
		onRecMoreClick: function() {
			return Ec.getReceiveList(Ec.recCurPage)
		},
		onDisMoreClick: function() {
			return Ec.getDistributeList(Ec.disCurPage)
		},
		setShareContent: function(a) {
			var b, c, d;
			return d = "f" === Ec.page ? "receive" : "distribute", b = "f" === Ec.page ? Pc : Oc, Gb.content({
				img: S,
				link: r,
				desc: vc["wx/me/" + d].desc,
				title: vc["wx/me/" + d].title,
				amount: Ec["" + d + "Amount"]
			}), c = Ec.getShareContent(a), i.fire(Pb, c)
		},
		onHashChange: function() {
			var a, b, c, d;
			return b = K.hash || "f", Ec.page = c = b.replace("#", ""), jb.removeClass("nav-f nav-s").addClass("nav-" + c), a = null != (d = p.fancys["index/share"]) ? d.elFancy : void 0, a.removeClass("me-fancy-f me-fancy-s").addClass("me-fancy-" + c)
		},
		getShareContent: function(a) {
			var b, c, d, e, f;
			return c = "rec" === a ? "receive" : "distribute", b = {
				url: r,
				content: null != (d = vc["me/" + c]) ? d.content : void 0,
				pic: O
			}, "rec" !== a && a || Y(b, {
				content_f: null != (e = vc["me/receive"]) ? e.content : void 0,
				rec_amount: Ec.receiveAmount
			}), "dis" !== a && a || Y(b, {
				content_s: null != (f = vc["me/distribute"]) ? f.content : void 0,
				dis_amount: Ec.distributeAmount
			}), b
		},
		setBoxShareContent: function(a) {
			var b, d, e, f, g;
			if (f = c("template"), b = "rec" === a ? Pc : Oc, e = Ec.getShareContent(a), b === Oc)
				return !1;
			for (d in e)
				g = e[d], e[d] = f.replace(g, e);
			return i.fire("onBoxShare", Y(e))
		}
	}, "me" === p.page && Ec.init();
	var i, Eb;
	i = c("binnng/broadcast"), Eb = c("login"), Eb.check()
}();
