+function ($) {
    'use strict';

    var Panel = function (element, options) {
        this.type;
        this.options;
        this.enabled;
        this.$element;
        this.$panel;
        this.init(element, options);
    };

    var Plugin = function (option) {
        return this.each(function () {
            var options = typeof option == 'object' && option;
            var data = new Panel(this, options);
        });
    };

    Panel.DEFAULTS = {
        type: "panel",
        trigger: "click",
        direction: "bottom",
        offset: { top: 30, left: 0 },
        panel: ".m-panel"
    };

    $.extend(Panel.prototype, {
        init: function (element, options) {
            this.enable = true;
            this.$element = $(element);
            this.options = this.getOptions(options);
            this.$panel = $(this.options.panel);
            var trigger = this.options.trigger;

            if (trigger === "click") {
                var t = this.$element.top,
                    l = this.$element.left;
                this.$element.on(trigger, $.proxy(function () {
                    this.$panel.css({
                        left: l + this.options.offset.left,
                        top: t + this.options.offset.top
                    });
                    this.hide().show();
                }, this));
            }
        },
        getDefaults: function () {
            return Panel.DEFAULTS;
        },
        getOptions: function () {
            return $.extend({}, this.getDefaults(), this.$element.data());
        },
        enable: function () {
            this.enabled = true;
            return this;
        },
        disable: function () {
            this.enable = false;
            return this;
        },
        show: function () {
            if (this.enable) {
                this.$panel.show(0);
            }
            return this;
        },
        hide: function () {
            if (this.enable) {
                this.$panel.hide(0);
            }
            return this;
        }
    });

    //bind globle event
    $("body").on("click", ".j-panel-close-btn", function () {
        $(".m-panel").hide(0);
    });

    $.fn.panel = Plugin;

}(jQuery);