/**
 * BearTemplate1.0.0  版本
 * https://github.com/LittleBearBond/MyTemplate
 * 2014-03-16
 */
(function(global) {
    var dataRegex = /\{[\@\$].+?\}/ig,
        funcs = {},
        nativeForEach = Array.prototype.forEach,
        classType = {};
    global.BearTemplate = function(templateObj, sets) {
        var template = document.getElementById(templateObj);
        sets && mt.isObject(sets) && (funcs = mt.extend({}, sets));
        if (!template) {
            return function() {
                return "模板为空";
            };
        }
        //存储要替换的对象
        var dataItems,
            html = /^(textarea|input)$/i.test(template.nodeName) ? template.value : template.innerHTML,
            templateContent = mt.trim(html); //模板文本
        //把编码的替换回来
        templateContent = mt._decodeChar(templateContent);
        dataItems = handleDataItem(templateContent);

        var render = function(data, gData) {
            var tpl = templateContent,
                handleResult = [];
            mt.isObject(data) && (data = mt.extend(data, gData));
            if (mt.isArray(data)) {
                mt.each(data, function(val) {
                    gData && (val = mt.extend({}, val, gData));
                    handleResult.push(excuteRender(dataItems, tpl, val));
                });
            } else {
                handleResult.push(excuteRender(dataItems, tpl, data));
            }
            return handleResult.join('');
        };
        return render;
    };

    var mt = global.BearTemplate;
    mt.vesion = "1.0.0";

    mt.extend = function() {
        var o = {},
            c,
            args = arguments,
            len = args.length,
            start = 1,
            src = args[0];
        if (mt.isObject(src)) {
            for (c in src) {
                mt.hasOwn.call(src, c) && (o[c] = src[c]);
            }
        }
        for (; start < len; start++) {
            var curr = args[start];
            if (mt.isObject(curr)) {
                for (c in curr) {
                    mt.hasOwn.call(curr, c) && (o[c] = curr[c]);
                }
            }
        }
        return o;
    };

    mt.toString = classType.toString;

    mt.hasOwn = classType.hasOwnProperty;

    mt.type = function(obj) {
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            classType[mt.toString.call(obj)] || "object" :
            typeof obj;
    };

    mt.isArray = Array.isArray || function(obj) {
        return mt.type(obj) === "array";
    };

    mt.isFunction = function(obj) {
        return mt.type(obj) === "function";
    };

    mt.each = function(obj, callback, context) {
        if (obj == null) {
            return;
        }
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(callback, context);
        } else if (obj.length === +obj.length) {
            //for循环迭代
            for (var i = 0, l = obj.length; i < l; i++) {
                if (!callback.call(context, obj[i], i, obj)) {
                    break;
                }
            }
        }
    };

    //判断是否是Object类型
    mt.isObject = function(source) {
        return (!!source) && (source.constructor === Object);
    };

    //处理模板替换对象
    mt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(name, i) {
        classType["[object " + name + "]"] = name.toLowerCase();
    });

    mt.trim = function(str) {
        return str.replace(/(^\s*)/g, '').replace(/(\s*)$/g, '');
    };

    mt._decodeChar = function(str) {
        return str.replace(/%7B/ig, "{").replace(/%7D/ig, "}").replace(/%28/ig, "(").replace(/%29/ig, ")")
    };

    //HTML转义
    mt._encodeHTML = function(source) {
        return String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\\/g, '&#92;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    //转义影响正则的字符
    mt._encodeReg = function(source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
    };

    mt.settings = {
        isTextEncode: true,
        isHtmlEncode: false
    };

    function handleDataItem(templateContent) {
        var match = templateContent.match(dataRegex),
            dataItems = [],
            item;
        if (match && match.length) {
            var i = 0,
                len = match.length,
                matchItem;
            for (; i < len; i++) {
                //得到要替换的 如{@name}
                matchItem = match[i];
                //得到匹配结果 去掉左右的{}得到如：@name
                item = matchItem.substring(1, matchItem.length - 1);
                var hasItem = false,
                    j = 0,
                    dataItemsLen = dataItems.length;
                //判断是否已经处理过该项
                for (; j < dataItemsLen; j++) {
                    if (item == dataItems[j].item) {
                        hasItem = true;
                        break;
                    }
                }
                if (!hasItem) {
                    var tree = next(item.replace(/\s*/g, ""));
                    dataItems.push({
                        item: item,
                        replaceItem: matchItem, //new RegExp(replace, "ig"),
                        tree: tree
                    });
                }
            }
        }
        return dataItems;
    }

    /*处理参数
      1、@index  处理单个参数
      2、@index,@name,@addr 处理多个
      3、$fromate(@name,@index,'123') 处理函数调用，函数里面有替换参数对象也有常量
      4、'123' 直接是常量
      */

    function next(item, args) {
        if (!item || !item.length) {
            return args || null;
        }
        var ch = item.charAt(0),
            tree = args || [];
        switch (ch) {
            case "$":
                var func = readFunc(item);
                //处理得到函数的名字，以及函数的参数args，用于后续的apply
                tree.push({
                    type: "function",
                    name: func.name,
                    args: next(func.spare)
                });
                break;
            case "@":
                var para = readParam(item);
                tree.push({
                    type: "param",
                    name: para.name
                });
                next(para.spare, tree); //递归处理剩下的
                break;
            default:
                var constPara = readConst(item);
                tree.push({
                    type: "const",
                    value: constPara.value
                });
                next(constPara.spare, tree); //递归处理剩下的
                break;
        }
        return tree;
    }

    //读取函数和参数信息

    function readFunc(item) {
        //取得函数的名字
        var funcName = item.substring(1, item.indexOf("(")),
            //取得剩下的参数部分
            spare = item.substring(1 + funcName.length + 1, item.length - 1);
        //返回函数名字和剩余的部分
        return {
            name: funcName,
            spare: spare
        };
    }

    //读取要替换的参数

    function readParam(item) {
        var index = item.indexOf(","),
            itemLen = item.length,
            spare,
            paramName = index < 0 ? //是否是多个对象  @index,@name
            item.substring(1, itemLen) : //只是一个,直接取得名字
            item.substring(1, index); //取得第一个
        spare = index < 0 ?
            '' : //这个只是空
            item.substring(1 + paramName.length + 1, itemLen); //取得剩下的部分 @name
        return {
            name: paramName,
            spare: spare
        };
    }

    //读取常量

    function readConst(item) {
        var index = item.indexOf(","),
            itemLen = item.length,
            spare,
            value = index < 0 ?
            item.substring(0, itemLen) :
            item.substring(0, index);
        spare = index < 0 ?
            '' :
            item.substring(value.length + 1, itemLen);
        return {
            value: value,
            spare: spare
        };
    }

    //执行相关操作，得到处理后的数据

    function renderData(data, tree) {
        var result = "",
            root;
        root = mt.isArray(tree) && tree.length ? tree[0] : tree;
        if (root == null) {
            return result;
        }
        switch (root.type) {
            //如果是函数 就调用并且返回结果
            case "function":
                if (mt.hasOwn.call(funcs, root.name) && mt.isFunction(funcs[root.name])) {
                    result = funcs[root.name].apply(data, makeArgs(data, root.args));
                } else {
                    var fun = window[root.name];
                    result = mt.isFunction(fun) ? fun.apply(data, makeArgs(data, root.args)) : root.name;
                }
                break;
                //是参数类型，直接替换
            case "param":
                result = getDataItem(data, root.name);
                break;
                //常量就直接返回
            case "const":
                result = root.value;
                break;
            default:
                break;
        }
        return result;
    }

    //处理多个参数，循环调用renderData 取到每个参数对应的数据，构造成数组

    function makeArgs(data, tree) {
        var args = [],
            i = 0,
            len = tree.length;
        if (mt.isArray(tree)) {
            for (; i < len; i++) {
                args.push(renderData(data, tree[i]));
            }
        }
        return args;
    }

    //取得数据 不区分键的大小写

    function getDataItem(data, propertyName) {
        for (var p in data) {
            if (data.hasOwnProperty(p) && p.toString().toUpperCase() == propertyName.toUpperCase()) {
                return data[p];
            }
        }
        return propertyName;
    }

    function excuteRender(dataItems, tpl, data) {
        var result = tpl,
            i = 0,
            dataItemslen = dataItems.length;
        //执行相关替换，得到对于的模板
        for (; i < dataItemslen; i++) {
            var currItem = dataItems[i],
                replaceItem = currItem.replaceItem;
            //处理过后的模板中存在这个键  这里有待优化  每次检查性能肯定有影响
            if (!!~result.indexOf(replaceItem)) {
                //处理Item 取到相关的数据
                var value = renderData(data, currItem.tree);
                if (mt.settings.isTextEncode) {
                    value = mt._encodeHTML(value);
                }
                //regReplace = new RegExp(replaceItem.replace('{', '\\{').replace('}', '\\}').replace('(', '\\(').replace(')', '\\)').replace('$', '\\$'), 'g');
                //result = result.replace(regReplace, value);
                //while (result.indexOf(replaceItem) > 0) {
                //    result = result.replace(replaceItem, value);
                //}
                result = result.replace(new RegExp(mt._encodeReg(replaceItem), 'g'), value);
            }
        }
        return result;
    }
})(window);
