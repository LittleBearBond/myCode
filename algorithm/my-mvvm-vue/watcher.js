import Dep from './Dep';
class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm

        //把Watcher 添加到vm
        vm._watchers.push(this)
        this.exp = exp
        this.cb = cb
        this.deps = []
        this.depIds = {}

        //调用vm的exp的get set 其实最后都是调用data的get set
        this.getter = function (vm) {
            return vm[exp]
        }

        this.setter = function (vm, value) {
            vm[exp] = value
        }

        this.value = this.get()
    }
    get() {
        Dep.target = this

        //this.addDep() exp这个key对应的Dep对象，添加到当前Watcher对象里面
        var value = this.getter.call(this.vm, this.vm)
        Dep.target = null
        return value
    }
    set(value) {
        this.setter.call(this.vm, this.vm, value)
    }
    addDep(dep) {
        var id = dep.id
        if (!this.depIds[id]) {
            //dep add current this
            dep.addSub(this)
            this.depIds[id] = true

            //current this add dep,这里各种相互引用
            this.deps.push(dep)
        }
    }
    update() {
        this.run()
    }
    run() {
        var value = this.get()
        if (this.value !== value) {
            var oldValue = this.value
            this.value = value //update this.value
            this.cb.call(this.vm, value, oldValue)
        }
    }
}

export default Watcher;