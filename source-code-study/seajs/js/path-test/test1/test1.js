/* @grunt-build */
define(function(require, exports, module) {
    return {
        'name': 'test1',
        doSomething: function() {
            console.log(+new Date)
        }
    }
});
