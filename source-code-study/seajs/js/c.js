/* @grunt-build */
define(function(require, exports, module) {
    return {
        add: function() {
            return Array.prototype.slice.call(arguments).reduce(function(start, curr) {
                return curr + start;
            }, 0);
        },
        'name':'c'
    }
});
