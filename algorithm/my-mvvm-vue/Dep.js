let uid = 0;

function Dep() {
    this.id = uid++;
    this.subscription = [];
}

Dep.target = null

Dep.prototype.addSub = function (sub) {
    //在Watcher里面会调用，加入Watcher
    this.subscription.push(sub)
}

/** 
 * 收集依赖
 */
Dep.prototype.depend = function () {
    Dep.target && Dep.target.addDep(this)
}

Dep.prototype.notify = function () {
    this.subscription.forEach((sub) => {
        //Watcher-->update
        sub.update()
    })
}
export default Dep;