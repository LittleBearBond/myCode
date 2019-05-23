// 17. Letter Combinations of a Phone Number
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits || !digits.length) {
        return []
    }
    const config = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
    const inputs = digits.split('').map(v => config[parseInt(v, 10)])
    const res = []
    const current = []
    dfs(res, inputs, current, 0)
    return res;
};

var dfs = function (res, inputs, current, start) {
    if (current.length === inputs.length) {
        res.push(current.join(''))
        return; // 回退
    }
    for (const s of inputs[start]) {
        current.push(s)
        dfs(res, inputs, current, start + 1)
        current.pop()
    }
}
// debugger
letterCombinations('23')
