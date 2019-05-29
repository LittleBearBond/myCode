/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (str) {
    if (!str || str.length === 0) {
        return 0
    }
    let max = 0
    const cache = {}
    let charStr
    for (let i = 0, j = 0; i < str.length; ++i) {
        charStr = str.charAt(i)
        if (charStr in cache) {
            j = Math.max(j, cache[charStr] + 1)
        }
        cache[charStr] = i
        max = Math.max(max, i - j + 1);
    }
    return max
};

function lengthOfLongestSubstring(s) {
    const cache = {};
    var left = 0;
    return s.split('').reduce((max, v, i) => {
        left = cache[v] >= left ? cache[v] + 1 : left;
        cache[v] = i;
        return Math.max(max, i - left + 1);
    }, 0);
}
