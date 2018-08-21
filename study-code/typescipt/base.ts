
const myName = 'xj'

const str = `muti str
    second line
    third line
    ${myName}
`
console.log(str)

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