// LeetCode 344. Reverse String

var reverseString = function (str) {
    if (!str) {
        return str;
    }
    return str.split('').reverse().join('');
}
var reverseString = function (str) {
    if (!str) {
        return str;
    }
    var result = '';
    var arr = str.split('');
    var len = arr.length;
    while (len--) {
        result += arr[len];
    }
    return result;
}
console.log(reverseString('hello xj'))

//LeetCode 242. Valid Anagram

var isAnagram = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }
    return s.split('').sort().join('') === t.split('').sort().join('');
}
console.log(isAnagram('anagram', 'nagaram'))
console.log(isAnagram('rat', 'car'))

// 1. Two Sum
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    var sIndex = 0;
    var eIndex, curr;
    var len = nums.length;
    while (sIndex < len - 1) {
        curr = nums[sIndex];
        eIndex = sIndex + 1
        while (eIndex < len) {
            if (curr + nums[eIndex] === target) {
                return [sIndex, eIndex];
            }
            eIndex++;
        }
        sIndex++;
    }
};
var twoSum = function (nums, target) {
    var map = {};
    var sIndex = 0,
        curr;
    var len = nums.length;
    while (sIndex < len) {
        curr = nums[sIndex]
        if (map[target - curr] >= 0) {
            return [map[target - curr], sIndex];
        } else {
            map[curr] = sIndex;
        }
        sIndex++;
    };
}
console.log(twoSum([2, 7, 11, 15], 26))
console.log(twoSum([2, 7, 11, 15], 9))

// LeetCode 38. Count and Say
var countAndSay = function (n) {
    if (n < 1) {
        return '1'
    }
    n = String(n);
    var count = 1;
    var preIndex, countSay = '',
        code = n[0],
        index = 1,
        len = n.length;
    if (len === 1) {
        return '1' + n;
    }
    while (index < len) {
        if (n.charAt(index) === code) {
            count++
        } else {
            //几个 code
            countSay = countSay + count + code;
            code = n[index];
            count = 1;
        }
        index++;
    }
    countSay = countSay + count + code;
    return countSay;
}
console.log(countAndSay(1))
console.log(countAndSay(11))
console.log(countAndSay(21))
console.log(countAndSay(12111))

// LeetCode 20. Valid 

/**
 * @param {string} str
 * @return {boolean}
 */
var isValid = function (str) {
    var matchLeftMap = {
        '(': true,
        '[': true,
        '{': true
    }
    var matchRightMap = {
        ')': '(',
        ']': '[',
        '}': '{'
    }
    var stack = [],
        code;
    for (var s in str) {
        code = str.charAt(s);
        if (matchLeftMap[code]) {
            stack.push(code);
            continue;
        }
        if (matchRightMap[code]) {
            if (matchRightMap[code] !== stack.pop()) {
                return false;
            }
            continue;
        }
    }
    return stack.length === 0;
}
// LeetCode 58. Length of Last Word
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    if (!s) {
        return 0;
    }
    var arr = s.split(/\s+/);
    if (!arr.length) {
        return 0;
    }
    var str = arr.pop();
    while (arr.length) {
        if (str.length) {
            return str.length;
        }
        str = arr.pop();
    }
    return 0;
}
// LeetCode 14. Longest Common Prefix