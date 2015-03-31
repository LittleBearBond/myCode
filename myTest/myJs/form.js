/**
 * 处理表单数据
 * @autohr qiang.hu
 */

/* 获取一个容器中的表单数据，包括模拟控件的值 */
$.fn.getFormData = function() {
	var result = {};
	this.each(function(index, element) {
		var items = $(element).find('*'),
			checkBoxs = {},
			arrayInput = {},
			l = items.length,
			i;
		for (i = 0; i < l; i++) {
			var item = items[i],
				itemName = item.name,
				itemValue = item.value,
				itemType = (item.type + '').toUpperCase(),
				itemNodeName = (item.nodeName + '').toUpperCase(),
				$item = $(item);
			//模拟的控件
			var inputType = item.getAttribute('input');

			//标签列表
			if ('tag_list' === inputType) {
				itemName = item.getAttribute('name');
				itemValue = [];

				$(item).children().each(function(index, element) {
					itemValue.push($(element).attr('value'));
				});
				itemValue = itemValue.join(',');
				//checkbox
			} else if ('checkbox' === inputType) {
				if ($item.hasClass('checked') || $item.hasClass('up') /* 加星的控件，有1-3个状态，每个状态的value不一样 */ ) {
					itemName = item.getAttribute('name');
					itemValue = item.getAttribute('value');
				}
			}
			if (itemName) {
				if ('SELECT' === itemNodeName) {
					var opt, index = item.selectedIndex;
					if (index >= 0) {
						opt = item.options[index];
						result[itemName] = opt.value;
					}
				} else if ('RADIO' === itemType || 'CHECKBOX' === itemType) {
					if (!item.checked) {
						itemValue = item.getAttribute('default') + '';
						if (itemValue === '') {
							contiune;
						}
					}

					if ('CHECKBOX' === itemType) {
						if (checkBoxs[itemName]) {
							checkBoxs[itemName].push(itemValue);
						} else {
							checkBoxs[itemName] = [itemValue];
						}
					} else {
						result[itemName] = itemValue;
					}

				} else {
					if (/\[\]$/i.test(itemName)) {
						if (arrayInput[itemName]) {
							arrayInput[itemName].push(itemValue);
						} else {
							arrayInput[itemName] = [itemValue];
						}
					} else {
						result[itemName] = itemValue;
					}
				}
			}
		}
		for (item in checkBoxs) {
			//如果checkbox只有一个，就不用数组保存了
			var _value = checkBoxs[item];
			if (1 === _value.length) {
				_value = _value[0];
			}
			result[item] = _value;
		}
		for (item in arrayInput) {
			result[item] = arrayInput[item];
		}
	});
	return result;
};

/**
 * 验证一个表单
 * eg. <input type="text" name="username" required="请填写此项" length="5,20" />
 *      <input type="password" name="password" format="password" required length="5,20" />
 * @return {boolean} 表单是否通过验证，如果有多个表单，只要有一个表单验证失败即返回false
 */
$.fn.check = function() {
	var result = true;
	this.each(function(index, element) {
		var elements = $(element).find('*'),
			i = 0,
			l = elements.length,
			errorMsg,
			hasFocused = false;

		for (; i < l; i++) {
			var inputElement = elements[i],
				inputName = inputElement.name;
			if (!inputName) {
				continue;
			}
			var required = inputElement.getAttribute('required'),
				elInput = $(inputElement),
				inputValue = inputElement.value.trim(),
				inputLabel = inputElement.getAttribute('label') || inputElement.getAttribute('placeholder') || inputName;
			errorMsg = '';
			if ('' === inputValue) { //如果值为空则检查是否必填
				if (null !== required) {
					errorMsg = required || '请填写此项';
				}
			} else { //值不为空则检查格式
				var lengthAttr = inputElement.getAttribute('length'); //检查长度
				if (lengthAttr) {
					var valueLength = inputValue.length,
						lengthRange = lengthAttr.split(','),
						minLength = parseInt(lengthRange[0] || 0, 10),
						maxLegnth = parseInt(lengthRange[1] || 0, 10);

					var lengthLabel = inputElement.getAttribute('length_label') || '',
						lengthLabelArray = lengthLabel.split(','),
						minLengthLabel = lengthLabelArray[0] || '你的' + inputLabel + '太短啦，再多写几句吧',
						maxLegnthLabel = lengthLabelArray[1] || '你的' + inputLabel + '太长啦';
					if (valueLength < minLength) {
						errorMsg = minLengthLabel;
					} else if (maxLegnth && valueLength > maxLegnth) {
						errorMsg = maxLegnthLabel;
					};
				}
			}

			elInput.showInputErrorMessage(errorMsg, element);
			if (errorMsg) {
				if ('file|radio|checkbox|button'.indexOf(inputElement.type) < 0 && !hasFocused) {
					inputElement.focus();
					hasFocused = true;
				}
				result = false;
			}
		}
	});

	return result;
};

/**
 * 在单个表单控件后面显示一条错误提示
 */
