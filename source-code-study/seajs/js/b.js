/* @grunt-build */
define(function(require, exports, module) {

    // 异步加载一个模块，在加载完成时，执行回调
    var e = require.async('./e', function(e) {
        e.doSomething();
    });

    console.log('e', e)
    var a = require('./a');
    var c = require('./c');
    return {
        b: 'xxx',
        log: function() {
            console.log(require('./d').name);
            console.log(require('./a').add(1, 2, 3));
            console.log(require.resolve('./b'));
            console.log.apply(console, Array.prototype.slice.call(arguments));
        },
        add: a.add
    }
});
