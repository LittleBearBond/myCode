import Dep from './Dep';

export default function observe(data, vm) {
    let ob;
    if (data.hasOwnProperty("__ob__")) {
        ob = data.__ob__;
    } else {
        ob = new Observer(data);
    }
    if (ob && vm) {
        ob.addVm(vm);
    }
    return vm;
}

class Observer {
    constructor(data) {
        this.data = data;
        this.dep = new Dep;

        //把Observer 注入到 data
        Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false,
            writable: true,
            configurable: true
        })

        this.walk(data)
    }
    addVm(vm) {
        (this.vms || (this.vms = [])).push(vm);
    }
    walk(data) {
        Object.keys(data).forEach((key) => {
            this.convert(key, data[key])
        })
    }
    convert(key, val) {
        defineReactive(this.data, key, val);
    }
}

function defineReactive(data, key, value) {
    var dep = new Dep;
    //对data  每一个key  val添加监听
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            if (Dep.target) {
                dep.depend()
            }
            console.log('get :' + value)
            return value
        },
        set(newVal) {
            if (value === newVal) {
                return
            }
            value = newVal
            console.log('set :' + newVal)

            dep.notify()
        }
    });
}