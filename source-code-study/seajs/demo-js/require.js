//1、正确拼写
// 错误！
define(function(req) {
    // ...
});

// 正确！
define(function(require) {
    // ...
});
//这是为什么呢？？？？？？？？？
//看源码实现


//2.不要重命名 require 函数，或在任何作用域中给 require 重新赋值
// 错误 - 重命名 "require"！
var req = require,
    mod = req("./mod");
// 错误 - 重定义 "require"!
require = function() {};
// 错误 - 重定义 "require" 为函数参数！
function F(require) {}
// 错误 - 在内嵌作用域内重定义了 "require"！
function F() {
    var require = function() {};
}


//这是为什么呢？？？？？？？？？
//3、require 的参数值 必须 是字符串直接量
// 错误！
require(myModule);
// 错误！
require("my-" + "module");
// 错误！
require("MY-MODULE".toLowerCase());
// 正确！
require("my-module");
在书写模块代码时， 必须遵循这些规则。 其实只要把 require 看做是语法关键字。


//两个模块都会加载，这样写没有意义
if (todayIsWeekend) {
    require("play");
} else {
    require("work");
}
