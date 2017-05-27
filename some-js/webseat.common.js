/*
 *Author  xj
 *webseat.common.js
 *  项目的公共方法整合到这里，以后可以做模块化处理，这里的每个模块均可独立分割，只是相互之间有依赖
 * 依赖于webseat.core.js、Uploadify插件
 *  ([][+[]] + [])[+!![]] + ({} + [])[+!![]] + ([][+[]] + [])[!![] + !![]] + ([][+[]] + [])[!![] + !![] + !![]] + [] + (![] + [])[!![] + !![] + !![]]    nodes
 */
var WebJs = window.WebJs || WebJs || {};
//Common
var com = WebJs.Common = (function(my) {
	var iframeId = '#downloadcsv',
		objInput = '#keyword', //default show input
		ttm, //timer
		oScript; //页面script对象
	//创建script标签并且添加到页面上
	function appendScript() {
		oScript = document.createElement('script');
		//其中‘wd’是搜索的关键字，‘cb’是一个回调函数，该回调函数是我们取到数据要后执行的函数，oScript.src中cb=baidu即表示取到数据后执行baidu函数
		oScript.src = 'http://suggestion.baidu.com/su?wd=' + $(this).val() + '&p=3&cb=WebJs.Common.showBaiduData&from=superpage&t=' + (+new Date());
		document.body.appendChild(oScript);
	}

	my.createFrame = function(url, id, navText) { //创建Iframe
		id = id || 'iframe' + Math.random().toString().substring(2); //+new Date()||new Date().valueOf()
		return '<iframe id="iframe' + id + '" scrolling="auto" frameborder="0"  src="' + url + '"  parentText="' + navText + '" style="width:100%;height:100%;"></iframe>';
	};
	my.ShowErrors = function(rs, st, state) {
		var msg = '请求错误    ' + rs.status + ' ' + rs.responseText;
		rs.status === '401' && (msg += '错误码为401就是拒绝改请求，该请求授权没通过，你需要重新登录！');
		WebJs.Dialog.Content(msg);
	};
	my.ExportExcel = function(url, filename) {
		if (!$(iframeId).length) {
			$('body').append("<iframe id=\"" + iframeId + "\" style=\"display:none\"></iframe>");
		}
		var params = WebJs.Data.exportExcelParam;
		for (var p in params) {
			var v = params[p];
			if (Object.prototype.toString.apply(v) === '[object Function]') {
				v = v();
			}
			url = WebJs.Utils.SetUrlParam(p, v, url);
		}
		if (filename) url = WebJs.Utils.SetUrlParam('fileName', filename, url);
		$(iframeId).attr('src', url);
	};
	my.Download = function(guid) {
		var $dlf = $('#downloadfile');
		if (!$dlf.length) {
			$('body').append("<iframe id=\"downloadfile\" style=\"display:none\"></iframe>");
		}
		$dlf.attr('src', '/home/download?guid=' + guid);
	};
	/***抓取百度热词***/
	my.SmartTips = function(obj) {
		//观察html结构，最后生成的commbox其实在设置的文本框后面，设置的文本框会被隐藏
		var commbox = $(obj).next('span').find('input[type=text]:first');
		commbox.keyup(function() {
			var $this = $(this);
			clearTimeout(ttm);
			ttm = setTimeout(function() {
				if (oScript) {
					$(oScript).remove();
				}
				appendScript.call($this);
			}, 500);
		});
	};
	my.showBaiduData = function(data) { //在 easyui的commbox中显示百度返回的数据
		if (data && data.s && data.s.length) {
			var items = $.map(data.s, function(item) {
				return {
					id: item,
					name: item
				}; // To Dic
			});
			$(objInput).combobox('loadData', items);
		}
	};
	/****跨页面调用*Start****/
	my.AddToParent = function(d1, d2) { //一般情况下 d1是Id  d2是Name
		var cb = WebJs.Utils.GetUrlParam2('cb');
		if (d2) {
			cb && parent && (parent.WebJs.Dialog.Close(), parent[cb](d1, d2));
			cb || parent && (parent.gData[cb] && (parent.WebJs.Dialog.Close(), parent.gData[cb](d1, d2)));
		} else if (typeof d1 === 'object') {
			cb && parent && (parent.WebJs.Dialog.Close(), parent[cb](d1));
			cb || (parent && parent.gData[cb] && (parent.WebJs.Dialog.Close(), parent.gData[cb](d1)));
		}
	};
	my.AddSelections = function(num) {
		var sels = WebJs.EasyUi.GetSelections();
		if (!sels && sels.length) {
			WebJs.Dialog.Alert('请先选择数据');
			return;
		}
		num = num || 5;
		if (sels.length > num) {
			WebJs.Dialog.Alert('一次最多只能添加五个');
			return;
		}
		WebJs.Common.AddToParent(sels);
	};
	/****跨页面调用*End****/
	return my;
})(WebJs.Common || {});
com.formatString = function() {
	for (var i = 1, len = arguments.length; i < len; i++) {
		var exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
		arguments[0] = arguments[0].replace(exp, arguments[i]);
	}
	return arguments[0];
};

