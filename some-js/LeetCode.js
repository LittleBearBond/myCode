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
console.log(isValid('(({hello word  }))'))
console.log(isValid('(({hello word  }'))
console.log(isValid('()[]{}'))

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
console.log(lengthOfLastWord('hello word  '))

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
    var len = arr.length;
    var index = 1;
    var commonStr = arr[0];
    var curr;
    /*for (; index < len; index++) {
        curr = arr[index];
        for (var j = 0; j < commonStr.length; j++) {
            var element = commonStr[j];

        }
    }*/
}

// LeetCode 28. Implement strStr()
//
var strStr = function (haystack, needle) {
    // return haystack.indexOf(needle);
    if (!needle || !haystack) {
        return -1;
    }
    if (needle.length > haystack.length) {
        return -1;
    }
    var len = haystack.length;
    var needleLen = needle.length;
    var index = 0;
    var j = 1;

    for (; index < len; index++) {
        if (haystack.charAt(index) !== needle.charAt(0)) {
            continue;
        }
        for (j = 1; j < needleLen; j++) {
            if (haystack.charAt(index + j) !== needle.charAt(j)) {
                break;
            }
        }
        if (j === needleLen) {
            return index;
        }
    }
}

var strStr = function (sourceStr, searchStr) {
    var i = 0,
        j = 0,
        sourceLen = sourceStr.length,
        searchLen = searchStr.length;

    while (i < sourceLen) {
        // 两字母相等则继续
        if (sourceStr.charAt(i) === searchStr.charAt(j)) {
            i++;
            j++;
        } else { // 两字母不等则角标后退重新开始匹配
            i = i - j + 1; // i 回退到上次匹配首位的下一位
            j = 0; // j回退到子串的首位
        }
        //是字符串的长度
        if (j === searchLen) {
            //匹配起始位置
            return i - j;
        }
    }
    return -1;
}

console.log(strStr('adfddsf', 'sf'))

// LeetCode 125. Valid Palindrome

var isPalindrome = function (str) {
    if (!str) {
        return false;
    }
    str = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    return str === str.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal: Panama"))
console.log(isPalindrome("sdfd df"))

// LeetCode 165. Compare Version Numbers
var compareVersion = function (version1, version2) {
    var v1 = version1.split('.')
    var v2 = version2.split('.')
    var len1 = v1.length;
    var len2 = v2.length;
    var len = len1 > len2 ? len1 : len2;
    var index = 0,
        i1, i2;
    for (; index < len; index++) {
        i1 = v1[index] | 0;
        i2 = v2[index] | 0;
        if (i1 === i2) {
            continue;
        }
        return i1 > i2 ? 1 : -1;
    }
    return 0;
}
console.log(compareVersion('1.1.5', '1.2.2'))
console.log(compareVersion('0.1.5', '1.2.2'))
console.log(compareVersion('1.3.5', '1.2.2'))
console.log(compareVersion('1.1.1', '1.1.1'))
console.log(compareVersion('1.1.1', '1.1.1.0.1'))

// LeetCode 258. Add Digits
// num = 38，則 3+8 = 11，1+1 = 2, 2是個為數，回傳2。
var addDigits = function (num) {
    if (num < 10) {
        return num
    }
    sum = String(num).split('').reduce((pre, next) => {
        return (pre | 0) + (next | 0)
    }, 0)
    return addDigits(sum);
    /*if (num == 0) {
        return 0;
    }
    if (num % 9 == 0) {
        return 9;
    }
    return num % 9;*/
}
console.log(addDigits(38))
console.log(addDigits(138))

// LeetCode 283. Move Zeroes
var moveZeroes = function (nums) {
    if (!nums.length) {
        retrun;
    }
    var index = 0,
        len = nums.length;
    for (var i = 0; i < len; i++) {
        if (nums[i] !== 0) {
            nums[index++] = nums[i];
        }
    }

    for (; index < len; index++) {
        nums[index] = 0;
    }
    return nums;
}

console.log(moveZeroes([1, 2, 3, 0, 4, 0, 5]))
console.log(moveZeroes([1, 2, 3, 0, 4, 0, 5, 0]))

// LeetCode 349. Intersection of Two Arrays
var intersection = function (nums1, nums2) {
    var len1 = nums1.length;
    var len2 = nums2.length;
    var map = {},
        arr = [];
    nums1.forEach(val => {
        if (!(val in map)) {
            map[val] = true;
        }
    })
    for (let item of new Set(nums2)) {
        if (item in map) {
            arr.push(item)
        }
    }
    return arr;
}
console.log(intersection([1, 2, 2, 1], [2, 2]))
console.log(intersection([1, 2, 2, 1, 3, 4, 5], [2, 2, 3, 3]))

// LeetCode 169. Majority Element
var majorityElement = function (nums) {
    if (!nums.length) {
        return;
    }
    if (nums.length === 1) {
        return nums[0];
    }
    var map = {},
        count = nums.length / 2;
    for (let num of nums) {
        if (!map[num]) {
            map[num] = 1
        } else {
            map[num]++;
            if (map[num] >= count) {
                return num;
            }
        }
    }
}
console.log(majorityElement([1, 2, 2, 1, 1]))

// LeetCode 104. Maximum Depth of Binary Tree
var maxDepth = function (rootNode) {
    var find = function (node) {
        if (node == null) {
            return 0
        }
        var deepL = 1;
        var deepR = 1;
        if (node.left != null) {
            deepL += find(node.left)
        }
        if (node.right != null) {
            deepR += find(node.right)
        }
        return deepL > deepR ? deepL : deepR;
    }
    return find(rootNode);
}

// LeetCode 226. Invert Binary Tree

var TreeNode = function (val) {
    this.left = this.tirht = null;
    this.val = val
}

var invertTree = function (node) {
    if (node == null || (node.left == null && node.right == null)) {
        return node;
    }
    var temp = node.left;
    node.left = invertTree(node.right);
    node.right = invertTree(temp);
    return node;
}

// LeetCode 100. Same Tree

var isSameTree = function (l, r) {
    if (l == null && r == null) {
        return true;
    }

    if ((l == null && r != null) || (l != null && r == null)) {
        return false;
    }
    if (l.val !== r.val) {
        return false;
    }
    return isSameTree(l.left, r.left) && isSameTree(l.right, r.right);
}