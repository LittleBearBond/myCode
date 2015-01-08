/* Zepto v1.0-1-ga3cab6c - polyfill zepto detect event ajax form fx - zeptojs.com/license */


;
(function(undefined) {
	if (String.prototype.trim === undefined) // fix for iOS 3.2
		String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '')
	}

	// For iOS 3.x
	// from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
	if (Array.prototype.reduce === undefined)
		Array.prototype.reduce = function(fun) {
			if (this === void 0 || this === null) throw new TypeError()
			var t = Object(this),
				len = t.length >>> 0,
				k = 0,
				accumulator
			if (typeof fun != 'function') throw new TypeError()
			if (len == 0 && arguments.length == 1) throw new TypeError()

			if (arguments.length >= 2)
				accumulator = arguments[1]
			else
				do {
					if (k in t) {
						accumulator = t[k++]
						break
					}
					if (++k >= len) throw new TypeError()
				} while (true)

			while (k < len) {
				if (k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
				k++
			}
			return accumulator
		}

})()

var Zepto = (function() {
	var undefined, key, $, classList, emptyArray = [],
		slice = emptyArray.slice,
		filter = emptyArray.filter,
		document = window.document,
		elementDisplay = {},
		classCache = {},
		getComputedStyle = document.defaultView.getComputedStyle,
		cssNumber = {
			'column-count': 1,
			'columns': 1,
			'font-weight': 1,
			'line-height': 1,
			'opacity': 1,
			'z-index': 1,
			'zoom': 1
		},
		fragmentRE = /^\s*<(\w+|!)[^>]*>/,
		tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		rootNodeRE = /^(?:body|html)$/i,

		// special attributes that should be get/set via method calls
		methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

		adjacencyOperators = ['after', 'prepend', 'before', 'append'],
		table = document.createElement('table'),
		tableRow = document.createElement('tr'),
		containers = {
			'tr': document.createElement('tbody'),
			'tbody': table,
			'thead': table,
			'tfoot': table,
			'td': tableRow,
			'th': tableRow,
			'*': document.createElement('div')
		},
		readyRE = /complete|loaded|interactive/,
		classSelectorRE = /^\.([\w-]+)$/,
		idSelectorRE = /^#([\w-]*)$/,
		tagSelectorRE = /^[\w-]+$/,
		class2type = {},
		toString = class2type.toString,
		zepto = {},
		camelize, uniq,
		tempParent = document.createElement('div')

	zepto.matches = function(element, selector) {
		if (!element || element.nodeType !== 1) return false
		var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
			element.oMatchesSelector || element.matchesSelector
		if (matchesSelector) return matchesSelector.call(element, selector)
			// fall back to performing a selector:
		var match, parent = element.parentNode,
			temp = !parent
		if (temp)(parent = tempParent).appendChild(element)
		match = ~zepto.qsa(parent, selector).indexOf(element)
		temp && tempParent.removeChild(element)
		return match
	}

	function type(obj) {
		return obj == null ? String(obj) :
			class2type[toString.call(obj)] || "object"
	}

	function isFunction(value) {
		return type(value) == "function"
	}

	function isWindow(obj) {
		return obj != null && obj == obj.window
	}

	function isDocument(obj) {
		return obj != null && obj.nodeType == obj.DOCUMENT_NODE
	}

	function isObject(obj) {
		return type(obj) == "object"
	}

	function isPlainObject(obj) {
		return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype
	}

	function isArray(value) {
		return value instanceof Array
	}

	function likeArray(obj) {
		return typeof obj.length == 'number'
	}

	function compact(array) {
		return filter.call(array, function(item) {
			return item != null
		})
	}

	function flatten(array) {
		return array.length > 0 ? $.fn.concat.apply([], array) : array
	}
	camelize = function(str) {
		return str.replace(/-+(.)?/g, function(match, chr) {
			return chr ? chr.toUpperCase() : ''
		})
	}

	function dasherize(str) {
		return str.replace(/::/g, '/')
			.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
			.replace(/([a-z\d])([A-Z])/g, '$1_$2')
			.replace(/_/g, '-')
			.toLowerCase()
	}
	uniq = function(array) {
		return filter.call(array, function(item, idx) {
			return array.indexOf(item) == idx
		})
	}

	function classRE(name) {
		return name in classCache ?
			classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	}

	function maybeAddPx(name, value) {
		return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	}

	function defaultDisplay(nodeName) {
		var element, display
		if (!elementDisplay[nodeName]) {
			element = document.createElement(nodeName)
			document.body.appendChild(element)
			display = getComputedStyle(element, '').getPropertyValue("display")
			element.parentNode.removeChild(element)
			display == "none" && (display = "block")
			elementDisplay[nodeName] = display
		}
		return elementDisplay[nodeName]
	}

	function children(element) {
		return 'children' in element ?
			slice.call(element.children) :
			$.map(element.childNodes, function(node) {
				if (node.nodeType == 1) return node
			})
	}

	// `$.zepto.fragment` takes a html string and an optional tag name
	// to generate DOM nodes nodes from the given html string.
	// The generated DOM nodes are returned as an array.
	// This function can be overriden in plugins for example to make
	// it compatible with browsers that don't support the DOM fully.
	zepto.fragment = function(html, name, properties) {
		if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
		if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
		if (!(name in containers)) name = '*'

		var nodes, dom, container = containers[name]
		container.innerHTML = '' + html
		dom = $.each(slice.call(container.childNodes), function() {
			container.removeChild(this)
		})
		if (isPlainObject(properties)) {
			nodes = $(dom)
			$.each(properties, function(key, value) {
				if (methodAttributes.indexOf(key) > -1) nodes[key](value)
				else nodes.attr(key, value)
			})
		}
		return dom
	}

	// `$.zepto.Z` swaps out the prototype of the given `dom` array
	// of nodes with `$.fn` and thus supplying all the Zepto functions
	// to the array. Note that `__proto__` is not supported on Internet
	// Explorer. This method can be overriden in plugins.
	zepto.Z = function(dom, selector) {
		dom = dom || []
		dom.__proto__ = $.fn
		dom.selector = selector || ''
		return dom
	}

	// `$.zepto.isZ` should return `true` if the given object is a Zepto
	// collection. This method can be overriden in plugins.
	zepto.isZ = function(object) {
		return object instanceof zepto.Z
	}

	// `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	// takes a CSS selector and an optional context (and handles various
	// special cases).
	// This method can be overriden in plugins.
	zepto.init = function(selector, context) {
		// If nothing given, return an empty Zepto collection
		if (!selector) return zepto.Z()
			// If a function is given, call it when the DOM is ready
		else if (isFunction(selector)) return $(document).ready(selector)
			// If a Zepto collection is given, juts return it
		else if (zepto.isZ(selector)) return selector
		else {
			var dom
				// normalize array if an array of nodes is given
			if (isArray(selector)) dom = compact(selector)
				// Wrap DOM nodes. If a plain object is given, duplicate it.
			else if (isObject(selector))
				dom = [isPlainObject(selector) ? $.extend({}, selector) : selector], selector = null
				// If it's a html fragment, create nodes from it
			else if (fragmentRE.test(selector))
				dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
				// If there's a context, create a collection on that context first, and select
				// nodes from there
			else if (context !== undefined) return $(context).find(selector)
				// And last but no least, if it's a CSS selector, use it to select nodes.
			else dom = zepto.qsa(document, selector)
				// create a new Zepto collection from the nodes found
			return zepto.Z(dom, selector)
		}
	}

	// `$` will be the base `Zepto` object. When calling this
	// function just call `$.zepto.init, which makes the implementation
	// details of selecting nodes and creating Zepto collections
	// patchable in plugins.
	$ = function(selector, context) {
		return zepto.init(selector, context)
	}

	function extend(target, source, deep) {
		for (key in source)
			if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
				if (isPlainObject(source[key]) && !isPlainObject(target[key]))
					target[key] = {}
				if (isArray(source[key]) && !isArray(target[key]))
					target[key] = []
				extend(target[key], source[key], deep)
			} else if (source[key] !== undefined) target[key] = source[key]
	}

	// Copy all but undefined properties from one or more
	// objects to the `target` object.
	$.extend = function(target) {
		var deep, args = slice.call(arguments, 1)
		if (typeof target == 'boolean') {
			deep = target
			target = args.shift()
		}
		args.forEach(function(arg) {
			extend(target, arg, deep)
		})
		return target
	}

	// `$.zepto.qsa` is Zepto's CSS selector implementation which
	// uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	// This method can be overriden in plugins.
	zepto.qsa = function(element, selector) {
		var found
		return (isDocument(element) && idSelectorRE.test(selector)) ?
			((found = element.getElementById(RegExp.$1)) ? [found] : []) :
			(element.nodeType !== 1 && element.nodeType !== 9) ? [] :
			slice.call(
				classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
				tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
				element.querySelectorAll(selector)
			)
	}

	function filtered(nodes, selector) {
		return selector === undefined ? $(nodes) : $(nodes).filter(selector)
	}

	$.contains = function(parent, node) {
		return parent !== node && parent.contains(node)
	}

	function funcArg(context, arg, idx, payload) {
		return isFunction(arg) ? arg.call(context, idx, payload) : arg
	}

	function setAttribute(node, name, value) {
		value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	}

	// access className property while respecting SVGAnimatedString
	function className(node, value) {
		var klass = node.className,
			svg = klass && klass.baseVal !== undefined

		if (value === undefined) return svg ? klass.baseVal : klass
		svg ? (klass.baseVal = value) : (node.className = value)
	}

	// "true"  => true
	// "false" => false
	// "null"  => null
	// "42"    => 42
	// "42.5"  => 42.5
	// JSON    => parse if valid
	// String  => self
	function deserializeValue(value) {
		var num
		try {
			return value ?
				value == "true" ||
				(value == "false" ? false :
					value == "null" ? null :
					!isNaN(num = Number(value)) ? num :
					/^[\[\{]/.test(value) ? $.parseJSON(value) :
					value) : value
		} catch (e) {
			return value
		}
	}

	$.type = type
	$.isFunction = isFunction
	$.isWindow = isWindow
	$.isArray = isArray
	$.isPlainObject = isPlainObject

	$.isEmptyObject = function(obj) {
		var name
		for (name in obj) return false
		return true
	}

	$.inArray = function(elem, array, i) {
		return emptyArray.indexOf.call(array, elem, i)
	}

	$.camelCase = camelize
	$.trim = function(str) {
		return str.trim()
	}

	// plugin compatibility
	$.uuid = 0
	$.support = {}
	$.expr = {}

	$.map = function(elements, callback) {
		var value, values = [],
			i, key
		if (likeArray(elements))
			for (i = 0; i < elements.length; i++) {
				value = callback(elements[i], i)
				if (value != null) values.push(value)
			} else
			for (key in elements) {
				value = callback(elements[key], key)
				if (value != null) values.push(value)
			}
		return flatten(values)
	}

	$.each = function(elements, callback) {
		var i, key
		if (likeArray(elements)) {
			for (i = 0; i < elements.length; i++)
				if (callback.call(elements[i], i, elements[i]) === false) return elements
		} else {
			for (key in elements)
				if (callback.call(elements[key], key, elements[key]) === false) return elements
		}

		return elements
	}

	$.grep = function(elements, callback) {
		return filter.call(elements, callback)
	}

	if (window.JSON) $.parseJSON = JSON.parse

	// Populate the class2type map
	$.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase()
	})

	// Define methods that will be available on all
	// Zepto collections
	$.fn = {
		// Because a collection acts like an array
		// copy over these useful array functions.
		forEach: emptyArray.forEach,
		reduce: emptyArray.reduce,
		push: emptyArray.push,
		sort: emptyArray.sort,
		indexOf: emptyArray.indexOf,
		concat: emptyArray.concat,

		// `map` and `slice` in the jQuery API work differently
		// from their array counterparts
		map: function(fn) {
			return $($.map(this, function(el, i) {
				return fn.call(el, i, el)
			}))
		},
		slice: function() {
			return $(slice.apply(this, arguments))
		},

		ready: function(callback) {
			if (readyRE.test(document.readyState)) callback($)
			else document.addEventListener('DOMContentLoaded', function() {
				callback($)
			}, false)
			return this
		},
		get: function(idx) {
			return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
		},
		toArray: function() {
			return this.get()
		},
		size: function() {
			return this.length
		},
		remove: function() {
			return this.each(function() {
				if (this.parentNode != null)
					this.parentNode.removeChild(this)
			})
		},
		each: function(callback) {
			emptyArray.every.call(this, function(el, idx) {
				return callback.call(el, idx, el) !== false
			})
			return this
		},
		filter: function(selector) {
			if (isFunction(selector)) return this.not(this.not(selector))
			return $(filter.call(this, function(element) {
				return zepto.matches(element, selector)
			}))
		},
		add: function(selector, context) {
			return $(uniq(this.concat($(selector, context))))
		},
		is: function(selector) {
			return this.length > 0 && zepto.matches(this[0], selector)
		},
		not: function(selector) {
			var nodes = []
			if (isFunction(selector) && selector.call !== undefined)
				this.each(function(idx) {
					if (!selector.call(this, idx)) nodes.push(this)
				})
			else {
				var excludes = typeof selector == 'string' ? this.filter(selector) :
					(likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
				this.forEach(function(el) {
					if (excludes.indexOf(el) < 0) nodes.push(el)
				})
			}
			return $(nodes)
		},
		has: function(selector) {
			return this.filter(function() {
				return isObject(selector) ?
					$.contains(this, selector) :
					$(this).find(selector).size()
			})
		},
		eq: function(idx) {
			return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
		},
		first: function() {
			var el = this[0]
			return el && !isObject(el) ? el : $(el)
		},
		last: function() {
			var el = this[this.length - 1]
			return el && !isObject(el) ? el : $(el)
		},
		find: function(selector) {
			var result, $this = this
			if (typeof selector == 'object')
				result = $(selector).filter(function() {
					var node = this
					return emptyArray.some.call($this, function(parent) {
						return $.contains(parent, node)
					})
				})
			else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
			else result = this.map(function() {
				return zepto.qsa(this, selector)
			})
			return result
		},
		closest: function(selector, context) {
			var node = this[0],
				collection = false
			if (typeof selector == 'object') collection = $(selector)
			while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
				node = node !== context && !isDocument(node) && node.parentNode
			return $(node)
		},
		parents: function(selector) {
			var ancestors = [],
				nodes = this
			while (nodes.length > 0)
				nodes = $.map(nodes, function(node) {
					if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
						ancestors.push(node)
						return node
					}
				})
			return filtered(ancestors, selector)
		},
		parent: function(selector) {
			return filtered(uniq(this.pluck('parentNode')), selector)
		},
		children: function(selector) {
			return filtered(this.map(function() {
				return children(this)
			}), selector)
		},
		contents: function() {
			return this.map(function() {
				return slice.call(this.childNodes)
			})
		},
		siblings: function(selector) {
			return filtered(this.map(function(i, el) {
				return filter.call(children(el.parentNode), function(child) {
					return child !== el
				})
			}), selector)
		},
		empty: function() {
			return this.each(function() {
				this.innerHTML = ''
			})
		},
		// `pluck` is borrowed from Prototype.js
		pluck: function(property) {
			return $.map(this, function(el) {
				return el[property]
			})
		},
		show: function() {
			return this.each(function() {
				this.style.display == "none" && (this.style.display = null)
				if (getComputedStyle(this, '').getPropertyValue("display") == "none")
					this.style.display = defaultDisplay(this.nodeName)
			})
		},
		replaceWith: function(newContent) {
			return this.before(newContent).remove()
		},
		wrap: function(structure) {
			var func = isFunction(structure)
			if (this[0] && !func)
				var dom = $(structure).get(0),
					clone = dom.parentNode || this.length > 1

			return this.each(function(index) {
				$(this).wrapAll(
					func ? structure.call(this, index) :
					clone ? dom.cloneNode(true) : dom
				)
			})
		},
		wrapAll: function(structure) {
			if (this[0]) {
				$(this[0]).before(structure = $(structure))
				var children
					// drill down to the inmost element
				while ((children = structure.children()).length) structure = children.first()
				$(structure).append(this)
			}
			return this
		},
		wrapInner: function(structure) {
			var func = isFunction(structure)
			return this.each(function(index) {
				var self = $(this),
					contents = self.contents(),
					dom = func ? structure.call(this, index) : structure
				contents.length ? contents.wrapAll(dom) : self.append(dom)
			})
		},
		unwrap: function() {
			this.parent().each(function() {
				$(this).replaceWith($(this).children())
			})
			return this
		},
		clone: function() {
			return this.map(function() {
				return this.cloneNode(true)
			})
		},
		hide: function() {
			return this.css("display", "none")
		},
		toggle: function(setting) {
			return this.each(function() {
				var el = $(this);
				(setting === undefined ? el.css("display") == "none" : setting) ? el.show(): el.hide()
			})
		},
		prev: function(selector) {
			return $(this.pluck('previousElementSibling')).filter(selector || '*')
		},
		next: function(selector) {
			return $(this.pluck('nextElementSibling')).filter(selector || '*')
		},
		html: function(html) {
			return html === undefined ?
				(this.length > 0 ? this[0].innerHTML : null) :
				this.each(function(idx) {
					var originHtml = this.innerHTML
					$(this).empty().append(funcArg(this, html, idx, originHtml))
				})
		},
		text: function(text) {
			return text === undefined ?
				(this.length > 0 ? this[0].textContent : null) :
				this.each(function() {
					this.textContent = text
				})
		},
		attr: function(name, value) {
			var result
			return (typeof name == 'string' && value === undefined) ?
				(this.length == 0 || this[0].nodeType !== 1 ? undefined :
					(name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
					(!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
				) :
				this.each(function(idx) {
					if (this.nodeType !== 1) return
					if (isObject(name))
						for (key in name) setAttribute(this, key, name[key])
					else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
				})
		},
		removeAttr: function(name) {
			return this.each(function() {
				this.nodeType === 1 && setAttribute(this, name)
			})
		},
		prop: function(name, value) {
			return (value === undefined) ?
				(this[0] && this[0][name]) :
				this.each(function(idx) {
					this[name] = funcArg(this, value, idx, this[name])
				})
		},
		data: function(name, value) {
			var data = this.attr('data-' + dasherize(name), value)
			return data !== null ? deserializeValue(data) : undefined
		},
		val: function(value) {
			return (value === undefined) ?
				(this[0] && (this[0].multiple ?
					$(this[0]).find('option').filter(function(o) {
						return this.selected
					}).pluck('value') :
					this[0].value)) :
				this.each(function(idx) {
					this.value = funcArg(this, value, idx, this.value)
				})
		},
		offset: function(coordinates) {
			if (coordinates) return this.each(function(index) {
				var $this = $(this),
					coords = funcArg(this, coordinates, index, $this.offset()),
					parentOffset = $this.offsetParent().offset(),
					props = {
						top: coords.top - parentOffset.top,
						left: coords.left - parentOffset.left
					}

				if ($this.css('position') == 'static') props['position'] = 'relative'
				$this.css(props)
			})
			if (this.length == 0) return null
			var obj = this[0].getBoundingClientRect()
			return {
				left: obj.left + window.pageXOffset,
				top: obj.top + window.pageYOffset,
				width: Math.round(obj.width),
				height: Math.round(obj.height)
			}
		},
		css: function(property, value) {
			if (arguments.length < 2 && typeof property == 'string')
				return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))

			var css = ''
			if (type(property) == 'string') {
				if (!value && value !== 0)
					this.each(function() {
						this.style.removeProperty(dasherize(property))
					})
				else
					css = dasherize(property) + ":" + maybeAddPx(property, value)
			} else {
				for (key in property)
					if (!property[key] && property[key] !== 0)
						this.each(function() {
							this.style.removeProperty(dasherize(key))
						})
					else
						css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
			}

			return this.each(function() {
				this.style.cssText += ';' + css
			})
		},
		index: function(element) {
			return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
		},
		hasClass: function(name) {
			return emptyArray.some.call(this, function(el) {
				return this.test(className(el))
			}, classRE(name))
		},
		addClass: function(name) {
			return this.each(function(idx) {
				classList = []
				var cls = className(this),
					newName = funcArg(this, name, idx, cls)
				newName.split(/\s+/g).forEach(function(klass) {
					if (!$(this).hasClass(klass)) classList.push(klass)
				}, this)
				classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
			})
		},
		removeClass: function(name) {
			return this.each(function(idx) {
				if (name === undefined) return className(this, '')
				classList = className(this)
				funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
					classList = classList.replace(classRE(klass), " ")
				})
				className(this, classList.trim())
			})
		},
		toggleClass: function(name, when) {
			return this.each(function(idx) {
				var $this = $(this),
					names = funcArg(this, name, idx, className(this))
				names.split(/\s+/g).forEach(function(klass) {
					(when === undefined ? !$this.hasClass(klass) : when) ?
					$this.addClass(klass): $this.removeClass(klass)
				})
			})
		},
		scrollTop: function() {
			if (!this.length) return
			return ('scrollTop' in this[0]) ? this[0].scrollTop : this[0].scrollY
		},
		position: function() {
			if (!this.length) return

			var elem = this[0],
				// Get *real* offsetParent
				offsetParent = this.offsetParent(),
				// Get correct offsets
				offset = this.offset(),
				parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {
					top: 0,
					left: 0
				} : offsetParent.offset()

			// Subtract element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft
			// are the same in Safari causing offset.left to incorrectly be 0
			offset.top -= parseFloat($(elem).css('margin-top')) || 0
			offset.left -= parseFloat($(elem).css('margin-left')) || 0

			// Add offsetParent borders
			parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0
			parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0

			// Subtract the two offsets
			return {
				top: offset.top - parentOffset.top,
				left: offset.left - parentOffset.left
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var parent = this.offsetParent || document.body
				while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
					parent = parent.offsetParent
				return parent
			})
		}
	}

	// for now
	$.fn.detach = $.fn.remove

	// Generate the `width` and `height` functions
	;
	['width', 'height'].forEach(function(dimension) {
		$.fn[dimension] = function(value) {
			var offset, el = this[0],
				Dimension = dimension.replace(/./, function(m) {
					return m[0].toUpperCase()
				})
			if (value === undefined) return isWindow(el) ? el['inner' + Dimension] :
				isDocument(el) ? el.documentElement['offset' + Dimension] :
				(offset = this.offset()) && offset[dimension]
			else return this.each(function(idx) {
				el = $(this)
				el.css(dimension, funcArg(this, value, idx, el[dimension]()))
			})
		}
	})

	function traverseNode(node, fun) {
		fun(node)
		for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
	}

	// Generate the `after`, `prepend`, `before`, `append`,
	// `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	adjacencyOperators.forEach(function(operator, operatorIndex) {
		var inside = operatorIndex % 2 //=> prepend, append

		$.fn[operator] = function() {
			// arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
			var argType, nodes = $.map(arguments, function(arg) {
					argType = type(arg)
					return argType == "object" || argType == "array" || arg == null ?
						arg : zepto.fragment(arg)
				}),
				parent, copyByClone = this.length > 1
			if (nodes.length < 1) return this

			return this.each(function(_, target) {
				parent = inside ? target : target.parentNode

				// convert all methods to a "before" operation
				target = operatorIndex == 0 ? target.nextSibling :
					operatorIndex == 1 ? target.firstChild :
					operatorIndex == 2 ? target :
					null

				nodes.forEach(function(node) {
					if (copyByClone) node = node.cloneNode(true)
					else if (!parent) return $(node).remove()

					traverseNode(parent.insertBefore(node, target), function(el) {
						if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
							(!el.type || el.type === 'text/javascript') && !el.src)
							window['eval'].call(window, el.innerHTML)
					})
				})
			})
		}

		// after    => insertAfter
		// prepend  => prependTo
		// before   => insertBefore
		// append   => appendTo
		$.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function(html) {
			$(html)[operator](this)
			return this
		}
	})

	zepto.Z.prototype = $.fn

	// Export internal API functions in the `$.zepto` namespace
	zepto.uniq = uniq
	zepto.deserializeValue = deserializeValue
	$.zepto = zepto

	return $
})()

