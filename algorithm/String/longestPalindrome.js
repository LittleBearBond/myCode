/**
 * @param {string} str
 * @return {string}
 */
function longestPalindrome(str) {
    let len = str.length
    if (len <= 2) {
        return str[0] === str[1] ? str : str[0]
    }
    let maxLen = 0
    let start;
    let end;
    function search(i, j) {
        while (i >= 0 && j < str.length) {
            if (str[i] === str[j]) {
                i--;
                j++
            } else {
                if (j - i - 1 > maxLen) {
                    maxLen = j - i - 1
                    start = i + 1
                    end = j
                }
            }
        }
    }
    for (let i = 0; i < str.length; i++) {
        search(i, i)
        search(i, i + 1)
    }
    return str.slice(start, end)
}

var longestPalindrome = function (str) {
    let left;
    var maxLen = 0
    let len = str.length
    if (len <= 2) {
        return str[0] === str[1] ? str : str[0]
    }
    var find = function (s, i, j) {
        while (i >= 0 && j < len && str[i] === str[j]) {
            i--;
            j++
        }
        if (j - i - 1 > maxLen) {
            maxLen = j - i - 1
            left = i + 1
        }
    }
    for (let i = 0; i < len; i++) {
        find(str[i], i, i)
        find(str[i], i, i + 1)
    }
    return str.slice(left, maxLen + left)
};
