(function ($) {
    var obj_ajaxType = $.validate.ajaxType;
    var obj_ajaxFun = $.validate.ajaxFun;
    $.easyValidate = function (options, callback) {
        var num_header = parseInt($('.dj-base-wrap').css('padding-top'));
        var ajaxLimit = false; // 防止重复点击
        var clsValidate = 'J_pageValidateItem';
        var idForm = options['strFormID']; // form的id
        var idBtn = options['strBtnID']; // 提交按钮的id
        var validateDate = options['item']; //需要验证的每一个表单元素以及一些验证信息
        var urlForm = options['urlFormAction']; // form action
        var urlNext = options['urlNext']; // 表单提交后要跳转到的页面
        var errorNum = 0;
        // 每个验证元素的父级节点类型，用于定位报错信息
        var nodeParentWrap = options['nodeType'] || 'li';
        if (!validateDate) return;
        var $form = $('#' + idForm);
        $.each(validateDate, function (key, obj_option) {
            // 获得验证元素节点
            var $dom = $('[name="' + key + '"]', $form);
            var nameUrl, funUrl;
            $dom.addClass(clsValidate);
            $dom.attr({
                'conf-reg': obj_option['reg'],
                'conf-blanksubmit': obj_option['blanksubmit'],
                'data-regerr': obj_option['regErr'],
                'data-regempty': obj_option['regEmpty']
            });
            // 如果需要异步验证
            var url = obj_option['url'];
            if (url) {
                if (obj_ajaxType[url]) {
                    nameUrl = url;
                } else {
                    nameUrl = idForm + key + 'url';
                    obj_ajaxType[nameUrl] = url;
                }
                funUrl = 'p_fun_' + idForm + key;
                $dom.attr({
                    'conf-ajaxreg': nameUrl + ':' + funUrl,
                    'conf-ajaxplus': obj_option['urlPlus']
                });
                obj_ajaxFun[funUrl] = function (data) {
                    var $dom = $(this);
                    var txtErr = obj_option['urlErr' + data['status']] || obj_option['urlErr'];
                    if (data['status'] != 0 && errorNum <= 0) {
                        window.scrollTo(0, $dom.offset()['top'] - 30 - num_header);
                        showError($dom, data.message);
                        errorNum++;
                    }
                }
            }
        });

        var $btn = $('#' + idBtn);
        var $input = $('.' + clsValidate, $form);
        var soucePage = $('#sourcePage');
        $input.validate();
        $form.find('input, select, textarea').bind('focus click keydown', function () {
            var $dom = $(this);
            // hideError($dom);
            hideError();
            errorNum = 0;
        }).bind('blur', function () {
            var $dom = $(this);
            hideError($dom);
        });
        $input.on('easyvalidate', function (e, str_error) {
            var dom = this;
            var $dom = $(dom);
            hideError();
            if (!$.validate.sync($form, dom)) {
                var header = $('.dj-base-wrap').height();
                window.scrollTo(0, $dom.offset()['top'] - 30 - num_header);
                if (dom.value == '' && dom.getAttribute('data-regempty')) {
                    showError($dom, dom.getAttribute('data-regempty'));
                } else {
                    showError($dom, dom.getAttribute('data-regerr'));
                }
            }
            if (str_error) {
                showError($dom, str_error);
            }
        });

        $btn.click(function (e) {
            e.preventDefault();
            if ($btn.hasClass('i-btn-disabled')) return;
            // if(errorNum !=0 ) errorNum = 0;
            if ($.validate.sync($form)) {
                $.validate.async($form, function (status) {
                    if (status != 1) {
                        if (status == -1) {
                            callback(-1);
                            return;
                        }
                        if (!urlForm) {
                            callback({ result: 0 }, function (msg) {
                                location.replace(urlNext.replace('{msg}', msg));
                            });
                        } else {
                            $.ajax({
                                url: urlForm,
                                type: $form.attr('method'),
                                // dataType : 'json',
                                data: $form.serialize(),
                                beforeSend: function () {
                                    if (ajaxLimit) {
                                        return false;
                                    } else {
                                        ajaxLimit = true;
                                    }
                                },
                                success: function (r) {
                                    var r = JSON.parse(r);
                                    if (urlNext == '' || urlNext == '#') {
                                        return callback(r);
                                    }
                                    callback(r, function (msg) {
                                        location.replace(urlNext.replace('{msg}', msg));
                                    });
                                },
                                complete: function (r) {
                                    ajaxLimit = false;
                                }
                            });
                        }
                    }
                });
                return;
            }
            var scroll = true;
            hideError();
            $input.each(function (_, dom) {
                if (!$.validate.sync($form, dom)) {
                    if (scroll) {
                        window.scrollTo(0, $(dom).offset()['top'] - 30 - num_header);
                        scroll = false;
                    }
                    if (dom.value == '' && dom.getAttribute('data-regempty')) {
                        showError($(dom), dom.getAttribute('data-regempty'));
                    } else {
                        showError($(dom), dom.getAttribute('data-regerr'));
                    }
                    return false;
                }
            });

        });

        function getError($dom) {
            if (!$dom) {
                return $form.find('.error');
            }
            var $error = $dom.closest(nodeParentWrap).find('.error');
            return $error.length > 1 ? $('') : $error;
        }
        function showError($dom, txtErr) {
            var $err = getError($dom);
            $err.addClass('showError');
            if (txtErr) {
                $err.html(txtErr);
            }
        }
        function hideError($dom) {
            var $err = getError($dom);
            $err.removeClass('showError').removeClass('showTip').html('&nbsp;');
        }
        function showTip($dom, txtTip) {
            var $tip = getError($dom);
            $tip.addClass('showTip');
            if (txtTip) {
                $tip.html(txtTip);
            }
        }
        $form.bind('clear', function () {
            $form[0].reset();
            hideError();
        });
    };

})(Zepto);