window.Zepto = Zepto; '$' in window || (window.$ = Zepto)

;
(function($) {
	function detect(ua) {
		var os = this.os = {},
			browser = this.browser = {},
			webkit = ua.match(/WebKit\/([\d.]+)/),
			android = ua.match(/(Android)\s+([\d.]+)/),
			ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
			iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
			webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
			touchpad = webos && ua.match(/TouchPad/),
			kindle = ua.match(/Kindle\/([\d.]+)/),
			silk = ua.match(/Silk\/([\d._]+)/),
			blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
			bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
			rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
			playbook = ua.match(/PlayBook/),
			chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
			firefox = ua.match(/Firefox\/([\d.]+)/)

		// Todo: clean this up with a better OS/browser seperation:
		// - discern (more) between multiple browsers on android
		// - decide if kindle fire in silk mode is android or not
		// - Firefox on Android doesn't specify the Android version
		// - possibly devide in os, device and browser hashes

		if (browser.webkit = !!webkit) browser.version = webkit[1]

		if (android) os.android = true, os.version = android[2]
		if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
		if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
		if (webos) os.webos = true, os.version = webos[2]
		if (touchpad) os.touchpad = true
		if (blackberry) os.blackberry = true, os.version = blackberry[2]
		if (bb10) os.bb10 = true, os.version = bb10[2]
		if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
		if (playbook) browser.playbook = true
		if (kindle) os.kindle = true, os.version = kindle[1]
		if (silk) browser.silk = true, browser.version = silk[1]
		if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
		if (chrome) browser.chrome = true, browser.version = chrome[1]
		if (firefox) browser.firefox = true, browser.version = firefox[1]

		os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) || (firefox && ua.match(/Tablet/)))
		os.phone = !!(!os.tablet && (android || iphone || webos || blackberry || bb10 ||
			(chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) || (firefox && ua.match(/Mobile/))))
	}

	detect.call($, navigator.userAgent)
		// make available to unit tests
	$.__detect = detect

})(Zepto)

