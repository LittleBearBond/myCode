/**
 * author           xj
 * @date            2015-09-22 15:35:30
 * @email           568915669@qq.com
 * @description     跨域通信
 */
window.Messenger = (function() {

    // 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
    // !注意 消息前缀应使用字符串类型
    var prefix = "koolearn",
        supportPostMessage = 'postMessage' in window,
        lastHash,
        intervalId,
        cacheId = 1,
        extend = function() {
            var args = arguments,
                o = args[0],
                len = args.length,
                curr;
            for (var j = 1; j < len; j++) {
                curr = args[j];
                for (var i in curr) {
                    curr.hasOwnProperty(i) && (o[i] = curr[i]);
                }
            }
            return o;
        };

    /**
     * [Target description]
     * @param {object} target Target 类, 消息对象
     * @param {string} name   名字,iframe的id
     * @param {string} prefix 前缀
     */
    function Target(target, name, prefix) {
        var errMsg = '';
        if (arguments.length < 2) {
            errMsg = 'target error - target and name are both required';
        } else if (typeof target != 'object') {
            errMsg = 'target error - target itself must be window object';
        } else if (typeof name != 'string') {
            errMsg = 'target error - target name must be string type';
        }
        if (errMsg) {
            throw new Error(errMsg);
        }

        this.target = target;
        this.name = name;
        this.prefix = prefix;
    }

    /**
     * 消息拼接
     * @param  {[string]} msg
     * @return {[string]}
     */
    Target.prototype.handleMsg = function(msg) {
        //prefix|name__Messenger__msg
        return this.prefix + '|' + this.name + '__Messenger__' + msg;
    };

    /**
     * 往 target 发送消息, 出于安全考虑, 发送消息会带上前缀
     * @type {[type]}
     */
    Target.prototype.send = supportPostMessage ?
        // IE8+ 以及现代浏览器支持
        function(msg) {
            this.target.postMessage(this.handleMsg(msg), '*');
        } :
        // 兼容IE 6/7
        function(msg, targetUrl) {
            targetUrl = (targetUrl || this.target.location || parent.location.href)+'';
            //修改hash
            this.target.location = targetUrl.replace(/#.*$/, '') + '#' + (+new Date) + (cacheId++) + '&' + this.handleMsg(msg);
        };

    /**
     * 默认配置项，目前就一个
     * @type {Object}
     */
    var defaultOpts = {
        delay: 200
    };

    // 信使类
    // 创建Messenger实例时指定, 必须指定Messenger的名字, (可选)指定项目名, 以避免Mashup类应用中的冲突
    // !注意: 父子页面中projectName必须保持一致, 否则无法匹配
    function Messenger(messengerName, projectName) {
        this.targets = {};
        this.name = messengerName;
        this.listenFunc = [];
        this.prefix = projectName || prefix;
        this.opts = extend({}, defaultOpts);
        this.initListen();
    }

    /**
     * set opts
     * @param {object} opts
     */
    Messenger.prototype.setOpts = function(opts) {
        this.opts = extend(this.opts, opts || {});
    };

    /**
     * 添加一个消息对象
     * @param {object} target
     * @param {string} name
     */
    Messenger.prototype.addTarget = function(target, name) {
        this.targets[name] = new Target(target, name, this.prefix);
    };

    /**
     * 移除一个消息对象
     * @param  {string} name
     * @return {}
     */
    Messenger.prototype.removeTarget = function(name) {
        delete this.targets[name];
    };

    /**
     * 初始化消息监听
     * @return {null}
     */
    Messenger.prototype.initListen = function() {
        var self = this;
        /**
         * [generalCallback description]
         * @param  {string} msg prefix|name__Messenger__msg
         * @return {[type]}     [description]
         */
        var generalCallback = function(msg) {
            if (typeof msg == 'object' && msg.data) {
                msg = msg.data;
            }

            var msgPairs = msg.split('__Messenger__');
            var msg = msgPairs[1];
            var pairs = msgPairs[0].split('|');
            var prefix = pairs[0];
            var name = pairs[1];

            if (prefix + name !== self.prefix + self.name) {
                console.warn('error ');
                return;
            }

            for (var i = 0, len = self.listenFunc.length; i < len; i++) {
                self.listenFunc[i](msg);
            }
        };

        if (supportPostMessage) {
            if ('addEventListener' in document) {
                window.addEventListener('message', generalCallback, false);
            } else if ('attachEvent' in document) {
                window.attachEvent('onmessage', generalCallback);
            }
        } else {
            // 兼容IE 6/7
            intervalId && clearInterval(intervalId);
            intervalId = null;

            intervalId = setInterval(function() {
                var hash = document.location.hash,
                    re = /^#?\d+&/;
                if (hash !== lastHash && re.test(hash)) {
                    lastHash = hash;
                    generalCallback(hash.replace(re, ''));
                }
            }, self.opts.delay);

        }
    };

    /**
     * 监听消息
     * @param  {Function} callback
     * @return {[type]}
     */
    Messenger.prototype.listen = function(callback) {
        var i = 0;
        var len = this.listenFunc.length;
        var cbIsExist = false;
        for (; i < len; i++) {
            if (this.listenFunc[i] == callback) {
                cbIsExist = true;
                break;
            }
        }
        if (!cbIsExist) {
            this.listenFunc.push(callback);
        }
    };

    /**
     * 注销监听
     * @return {[type]} [description]
     */
    Messenger.prototype.clear = function() {
        this.listenFunc.length = 0;
    };

    /**
     * 广播消息,给所有的消息对象发送消息
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    //低版本浏览器要求提供url 这里不行
    Messenger.prototype.send = function(msg) {
        var targets = this.targets,
            target;
        for (target in targets) {
            if (targets.hasOwnProperty(target)) {
                targets[target].send(msg);
            }
        }
    };
    return Messenger;
}());
