/**
 * author           xj
 * @date            2015-09-06 14:58:38
 * @email           568915669@qq.com
 * @description
 */

(function(window, videojs) {
    'use strict';

    var defaults = {},
        videoJsSwitchTeacher;

    /**
     * Initialize the plugin.
     * @param options (optional) {object} configuration for the plugin
     */
    videoJsSwitchTeacher = function(options) {
        var settings = videojs.mergeOptions(defaults, options),
            player = this,
            label = document.createElement('span');

        //label.classList.add('vjs-switchteacher-button-label')

        /*
         * switchteacher menu button
         */
        var MenuButton = videojs.getComponent('MenuButton')

        var SwitchMenuButton = videojs.extends(MenuButton, {
            constructor: function(player, options) {
                MenuButton.call(this, player, options);
                this.controlText('switch-teacher');

                label.classList.add('vjs-switchteacher-button-staticlabel');
                this.el().appendChild(label);
                //default has has-teacher
                this['has-teacher'] = true;

                this.on('click', this.onClick);
                this.on('touchstart', this.onClick);
            },
            onClick: function() {
                console.log(this)
                player.trigger('switchteacher');
            }
        })

        player.updateSrc = function(src) {

            if (!src) {
                return player.src();
            }

            if (player.controlBar.conSwitchTeacher) {
                player.controlBar.conSwitchTeacher.dispose()
                delete player.controlBar.conSwitchTeacher
            }

            var menuButton = new SwitchMenuButton(player, {
                sources: src
            });

            menuButton.el().classList.add('vjs-switchteacher-button');
            console.log(menuButton)
            player.controlBar.conSwitchTeacher = player.controlBar.addChild(menuButton);

            setTimeout(function() {
                var fullscreenEL = document.querySelectorAll('.vjs-fullscreen-control')[0];
                var switchBtn = document.querySelectorAll('.vjs-switchteacher-button')[0];
                fullscreenEL.parentNode && fullscreenEL.parentNode.insertBefore(switchBtn, fullscreenEL);
                //switchBtn.addEventListener('click', menuButton.onClick.bind(player));
            });

            //set class
            //label.innerHTML = newSource.label
            //这里可以默认判断下是否是有老师
            //check default has teacher
            player.src(src);
        }

    };

    // register the plugin
    videojs.plugin('videoJsSwitchTeacher', videoJsSwitchTeacher);

}(window, window.videojs));