;
(function($) {
	var $$ = $.zepto.qsa,
		handlers = {},
		_zid = 1,
		specialEvents = {},
		hover = {
			mouseenter: 'mouseover',
			mouseleave: 'mouseout'
		}

	specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

	function zid(element) {
		return element._zid || (element._zid = _zid++)
	}

	function findHandlers(element, event, fn, selector) {
		event = parse(event)
		if (event.ns) var matcher = matcherFor(event.ns)
		return (handlers[zid(element)] || []).filter(function(handler) {
			return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector)
		})
	}

	function parse(event) {
		var parts = ('' + event).split('.')
		return {
			e: parts[0],
			ns: parts.slice(1).sort().join(' ')
		}
	}

	function matcherFor(ns) {
		return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	}

	function eachEvent(events, fn, iterator) {
		if ($.type(events) != "string") $.each(events, iterator)
		else events.split(/\s/).forEach(function(type) {
			iterator(type, fn)
		})
	}

	function eventCapture(handler, captureSetting) {
		return handler.del &&
			(handler.e == 'focus' || handler.e == 'blur') ||
			!!captureSetting
	}

	function realEvent(type) {
		return hover[type] || type
	}

	function add(element, events, fn, selector, getDelegate, capture) {
		var id = zid(element),
			set = (handlers[id] || (handlers[id] = []))
		eachEvent(events, fn, function(event, fn) {
			var handler = parse(event)
			handler.fn = fn
			handler.sel = selector
				// emulate mouseenter, mouseleave
			if (handler.e in hover) fn = function(e) {
				var related = e.relatedTarget
				if (!related || (related !== this && !$.contains(this, related)))
					return handler.fn.apply(this, arguments)
			}
			handler.del = getDelegate && getDelegate(fn, event)
			var callback = handler.del || fn
			handler.proxy = function(e) {
				var result = callback.apply(element, [e].concat(e.data))
				if (result === false) e.preventDefault(), e.stopPropagation()
				return result
			}
			handler.i = set.length
			set.push(handler)
			element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
		})
	}

	function remove(element, events, fn, selector, capture) {
		var id = zid(element)
		eachEvent(events || '', fn, function(event, fn) {
			findHandlers(element, event, fn, selector).forEach(function(handler) {
				delete handlers[id][handler.i]
				element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
			})
		})
	}

	$.event = {
		add: add,
		remove: remove
	}

	$.proxy = function(fn, context) {
		if ($.isFunction(fn)) {
			var proxyFn = function() {
				return fn.apply(context, arguments)
			}
			proxyFn._zid = zid(fn)
			return proxyFn
		} else if (typeof context == 'string') {
			return $.proxy(fn[context], fn)
		} else {
			throw new TypeError("expected function")
		}
	}

	$.fn.bind = function(event, callback) {
		return this.each(function() {
			add(this, event, callback)
		})
	}
	$.fn.unbind = function(event, callback) {
		return this.each(function() {
			remove(this, event, callback)
		})
	}
	$.fn.one = function(event, callback) {
		return this.each(function(i, element) {
			add(this, event, callback, null, function(fn, type) {
				return function() {
					var result = fn.apply(element, arguments)
					remove(element, type, fn)
					return result
				}
			})
		})
	}

	var returnTrue = function() {
			return true
		},
		returnFalse = function() {
			return false
		},
		ignoreProperties = /^([A-Z]|layer[XY]$)/,
		eventMethods = {
			preventDefault: 'isDefaultPrevented',
			stopImmediatePropagation: 'isImmediatePropagationStopped',
			stopPropagation: 'isPropagationStopped'
		}

	function createProxy(event) {
		var key, proxy = {
			originalEvent: event
		}
		for (key in event)
			if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

		$.each(eventMethods, function(name, predicate) {
			proxy[name] = function() {
				this[predicate] = returnTrue
				return event[name].apply(event, arguments)
			}
			proxy[predicate] = returnFalse
		})
		return proxy
	}

	// emulates the 'defaultPrevented' property for browsers that have none
	function fix(event) {
		if (!('defaultPrevented' in event)) {
			event.defaultPrevented = false
			var prevent = event.preventDefault
			event.preventDefault = function() {
				this.defaultPrevented = true
				prevent.call(this)
			}
		}
	}

	$.fn.delegate = function(selector, event, callback) {
		return this.each(function(i, element) {
			add(element, event, callback, selector, function(fn) {
				return function(e) {
					var evt, match = $(e.target).closest(selector, element).get(0)
					if (match) {
						evt = $.extend(createProxy(e), {
							currentTarget: match,
							liveFired: element
						})
						return fn.apply(match, [evt].concat([].slice.call(arguments, 1)))
					}
				}
			})
		})
	}
	$.fn.undelegate = function(selector, event, callback) {
		return this.each(function() {
			remove(this, event, callback, selector)
		})
	}

	$.fn.live = function(event, callback) {
		$(document.body).delegate(this.selector, event, callback)
		return this
	}
	$.fn.die = function(event, callback) {
		$(document.body).undelegate(this.selector, event, callback)
		return this
	}

	$.fn.on = function(event, selector, callback) {
		return !selector || $.isFunction(selector) ?
			this.bind(event, selector || callback) : this.delegate(selector, event, callback)
	}
	$.fn.off = function(event, selector, callback) {
		return !selector || $.isFunction(selector) ?
			this.unbind(event, selector || callback) : this.undelegate(selector, event, callback)
	}

	$.fn.trigger = function(event, data) {
		if (typeof event == 'string' || $.isPlainObject(event)) event = $.Event(event)
		fix(event)
		event.data = data
		return this.each(function() {
			// items in the collection might not be DOM elements
			// (todo: possibly support events on plain old objects)
			if ('dispatchEvent' in this) this.dispatchEvent(event)
		})
	}

	// triggers event handlers on current element just as if an event occurred,
	// doesn't trigger an actual event, doesn't bubble
	$.fn.triggerHandler = function(event, data) {
		var e, result
		this.each(function(i, element) {
			e = createProxy(typeof event == 'string' ? $.Event(event) : event)
			e.data = data
			e.target = element
			$.each(findHandlers(element, event.type || event), function(i, handler) {
				result = handler.proxy(e)
				if (e.isImmediatePropagationStopped()) return false
			})
		})
		return result
	}

	// shortcut methods for `.bind(event, fn)` for each event type
	;
	('focusin focusout load resize scroll unload click dblclick ' +
		'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
		'change select keydown keypress keyup error').split(' ').forEach(function(event) {
		$.fn[event] = function(callback) {
			return callback ?
				this.bind(event, callback) :
				this.trigger(event)
		}
	})

	;
	['focus', 'blur'].forEach(function(name) {
		$.fn[name] = function(callback) {
			if (callback) this.bind(name, callback)
			else this.each(function() {
				try {
					this[name]()
				} catch (e) {}
			})
			return this
		}
	})

	$.Event = function(type, props) {
		if (typeof type != 'string') props = type, type = props.type
		var event = document.createEvent(specialEvents[type] || 'Events'),
			bubbles = true
		if (props)
			for (var name in props)(name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
		event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null)
		event.isDefaultPrevented = function() {
			return this.defaultPrevented
		}
		return event
	}

})(Zepto)

