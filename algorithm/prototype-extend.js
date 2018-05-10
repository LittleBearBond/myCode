function A(name) {
    this.name = name
}

A.prototype.say = function () {
    console.log(this.name)
}

function B(name, age) {
    this.age = age;

    A.apply(this, [...arguments])
}
extend(B, A)
B.prototype.log = function () {
    console.log(this.age)
}

function extend(child, parent) {
    /* let Fn = function () { */
    /* } */
    /* Fn.prototype = new parent() */
    /* child.prototype = new Fn(); */
    child.prototype = Object.create(parent.prototype);;
    child.prototype.constructor = child
}