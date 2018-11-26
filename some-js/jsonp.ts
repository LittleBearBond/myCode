/**
 * @author xiongjian
 * @email xiongjian@didichuxing.com
 * @create date 2017-09-03 12:23:24
 * @modify date 2017-09-03 12:23:24
 * @desc [description]
 */

interface IGetJsonpData {
	(url: string, jsonpCallbackName: string, successFn: (arg?: any) => any, failFn: (arg?: any) => any, timeout?: number): void;
	timer: number
}

/**
 * 通过jsonp方式发送数据
 *
 * @param {String} url
 * @param {String} jsonpCallbackName
 * @param {Function} successFn
 * @param {Function} failFn
 */
const getJsonpData = <IGetJsonpData>function (url, jsonpCallbackName = "callback", successFn, failFn, timeout = 30) {
	let timmer: any;
	const cbname = '__getjsonpdata' + getJsonpData.timer++;
	//encodeURIComponent
	url = url + (/\?/.test(url) ? '&' : '?') + jsonpCallbackName + '=' + cbname;
	const win = window as any;
	win[cbname] = function (data: any) {
		try {
			successFn(data);
		} finally {
			destoryFn();
		}
	}
	const node = document.createElement('script');
	node.type = 'text/javascript';
	node.charset = 'utf-8';
	node.src = url;
	node.async = true;

	const destoryFn = function () {
		window.clearTimeout(timmer);
		node.parentNode.removeChild(node);
		delete win[cbname];
	}

	const errorFn = function () {
		destoryFn();
		failFn();
	};

	node.onerror = errorFn
	timmer = window.setTimeout(errorFn, timeout * 1000);
	(document.head || document.getElementsByTagName('head')[0]).appendChild(node)
}
getJsonpData.timer = 1;


export default getJsonpData;