;
(function($) {
	var jsonpID = 0,
		document = window.document,
		key,
		name,
		rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		scriptTypeRE = /^(?:text|application)\/javascript/i,
		xmlTypeRE = /^(?:text|application)\/xml/i,
		jsonType = 'application/json',
		htmlType = 'text/html',
		blankRE = /^\s*$/

	// trigger a custom event and return false if it was cancelled
	function triggerAndReturn(context, eventName, data) {
		var event = $.Event(eventName)
		$(context).trigger(event, data)
		return !event.defaultPrevented
	}

	// trigger an Ajax "global" event
	function triggerGlobal(settings, context, eventName, data) {
		if (settings.global) return triggerAndReturn(context || document, eventName, data)
	}

	// Number of active Ajax requests
	$.active = 0

	function ajaxStart(settings) {
		if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
	}

	function ajaxStop(settings) {
		if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
	}

	// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	function ajaxBeforeSend(xhr, settings) {
		var context = settings.context
		if (settings.beforeSend.call(context, xhr, settings) === false ||
			triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
			return false

		triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
	}

	function ajaxSuccess(data, xhr, settings) {
			var context = settings.context,
				status = 'success'
			settings.success.call(context, data, status, xhr)
			triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
			ajaxComplete(status, xhr, settings)
		}
		// type: "timeout", "error", "abort", "parsererror"
	function ajaxError(error, type, xhr, settings) {
			var context = settings.context
			settings.error.call(context, xhr, type, error)
			triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error])
			ajaxComplete(type, xhr, settings)
		}
		// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	function ajaxComplete(status, xhr, settings) {
		var context = settings.context
		settings.complete.call(context, xhr, status, settings); // 给回调添加了第三个参数，ikuner@131216
		triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
		ajaxStop(settings)
	}

	// Empty function, used as default callback
	function empty() {}

	$.ajaxJSONP = function(options) {
		if (!('type' in options)) return $.ajax(options)

		var callbackName = 'jsonp' + (++jsonpID),
			script = document.createElement('script'),
			cleanup = function() {
				clearTimeout(abortTimeout)
				$(script).remove()
				delete window[callbackName]
			},
			abort = function(type) {
				cleanup()
					// In case of manual abort or timeout, keep an empty function as callback
					// so that the SCRIPT tag that eventually loads won't result in an error.
				if (!type || type == 'timeout') window[callbackName] = empty
				ajaxError(null, type || 'abort', xhr, options)
			},
			xhr = {
				abort: abort
			},
			abortTimeout

		if (ajaxBeforeSend(xhr, options) === false) {
			abort('abort')
			return false
		}

		window[callbackName] = function(data) {
			cleanup()
			ajaxSuccess(data, xhr, options)
		}

		script.onerror = function() {
			abort('error')
		}

		script.src = options.url.replace(/=\?/, '=' + callbackName)
		$('head').append(script)

		if (options.timeout > 0) abortTimeout = setTimeout(function() {
			abort('timeout')
		}, options.timeout)

		return xhr
	}

	$.ajaxSettings = {
		// Default type of request
		type: 'GET',
		// Callback that is executed before request
		beforeSend: empty,
		// Callback that is executed if the request succeeds
		success: empty,
		// Callback that is executed the the server drops error
		error: empty,
		// Callback that is executed on request complete (both: error and success)
		complete: empty,
		// The context for the callbacks
		context: null,
		// Whether to trigger "global" Ajax events
		global: true,
		// Transport
		xhr: function() {
			return new window.XMLHttpRequest()
		},
		// MIME types mapping
		accepts: {
			script: 'text/javascript, application/javascript',
			json: jsonType,
			xml: 'application/xml, text/xml',
			html: htmlType,
			text: 'text/plain'
		},
		// Whether the request is to another domain
		crossDomain: false,
		// Default timeout
		timeout: 0,
		// Whether data should be serialized to string
		processData: true,
		// Whether the browser should be allowed to cache GET responses
		cache: true,
	}

	function mimeToDataType(mime) {
		if (mime) mime = mime.split(';', 2)[0]
		return mime && (mime == htmlType ? 'html' :
			mime == jsonType ? 'json' :
			scriptTypeRE.test(mime) ? 'script' :
			xmlTypeRE.test(mime) && 'xml') || 'text'
	}

	function appendQuery(url, query) {
		return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	}

	// serialize payload and append it to the URL for GET requests
	function serializeData(options) {
		if (options.processData && options.data && $.type(options.data) != "string")
			options.data = $.param(options.data, options.traditional)
		if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
			options.url = appendQuery(options.url, options.data)
	}

	$.ajax = function(options) {
		var settings = $.extend({}, options || {})
		for (key in $.ajaxSettings)
			if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

		ajaxStart(settings)

		if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
			RegExp.$2 != window.location.host

		if (!settings.url) settings.url = window.location.toString()
		serializeData(settings)
		if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now())

		var dataType = settings.dataType,
			hasPlaceholder = /=\?/.test(settings.url)
		if (dataType == 'jsonp' || hasPlaceholder) {
			if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
			return $.ajaxJSONP(settings)
		}

		var mime = settings.accepts[dataType],
			baseHeaders = {},
			protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
			xhr = settings.xhr(),
			abortTimeout

		if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest'
		if (mime) {
			baseHeaders['Accept'] = mime
			if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
			xhr.overrideMimeType && xhr.overrideMimeType(mime)
		}
		if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
			baseHeaders['Content-Type'] = (settings.contentType || 'application/x-www-form-urlencoded')
		settings.headers = $.extend(baseHeaders, settings.headers || {})

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				xhr.onreadystatechange = empty;
				clearTimeout(abortTimeout)
				var result, error = false
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
					dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
					result = xhr.responseText

					try {
						// http://perfectionkills.com/global-eval-what-are-the-options/
						if (dataType == 'script')(1, eval)(result)
						else if (dataType == 'xml') result = xhr.responseXML
						else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
					} catch (e) {
						error = e
					}

					if (error) ajaxError(error, 'parsererror', xhr, settings)
					else ajaxSuccess(result, xhr, settings)
				} else {
					ajaxError(null, xhr.status ? 'error' : 'abort', xhr, settings)
				}
			}
		}

		var async = 'async' in settings ? settings.async : true
		xhr.open(settings.type, settings.url, async)

		for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])

		if (ajaxBeforeSend(xhr, settings) === false) {
			xhr.abort()
			return false
		}

		if (settings.timeout > 0) abortTimeout = setTimeout(function() {
			xhr.onreadystatechange = empty
			xhr.abort()
			ajaxError(null, 'timeout', xhr, settings)
		}, settings.timeout)

		// avoid sending empty string (#319)
		xhr.send(settings.data ? settings.data : null)
		return xhr
	}

	// handle optional data/success arguments
	function parseArguments(url, data, success, dataType) {
		var hasData = !$.isFunction(data)
		return {
			url: url,
			data: hasData ? data : undefined,
			success: !hasData ? data : $.isFunction(success) ? success : undefined,
			dataType: hasData ? dataType || success : success
		}
	}

	$.get = function(url, data, success, dataType) {
		return $.ajax(parseArguments.apply(null, arguments))
	}

	$.post = function(url, data, success, dataType) {
		var options = parseArguments.apply(null, arguments)
		options.type = 'POST'
		return $.ajax(options)
	}

	$.getJSON = function(url, data, success) {
		var options = parseArguments.apply(null, arguments)
		options.dataType = 'json'
		return $.ajax(options)
	}

	$.fn.load = function(url, data, success) {
		if (!this.length) return this
		var self = this,
			parts = url.split(/\s/),
			selector,
			options = parseArguments(url, data, success),
			callback = options.success
		if (parts.length > 1) options.url = parts[0], selector = parts[1]
		options.success = function(response) {
			self.html(selector ?
				$('<div>').html(response.replace(rscript, "")).find(selector) : response)
			callback && callback.apply(self, arguments)
		}
		$.ajax(options)
		return this
	}

	var escape = encodeURIComponent

	function serialize(params, obj, traditional, scope) {
		var type, array = $.isArray(obj)
		$.each(obj, function(key, value) {
			type = $.type(value)
			if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
				// handle data in serializeArray() format
			if (!scope && array) params.add(value.name, value.value)
				// recurse into nested objects
			else if (type == "array" || (!traditional && type == "object"))
				serialize(params, value, traditional, key)
			else params.add(key, value)
		})
	}

	$.param = function(obj, traditional) {
		var params = []
		params.add = function(k, v) {
			this.push(escape(k) + '=' + escape(v))
		}
		serialize(params, obj, traditional)
		return params.join('&').replace(/%20/g, '+')
	}
})(Zepto)

