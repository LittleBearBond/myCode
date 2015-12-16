'use strict';

/**
 * author           xj
 * @date            2015-12-16 10:03:16
 * @email           568915669@qq.com
 * @description
 */
var baseView = MyView.extend({
    $event: $({}),
    on: function on(type, fn) {
        this.$event.on(type, fn.bind(this));
        return this;
    },
    off: function off(type) {
        this.$event.off(type);
        return this;
    },
    trigger: function trigger(type, data) {
        this.$event.trigger(type, data);
        return this;
    }
});