$.fn.showInputErrorMessage = function(errorMsg, $formWrap) {
	return this.each(function(index, element) {
		var inputName = element.name.replace(/[\[\]]/g, ''),
			elInput = $(element),
			$formWrap = $formWrap || elInput.parent();
		var elInputError = $formWrap.find('.input_error[for="' + inputName + '"]');
		if (errorMsg) {
			if (elInputError.length < 1) {
				elInputError = $('<div class="input_error" for="' + inputName + '">' + errorMsg + '</div>').insertAfter(element);
			} else {
				elInputError.html(errorMsg).css('display', 'block');
			}
			elInputError.css('left', elInput.outerWidth() + 'px');
			elInput.addClass('error');
		} else {
			elInput.removeClass('error');
			elInputError.css('display', 'none');
		}
		var elInputError = $formWrap.find('.input_error[for="' + inputName + '"]');

		if (errorMsg) {
			if (elInputError.length < 1) {
				elInputError = $('<div class="input_error" for="' + inputName + '">' + errorMsg + '</div>').insertAfter(element);
			} else {
				elInputError.html(errorMsg).css('display', 'block');
			}

			elInputError.css('left', (elInput.outerWidth() + elInput.position().left) + 'px');

			elInput.addClass('error');
		} else {
			elInput.removeClass('error');
			elInputError.css('display', 'none');
		}
	});

};

/**
 * 在整个表单中显示一条提示
 */
$.fn.showFormTip = function(message, className) {
	return this.each(function(element) {
		var msgEl = $('.form_tip', element);
		if (msgEl.length < 1) {
			msgEl = $('<div class="form_tip"></p>').prependTo(element);
		}
		msgEl.attr('class', 'form_tip ' + className).html(message);
	});
};
var fileUpload = {
	fileInput: null, //html file控件
	dragDrop: null, //拖拽敏感区域
	upButton: null, //提交按钮
	url: "", //ajax地址
	fileFilter: [], //过滤后的文件数组
	filter: function(files) { //选择文件组的过滤方法
		return files;
	},
	onSelect: function() {}, //文件选择后
	onDelete: function() {}, //文件删除后
	onDragOver: function() {}, //文件拖拽到敏感区域时
	onDragLeave: function() {}, //文件离开到敏感区域时
	onProgress: function() {}, //文件上传进度
	onSuccess: function() {}, //文件上传成功时
	onFailure: function() {}, //文件上传失败时,
	onComplete: function() {}, //文件全部上传完毕时

	/* 开发参数和内置方法分界线 */

	//文件拖放
	funDragHover: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this[e.type === "dragover" ? "onDragOver" : "onDragLeave"].call(e.target);
		return this;
	},
	//获取选择文件，file控件或拖放
	funGetFiles: function(e) {
		// 取消鼠标经过样式
		this.funDragHover(e);

		// 获取文件列表对象
		var files = e.target.files || e.dataTransfer.files;
		//继续添加文件
		this.fileFilter = this.fileFilter.concat(this.filter(files));
		this.funDealFiles();
		return this;
	},

	//选中文件的处理与回调
	funDealFiles: function() {
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			//增加唯一索引值
			file.index = i;
		}
		//执行选择回调
		this.onSelect(this.fileFilter);
		return this;
	},

	//删除对应的文件
	funDeleteFile: function(fileDelete) {
		var arrFile = [];
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			if (file != fileDelete) {
				arrFile.push(file);
			} else {
				this.onDelete(fileDelete);
			}
		}
		this.fileFilter = arrFile;
		return this;
	},

	//文件上传
	funUploadFile: function() {
		var self = this;
		if (location.host.indexOf("sitepointstatic") >= 0) {
			//非站点服务器上运行
			return;
		}
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			(function(file) {
				var xhr = new XMLHttpRequest();
				if (xhr.upload) {
					// 上传中
					xhr.upload.addEventListener("progress", function(e) {
						self.onProgress(file, e.loaded, e.total);
					}, false);

					// 文件上传成功或是失败
					xhr.onreadystatechange = function(e) {
						if (xhr.readyState == 4) {
							if (xhr.status == 200) {
								self.onSuccess(file, xhr.responseText);
								self.funDeleteFile(file);
								if (!self.fileFilter.length) {
									//全部完毕
									self.onComplete();
								}
							} else {
								self.onFailure(file, xhr.responseText);
							}
						}
					};

					// 开始上传
					xhr.open("POST", self.url, true);
					xhr.setRequestHeader("X_FILENAME", file.name);
					xhr.send(file);
				}
			})(file);
		}

	},

	init: function() {
		var self = this;

		if (this.dragDrop) {
			this.dragDrop.addEventListener("dragover", function(e) {
				self.funDragHover(e);
			}, false);
			this.dragDrop.addEventListener("dragleave", function(e) {
				self.funDragHover(e);
			}, false);
			this.dragDrop.addEventListener("drop", function(e) {
				self.funGetFiles(e);
			}, false);
		}

		//文件选择控件选择
		if (this.fileInput) {
			this.fileInput.addEventListener("change", function(e) {
				self.funGetFiles(e);
			}, false);
		}

		//上传按钮提交
		if (this.upButton) {
			this.upButton.addEventListener("click", function(e) {
				self.funUploadFile(e);
			}, false);
		}
	}
};
