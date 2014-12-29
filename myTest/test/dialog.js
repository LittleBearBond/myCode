var template = function(src, options, ori) {

	var curStr;
	//$.support为特征检测，checkOn IE返回false
	if (!$.support.checkOn) {
		curStr = src;
	} else {
		curStr = [];
		var len = src.length;
		var i;
		for (i = 0; i < len; i++) {
			curStr.push(src[i]);
		}
		curStr = curStr.join("");
	}

	var formatReg = new RegExp("#{([a-z0-9_]+)}", "ig");
	curStr = curStr.replace(formatReg, function(match, f1, index, srcStr) {
		return options[f1] ? options[f1] : (ori ? match : "");
	});
	return curStr;

};
(function(factory) {
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery"], factory);
	} else {
		factory(jQuery);
	}
}(function($) {
	'use strict';

	var Dialog = function(options) {
		this.title;
		this.content;
		this.width;
		this.height;
		this.fixed;
		this.$main;
		this.$dialog;
		this.$shadow;
		this.$closeBtn;
		this.$buttonBox;
		this.button;
		this.ok;
		this.okValue;
		this.cancel;
		this.cancelValue;
		this.cancelDisplay;
		this.options;
		this.originalOptions;
		this.init(options);
	}

	var wrapperHTML = ['<div class="d-dialog">',
		'<div class="d-wrapper">',
		'<div class="d-close"></div>',
		'<div class="d-main">',
		'<div class="d-title">#{title}</div>',
		'<div class="d-content">#{content}</div>',
		'<div class="d-bottom"></div>',
		'</div>',
		'</div>',
		'</div>',
		'<div class="d-shadow"></div>'
	].join("");

	Dialog.DEFAULTS = {
		title: "Dialog",
		content: "这是Dialog",
		width: "auto",
		height: "auto",
		okValue: "确定",
		cancelValue: "取消",
		cancelDisplay: true,
		fixed: false,
		autofocus: true
	}

	$.extend(Dialog.prototype, {
		_center: function() {
			var d = this.$dialog;
			var $window = $(window);
			var $document = $(document);
			var fixed = this.fixed;
			var dl = fixed ? 0 : $document.scrollLeft();
			var dt = fixed ? 0 : $document.scrollTop();
			var ww = $window.width();
			var wh = $window.height();
			var ow = d.width();
			var oh = d.height();
			var left = (ww - ow) / 2 + dl;
			var top = (wh - oh) * 382 / 1000 + dt; // 黄金比例
			var style = d[0].style;

			style.left = Math.max(parseInt(left), dl) + 'px';
			style.top = Math.max(parseInt(top), dt) + 'px';
		}
	});

	$.extend(Dialog.prototype, {
		init: function(options) {

			this.options = this.getOptions(options);
			this.originalOptions = $.extend(true, {}, this.options);

			var tmp = template(wrapperHTML, this.options),
				that = this;

			this.$main = $(tmp);
			this.$closeBtn = this.$main.find(".d-close");
			this.$dialog = this.$main.siblings(".d-dialog");
			this.$shadow = this.$main.siblings(".d-shadow");
			this.$buttonBox = this.$main.find(".d-bottom");


			//bind close btn
			$(document).on("click", ".d-close", function(e) {

				that.remove();

				e.stopPropagation();
			});
		},

		create: function() {
			// button handle
			this.options = this.getOptions(this.originalOptions);

			var options = this.options;
			if (!$.isArray(options.button)) {
				options.button = [];
			}
			// 取消按钮
			if (options.cancel) {
				options.button.push({
					id: 'cancel',
					value: options.cancelValue,
					callback: options.cancel,
					display: options.cancelDisplay
				});
			}

			// 确定按钮
			if (options.ok) {
				options.button.push({
					id: 'ok',
					value: options.okValue,
					callback: options.ok,
					autofocus: true
				});
			}

			this.button(options.button);
		},

		//get default config
		getDefaults: function() {
			return Dialog.DEFAULTS;
		},

		//get options
		getOptions: function(options) {
			return $.extend(true, {}, this.getDefaults(), options);
		},

		//show
		show: function() {
			this.create();
			$("body").append(this.$main);
			this._center();
			this.$dialog.show();
			this.$shadow.show();
			return this;
		},

		//hide dialog
		close: function() {
			this.$main.hide();
			return this;
		},

		//remove dialog
		remove: function() {
			this.$main.remove();
			return this;
		},

		//button定义，arg
		button: function(args) {
			args = args || [];
			var that = this;
			var html = '';
			var number = 0;
			this.callbacks = {};

			if (typeof args === 'string') {
				html = args;
				number++;
			} else {
				$.each(args, function(i, val) {

					var id = val.id = val.id || val.value;
					var style = '';
					that.callbacks[id] = val.callback;

					if (val.display === false) {
						style = ' style="display:none"';
					} else {
						number++;
					}

					html +=
						'<button' + ' type="button"' + ' class="btn"' + ' i-id="' + id + '"' + style + (val.disabled ? ' disabled' : '') + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : '') + '>' + val.value + '</button>';

					that.$buttonBox
						.on('click', '[i-id=' + id + ']', function(e) {
							var $this = $(this);
							if (!$this.attr('disabled')) { // IE BUG
								that._trigger(id);
							}
							e.preventDefault();
						});

				});
			}

			this.$buttonBox.html(html);
			return this;
		},

		focus: function() {

		},

		blur: function() {

		},

		//button
		ok: function() {

		},

		cancel: function() {

		},

		// 触发按钮回调函数
		_trigger: function(id) {
			var fn = this.callbacks[id];

			return typeof fn !== 'function' || fn.call(this) !== false ?
				this.close().remove() : this;
		}
	});

	//event
	$.extend(Dialog.prototype, {
		onshow: function() {

		},

		onclose: function() {

		},

		onfocus: function() {

		},

		onbeforeremove: function() {

		},

		onremove: function() {

		},

		onblur: function() {

		}

	});

	$.dialog = function(options) {
		return new Dialog(options);
	}

}));
