
export default class Person {
    public name: string;
    constructor(name: string) {
        this.name = name
    }
    log(logInfo: string): void {
        console.log(logInfo)
    }
}