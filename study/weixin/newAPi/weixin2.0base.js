/*
 *weixin 新版接口
 */

/*
{'shareTo':'timeline'}
{'errMsg':'shareTimeline:cancel'}
{'errMsg':'shareTimeline:ok'}

{'shareTo':'friend','scene':'friend'}
{'errMsg':'sendAppMsg:cancel'}
{'errMsg':'sendAppMsg:ok'}

{'shareTo':'QQ'}
{'errMsg':'shareTimeline:cancel'}
{'errMsg':'shareQQ:ok'}
 */
(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else {
		root.Weixin = factory();
	}
}(window, function() {
	window.dj = window.dj || {};
	//页面配置的相关信息  og:XXXXX
	var sourceData,
		win = window,
		wx = win.wx,
		dj = win.dj,
		//外部传入配置信息
		settingData = {},
		//保存html配置上的信息
		sourceData,
		//简版浅拷贝
		extend = function() {
			var args = arguments,
				o = args[0],
				len = args.length,
				curr;
			for (var j = 1; j < len; j++) {
				curr = args[j];
				for (var i in curr) {
					o[i] = curr[i];
				}
			}
			return o;
		},
		//这些是可以注册多个回调的
		multipleCallBack = 'i-weixin-share-success-callback'.split(','),
		Weixin = {},
		pageData,
		func = 'trigger,cancel,fail,complete,success';
	//保存外部配置信息
	dj.setPageData = function(obj) {
		multipleCallBack.forEach(function(item) {
			if (item in obj && typeof obj[item] === 'function') {
				settingData[item] = settingData[item] || [];
				settingData[item].push(obj[item]);
				delete obj[item];
			}
		});
		settingData = extend({}, settingData, obj);
	};
	pageData = dj.getPageData = function(attr) {
		return attr ? settingData[attr] : settingData;
	};
	extend(Weixin, {
		/*
		 *获取配置在html 上的相关数据
		 */
		resourceData: function() {
			var elMetas = document.getElementsByTagName('meta'),
				len = elMetas.length,
				i = 0,
				result = sourceData,
				$link,
				el, propertyVal, reg = /^og:([^\s]+)/i;
			if (result) {
				return result;
			};
			result = {};
			for (; i < len; i++) {
				el = elMetas[i];
				propertyVal = el.getAttribute('property') || '';
				match = propertyVal.match(reg);
				propertyVal && match && (result[match[1]] = el.getAttribute('content') || '');
			}
			$link = result.url || location.href.replace('djshare=1', '');
			$link = $link.indexOf('?') != -1 ? $link + '&xtjtr=' + (+new Date()) : $link + '?xtjtr=' + (+new Date());
			return sourceData = {
				'imgUrl': result.image || '',
				'img_width': settingData.imgWidth || '640',
				'img_height': settingData.imgHeight || '640',
				'link': $link,
				'desc': result.description || document.title || '',
				'title': result.title || document.title || ''
			};
		},
		/*
		 *初始化 绑定相关事件回调
		 */
		init: function() {
			Weixin.resourceData();
			//初始化，处理页面相关配置项
			Weixin.handlePageSetting();
			//注册相关事件
			'onMenuShareAppMessage,onMenuShareTimeline,onMenuShareQQ,onMenuShareWeibo'.split(',').forEach(function(item) {
				func.split(',').forEach(function(name) {
						sourceData[name] = Weixin.wrapReport(name, item.replace('onMenu', ''));
					})
					//执行拷贝
				wx[item](extend({}, sourceData));
			});
		},
		handlePageSetting: function() {
			var elHtml = document.getElementsByTagName('html')[0],
				val;
			//隐藏微信右上角按钮, 兼容以前的 新接口使用hideOptionMenu
			Weixin[elHtml.getAttribute('hideMenu') === 'true' || elHtml.getAttribute('hideOptionMenu') || document.getElementById('hideMenu') ? 'hideOptionMenu' : 'showOptionMenu']();
			//批量隐藏菜单项、批量显示菜单项
			'hideMenuItems,showMenuItems'.split(',').forEach(function(item) {
				(val = elHtml.getAttribute(item)) && wx[item]({
					menuList: val.split(','),
					success: function() {},
				});
			});
			//所有操作 必须按照标准接口名字配置；hideAllNonBaseMenuItem='true'、hideOptionMenu='true'
			'hideAllNonBaseMenuItem,showAllNonBaseMenuItem,hideOptionMenu,showOptionMenu'.split(',').forEach(function(item) {
				(val = elHtml.getAttribute(item)) && typeof wx[item] === 'function' && wx[item]();
			});
		},
		wrapReport: function(name, shareType) {
			return function() {
				Weixin.report.apply(Weixin, [name, shareType].concat([].slice.call(arguments)));
			};
		},
		report: function(name, shareType, res) {
			var funSuccess = pageData('i-weixin-share-success-callback');
			if (name === 'success') {
				Weixin.shareSuccess && Weixin.shareSuccess(shareType);
				funSuccess && funSuccess.length && funSuccess.forEach(function(fn) {
					fn(shareType);
				});
			}

			'trigger,cancel,fail,complete'.split(',').forEach(function(item) {
				item && name === item && (item = item.replace(/./, function($1) {
					return $1.toUpperCase();
				}));
				typeof Weixin['my' + item] === 'function' && Weixin['my' + item](name, shareType, res);
			});
		},
		myTrigger: function(name, shareType, res) {

		},
		mySuccess: function(name, shareType, res) {

		},
		myCancel: function(name, shareType, res) {

		},
		myFail: function(name, shareType, res) {

		},
		shareSuccess: function(shareType) {
			var sucData = pageData('weixin-share-success');
			if (sucData && sucData.url && $ && $.ajax) {
				sucData.data = sucData.data || {};
				shareType && (sucData.data.shareType = shareType);
				//如果有回调执行必须引入zepto.js， 默认是没有引入的
				$.ajax({
					url: sucData.url,
					type: sucData.ajaxType,
					data: sucData.data,
					dataType: 'json',
					success: function(result) {
						result && result.result + '' === '0' && sucData.nextUrl && (location.href = sucData.nextUrl.replace('{msg}', result.message));
						sucData.redirectUrl && (location.href = result && result.message ? sucData.redirectUrl.replace('{msg}', result.message) : sucData.redirectUrl);
					}
				});
			}
		}
	}, wx);
	wx && wx.ready(Weixin.init);
	//wx.error(function(res) {});
	return Weixin;
}));
