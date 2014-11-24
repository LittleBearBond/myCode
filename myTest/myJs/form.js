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
                if ($item.hasClass('checked') || $item.hasClass('up') /* 加星的控件，有1-3个状态，每个状态的value不一样 */) {
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
