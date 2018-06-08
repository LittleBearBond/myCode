function getData(url, jsonpCallbackName, fn) {
	var cbname = 'cb' + getData.timer++;
	var callabckName = 'window.getData.' + cbname;
	//encodeURIComponent
	url = url + (/\?/.test(url) ? '&' : '?') + jsonpCallbackName + '=' + callabckName;
	getData[cbname] = function (data) {
		try {
			fn(data);
		} finally {
			destory();
		}
	}
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	script.async = true;

	var destory = function () {
		script.parentNode.removeChild(script);
		delete getData[cbname];
	}
	script.onerror = destory;
	(document.head || document.getElementsByTagName('head')[0]).appendChild(script)
}
getData.timer = 1;