;
(function($) {
	$.fn.serializeArray = function() {
		var result = [],
			el
		$(Array.prototype.slice.call(this.get(0).elements)).each(function() {
			el = $(this)
			var type = el.attr('type')
			if (this.nodeName.toLowerCase() != 'fieldset' &&
				!this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
				((type != 'radio' && type != 'checkbox') || this.checked))
				result.push({
					name: el.attr('name'),
					value: el.val()
				})
		})
		return result
	}

	$.fn.serialize = function() {
		var result = []
		this.serializeArray().forEach(function(elm) {
			result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
		})
		return result.join('&')
	}

	$.fn.submit = function(callback) {
		if (callback) this.bind('submit', callback)
		else if (this.length) {
			var event = $.Event('submit')
			this.eq(0).trigger(event)
			if (!event.defaultPrevented) this.get(0).submit()
		}
		return this
	}

})(Zepto)

;
(function($, undefined) {
	var prefix = '',
		eventPrefix, endEventName, endAnimationName,
		vendors = {
			Webkit: 'webkit',
			Moz: '',
			O: 'o',
			ms: 'MS'
		},
		document = window.document,
		testEl = document.createElement('div'),
		supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
		transform,
		transitionProperty, transitionDuration, transitionTiming,
		animationName, animationDuration, animationTiming,
		cssReset = {}

	function dasherize(str) {
		return downcase(str.replace(/([a-z])([A-Z])/, '$1-$2'))
	}

	function downcase(str) {
		return str.toLowerCase()
	}

	function normalizeEvent(name) {
		return eventPrefix ? eventPrefix + name : downcase(name)
	}

	$.each(vendors, function(vendor, event) {
		if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
			prefix = '-' + downcase(vendor) + '-'
			eventPrefix = event
			return false
		}
	})

	transform = prefix + 'transform'
	cssReset[transitionProperty = prefix + 'transition-property'] =
		cssReset[transitionDuration = prefix + 'transition-duration'] =
		cssReset[transitionTiming = prefix + 'transition-timing-function'] =
		cssReset[animationName = prefix + 'animation-name'] =
		cssReset[animationDuration = prefix + 'animation-duration'] =
		cssReset[animationTiming = prefix + 'animation-timing-function'] = ''

	$.fx = {
		off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
		speeds: {
			_default: 400,
			fast: 200,
			slow: 600
		},
		cssPrefix: prefix,
		transitionEnd: normalizeEvent('TransitionEnd'),
		animationEnd: normalizeEvent('AnimationEnd')
	}

	$.fn.animate = function(properties, duration, ease, callback) {
		if ($.isPlainObject(duration))
			ease = duration.easing, callback = duration.complete, duration = duration.duration
		if (duration) duration = (typeof duration == 'number' ? duration :
			($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
		return this.anim(properties, duration, ease, callback)
	}

	$.fn.anim = function(properties, duration, ease, callback) {
		var key, cssValues = {},
			cssProperties, transforms = '',
			that = this,
			wrappedCallback, endEvent = $.fx.transitionEnd

		if (duration === undefined) duration = 0.4
		if ($.fx.off) duration = 0

		if (typeof properties == 'string') {
			// keyframe animation
			cssValues[animationName] = properties
			cssValues[animationDuration] = duration + 's'
			cssValues[animationTiming] = (ease || 'linear')
			endEvent = $.fx.animationEnd
		} else {
			cssProperties = []
				// CSS transitions
			for (key in properties)
				if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
				else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

			if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
			if (duration > 0 && typeof properties === 'object') {
				cssValues[transitionProperty] = cssProperties.join(', ')
				cssValues[transitionDuration] = duration + 's'
				cssValues[transitionTiming] = (ease || 'linear')
			}
		}

		wrappedCallback = function(event) {
			if (typeof event !== 'undefined') {
				if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
				$(event.target).unbind(endEvent, wrappedCallback)
			}
			$(this).css(cssReset)
			callback && callback.call(this)
		}
		if (duration > 0) this.bind(endEvent, wrappedCallback)

		// trigger page reflow so new elements can animate
		this.size() && this.get(0).clientLeft

		this.css(cssValues)

		if (duration <= 0) setTimeout(function() {
			that.each(function() {
				wrappedCallback.call(this)
			})
		}, 0)

		return this
	}

	testEl = null
})(Zepto)
/*
根据$.cookie仿造一个zepto.cookie
主要功能就是读写cookie

2013 04 15
by jn
*/
;
(function($) {
	$.cookie = function(name, value, options) {
		if (typeof value != 'undefined') { // name and value given, set cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
			}
			// CAUTION: Needed to parenthesize options.path and options.domain
			// in the following expressions, otherwise they evaluate to undefined
			// in the packed version for some reason...
			var path = options.path ? '; path=' + (options.path) : '';
			var domain = options.domain ? '; domain=' + (options.domain) : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else { // only name given, get cookie
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = $.trim(cookies[i]);
					// Does this cookie string begin with the name we want?
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
	}
})(Zepto);
(function(exports) {
	exports['dj'] = exports['dj'] || {};
	var data = {},
		shareSuccess = 'i-weixin-share-success-callback';
	exports['dj']['setPageData'] = function(obj) {
		if (obj && typeof obj[shareSuccess] === 'function') {
			if (!data[shareSuccess]) {
				data[shareSuccess] = [];
				data[shareSuccess].push(obj[shareSuccess]);
			} else {
				data[shareSuccess].push(obj[shareSuccess]);
			}
		} else {
			data = $.extend({}, data, obj);
		}
	};
	exports['dj']['getPageData'] = function(attr) {
		return attr ? data && data[attr] : data;
	};
	//提示弹层
	exports['dj']['iAlert'] = function(msg, hiddenTime) {
		var msgBox = createLayer(msg);
		var pMsgbox = $('#J_dj_tip_layer');
		var milliseconds = hiddenTime * 1000 || 3000; //弹层隐藏的时间 单位：秒 默认2s
		if (pMsgbox[0]) {
			pMsgbox.remove();
		}
		$('body').append(msgBox);
		var ele = $(msgBox).find('span');
		resertLayer(ele);
		alertHide(msgBox, milliseconds);
	};
	var alertTimer = null;
	//创建弹层
	var createLayer = function(msg) {
		var msgBox = document.createElement('div');
		msgBox.id = 'J_dj_tip_layer';
		msgBox.className = 'dj-res-tip-layer';
		msgBox.innerHTML = '<p><span>' + msg + '</span></p>';
		return msgBox;
	};
	// 重设弹层位置
	var resertLayer = function(ele) {
		var $width = '-' + ele.width() / 2 + 'px';
		var $height = '-' + ele.height() / 2 + 'px';
		ele.css({
			'position': 'absolute',
			'margin-top': $height,
			'margin-left': $width,
			'visibility': 'visible' // display为none取不到高宽
		});

	};
	// 弹层自动关闭
	var alertHide = function(dom, milliseconds) {
		clearTimeout(alertTimer);
		alertTimer = setTimeout(function() {
			$(dom).remove();
		}, milliseconds);
	};
	// 添加姓名验证
	$(function() {
		if (!$.validate) return;
		$.validate.fun.name = function() {
			var tool = $.validate;
			var $this = $(this);
			var value = tool.trim($this.val());
			var isChinese = /^([\u4e00-\u9fa5])+$/.test(value);
			var isEnglist = /^([a-zA-Z\s])+$/.test(value);

			function setError(str) {
				$this.attr('data-regerr', str);
			}
			if (isChinese) {
				if (!/^.{2,5}$/.test(value)) {
					setError('请填写真实姓名(2-5汉字)');
					return false;
				} else {
					return true;
				}
			}
			if (isEnglist) {
				if (!/^.{2,15}$/.test(value)) {
					setError('请填写真实姓名(2-15英文)');
					return false;
				} else {
					return true;
				}
			}
			setError('请填写真实姓名(2-5汉字)');
			return false;
		};
	});

	// share蒙板
	$(function() {
		/* by fei.yang */
		var view = {};
		var viewInit = function() {
			view.shareBtn = $('.J_pageShareLayer'); // 引导分享的按钮
			view.body = $('body');
		};
		// 分享弹层的html
		var shareLayerHtml = function(hasPacket) {
			var ph = '<p class="dj-item-words t-step">3、坐等收红包啦！</p>';
			var layerHtml = '<span class="dj-guide-mark"></span>\
    <div class="dj-words-guide">\
      <p class="dj-item-words f-step">1、点击右上角按钮</p>\
      <p class="dj-item-words s-step">2、点击发送给好友<br>或发送到微信群</p>%packetHTML%\
    </div>';
			if (hasPacket) ph = '';
			layerHtml = layerHtml.replace('%packetHTML%', ph);
			return layerHtml;
		};
		// 将弹层的容器先添加到页面中
		var addLayerBox = function() {
			viewInit();
			if (view.shareBtn[0]) {
				view.mask = $('<div class="dj-share-guide"></div>');
				LayerBindEvent();
			} else {
				return;
			}
		};
		// 弹层插入页面中
		var showLayer = function(layerInner) {
			view.mask.empty().append(layerInner);
			view.body.append(view.mask);
			view.mask.show();
		};
		// 弹层上的时间绑定
		var LayerBindEvent = function() {
			view.shareBtn.on('click', function(e) {
				e.preventDefault();
				var self = $(this);
				var hasPacket = self.data('packet') == 'no-packet' ? true : false;
				var shareLayer = shareLayerHtml(hasPacket);
				showLayer(shareLayer);
			});
			view.mask.on('touchmove', function(e) {
				e.preventDefault();
			}).on('click', function() {
				view.mask.remove();
			});
			exports['dj']['setPageData']({
				'i-weixin-share-success-callback': function() {
					view.mask.remove();
				}
			});
		};
		addLayerBox(); // 初始化弹层逻辑
		function useHack2xiaomi() {
			var ua = navigator.userAgent.toLocaleLowerCase();
			// 小米中的微信浏览器或者原生浏览器
			var isXiaomi = /\bmi\b/.test(ua) && (ua.indexOf('xiaomi') != -1 || ua.indexOf('micromessenger') != -1);
			return isXiaomi;
		}

		// 小米 fixed的宽度横屏后不能自适应
		if (useHack2xiaomi()) {
			$(window).on('resize', function() {
				$('.i-share-mask').css('width', '99.5%');
				setTimeout(function() {
					$('.i-share-mask').css('width', '100%');
				}, 0);
			});
		}
	});

	// 微信分享
	var Weixin = {
		init: function() {
			this.getAppId();
			document.addEventListener('WeixinJSBridgeReady', function() {
				//隐藏微信底部导航栏
				if (document.getElementsByTagName('html')[0].getAttribute('nobar') === 'true') {
					WeixinJSBridge.call('hideToolbar');
				} else {
					WeixinJSBridge.call('showToolbar');
				}
				//隐藏微信右上角按钮
				if ($('#hideMenu')[0]) {
					WeixinJSBridge.call('hideOptionMenu');
				} else {
					WeixinJSBridge.call('showOptionMenu');
				}
				var weixinJSBridge = WeixinJSBridge;
				// 发送给好友
				weixinJSBridge['on']('menu:share:appmessage', Weixin.shareFriend);
				// 分享到朋友圈
				weixinJSBridge['on']('menu:share:timeline', Weixin.shareTimeline);
				// 分享到微博
				weixinJSBridge['on']('menu:share:weibo', Weixin.shareWeibo);
				// 邮件分享
				weixinJSBridge['on']('menu:share:email', Weixin.shareEmail);
				var newTitle = $('meta[property="og:title"]').attr('content');
				newTitle && (document.title = newTitle); //document.title ||
				Weixin.setImgToBody();
			});
		},
		setImgToBody: function() {
			var d = Weixin.getResource(),
				img, appendImgToBody = function() {
					alert(this.width+'		'+this.heig)
					document.body.insertAdjacentHTML('afterbegin', ' <div style="display:none"> <img src="' + d.img_url + '"/></div>');
				};
			if (!d || !d.img_url) {
				return;
			}
			img = new Image();
			img.onload = appendImgToBody;
			img.src = d.img_url;
		},
		// 获取addID
		getAppId: function() {
			this.appid = dj.getPageData('appID') || '';
		},
		getResource: function() {
			var $link = $('meta[property="og:url"]').attr('content') || location.href.replace('djshare=1', '');
			$link = $link.indexOf('?') != -1 ? $link + '&xtjtr=' + (+new Date()) : $link + '?xtjtr=' + (+new Date());
			return {
				'img_url': $('meta[property="og:image"]').attr('content') || '',
				'img_width': '640',
				'img_height': '640',
				'link': $link,
				'desc': $('meta[property="og:description"]').attr('content') || document.title || '',
				'title': $('meta[property="og:title"]').attr('content') || document.title || ''
			};
		},
		getResourceWeibo: function() {
			var $link = $('meta[property="og:url"]').attr('content') || location.href.replace('djshare=1', '');
			$link = $link.indexOf('?') != -1 ? $link + '&xtjtr=' + (+new Date()) : $link + '?xtjtr=' + (+new Date());
			return {
				'img_url': $('meta[property="og:image"]').attr('content') || '',
				//        'img_width': '640',
				//        'img_height': '640',
				'url': $link,
				'content': $('meta[property="og:description"]').attr('content') || document.title || '',
				'title': $('meta[property="og:title"]').attr('content') || document.title || ''
			};
		},
		getResourcePerson: function() {
			var $link = $('meta[property="og:url"]').attr('content') || location.href.replace('djshare=1', '');
			$link = $link.indexOf('?') != -1 ? $link + '&xtjtr=' + (+new Date()) : $link + '?xtjtr=' + (+new Date());
			return {
				'img_url': $('meta[property="og:image"]').attr('content') || '',
				'img_width': '640',
				'img_height': '640',
				'link': $link,
				'desc': $('meta[property="og:description"]').attr('content') || document.title || '',
				'title': $('meta[property="og:title"]').attr('content') || document.title || ''
			};
		},
		getResourceEmail: function() {
			return {
				'title': $('meta[property="og:title"]').attr('content') || document.title || '',
				'content': $('meta[property="og:content"]').attr('content') || document.title || ''
			};
		},
		// 发送给好友
		shareFriend: function() {
			var data = Weixin.getResourcePerson();
			WeixinJSBridge.invoke('sendAppMessage', $.extend(data, {
					'appid': Weixin.appid
				}),
				function(res) {
					Weixin.report('send_msg', res.err_msg, 'shareFriend');
				}
			);
		},
		// 分享到朋友圈
		shareTimeline: function() {
			var data = Weixin.getResource();
			WeixinJSBridge.invoke('shareTimeline', data,
				function(res) {
					Weixin.report('send_msg', res.err_msg, 'shareTimeline');
				}
			);
		},
		// 分享到微博
		shareWeibo: function() {
			var data = Weixin.getResourceWeibo();
			WeixinJSBridge.invoke('shareWeibo', data,
				function(res) {
					Weixin.report('send_msg', res.err_msg, 'shareWeibo');
				}
			);
		},
		// 分享邮箱
		shareEmail: function() {
			var data = Weixin.getResourceEmail();
			WeixinJSBridge.invoke('sendEmail', {
					'title': data['title'],
					'content': data['content'] + '\n' + document.documentURI
				},
				function(res) {
					Weixin.report('send_msg', res.err_msg, 'shareEmail');
				}
			);
		},
		report: function(type, msg, shareType) {
			var result = msg.split(':')[1];
			var funSuccess = exports['dj']['getPageData'](shareSuccess);
			if (/^(confirm|send|ok)$/.test(result)) {
				Weixin.shareSuccess && Weixin.shareSuccess(shareType);
				funSuccess && funSuccess.length && funSuccess.forEach(function(fn) {
					fn(shareType);
				});
			}
		},
		// 分享成功后的记录分享
		shareSuccess: function(shareType) {
			var sucData = exports['dj']['getPageData']('weixin-share-success');
			if (sucData && sucData.url) {
				shareType && (sucData.data.shareType = shareType);
				$.ajax({
					url: sucData.url,
					type: sucData.ajaxType,
					data: sucData.data,
					dataType: 'json',
					success: function() {},
					error: function() {}
				});
			}
		}
	};
	Weixin.init();

	// 调用app 或者下载
	//页面调客户端
	var appLink = function() {
		var UA = navigator.userAgent,
			IsAndroid = (/Android|HTC/i.test(UA) || (window.navigator['platform'] + '').match(/Linux/i)),
			IsWeixin = /MicroMessenger/i.test(UA);
		var downloadLink = IsAndroid ? 'http://bcs.duapp.com/weikaapp/weika_dl.apk' : 'https://itunes.apple.com/app/wei-ka-neng-sao-tou-xiang/id805428016?ls=1&mt=8',
			appLink = IsAndroid ? 'vcard://android.client.launch' : 'weika://', //客户端链接
			openAppFn = function() {
				location.href = downloadLink;
			};
		if (IsWeixin) {
			var $mask = $('<div class="p-mask">');
			$('body').append($mask);
			$mask.on('touchmove', function(e) {
				e.preventDefault();
			}).on('click', function(e) {
				$mask.remove();
			});
		} else {
			//自动判断
			//创建一个隐藏的iframe，链接指向客户端
			var elFrame = $('<iframe src="' + appLink + '" frameborder="0" width="0" height="0" onload="location.href=\'' + downloadLink + '\'"></iframe>');
			elFrame.appendTo(document.body);
			//没有安装客户端，延时跳转商店
			setTimeout(openAppFn, 200);
		}
		return false;
	};
	var $doc = $(document);
	var funBlank = function() {};
	$doc.on('click', function(e) {
		if (e.target.getAttribute('getapp') || e.target.getAttribute('href') == 'getapp') {
			e.preventDefault();
			appLink();
		}
	});
	// 触发页面中元素的:active状态
	$doc.on('touchstart', funBlank);
	exports['i-appLink'] = appLink;

	// 防止表单重复提交
	$(function() {
		var clsDisabled = 'i-btn-disabled';
		$('form').on('submit', function(e) {
			var $btn = $('#jp-submit', this);
			$btn = $btn.length ? $btn : $('[for="fp-submit"]', this);
			if ($btn.hasClass(clsDisabled)) {
				e.preventDefault();
			} else {
				$btn.addClass(clsDisabled);
				setTimeout(function() {
					$btn.removeClass(clsDisabled);
				}, 2000);
			}
		});
	});
})(window);
"use strict";;
(function() {
	var scrollTip = null;
	var view = {};
	var limit = false;
	var initView = function() {
		view.lnkInside = $('#lnk-inside');
	};
	var showTip = function() {
		var num_over = document.body.scrollTop || document.documentElement.scrollTop;
		if (num_over <= 0) {
			// $(window).triggerHandler('scroll')
			scrollTip.show();
		}
	};
	var jdFocus = function() {
		if (limit) return;
		limit = true;
		$.ajax({
			url: view.isFocus.url,
			type: view.isFocus.ajaxType,
			dataType: 'json',
			success: function(r) {
				if (r.result == 0) {
					location.href = view.isFocus.nextUrl;
				} else {
					jdMark();
				}
			},
			complete: function() {
				limit = false;
			}
		});

	};
	var jdMark = function() {
		$.ajax({
			url: view.focusMark.url,
			type: view.focusMark.ajaxType,
			data: view.focusMark.data,
			dataType: 'json',
			success: function(r) {

			},
			error: function() {

			},
			complete: function() {
				location.href = view.focusMark.nextUrl;
			}
		});
	};
	var bindEvent = function() {
		// gif图片有缓存后就没有动画了，想到的方法就是这么加一个了
		window.onload = function() {
			showTip();
			var imgurl = 'http://fa_pushover.assets.dajieimg.com.t/up/dj-mobile/pushover/i/notice-ad-anim-bg.gif?' + (+new Date());
			var cssText = {
				'background-image': 'url(' + imgurl + ')',
				'background-repeat': 'no-repeat',
				'background-size': '114px 45px',
				'background-position': 'top left'
			};
			var btn_trans = $('#btn-trans');
			if (btn_trans.length > 0) $('#btn-trans').css(cssText);
		}
		$(window).on('scroll', function() {
			// var tip = $('.p-scroll-tip');
			if (scrollTip && scrollTip.length != 0) {
				scrollTip.remove();
				scrollTip = null;
			}
		});
		if (view.lnkInside.length > 0) {
			view.lnkInside.on('click', function(e) {
				e.preventDefault();
				if (view.isFocus) {
					jdFocus();
				}

			})
		}
	};
	$(function() {
		scrollTip = $('.p-scroll-tip');
		view.isFocus = dj['getPageData']('isfocus');
		view.focusMark = dj['getPageData']('focusMark');
		initView();
		bindEvent();
	})
})();
var StatM = function() {
		this.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + //all caps
			"abcdefghijklmnopqrstuvwxyz" + //all lowercase
			"0123456789._*"; // all numbers plus +/=
	}
	//Base64
	//Heres the encode function
StatM.prototype.encode64 = function(inp) {
	var out = ""; //This is the output
	var chr1, chr2, chr3 = ""; //These are the 3 bytes to be encoded
	var enc1, enc2, enc3, enc4 = ""; //These are the 4 encoded bytes
	var i = 0; //Position counter
	do { //Set up the loop here
		chr1 = inp.charCodeAt(i++); //Grab the first byte
		chr2 = inp.charCodeAt(i++); //Grab the second byte
		chr3 = inp.charCodeAt(i++); //Grab the third byte
		//Here is the actual base64 encode part.
		//There really is only one way to do it.
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		//Lets spit out the 4 encoded bytes
		out = out + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);

		// OK, now clean out the variables used.
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";

	} while (i < inp.length); //And finish off the loop
	//Now return the encoded values.
	return out;
}

StatM.prototype.getCookie = function(name) {
	var cname = name + "=";
	var dc = document.cookie;
	if (dc.length > 0) {
		begin = dc.indexOf(cname);
		if (begin != -1) {
			begin += cname.length;
			end = dc.indexOf(";", begin);
			if (end == -1) {
				end = dc.length;
			}
			return unescape(dc.substring(begin, end));
		}
	}
	return "";
}

StatM.prototype.setCookie = function(name, value) {
	var argv = this.setCookie.arguments;
	var argc = this.setCookie.arguments.length;
	if (value.indexOf("http:/") == 0) {
		value = '"' + value + '"';
	}

	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;
	var expires = (2 < argc) ? argv[2] : null;
	var newcookie = name + "=" + value + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
	document.cookie = newcookie;
}
StatM.prototype.initPage = function() {
	var dj_rf = (typeof(encodeURI) == 'function') ? encodeURI(document.referrer) : document.referrer;
	if (!dj_rf) {
		dj_rf = "empty";
	}
	var dj_eu = (typeof(encodeURI) == 'function') ? encodeURI(document.URL) : document.URL;
	if (this.getCookie("DJ_UVID") == null || this.getCookie("DJ_UVID") == "") {
		var cookieval = new Date();
		cookieval = cookieval.getTime();
		var rStr_1 = "" + Math.random();
		var rStr_2 = "" + Math.random();
		var rStr_3 = "" + Math.random();
		var rStr_4 = "" + Math.random();
		var rStr_5 = "" + Math.random();
		rStr_1 = rStr_1.charAt(2);
		rStr_2 = rStr_2.charAt(2);
		rStr_3 = rStr_3.charAt(2);
		rStr_4 = rStr_4.charAt(2);
		rStr_5 = rStr_5.charAt(2);

		var uv_expired_data = new Date(new Date().getTime() + 3600 * 24 * 1000 * 365);
		cookieval = cookieval + rStr_1 + rStr_2 + rStr_3 + rStr_4 + rStr_5;
		var uvid = this.encode64(cookieval);

		this.setCookie("DJ_UVID", uvid, uv_expired_data, "/", "dajie.com", false);

		//给后台第一次数据:start
		var url = "http://st.dajie.com/r.st";
		var i = new Image(1, 1);
		i.src = url + "?DJ_UVID=" + uvid + "&DJ_RF=" + dj_rf + "&DJ_EU=" + dj_eu + "&" + (+new Date());
		i.onload = function() {
				_uVoid();
			}
			// this.setCookie("DJ_EU", dj_eu , uv_expired_data, "/", "dajie.com", false);
			// this.setCookie("DJ_RF", dj_rf , uv_expired_data, "/", "dajie.com", false);
			//给后台第一次数据:end
	}
	//记录session级别的数据
	if (this.getCookie("DJ_RF") == null || this.getCookie("DJ_RF") == "") {
		this.setCookie("DJ_EU", dj_eu, null, "/", "dajie.com", false);
		this.setCookie("DJ_RF", dj_rf, null, "/", "dajie.com", false);
	}
}
var statM = new StatM();
statM.initPage();

function _uVoid() {
	return;
}

function click_p() {
	var navType = window['_staticHeader'];
	if (!navType) { // 没引用js头部的话直接发送请求
		click_p_send();
	} else {
		if (!window['G_dj_head_getHeader']) {
			// 如果是静态头部，则返回未登录状态
			click_p_send(-1);
			return;
		}
		navType = navType['navType'];
		if (navType == undefined) {
			setTimeout(function() {
					click_p();
				},
				100);
		} else {
			click_p_send(navType);
		}
	}
}

function click_p_send(navType) {
	var n = arguments.length ? '&n=' + navType : ''; // n代表导航类型，学生(0)、白领(1)、登录前(-1)
	var url = "http://st.dajie.com/l.st";
	var i = new Image(1, 1);
	r = (typeof(encodeURI) == 'function') ? encodeURI(document.referrer) : document.referrer;
	i.src = url + "?r=" + r + n + "&" + (+new Date());
	i.onload = function() {
		_uVoid();
	}
}

function click_b(statcode) {
	var navType = window['_staticHeader'] && window['_staticHeader']['navType'];
	var n = navType == undefined ? '' : '&n=' + navType;
	var url = "http://st.dajie.com/b.st";
	var i = new Image(1, 1);
	r = (typeof(encodeURI) == 'function') ? encodeURI(document.referrer) : document.referrer;
	i.src = url + "?b=" + statcode + "&r=" + r + n + "&" + (+new Date());
	i.onload = function() {
		_uVoid();
	}
}

function pageStatistics(event_code) {
	var para = "";
	var url = "";
	try {
		var argv = pageStatistics.arguments;
		var argc = pageStatistics.arguments.length;
		para = (1 < argc) ? argv[1] : "";
	} catch (e) {}
	if ('0000' == event_code) { //pv统计专门做一个文件进行
		url = "http://st.dajie.com/p.st";
	} else {
		url = "http://st.dajie.com/s.st";
	}
	var i = new Image(1, 1);
	i.src = url + "?e_cd=[" + event_code + "]" + para + "&" + (+new Date());
	i.onload = function() {
		_uVoid();
	}
}

var dpv;
if (!dpv) click_p();
dpv = 1;

$("a[stat]").live('click', function() {
	if ($(this).attr("stat") != "") {
		click_b($(this).attr("stat"));
	}
});

$("input[stat]").live('click', function() {
	if ($(this).attr("stat") != "") {
		click_b($(this).attr("stat"));
	}
});

$("button[stat]").live('click', function() {
	if ($(this).attr("stat") != "") {
		click_b($(this).attr("stat"));
	}
});
/**
 * 测试cdn网速
 */

var CDNSpeedInfo = {
	// 存放统计对象
	entities: {},
	// 任务数量
	taskCount: 0,
	// 要传递的数据
	data: {
		uid: $.cookie("uchome_loginuser") || " ",
		uvid: $.cookie("DJ_UVID") || " "
	},
	// for chrome
	info: [],
	pushLog: function() {
		if (CDNSpeedInfo.taskCount == 0) {
			var url = "http://211.151.116.14/speedtest/log";
			var img = new Image();

			var info = CDNSpeedInfo.info.join(";");

			var pData = $.extend(CDNSpeedInfo.data, {
				h: $(window).height(),
				info: info === "" ? ' ' : info
			});

			img.src = url + "?" + $.param(pData);
		}
	}
};
var imgLog = function(index) {
	CDNSpeedInfo.taskCount++;
	return function(src) {
		var img = new Image();

		var d = new Date();
		var dy = d.getFullYear();
		var dm = d.getMonth() + 1;
		var dd = d.getDate();
		var randomStr = dy + '' + dm + '' + (dd < 10 ? ("0" + dd) : dd);

		srcNoCache = src + "?" + randomStr;
		img.src = srcNoCache;
		var t1 = new Date();
		if (img.readyState == "complete") {
			var dt = (new Date() - t1);
			CDNSpeedInfo.taskCount--;
			CDNSpeedInfo.data["status" + index] = 304;
			CDNSpeedInfo.data["loadTime" + index] = dt;
			CDNSpeedInfo.pushLog();
		} else {
			img.onload = function() {
				var dt = (new Date() - t1);
				var src = this.src;
				CDNSpeedInfo.taskCount--;
				CDNSpeedInfo.data["status" + index] = 200;
				CDNSpeedInfo.data["loadTime" + index] = dt;
				if ($.browser.webkit && !!performance && !!performance.getEntries) {
					var en = performance.getEntriesByName(src)[0];
					// https://developers.google.com/chrome-developer-tools/docs/network-files/resource-timing-overview.png
					var start = en.startTime;
					// redirect dns tcp request response
					//var time=[en.redirectEnd-en.redirectStart,en.domainLookupEnd-en.domainLookupStart,en.connectEnd-en.connectStart,en.responseStart-en.requestStart,en.responseEnd-en.responseStart];
					//startTime duration resEnd
					var time = [parseInt(en.startTime), parseInt(en.duration), parseInt(en.responseEnd)];
					CDNSpeedInfo.info[index - 1] = time.join(',');
				}
				CDNSpeedInfo.pushLog();
			};
			img.onerror = function() {
				CDNSpeedInfo.taskCount--;
				CDNSpeedInfo.data["status" + index] = 404;
				CDNSpeedInfo.data["loadTime" + index] = 0;
				CDNSpeedInfo.pushLog();
			}
		}
	}
};
var _hmt = _hmt || [];
$(function() {
	var testUser = ['11706477', '25028436', "71", '6332571', '25623295'];
	//if (true) {
	if (testUser.join(",").indexOf(CDNSpeedInfo.data.uid) > -1 || (Math.random() < 0.1)) {
		imgLog(1)("http://9.f1.dajieimg.com/group1/M00/30/C8/CgpAmVJvMX2AfCYdAAB5HVNAcM0417.jpg");
		imgLog(2)("http://6.f1.dajieimg.com/group1/M00/30/C8/CgpAmVJvMX2AfCYdAAB5HVNAcM0417.jpg");
	}

	var hm = document.createElement("script");

	hm.src = "//hm.baidu.com/hm.js?38e2415f86d73cdfa1e9c3f4d8560b8e";

	var s = document.getElementsByTagName("script")[0];

	s.parentNode.insertBefore(hm, s);
	/**
	* 下面这部分不知道那个业务在用,
	* 如果有数据大变化,可以把开关打开
	*
	var _style_count = $('link[rel=stylesheet]').length;
	var _script_count = $('script[src]').length;
	var url = "http://st.dajie.com/performance.st";
	var i = new Image(1, 1);
	try {
	i.src = url + "?h=" + (_body_start - _head_start) + "&b=" + (_now - _body_start) + "&s=" + _style_count + "&j=" + _script_count;
	i.onload = function() {
	_uVoid();
	}
	} catch(e) {}
	/**/

});

(function() {
	var scrollTop = document.documentElement.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft;
	var href = encodeURIComponent(document.location.href);
	var cds = [];

	var total = 0;
	var count = 0;

	document.documentElement.onclick = function(e) {
		var e = window.event || e;
		var x = scrollLeft + e.clientX;
		var y = scrollTop + e.clientY;
		cds.push(x + "_" + y);
		total += 1;
		count += 1;
		if (count == 5) {
			if (cds.length > 0) {
				sendmsg(-1);
			}
			count = 0;
		}
	};

	window.onunload = function() {
		if (cds.length > 0) {
			sendmsg(total);
			total = 0;
		}
	};

	function sendmsg(ta) {
		var img = document.createElement('img');
		img.src = 'http://dm.dajie.com/htcv.jpg?in=' + cds.join() + '&ta=' + ta + '&rf=' + href;
		img.style.display = 'none';
		document.body.appendChild(img);
		cds = [];
		// 改动
	}
})();
