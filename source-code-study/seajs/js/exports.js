/* @grunt-build */
define(function(require, exports, module) {
    exports = {
        foo: 'bar',
        doSomething: function() {}
    };
    /*module.exports = {
        name: 'export'
    };
    return {
        name: 'exports'
    }*/
    var a = {
        c: {},
        d: 123
    };
    var e = a.c;
    e.name = 'name';
    e = {
        key: 1
    };
    console.log(a)
    console.log(e)
});
