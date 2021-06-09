/**
 *
如果当前字符s[index]为'('，将index入栈
否则判断栈是否为空：
如果为空，则说明这个右括号无效，不影响结果，start = index + 1
如果不为空，则出栈，即找到一个左括号和它匹配
如果栈空，则说明从start到index的匹配完了，res = max(res, index - start + 1)
如果栈不为空，则res = max(res, index - s[栈顶])，即栈顶+ 1 ~~ index都匹配了

 */
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (str) {
    let res = 0;
    let arr = [-1]
    for (let i = 0; i < str.length; i++) {
        let s = str[i]
        if ('(' === s) {
            arr.push(i)
        } else if (s === ')') {
            arr.pop()
            // 有数据
            if (arr.length) {
                res = Math.max(res, i - arr[arr.length - 1]);
            } else {
                // 没有左括号了  这里记录当前的又括号的下标， 下次计算有效括号的时候这个位置就是开始的位置
                arr.push(i)
            }
        }
    }
    return res
};
