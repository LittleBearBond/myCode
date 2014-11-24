/* *
 * Jquery plugin: 表单验证工具，支持input，textarea，select
 */

/*
 history:
 2013-12-9 create by yinkun
 */

/* *
 * 各个属性的含义
 * conf-validate-id 由函数生成的随机id
 * conf-reg 验证逻辑
 * conf-ajaxreg 异步验证逻辑
 * conf-ajaxplus 异步验证提交的额外数据，空格隔开
 * conf-blanksubmit 为空的时候是否验证该元素为真
 * conf-nosubmit 不验证该元素 - iktodo 还未实现
 */

(function ($) {
    // 用来保证元素唯一性的属性名，其值是时间戳与一个随机数相乘
    var strIdAttribute = 'conf-validate-id';
    $.validate = {
        // 本地验证的正则列表
        type: {
            // 手机号
            tel: /^\d{11}$/,
            // 电子邮件
            email: /^([A-Za-z\d]+)([\._A-Za-z\d-]+)?@([A-Za-z\d])(([_A-Za-z\d-])+)?(\.[_A-Za-z\d-]+)*\.([A-Za-z]{2,4})$/i,
            // 密码
            password: /^[\w\d\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\'\"\,\<\.\>\/\?]{4,20}$/,
            // 姓名
            name: /^([\u4e00-\u9fa5a-zA-Z\s]){2,40}$/,
            // 大街网登录账号
            loginname: /^(1(3|5|8|4)\d{9})$|^(([A-Za-z\d]+)([\._A-Za-z\d-]+)?@([A-Za-z\d])(([_A-Za-z\d-])+)?(\.[_A-Za-z\d-]+)*\.([A-Za-z]{2,4}))$/i,
            // 验证码
            code: /^\d{6}$/,
            // 公司名称
            corpName: /^.{2,40}$/,
            // 职位名称
            jobName: /^.{2,40}$/,
            // 部门验证
            department: /^.{0,40}$/,
            // 地区验证
            area: /^.{0,40}$/
        },
        // 异步验证的地址列表
        ajaxType: {},
        // 删除空格，包括全角的
        trim: function (str) {
            return str.replace(/\s\s*/, '').replace(/\s\s*$/, '');
        },
        // 同步验证，仅验证本地正确性
        sync: function (form, input) {
            // 获取form元素节点，支持id和dom
            var $form = $.type(form) === 'string' ? $('#' + form) : $(form),
                $boxs = $('input, select, textarea', $form);
            // 返回指定元素验证的正确性
            var objResult, boxVid, vid;

            //仅返回指定元素的正确性
            if (arguments.length === 2) {
                var $input = $(input);
                // 验证后的结果保存到结果集中
                $input.trigger('validate');
                vid = $form.attr(strIdAttribute); // 获取验证结果集对象
                objResult = this.baseValidate[vid];
                boxVid = $input.attr(strIdAttribute);
                return objResult[boxVid];
            }

            // 触发每个元素的验证逻辑
            $boxs.each(function (_, box) {
                $(box).trigger('validate');
            });

            vid = $form.attr(strIdAttribute); // 获取验证结果集对象
            objResult = this.baseValidate[vid];
            var result = true;
            for (boxVid in objResult) {
                if (!objResult[boxVid]) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        // 异步验证，如需从后台得到结果，就要使用异步验证
        /* 0 全部正确，1 有的项验证失败，-1 网络有错误*/
        async: function (form, callback) {
            var asyncClose = false;
            var $form = $.type(form) == 'string' ? $('#' + form) : $(form);
            var $boxs = $('input, select, textarea', $form);
            // 先进行本地验证
            if (!this.sync(form)) {
                // 本地验证没有通过，直接返回false
                callback(1);
                asyncClose = true;
                return;
            }
            // 如果没有异步验证的元素直接返回结果
            var objAjax = $.validate.ajaxValidate[$form.attr(strIdAttribute)];
            if (!objAjax) {
                callback(0);
                return;
            }
            // 触发异步验证
            $boxs.trigger('ajaxValidate', [
                function (nowStatus /* 当前异步验证的元素是否验证完毕 */) {
                    // 如果已经返回了信息，后面异步验证的回调就不在执行了
                    if (asyncClose) {
                        return;
                    }
                    if (nowStatus == -1) {
                        // 如果因网络环境验证失败，立即返回
                        callback(-1);
                        asyncClose = true;
                        return;
                    }

                    var numSuccess = 0,
                        numComplete = 0,
                        numLength = $.validate.ajaxValidate[$form.attr(strIdAttribute)]['length'],
                        obj = $.validate.ajaxValidate[$form.attr(strIdAttribute)]['item'];
                    for (var vid in obj) {
                        if (obj[vid]['result'] == 0) {
                            numSuccess += 1;
                        }
                        if (obj[vid]['status'] == 0) {
                            numComplete += 1;
                        }
                    }
                    if (numLength == numSuccess) {
                        // 如果两个数字相等说明异步验证全部结束，且都验证通过
                        callback(0);
                        asyncClose = true;
                    } else if (numLength == numComplete) {
                        // 如果两个数字相等说明异步验证全部结束，但有些项没有验证成功
                        callback(1);
                        asyncClose = true;
                    }
                }
            ]);

        },
        fun: {
            equal: function (equalName, bolBlankSubmit) {
                var tool = $.validate;
                var $this = $(this);
                var value = tool.trim($this.val());
                if (value == '' && !bolBlankSubmit) {
                    return false;
                }
                var $form = $this.closest('form');
                var $equal = $form.find('[name="' + equalName + '"]');
                var equalValue = tool.trim($equal.val());
                return value == equalValue;
            }
        },
        ajaxFun: {},
        // 用来保存每一个元素的验证结果
        baseValidate: {
        },
        ajaxValidate: {
            // length : num, // 需要异步验证的元素数
            // item : {
            //   dom_box : {
            //     status : 1:等待|0:完成|-1网络错误,
            //     result : >0:失败|0:成功,
            //     data : obj, // 异步验证返回的结果
            //     value : 'val' // 后端验证时元素的值
            //   }
            // }
        }
    };
    var objBase = $.validate;
    var objReg = objBase.type;

    $.fn.validate = function () {
        this.each(function () {
            var $box = $(this);
            var name = $box.attr('name');
            var strNodeName = this.nodeName;
            // 是input
            var bolInput = strNodeName == 'INPUT';
            // 是多行文本框
            var bolArea = strNodeName == 'TEXTAREA';
            // 是radio或checkbox
            var bolRadio = bolInput && ($box.attr('type') == 'radio' || $box.attr('type') == 'checkbox');
            // 是输入框
            var bolText = bolInput && (!bolRadio);
            // 当前元素的父级form，正确性的存储和提交都以form为单位进行。
            var $form = $box.closest('form');
            // 是否需要进行异步验证
            var strAjaxReg = $box.attr('conf-ajaxreg');
            if (strAjaxReg) {
                regAjaxValidate($box, $form);
            }

            $box.on('validate', function () {
                var value = objBase.trim($box.val());
                // 本地验证逻辑，可能是regexp或function，如果没有则认为一直是对的
                var baseReg = $box.attr('conf-reg') || '';
                var bolBlankSubmit = $box.attr('conf-blanksubmit');
                // false为不能为空提交，true为可以为空提交
                bolBlankSubmit = !(bolBlankSubmit == undefined || bolBlankSubmit == 'false');
                // 是否通过函数验证
                var bolFunReg = baseReg.slice(0, 4) == 'fun:';
                // 本地验证的结果
                var bolValidate;
                // 如果是是可编辑文本框，先删除空格
                if (bolArea || bolText) {
                    $box.val(value);
                }
                // 为方便多行文本框验证
                value = value.replace(/\n/g, ',');
                if (!bolRadio) {
                    // 如果是input、select、textarea
                    if (!baseReg) {
                        // 没写验证规则，则认为填写任何内容都是正确的
                        // 但是需要判断为空的时候是否为真
                        bolValidate = bolBlankSubmit ? true : (value != '');
                    } else if (bolFunReg) {
                        // 通过函数的方式来验证
                        bolValidate = callWithFunction($box, baseReg, bolBlankSubmit);
                    } else {
                        // 默认为正则验证
                        bolValidate = callWithRegexp(value, baseReg, bolBlankSubmit);
                    }
                } else {
                    // 如果是单选或多选框，仅检测是否有选中的项
                    bolValidate = callForRadio(name, $form);
                }
                // 保存验证后的结果到 baseValidate, 根据不同的form分别保存
                setBaseValidate(bolValidate, $box, $form);
            });
        });
    };

    // 保存验证结果
    function setBaseValidate(bolResult, $box, $form) {
        var obj = $.validate.baseValidate;
        var vid = $form.attr(strIdAttribute);
        var boxVid = $box.attr(strIdAttribute);
        if (!vid) {
            vid = getValidateId();
            $form.attr(strIdAttribute, vid);
        }
        if (!boxVid) {
            boxVid = getValidateId();
            $box.attr(strIdAttribute, boxVid);
        }
        if (!obj[vid]) {
            obj[vid] = {};
        }
        // 根据name保存结果
        obj[vid][boxVid] = bolResult;
    }

    // 通过一个函数得到验证结果
    function callWithFunction($box, baseReg, bolBlankSubmit) {
        var code = baseReg.slice(4).split(',');
        // 接受命名空间
        var arrFunSpace = code[0].split('.');
        // 顶级空间为 $.validate.fun
        var fun = $.validate.fun;
        // 接受参数
        var args = code.slice(1);
        // 将是否可以为空提交的状态当作最后一个参数传给函数
        // 函数内需要自己判断为空时是否为真
        args.push(bolBlankSubmit);
        // 得到真正的函数
        $.each(arrFunSpace, function (i, v) {
            fun = fun[v];
        });
        // 得到验证结果
        return fun.apply($box[0], args);
    }

    // 通过正则表达式得到验证结果
    function callWithRegexp(value, baseReg, bolBlankSubmit) {
        var regexp = baseReg in objReg ? objReg[baseReg] : new RegExp(baseReg);
        if (bolBlankSubmit) {
            return value == '' || regexp.test(value);
        } else {
            return regexp.test(value);
        }
    }

    // checkbox 和 radio 的验证逻辑，只要有选中的就算验证通过
    function callForRadio(name, $form) {
        var namelen = $('[name="' + name + '"]:checked', $form).length;
        return namelen;
    }

    function callWithAjax($box, $form, funCheckCallback) {
        var obj = $.validate.ajaxValidate[$form.attr(strIdAttribute)];
        if (!obj['item']) {
            // 如果之前没有验证过这个form内的项就先创建一个空对象，用于存储
            obj['item'] = {};
        }
        var item = obj['item'];
        var value = $box.val();
        var vid = $box.attr(strIdAttribute);
        if (!vid) {
            vid = getValidateId();
            $box.attr(strIdAttribute, vid);
        }
        var domBox = $box[0];
        var ajaxreg = $box.attr('conf-ajaxreg').split(':');
        // 冒号前半部分是url地址
        var url = $.validate.ajaxType[ajaxreg[0]];
        // 后半部分是回调函数
        var arrFunSpace = ajaxreg[1].split('.');
        // 顶级空间为 $.validate.ajaxFun
        var objAjaxFun = $.validate.ajaxFun;
        // 得到真正的函数
        $.each(arrFunSpace, function (i, v) {
            objAjaxFun = objAjaxFun[v];
        });
        // 如果请求已经返回结果，且元素的值没有发生变化，就不再次发送请求
        // update 131225 by ikuner 还是取消了缓存验证，如果在异步验证的时候还发送了其他表单元素的值，还需要更多的判断和存储，简单做法还是每次发送验证请求
        //    if(item[vid] && value == item[vid]['value'] && item[vid]['status'] == 0){
        //      console.log(item[vid]);
        //      F.apply(dom_box, [item[vid]['data']]);
        //      fun_checkCallback && fun_checkCallback(item[vid]['result']);
        //      return;
        //    }
        item[vid] = {
            status: 1, // 1代表正在异步校验
            value: $box.val()
        };
        // yangfei写的 好恶心 没有找到更好的办法 由于赶进度 先放一下吧
        var tempArr = $box.attr('conf-tempreg') + '';
        if (tempArr == 'true') {
            var data = {
                'result': 0,
                'message': ''
            };
            if (value == $box.val()) {
                // if(temp_arr == 'true') data['result'] = 0;
                item[vid]['status'] = 0;
                item[vid]['result'] = data['result'];
                data['status'] = data['result']; // 为适应后端做的更改
                item[vid]['data'] = data;
                objAjaxFun.apply(domBox, [data]);
                // 调用回调，并告知当前异步验证以成功完成
                funCheckCallback && funCheckCallback(data['result']);
            } else {
                callWithAjax($box, $form, funCheckCallback);
            }
            return;
        }
        $.ajax({
            url: url,
            type: 'post',
            // dataType : 'json',
            data: getSubmitData($box, $form),
            success: function (objResult) {
                // 收到结果后先验证，当前元素的值是否是发送请求时的值，
                // 如果不是，则需要重新发送验证请求
                objResult = JSON.parse(objResult);
                if (value == $box.val()) {
                    // if(temp_arr == 'true') objResult['result'] = 0;
                    item[vid]['status'] = 0;
                    item[vid]['result'] = objResult['result'];
                    objResult['status'] = objResult['result']; // 为适应后端做的更改
                    item[vid]['data'] = objResult;
                    objAjaxFun.apply(domBox, [objResult]);
                    // 调用回调，并告知当前异步验证以成功完成
                    funCheckCallback && funCheckCallback(objResult['result']);
                } else {
                    callWithAjax($box, $form, funCheckCallback);
                }
            },
            complete: function (_, status) {
                if (status != 'success') {
                    item[vid] = {
                        status: -1,
                        value: ''
                    };
                    // 调用回调，并告知当前异步验证失败，原因是网络错误
                    funCheckCallback && funCheckCallback(-1);
                }
            }
        });
    }

    function regAjaxValidate($box, $form) {
        var obj = $.validate.ajaxValidate;
        var vid = $form.attr(strIdAttribute);
        if (!vid) {
            vid = getValidateId();
            $form.attr(strIdAttribute, vid);
        }
        if (!obj[vid]) {
            // 如果之前没有验证过这个form内的项就先创建一个空对象，用于存储
            obj[vid] = {};
            obj[vid]['length'] = 1;
        } else {
            obj[vid]['length'] += 1;
        }
        // 第二个参数是提交验证的时候判断是否所有的验证都返回的方法
        $box.on('ajaxValidate', function (e, funCheckCallback) {
            callWithAjax($(this), $form, funCheckCallback);
        });
    }

    // 根据时间戳生成一个随机id
    function getValidateId() {
        return 'validate' + (((new Date() - 0) * Math.random()) >> 0);
    }

    function getSubmitData($box, $form) {
        var data = {
            value: $box.val()
        };
        var arrPlusName;
        if ($box.attr('conf-ajaxplus')) {
            arrPlusName = $box.attr('conf-ajaxplus').split(' ');
            $.each(arrPlusName, function (_, name) {
                data[name] = $('[name="' + name + '"]', $form).val();
            });
        }
        return data;
    }
})(Zepto);