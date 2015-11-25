//define Function
//define 是一个全局函数，用来定义模块。
//define(factory)
//factory 可以是一个函数，也可以是一个对象或字符串。 factory 为对象、字符串时，表示模块的接口就是该对象、字符串

//id 和 deps 参数可以省略。省略时，可以通过构建工具自动生成
define define(id ? , deps ? , factory)

define({
    "foo": "bar"
});

define({
    foo: 'bar',
    doSomething: function() {}
});

define('I am a template. My name is {{name}}.');

//定义一个模块，可以不对外暴露任何接口
define(function(require, exports, module) {
    // 模块代码
});

//定义模块，给出名字和依赖
define('a', ['jquery'], function(require, exports, module) {
    // 模块代码
});


define(function() {
    // 通过 return 直接提供接口
    return {
        foo: 'bar',
        doSomething: function() {}
    };
});


//exports 只是module的一个引用
define(function(require, exports, module) {
    console.log(module.exports === exports); //true

    exports.name = 123;

    module.exports = {
        name: 'export'
    };

    //模块导出优先级  return > module.exports  >   exports
    return {
        name: 'return exports'
    }
});

var module = {};
var exports = module.exports = {};


//exports 只是module的一个引用 。 这样写没有任何效果。
define(function(require, exports) {
    // 错误用法！！!
    exports = {
        foo: 'bar',
        doSomething: function() {}
    };
});
