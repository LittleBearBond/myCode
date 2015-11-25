/* @grunt-build */
define(function(require, exports, module) {
    //1、-------------------------------
    /*// 对外提供 foo 属性
    exports.foo = 'bar';
    // 对外提供 doSomething 方法
    exports.doSomething = function() {};*/


    //2、-------------------------------
    // 通过 return 直接提供接口
    /*return {
        foo: 'bar',
        doSomething: function() {}
    };*/

    //3、-------------------------------
    /*define({
        foo: 'bar',
        doSomething: function() {}
    });*/

    //4、-------------------------------
    // 错误用法！！!
    /*exports = {
        foo: 'bar',
        doSomething: function() {}
    };*/

    // 正确写法
    /*module.exports = {
        foo: 'bar',
        doSomething: function() {}
    };*/
    /*console.dir(require, exports, module);
    return {
        name: 'exports'
    }*/

    console.dir(require);
    console.dir(exports);
    console.dir(module);

    exports.name = 123;
    console.log(module.exports === exports); //true

    module.exports = {
        name: 'export'
    };
    console.log(module.exports === exports); //false

    // return ---->module.exports ---->exports
    return {
        name: 'return exports'
    }
});
