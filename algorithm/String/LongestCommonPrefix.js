// LeetCode 14. Longest Common Prefix

var longestCommonPrefix = function (arr) {
    if (!arr || !Array.isArray(arr) || !arr.length) {
        return ''
    }
    var map = {},
        len = arr.length,
        commonStr = '',
        str, code;
    arr.map(val => {
        str = val.split('').sort().join('').replace(/(\w)\1+/gi, '$1');
        for (var s in str) {
            code = str[s];
            if (map[code]) {
                map[code]++;
            } else {
                map[code] = 1;
            }
        }
    });
    //在所有字符串中出现 那么它出现的次数就是数组的长度
    Object.keys(map).map(key => {
        if (map[key] === len) {
            commonStr += key;
        }
    })
    return commonStr;
}
console.log(longestCommonPrefix(['abcd', 'abccc', 'abdec']))

/*
 * 还有一种思路就是逐个找
 * 先找第一个和第二个的共同串，
 * 再把共同穿去和后面的继续找共同字符
 */
var longestCommonPrefix = function (arr) {
    if (!arr || !Array.isArray(arr) || !arr.length) {
        return ''
    }
    return arr.reduce((common, curr) => {
        let compare = ''
        let index = 0
        for (const s of common) {
            if (curr[index++] === s) {
                compare += s
            } else {
                break
            }
        }
        return compare
    }, str[0])
}
