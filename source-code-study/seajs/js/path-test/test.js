/* @grunt-build */
define(function(require, exports, module) {
    return {
        'name': 'test',
        doSomething: function() {
            console.log(+new Date)
        }
    }
});
