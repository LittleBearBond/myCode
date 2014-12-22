/*
 *https://github.com/stackp/promisejs
 *https://github.com/stackp/promisejs/blob/master/promise.js
 *http://www.cnblogs.com/ziyunfei/archive/2012/10/11/2717057.html
 */
//typeof是一个运算符,用来判断原始值的类型,还可以用来区分原始值和对象值.
(function(exports) {

	function Promise() {
		this._callbacks = [];
	}

	Promise.prototype.then = function(func, context) {
		var p, res;
		if (this._isdone) {
			return (p = func.apply(context, this.result));
		}
		p = new Promise();
		this._callbacks.push(function() {
			res = func.apply(context, arguments);
			if (res && typeof res.then === 'function') { //res instanceof Promise
				res.then(p.done, p);
			} else {
				p.done(arguments);
			}
		});
		return p;
	};

	Promise.prototype.done = function() {
		var i = 0,
			len = this._callbacks.length;
		this.result = arguments;
		this._isdone = true;
		for (; i < len; i++) {
			this._callbacks[i].apply(null, arguments);
		}
		this._callbacks = [];
	};

	function join(promises) {
		var p = new Promise(),
			results = [],
			numdone = 0,
			i = 0,
			total = promises.length;

		function notifier(i) {
			return function() {
				numdone += 1;
				results[i] = Array.prototype.slice.call(arguments);
				numdone === total && p.done(results);
			};
		}
		if (!promises || !promises.length) {
			return p.done(results), p;
		}

		for (; i < total; i++) {
			promises[i].then(notifier(i));
		}
		return p;
	}

	//一个一个执行
	function chain(funcs, args) {
		var p = new Promise();
		if (!funcs.length) {
			p.done.apply(p, args);
			return p;
		}
		funcs[0].apply(null, args).then(function() {
			funcs.splice(0, 1);
			chain(funcs, arguments).then(function() {
				p.done.apply(p, arguments);
			});
		});
		return p;
	}

	/*
	 * AJAX requests
	 */
	function _encode(data) {
		var result, k, e = encodeURIComponent;
		if (typeof data === "string" || data instanceof String) {
			return data;
		}
		for (k in data) {
			data.hasOwnProperty(k) && (result += '&' + e(k) + '=' + e(data[k]));
		}
		return result;
	}

	function new_xhr() {
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		return xhr;
	}

	function ajax(method, url, data, headers) {
		var p = new Promise(),
			xhr, payload, tid, timeout;
		data = data || {};
		headers = headers || {};

		function onTimeout() {
			xhr.abort();
			p.done(promise.ETIMEOUT, "", xhr);
		}
		try {
			xhr = new_xhr();
		} catch (e) {
			return p.done(promise.ENOXHR, ""), p;
		}

		payload = _encode(data);
		if (method === 'GET' && payload) {
			url += '?' + payload;
			payload = null;
		}

		xhr.open(method, url);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		for (var h in headers) {
			headers.hasOwnProperty(h) && xhr.setRequestHeader(h, headers[h]);
		}

		timeout = promise.ajaxTimeout;

		timeout && (tid = setTimeout(onTimeout, timeout));

		xhr.onreadystatechange = function() {
			timeout && clearTimeout(tid);
			if (xhr.readyState === 4) {
				var err = (!xhr.status ||
					(xhr.status < 200 || xhr.status >= 300) &&
					xhr.status !== 304);
				p.done(err, xhr.responseText, xhr);
			}
		};
		xhr.send(payload);
		return p;
	}

	function _ajaxer(method) {
		return function(url, data, headers) {
			return ajax(method, url, data, headers);
		};
	}

	var promise = {
		Promise: Promise,
		join: join,
		chain: chain,
		ajax: ajax,
		get: _ajaxer('GET'),
		post: _ajaxer('POST'),
		put: _ajaxer('PUT'),
		del: _ajaxer('DELETE'),
		/* Error codes */
		ENOXHR: 1,
		ETIMEOUT: 2,
		ajaxTimeout: 0
	};

	if (typeof define === 'function' && define.amd) {
		/* AMD support */
		define(function() {
			return promise;
		});
	} else {
		exports.promise = promise;
	}
})(this);
