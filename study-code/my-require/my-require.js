/**
 * author           xj
 * @date            2015-11-17 15:30:52
 * @email           568915669@qq.com
 * @description
 */
var define, require;
(function() {
    var toStr = {}.toString,
        arrProto = Array.prototype,
        nativeForEach = arrProto.forEach,
        isType = function(type) {
            return function(obj) {
                return {}.toString.call(obj) == "[object " + type + "]"
            }
        },
        isArray = Array.isArray || isType("Array"),
        isFunction = isType("Function"),
        each = function(obj, callback, context) {
            if (obj.forEach === nativeForEach) {
                obj.forEach(callback, context);
                return;
            }
            var len = obj.length,
                i = 0;
            if (len !== +obj.length) {
                return;
            }
            while (i < len) {
                if (callback.call(context, obj[i], i, obj) === false) {
                    return;
                }
                i++;
            }
        }

    //存储所有模块的相关信息
    var modules = {},
        //缓存build过的module
        cacheMoude = {};
    define = function(id, deps, factory) {
        if (modules[id]) {
            throw new Error('has module ' + id);
        }
        //有依赖
        if (arguments.length > 2) {
            modules[id] = {
                id: id,
                deps: deps,
                factory: factory
            };
            return;
        }
        //没有依赖
        modules[id] = {
            id: id,
            factory: deps
        };
    };

    require = function(ids, callback) {
        if (isArray(ids)) {
            /**
             * require(['xx','XXX'],fn?)
             */
            if (ids.length > 1) {
                return makeRequire(ids, callback);
            }

            /**
             * 只有一个值
             * require(['XXX'],fn?)
             * @type {[type]}
             */
            ids = ids[0];
        }
        var module = modules[ids];
        if (!module) {
            throw new Error('module' + ids + ' not found ');
        }
        /**
         * require('xx',function (x) { });
         */
        if (callback) {
            module = build(module);
            callback(module);
            return module;
        }
        /**
         * require('xx')
         */
        if (module.factory) {
            return build(module);
        }
        return module.exports;
    };

    function makeRequire(ids, callback) {
        var temp = [];
        each(ids, function(val) {
            temp.push(build(modules[val]));
        });
        isFunction(callback) && callback.apply(null, temp);
    }

    /**
     * module={
     *     id: id,
     *     deps: deps,
     *     factory: factory
     * }
     * 调用module的factory 得到模块的export，一个模块执行一次即可
     */
    function build(module) {
        var deps = module.deps,
            id = module.id,
            factory = module.factory;

        if (cacheMoude[id]) {
            return cacheMoude[id];
        }
        //存储对外暴露的方法
        module.exports = {};

        //去重,只build一次
        delete module.factory;

        if (!deps) {
            module.exports = factory(require, module.exports, module) || module.exports;
        } else {
            var depsList = parseDeps(module);
            module.exports = factory.apply(module, depsList);
        }

        return cacheMoude[id] = module.exports;
    }

    /**
     * 解析依赖
     * module = {
     *     id: xxx,'xx',
     *     deps: ['xx','xxx','xxxxx'],
     *     factory: xx
     * }
     * 取到对应想 'xx'，'xxx'，'xxxxx'
     */
    function parseDeps(module) {
        var temp = [];
        each(module.deps, function(val, index) {
            temp.push(build(modules[val]));
        });
        return temp;
    }

}());
