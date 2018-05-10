import Watcher from './watcher'

class Directive {
    constructor(descriptor, vm, el) {
        this.vm = vm
        this.el = el
        this.descriptor = descriptor
        this.name = descriptor.name
        this.expression = descriptor.exp
    }
    _bind() {
        var name = this.name
        var descriptor = this.descriptor

        if (this.el && this.el.removeAttribute) {
            this.el.removeAttribute(descriptor.attr || 'v-' + name)
        }

        //model or text
        var def = descriptor.def

        //注入到当前对象
        this.update = def.update
        this.bind = def.bind

        if (this.bind) {
            //el--->modexiong'jian
            this.bind()
        }

        //model---->el
        this._update = function (val) {
            this.update(val)
        }.bind(this)

        var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update)
        this.update(watcher.value)
    }
    set(value) {
        this._watcher.set(value)
    }
    on(event, handler) {
        event.split(/\s+/).forEach(name => {
            this.el.addEventListener(name, handler, false)
        });
    }
}

export default Directive;