class Person {
    // public name: string
    // name 默认直接是public 不指定类型就是any
    private age: number

    protected weight: number

    constructor(public name: string) {
        this.name = name
    }
    say(args: string | Array<string>): void {
        console.log(args)
        console.log(this.age)
    }
}


class Employe extends Person {
    constructor(public name: string) {
        super(name)
    }
    // private doWork() {

    // }
}

// 数组
let works: Array<Person>;

class Greeter<T> {
    greeting: T;
    constructor(message: T) {
        this.greeting = message;
    }
    greet() {
        return this.greeting;
    }
}

let greeter = new Greeter<string>("Hello, world");
