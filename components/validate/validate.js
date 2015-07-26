(function(root, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(['zepto'], factory);
	} else {
		factory(root.$);
	}
}(window, function($) {
	var validateName = "validator";
	function validator(options, $form) {
		this.settings = $.extend(true, {}, $.validator.defaults, options || {});
		this.methods = this.settings.methods;
		this.messages = this.settings.messages;
		this.currentForm = $form;
		this.init();
		return this;
	};

	$.validator = function(options, $form) {
		return new validator(options, $form);
	};

	$.extend(validator.prototype, {
		init: function() {
			this.initRulesToElelemts();
		},
		/*把规则全部加载到表单元素上去*/
		initRulesToElelemts: function() {
			var curr, currEl, setting = this.settings.rules,
				self = this,
				attrs = {},
				dataKey;
			$.each(setting, function(key, val) {
				if (!setting.hasOwnProperty(key)) {
					return;
				}
				//标记这些元素是要进行验证的，方便后期对验证元素进行筛选
				attrs = {
					'data-isvalidate': false
				};
				curr = setting[key];
				currEl = self.currentForm.find('[name=' + key + ']');
				if (!currEl.length) {
					return;
				}
				if ($.type(curr) === 'string') {
					attrs['data-' + val] = true;
					currEl.attr(attrs);
					return;
				}
				$.each(curr, function(innerKey, innerVal) {
					if (!curr.hasOwnProperty(innerKey)) {
						return;
					}
					innerVal && (attrs['data-' + innerKey] = innerVal);
				});
				currEl.attr(attrs);
			});
		},
		eachElementsvalidate: function() {
			var self = this,
				//获取到需要验证的元素，从页面上取，万一元素被后期移除，如果使用之前缓存的就……(这样做效率有待优化)
				$els = this.currentForm.find('[data-isvalidate]');
			$.each($els, function(el) {
				self.validateOneElements($(el));
			});
		},
		validateOneElements: function($curr) {
			var self = this,
				methods = this.methods,
				messages = this.messages;
			currVal, validateResult, errorMsg = [],
				tagName = $curr.get(0).tagName.toLowerCase(),
				isvalidate = false;
			$.each(methods, function(key, func) {
				//取到之前设置的值 例如data-required="true"
				currVal = $curr.data(key);
				//如果有值 这里就执行验证
				if (typeof currVal != undefined && $.isFunction(func)) {
					isvalidate = self.excuteValidate($curr, key, currVal, func);
					if (isvalidate === false) {
						errorMsg.push(messages[key]);
						errorMsg = errorMsg.concat(currVal.split(','));
						//错误消息进行formate一下 可以外部控制内部的显示参数
						self.showError($curr, $.validator.formate.apply(self, errorMsg));
						return false;
					}
				}
			});
		},
		/*
		* validateVal= tue、[3,5]、3
		*validateName =max、min、email、rangelength
		*func=$.validator.methods[validateName]
		(1)required:true                必输字段
		(2)remote:"check.php"      使用ajax方法调用check.php验证输入值
		(3)email:true                    必须输入正确格式的电子邮件
		(4)url:true                        必须输入正确格式的网址
		(5)date:true                      必须输入正确格式的日期 日期校验ie6出错，慎用
		(6)dateISO:true                必须输入正确格式的日期(ISO)，例如：2009-06-23，1998/01/22 只验证格式，不验证有效性
		(7)number:true                 必须输入合法的数字(负数，小数)
		(8)digits:true                    必须输入整数
		(9)creditcard:                   必须输入合法的信用卡号
		(10)equalTo:"#field"          输入值必须和#field相同
		(11)extends:                       输入拥有合法后缀名的字符串（上传文件的后缀）
		(12)maxlength:5               输入长度最多是5的字符串(汉字算一个字符)
		(13)minlength:10              输入长度最小是10的字符串(汉字算一个字符)
		(14)rangelength:[5,10]      输入长度必须介于 5 和 10 之间的字符串")(汉字算一个字符)
		(15)range:[5,10]               输入值必须介于 5 和 10 之间
		(16)max:5                        输入值不能大于5
		(17)min:10                       输入值不能小于10
		*/
		excuteValidate: function($el, name, val, func) {
			switch ($.type(val)) {
				/*email  默认的一些验证规则*/
				case 'boolean':
					return func.call(this, $el);
					break;
					/*equalTo remote rangelength range*/
				case 'string':

					break;
					/* max  min maxlength minlength*/
				case 'number':

					break;
				default:

					break;
			}
		},
		getElementVal: function($el) {
			var el = $el.get(0),
				tagName = el.tagName.toLowerCase();
			if (tagName === 'select') {
				return $el.find('option:selected').val();
			}
			if (this.checkable(el)) {
				return this.findByName(el.name).filter(':checked');
			}
			return $.trim($el.val());
		},
		checkable: function(element) {
			return (/radio|checkbox/i).test(element.type);
		},
		findByName: function(name) {
			return this.currentForm.find("[name='" + name + "']");
		},
		getLength: function(element) {
			return this.getElementVal($(element)).length;
		},
		isRequired: function(element) {
			//返回的是反值
			return $(element).data('required') ? false : true;
		},
		showError: function($el, message) {
			var opts = this.settings;
			var $wrap = $el.closest(opts.closestSelector);
			if (!$wrap.length) {
				console.error('has no warp element');
				return;
			}
			opts.errorClosestClass && $wrap.addClass(opts.errorClosestClass);
			$wrap.find(opts.errorSelector).html(message).addClass(opts.errorShowClass);
		}
	});

	//默认配置
	$.extend($.validator, {
		defaults: {
			errorSelector: '.error', //显示错误元素的选择器
			errorShowClass: 'showError', //显示错误元素的class
			errorClosestClass: '', //验证错误时包裹元素的class
			closestSelector: 'li', //包裹元素的选择器
			messages: {}, //默认错误消息
			rules: {}, //默认验证规则
			ignore: ":hidden", //需要忽略验证的元素选择器
			setDefaults: function(settings) {
				$.extend($.validator.defaults, settings);
			},
			methods: {
				required: function(element, param) {
					return this.isRequired(element) || this.getLength(element) > 0;
				},
				email: function(value, element) {
					return this.isRequired(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
				},
				url: function(value, element) {
					return this.isRequired(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
				},
				date: function(value, element) {
					return this.isRequired(element) || !/Invalid|NaN/.test(new Date(value).toString());
				},
				number: function(value, element) {
					return this.isRequired(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
				},
				digits: function(value, element) {
					return this.isRequired(element) || /^\d+$/.test(value);
				},
				minlength: function(value, element, param) {
					var length = $.isArray(value) ? value.length : this.getLength(value, element);
					return this.isRequired(element) || length >= param;
				},
				maxlength: function(value, element, param) {
					var length = $.isArray(value) ? value.length : this.getLength(value, element);
					return this.isRequired(element) || length <= param;
				},
				rangelength: function(value, element, param) {
					var length = $.isArray(value) ? value.length : this.getLength(value, element);
					return this.isRequired(element) || (length >= param[0] && length <= param[1]);
				},
				min: function(value, element, param) {
					return this.isRequired(element) || value >= param;
				},
				max: function(value, element, param) {
					return this.isRequired(element) || value <= param;
				},
				range: function(value, element, param) {
					return this.isRequired(element) || (value >= param[0] && value <= param[1]);
				},
				equalTo: function(value, element, param) {
					var target = $(param);
					return this.isRequired(element) || value === target.val();
				},
				remote: function(value, element, param) {}
			},
		},
		formate: function(str, obj) {
			var toStr = {}.toString,
				array = Array.prototype.slice.call(arguments, 1),
				result = [];
			if (toStr.call(obj) === '[object Array]') {
				var i = 0,
					len = obj.length;
				for (; i < len; i++) {
					result.push($.validator.formate(str, obj[i]));
				}
				return result.join('');
			}
			return str.replace(/\\?\{\{([^{}]+)\}\}/gm, function(match, name) {
				if (match.charAt(0) == '\\') {
					return match.slice(1);
				}
				var index = Number(name);
				if (index >= 0) {
					return array[index];
				}
				if (obj && obj[name] !== void 0) {
					return obj[name];
				}
				return '';
			});
		}
	});
	//默认的消息
	$.extend($.validator.defaults.messages, {
		required: "必须填写",
		remote: "请修正此栏位",
		email: "请输入有效的电子邮件",
		url: "请输入有效的网址",
		date: "请输入有效的日期",
		dateISO: "请输入有效的日期 (YYYY-MM-DD)",
		number: "请输入正确的数字",
		digits: "只可输入数字",
		creditcard: "请输入有效的信用卡号码",
		equalTo: "你的输入不相同",
		extension: "请输入有效的后缀",
		maxlength: "最多 {{0}} 个字符",
		minlength: "最少 {{0}} 个字符",
		rangelength: "请输入长度为 {{0}} 至 {{1}} 之间的字串",
		range: "请输入 {{0}} 至 {{1}} 之间的数值",
		max: "请输入不大于 {{0}} 的数值",
		min: "请输入不小于 {{0}} 的数值"
	});


}));