//项目里面调用的
WebJs.Format = {
	formatTime: function(val) {
		if (!val) {
			return "无";
		}
		if (~val.indexOf('T')) {
			return val.replace('T', '   ');
		}
		return val.toDateTime();
	},
	formatVal: function(val) {
		if (val == 0) {
			return val;
		}
		return !!val === false || val.toString().trim() == '' ? '无' : val;
	},
	formatIsFreeze: function(val, row) {
		var text = val ? '<span style="color:#f00">冻结</span>' : '活动';
		row.Id = row.Id || 0;
		return '<a href="javascript:void(0)" isfreeze=' + val + ' val=' + row.Id + '>' + text + ' </a>';
	},
	formateRate: function(val, num) {
		return val && val.toString().ParseFloatAndToFixed(num || 2) * 100;
	},
	formateRateNum: function(val) { //格式化百分率
		return !val ? 0 : val.toString().ParseFloatAndToFixed(2) * 100 + '%';
	},
	formatOperationType: function(val) {
		var text;
		switch (val) {
			case 0:
				text = "未知";
				break;
			case 1:
				text = "设置角色";
				break;
			case 2:
				text = "创建账号";
				break;
			case 3:
				text = "修改密码";
				break;
			case 4:
				text = "添加科目";
				break;
			case 5:
				text = "修改科目";
				break;
			case 6:
				text = "修改软件";
				break;
			default:
				text = val;
		}
		return text;
	}
};

