/* @grunt-build */
define(function(require, exports, module) {
    return {
        'name': 'test2',
        doSomething: function() {
            console.log(+new Date)
        }
    }
});
