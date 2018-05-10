// https://github.com/Q-Zhan/simple-vue
import observe from './observe';
import {
    compile,
    compileRoot
} from './compile';
import Directive from './directive';

class MyVue {
    /**
     * Creates an instance of MyVue.        
     * 
     * @param {Object} [options={}]
     * 
     * @memberOf this
     */
    constructor(options = {}) {
        this.options = options;
        this._directives = []
        this._watchers = []
        this._isVue = true

        this.debug = !!this.options.debug;
        this._init();
    }
    /**
     * init function
     * 
     * 
     * @memberOf MyVue
     */
    _init() {
        this._el = document.querySelector(this.options.el);
        if (!this._el) {
            console.log('error el is null');
            reutrn;
        }
        this._initData();
        this._compile();
    }
    /**
     * 初始相关数据
     * 
     * 
     * @memberOf MyVue
     */
    _initData() {
        this._data = this.options.data || {};
        //set proxy
        Object.keys(this._data).forEach(function (key) {
            this._proxy(key);
        }, this);
        observe(this._data, this)
    }
    /**
     *  在this上设置值的时候其实是设置到内部的this._data上
     *  这里相当于在中间加了一层代理而已
     * @param {String} key
     * 
     * @memberOf MyVue
     */
    _proxy(key) {
        var that = this
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter() {
                that._log('get:' + key);
                return that._data[key];
            },
            set: function proxySetter(val) {
                that._data[key] = val;
                that._log('set:' + key);
            }
        })
    }
    _compile() {
        //compileRoot(this._el)(this, this._el)
        compile(this._el)(this, this._el)
    }
    _log(...args) {
        this.debug && console.log.apply(console, args);
    }
    _bindDir(descriptor, node) {
        this._directives.push(new Directive(descriptor, this, node))
    }
}

export default MyVue;