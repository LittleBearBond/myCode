
const myName = "xj"

const str = `muti str
    second line
    third line
    ${myName}
`
console.log(str)

/**
 *函数参数
 * @param arg 函数参数
 */
function test1(arg: Array<string | number>): void {
    console.log(...arg)
}
test1([1, 2, 'xj'])

/**
 *
 * @param a 必传 无默认值
 * @param b 可传 没默认值
 * @param c 有默认值
 */
function test2(a: string, b?: string, c: string = 'b'): void {
    console.log(a, b, c)
}

function test3(...args: Array<any>) {
    console.log(...args)
}

const onePerson = {
    name: 'xx',
    age: 26,
    weight: 30,
    child: {
        name: 'x',
        weight: 20
    }
}
const { name: personName, child: { weight }, ...otherProps } = onePerson
console.log(personName,weight,otherProps)