//Uploadify 的整体配置
WebJs.Uploadify = WebJs.Uploadify || (function(wj) {
	var fileId = "uploadify",
		fileQueueId = 'fileQueue',
		defCfgs = {
			'swf': '/Scripts/uploadify/uploadify.swf',
			'uploader': '',
			'formData': {
				'ASPSESSID': '',
				'AUTHID': ""
			},
			'buttonText': '选择文件',
			'height': 25,
			'width': 80,
			'All Files': '*.*',
			//在浏览窗口底部的文件类型下拉菜单中显示的文本
			'fileTypeDesc': '文件描述',
			'fileTypeExts': '*.xls;',
			'fileObjName': 'Filedata',
			'fileSizeLimit': '5120KB',
			//设置是否自动上传，选择完成后自动上传，这里我并没有自动上传
			'auto': false,
			'multi': true,
			'queueID': fileQueueId,
			'simUploadLimit': 3, //并发上传数据
			'uploadLimit': 10, //最多选择10个
			/*当文件上传成功时触发
			* file – 文件对象
			data – 服务端输出返回的信息
			response – 有输出时为true,如果无响应为false，如果返回的是false,当超过successTimeout设置的时间后假定为true
			*/
			'onUploadSuccess': function(file, data, response) {
				/*var len = $('#' + fileQueueId + ' > div').length;
				if (len > 1) {
				$('#' + fileId).uploadify('upload');
				} else if (len == 1) {
				setTimeout(function () { $('#' + fileId).uploadify('upload'); }, 1000);
				}*/
			},
			'onUploadComplete': function(file) { //每个文件上传完毕后无论成功与否都会触发。
			},
			'onUploadError': function(file, errorCode, errorMsg, errorString) { //文件上传出错时触发，参数由服务端程序返回。
				WebJs.Dialog.Tip(errorCode + ':' + errorMsg);
			},
			//开始上传时所执行的代码
			'onUploadStart': function(file) {
				WebJs.Dialog.Tip(file.name + 'start upload');
			},
			'onCancel': function(file) { //当点击文件队列中文件的关闭按钮或点击取消上传时触发，file参数为被取消上传的文件对象
			},
			'onClearQueue': function(queueItemCount) { //当调用函数cancel方法时触发，queueItemCount参数为被取消上传的文件数量。
			},
			'onSelect': function(file) { //选择文件后向队列中添加每个上传任务时都会触发。
			},
			'onSelectError': function(file, errorCode, errorMsg) {
				WebJs.Dialog.Tip('发生错误请刷新页面再试');
			},
			'onFallback': function() { //当Uploadify初始化过程中检测到当前浏览器不支持flash时触发。
			},
			/*当文件浏览框关闭时触发，如果将此事件被重写，则当向队列添加文件上传出错时不会弹出错误消息提示。
			queueData对象包含如下属性：
			filesSelected 文件选择对话框中共选择了多少个文件
			filesQueued 已经向队列中添加了多少个文件
			filesReplaced 已经向队列中替换了多少个文件
			filesCancelled 取消了多少个文件 filesErrored 出错了多少个文件
			*/
			'onDialogClose': function(queueData) {},
			/*处理上传队列的过程中会多次触发此事件，每当任务状态有更新时都会触发。
			file – 文件对象
			bytesUploaded – 已上传的字节数
			bytesTotal – 文件总字节数
			totalBytesUploaded – 当前任务队列中全部文件已上传的总字节数
			totalBytesTotal – 当前任务队列中全部文件的总字节数*/
			'onUploadProgress': function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {}
		};
	return function(uploadifyCfg, id) {
		id = id || fileId;
		if (!id.startsWith("#")) {
			id = '#' + id;
		}
		var cfgs = $.extend(defCfgs, uploadifyCfg || {});
		$(id).uploadify(cfgs, "*");
	};
})(WebJs);

function ExcelImportProcess(sessionId) {
	WebJs.Dialog.Tip('处理中……');
	GetExcelImportProgress(sessionId);
}


function GetExcelImportProgress(sessionId) {
	var progress = $('#progress');
	progress.show();
	$.getJSON("/Services/ProgressAsyncHandler.ashx?sessionid=" + sessionId, {},
		function(data) {
			if (!data) {
				//setTimeout(GetExcelImportProgress, 500);
				return;
			}
			var jsonData = data; //$.parseJSON(data);
			jsonData.Type = jsonData.Type.toLowerCase();
			if (jsonData.Type == "process") {
				progress.progressbar('setValue', jsonData.Percent | 0);
				setTimeout(GetExcelImportProgress, 10);
			} else if (jsonData.Type == "finish") {
				progress.progressbar('setValue', 100);
				if (jsonData.ErrorFile) {
					top.location.href = jsonData.ErrorFile;
				}
				progress.hide();
				WebJs.Dialog.Tip('导入完成');
			} else if (jsonData.Type == "cancel") {
				WebJs.Dialog.Tip('cancel');
				WebJs.Dialog.Tip('取消导入');
				progress.hide();
			}
		});
}
