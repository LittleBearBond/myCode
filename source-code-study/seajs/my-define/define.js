var define = (function() {
    var module = {};
    var exports = module.exports = {};
    var require = function() {
        console.log('require', arguments);
    };
    return function(name, deps, factory) {
        console.log(arguments);
        factory.call(module, require, exports, module);
    };
}());

define('name-test', ['jquery'], function(require, exports, module) {
    require('---1---');
    exports.name = "name";
    console.log(this)
});

define('name-test', ['jquery'], function(require, exports, module) {
    require('---1---');
    module.exports = {
        name: 'test'
    };
    console.log(this)
});
