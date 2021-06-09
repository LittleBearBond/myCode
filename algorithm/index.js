/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
// 1. Two Sum
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    var cache = {}
    for (const [i, n] of nums.entries()) {
        if ((target - n) in nums) {
            return [i, cache[target - n]]
        }
        cache[n] = i
    }
    return []
};
function ListNode(val) {
    this.val = val;
    this.next = null;
}
// 2. Add Two Numbers
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 两个链表里面的值相加 返回一个新的链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // 进位
    var carry = 0
    // 初始一个临时节点
    var root = new ListNode(0)
    var curr = root
    var sum = 0
    while (l1 !== null || l2 !== null) {
        if (l1 !== null) {
            sum += l1.val
            l1 = l1.next
        }
        if (l2 !== null) {
            sum += l2.val
            l2 = l2.next
        }
        // 加上之前进位的值
        sum += carry
        if (sum >= 10) {
            carry = 1
            sum -= 10
        } else {
            carry = 0
        }
        var newNode = new ListNode(sum)
        // 重置为0
        sum = 0
        curr.next = newNode
        curr = newNode
    }
    // 最后一位还有值
    if (carry > 0) {
        curr.next = new ListNode(carry)
    }
    return root.next
};
var addTwoNumbers = function (l1, l2) {
    var List = new ListNode(0);
    var head = List;
    var sum = 0;
    var carry = 0;
    // sum 做另外一种处理
    while (l1 !== null || l2 !== null || sum > 0) {
        if (l1 !== null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 !== null) {
            sum += l2.val;
            l2 = l2.next;
        }
        if (sum >= 10) {
            carry = 1;
            sum = sum - 10;
        }

        head.next = new ListNode(sum);
        head = head.next;

        sum = carry;
        carry = 0;
    }
    return List.next;
};

// 3. Longest Substring Without Repeating Characters  无重复字符的最长子串
/* 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。 */
/**
 * 需要用到动态规划的基本思想
 * 01234567
 * abcabcbb
 * 循环字符串，把字符串字符和对应出现的位置index存储起来,当循环到下一字符已经出现过就算出相差距离
 * 0是 a  1是b 2是c 3又是a 减去之前a出现的位置得到不重复串的长度
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (str) {
    var map = {}
    var maxLen = 0
    for (let i = 0; i < str.length; i++) {
        if (str[i] in map) {
            maxLen = Math.max(maxLen, i - map[str[i]])
        }
        map[str[i]] = i
    }
    return maxLen
};
// 5. Longest Palindromic Substring 给定一个字符串 s，找到 s 中最长的回文子串。
/**
 * 寻找最长的回文串，直接遍历字符串，以位置 index 和 index、index+1 为中心向两边查找，然后记录最长位置
 * index 和 index、index+1 为中： 回文串可能是奇数或偶数位长度
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    var len = s.length
    if (len <= 1) {
        return true
    }
    if (len === 2) {
        return s[0] === s[1]
    }
    var maxLen = 0
    let left;
    var find = function (i, j) {
        while (i >= 0 && j < len && s[i] === s[j]) {
            i--;
            j++
        }
        // i 可能小于零，重置前面多减多加的值
        j--
        i++
        //
        if (j - i + 1 >= maxLen) {
            maxLen = j - i + 1
            left = i
        }
    }
    var i = 0
    while (i < len) {
        find(i, i)
        find(i, i + 1)
        i++
    }
    return s.slice(left, left + maxLen)
};
// 9. Palindrome Number 判断一个整数是否是回文数
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    return x.toString() === x.toString().split('').reverse().join('')
};
var isPalindrome = function (x) {
    x = String(x)
    let l = 0,
        r = x.length - 1
    while (l <= r) {
        if (x[l++] !== x[r--]) {
            return false
        }
    }
    return true
};
// 11. Container With Most Water 盛最多水的容器
/**
 * 数组 双指针
 * 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水
 * 容器不能切斜，确实就是算面积 (j-i)* min(height[i], height[j]);从两边往中间进行查找对比，双指针
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    var i = 0
    var j = height.length - 1
    var max = 0
    while (i < j) {
        max = Math.max(max, (j - i) * Math.min(height[i], height[j]))
        if (height[i] < height[j]) {
            i++
        } else {
            j--
        }
    }
    return max
};
// 12. Integer to Roman 整数转罗马数字
/**
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
1       2    3      4    5      6   7       8       9
"I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
10      20  30      40   50     60   70     80      90
"X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"
100     200 300     400  500   600  700     800     900
"C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"
1000   2000  3000
"M", "MM", "MMM"
 * @param {number} num
 * @return {string}
 */
const M = ["", "M", "MM", "MMM"];
const C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
var intToRoman = function (num) {
    // 配置好个位数 十位数  百位数 千位数的对应罗马数字，然后分别计算得到个十百千位对应的值
    return M[parseInt(num / 1000, 10)] + C[parseInt(num % 1000 / 100, 10)] + X[parseInt(num % 100 / 10, 10)] + I[parseInt(num % 10, 10)]
};

// 13. Roman to Integer 罗马数字转整数
const addMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
}
// 观察规律，这些是需要直接减去的值
const minusMap = Object.entries({
    IV: -2,
    IX: -2,
    XL: -20,
    XC: -20,
    CD: -200,
    CM: -200,
})
// "LVIII" "MCMXCIV"
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    var sum = 0
    for (const [key, val] of minusMap) {
        if (s.includes(key)) {
            sum += val
        }
    }
    for (const charS of s) {
        sum += addMap[charS]
    }
    return sum
};
// 14.  Longest Common Prefix 最长公共前缀
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (!strs.length) {
        return ''
    }
    var prefix = ''
    var firstWord = strs[0]
    for (var j = 0; j < firstWord.length; j++) {
        for (var i = 1; i < strs.length; i++) {
            if (strs[i][j] !== firstWord[j]) {
                return prefix
            }
        }
        prefix += firstWord[j]
    }
    return prefix
};
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (!strs.length) {
        return ''
    }
    return strs.reduce((pre, next) => {
        var commpre = ''
        var index = 0
        for (const s of pre) {
            if (s !== next[index++]) {
                break;
            }
            commpre += s
        }
        return commpre
    }, strs[0])
};
// 15. 3Sum
/**
 * 双指针，左右往中间找，过程中去掉重复的值
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b)
    var ret = []
    var len = nums.length
    var sum
    if (!len || len < 3) {
        return []
    }
    for (var i = 0; i < len; i++) {
        // 第一个大于0 就不用计算了，加起来肯定大于0
        if (nums[i] > 0) {
            break
        }
        if (nums[i] === nums[i - 1]) {
            continue;
        }
        var j = i + 1;
        var k = len - 1
        while (j < k) {
            sum = nums[i] + nums[j] + nums[k]
            if (sum === 0) {
                ret.push([nums[i], nums[j], nums[k]]);
                j++;
                k--;
                while (j < k && nums[j] === nums[j + 1]) {
                    j++
                }
                while (j < k && nums[k] === nums[k - 1]) {
                    k--
                }
            } else if (sum < 0) {
                j++
            } else {
                k--
            }
        }
    }
    return ret
};
// 16. 3Sum Closest 最接近的三数之和
/**
 * 双指针搜索
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b)
    let ret, sum, min = Number.MAX_VALUE,
        len = nums.length
    for (let i = 0; i < len - 2; i++) {
        var j = i + 1;
        var k = len - 1
        while (j < k) {
            sum = nums[i] + nums[j] + nums[k]
            var dis = Math.abs(target - sum)
            if (dis < min) {
                min = dis
                ret = sum
            }
            if (dis === 0) {
                return target
            } else if (dis > 0) {
                j++
            } else {
                k--
            }
        }
    }
    return ret
};
// 17. Letter Combinations of a Phone Number 电话号码的字母组合
/**
 * 输入电话号码的所有组合，直接使用DFS来实现
 * @param {string} digits
 * @return {string[]}
 */
const config = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
var letterCombinations = function (digits) {
    if (!digits || !digits.length) {
        return []
    }
    digits = digits.split('').map(v => config[parseInt(v, 10)])
    var len = digits.length
    var ret = []
    var dfs = function (current, start) {
        if (current.length === len) {
            ret.push(current.join(''))
            return;
        }
        for (var i = 0; i < digits[start].length; i++) {
            current.push(digits[start][i])
            dfs(current, start + 1)
            current.pop()
        }
    };
    dfs([], 0)
    return ret
};
// 18. 4Sum
/**
 * 转换为threeSum，可以直接内部再次调用threeSum
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b)
    var len = nums.length
    var ret = [],
        sum, threeSum
    for (let i = 0; i < len - 3; i++) {
        if (nums[i] === nums[i - 1]) {
            continue;
        }
        threeSum = target - nums[i]
        for (var j = i + 1; j < len - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            var l = j + 1;
            var r = len - 1
            while (l < r) {
                sum = nums[j] + nums[l] + nums[r]
                if (threeSum - sum === 0) {
                    ret.push([nums[i], nums[j], nums[l], nums[r]])
                    r--
                    l++
                    // l向右移动，剔除相同的值
                    while (l < r && nums[l] === nums[l - 1]) {
                        l++
                    }
                    // r向左移动，剔除相同的值
                    while (l < r && nums[r] === nums[r + 1]) {
                        r--
                    }
                } else if (threeSum - sum < 0) {
                    r--
                } else {
                    l++
                }
            }
        }
    }
    return ret
};

function fourSum(nums, target) {
    var i = 0
    var len = nums.length
    var ret = [];
    nums.sort((a, b) => a - b)
    for (; i < len - 3; i++) {
        if (nums[i] === nums[i - 1]) {
            continue;
        }
        var threeResult = threeSum(nums.slice(i + 1, len), target - nums[i]);
        console.log(threeResult, target - nums[i])
        if (threeResult.length) {
            ret.push(...threeResult.map(v => ([nums[i], ...v])))
        }
    }
    return ret
}
// 19. Remove Nth Node From End of List 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
/**
 * 双指针，要删除倒数第N个，关键就在于遍历一次如何找到倒数第N个。
 * 设置两个指针，开始都指向头部，先让快指针走N步，然后再两个指针一起走，快指针先走了N步，当快指针走到末尾的时候，另外一个指针刚好指到倒数第N，就是这么巧妙
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    var slow = head
    var fast = head
    var i = 0;
    while (i++ < n) {
        fast = fast.next
    }
    while (fast.next) {
        slow = slow.next
        fast = fast.next
    }
    slow.next = slow.next.next
    return head
};

// 20. Valid Parentheses 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const LEFT = {
        '(': true,
        '[': true,
        '{': true,
    }
    const RIGHT = {
        ')': '(',
        ']': '[',
        '}': '{',
    }
    var stack = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] in LEFT) {
            stack.push(s[i])
        } else if (s[i] in RIGHT) {
            if (RIGHT[s[i]] !== stack.pop()) {
                return false
            }
        }
    }
    return stack.length === 0
};
// 21. Merge Two Sorted Lists 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
/**
 * 合并两个链表的值，前部分比较两个链表的值取较小部分，当一个链表到达尾部，这个时候直接把新链表的next知道另外一个非空链表即可
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    var root = new ListNode(0);
    var curr = root
    while (l1 !== null && l2 != null) {
        if (l1 === null || l1 === null) {
            break
        }
        if (l1 === null && l2 !== null) {
            curr.next = new ListNode(l2.val)
            l2 = l2.next
            curr = curr.next
            continue;
        }
        if (l1 !== null && l2 === null) {
            curr.next = new ListNode(l1.val)
            l1 = l1.next
            curr = curr.next
            continue;
        }
        if (l1.val <= l2.val) {
            curr.next = new ListNode(l1.val)
            l1 = l1.next
        } else {
            curr.next = new ListNode(l2.val)
            l2 = l2.next
        }
    }
    return root.next
};
var mergeTwoLists = function (l1, l2) {
    var head = new ListNode(0)
    var curr = head
    while (l1 && l2) {
        if (l1.val < l2.val) {
            curr.next = new ListNode(l1.val)
            l1 = l1.next
        } else {
            curr.next = new ListNode(l2.val)
            l2 = l2.next
        }
        curr = curr.next
    }
    curr.next = l1 || l2
    return head.next
};
// 22. Generate Parentheses  给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    if (n <= 0) {
        return []
    }
    var ret = []
    var dfs = function (str, l, r) {
        if (str.length === 2 * n) {
            ret.push(str)
            return
        }
        // 左括号小于n添加左括号
        if (l < n) {
            dfs(str + '(', l + 1, r)
        }
        // 右括号少于左括号 添加右括号
        if (r < l) {
            dfs(str + ')', l, r + 1)
        }
    }
    dfs('', 0, 0)
    return ret
};
// 24. Swap Nodes in Pairs 两两交换链表中的节点
/**
 * 节点两两交换1-2-3-4  2-1-4-3
 * 递归实现，如下如，只需把head和next交换，然后返回next，以此递归下去
 * [------]--->head --->next --->[------]
 * [------]--->next --->head --->[------]
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (head === null || head.next === null) {
        return head
    }
    var next = head.next
    head.next = swapPairs(head.next.next)
    next.next = head
    return next
};
// 26. Remove Duplicates from Sorted Array 删除排序数组中的重复项
var removeDuplicates = function (nums) {
    var index = 0
    for (const [i, v] of nums.entries()) {
        if (v !== nums[i + 1] && i < nums.length) {
            nums[index++] = v
        }
    }
    return index
};
// 27. Remove Element
var removeElement = function (nums, val) {
    var index = 0
    for (const n of nums) {
        if (n !== val) {
            nums[index++] = n
        }
    }
    return index
};
// 28. 实现strStr()
/**
 * 更高级的实现需要用到KMP算法，对searchStr做处理，每次回退的的时候也许不用完全回去到之前的位置
 * @param {string} sourceStr
 * @param {string} searchStr
 * @return {number}
 */
var strStr = function (sourceStr, searchStr) {
    var i = 0,
        j = 0,
        sourceLen = sourceStr.length,
        searchLen = searchStr.length;
    if (sourceLen === 0 && searchLen === 0 || searchLen === 0) {
        return 0
    }
    if (searchLen > sourceLen) {
        return -1
    }
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
};
// 32. Longest Valid Parentheses 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
/**
 * 用数组保存之前左括号出现的位置，遇到右括号直接pop 然后减去前一个index得到有效括号长度
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    var res = 0
    var temp = [-1]
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            temp.push(i)
        } else {
            temp.pop()
            // 数组里面还有值
            if (temp.length) {
                res = Math.max(res, i - temp[temp.length - 1])
            } else {
                // 没有值直接把右括号的index push进去
                temp.push(i)
            }
        }
    }
    return res
};

// 33. Search in Rotated Sorted Array 搜索旋转排序数组
/**
 * 数组是在某个节点旋转过的，利用二分查找，然后确定哪边有序
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    var l = 0
    var r = nums.length
    var mid, curr
    while (l < r) {
        mid = Math.floor((l + r) / 2)
        curr = nums[mid]
        if (curr === target) {
            return mid
        }
        if (curr >= nums[l]) {
            if (nums[l] < target && target < curr) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        } else {
            if (nums[r] > target && target > curr) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
    }
    return nums[l] === target ? l : -1;
};
// 34. Find First and Last Position of Element in Sorted Array 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。你的算法时间复杂度必须是 O(log n) 级别
/**
 * 查找一个数在数组中的开始和结束为止，要求O(logN),这肯定二分查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    var l = 0
    var r = nums.length
    while (l <= r) {
        var mid = Math.floor((l + r) / 2)
        // 查找最开始出现的位置
        if (nums[mid] >= target) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    // 首先查找到这个数最开始出现的位置
    if (l < 0 || l > nums.length || nums[l] !== target) {
        return [-1, -1]
    }
    var left = l
    r = nums.length
    // 再次二分找到最后一次出现的
    while (l <= r) {
        mid = l + Math.floor((r - l) / 2)
        // 这里等于的时候也要加一 因为是查找最后出现的值
        if (nums[mid] <= target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return [left, r]
};
/**
 * 可以先查找到target的值，然后再分别向前向后依次查询，得到第一次和最后一次出现的位置
 */
// 35. Search Insert Position 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 查找到第一次出现的位置即可，否则返回l
var searchInsert = function (nums, target) {
    var len = nums.length
    if (!len || target < nums[0]) {
        return 0
    }
    if (target > nums[len - 1]) {
        return len
    }
    var mid, curr, l = 0,
        r = len
    while (l <= r) {
        mid = Math.floor((l + r) / 2)
        curr = nums[mid]
        if (curr === target) {
            return mid
        }
        if (target < curr) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return l
};
// 38. Count and Say 报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。
/**
 * 给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。
 * 最牛逼的就是把1-30 都求出来，然后配置为map，以后每次都是O(1)
 * 两层循环搞定
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    var str = '1'
    var i = 1
    var count = 0
    while (i < n) {
        count = 0;
        // 2 1
        var conuntAndSay = ''
        var pre = str[0]
        for (const s of str) {
            if (s === pre) {
                count++
            } else {
                conuntAndSay += `${count}${pre}`
                count = 1
                pre = s
            }
        }
        conuntAndSay += `${count}${pre}`
        str = conuntAndSay
        i++
    }
    return str
};
// 39. Combination Sum  给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
/**
 * 数字可以重复利用 这个明显直接DFS搞定
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    var ret = []
    candidates.sort((a, b) => a - b)
    var dfs = function (curr, start, target) {
        if (target < 0) {
            return
        }
        if (target === 0) {
            ret.push(curr.slice())
            return
        }
        for (var i = start; i < candidates.length; i++) {
            curr.push(candidates[i])
            // 可以重复利用当前这个数这里i不用➕1
            dfs(curr, i, target - candidates[i])
            // 吐出之前这个数，往前回退
            curr.pop()
        }
    }
    dfs([], 0, target)
    return ret
};
// 40. Combination Sum II 组合总和 II 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。candidates 中的每个数字在每个组合中只能使用一次。
/**
 * 不能重复利用数组里面的元素
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    var ret = []
    candidates.sort((a, b) => a - b)
    var dfs = function (curr, start, target) {
        if (target < 0) {
            return
        }
        if (target === 0) {
            ret.push(curr.slice())
            return;
        }
        for (var i = start; i < candidates.length; i++) {
            // 踢出重复的值
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }
            curr.push(candidates[i])
            // 不可以重复利用当前这个数这里i➕1
            dfs(curr, i + 1, target - candidates[i])
            // 吐出之前这个数，往前回退
            curr.pop()
        }
    }
    dfs([], 0, target)
    return ret
};
// 43. Multiply Strings 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    var a = num1.split('').map(v => v | 0)
    var b = num2.split('').map(v => v | 0)
    var aLen = a.length,
        bLen = b.length
    var pre = 0
    var curr = 0;
    var ret = []
    for (let i = aLen - 1; i >= 0; i--) {
        ret[aLen - 1 - i] = []
        curr = 0;
        pre = 0;
        for (let j = bLen - 1; j >= 0; j--) {
            curr = a[i] * b[j]
            ret[aLen - 1 - i].unshift(curr % 10 + pre)
            pre = Math.floor(curr / 10)
        }
        pre && ret[aLen - 1 - i].unshift(pre)
    }
    /**
     *  123*345
    得到 [
            [6,1,5],
            [4,9,2],
            [3,6,9]
       ]
    错位相加就会得到结果，把数组处理成如下数据结构，
        [
                [6,1,5],
              [4,9,2,0],
            [3,6,9,0,0]
       ]
     */
    for (const [i, v] of ret.entries()) {
        v.push(...Array(i).fill(0))
    }
    // return ret
    var maxLen = Math.max(...ret.map(v => v.length))
    var resStr = ''
    pre = 0
    while (maxLen--) {
        curr = ret.map(v => v.pop() | 0).reduce((sum, v) => v + sum, 0) + pre
        resStr = (curr % 10) + resStr
        pre = Math.floor(curr / 10)
    }
    return (pre ? pre + resStr : resStr).replace(/^0+/, '0')
};
// 46. Permutations 给定一个没有重复数字的序列，返回其所有可能的全排列。
/**
 * 借用字符串全排列的思想 比如数组1 2 3
 * 第一步取数字 [1]
 * 第二步取数字2 然后插入到1中  可得到 [1,2] [2,1]
 * 第三步，取数字3插入到之前得到的结果中,不断把字符插入到前面的结果集中去 [1,2]+[3] = [3,1,2] [1,3,2] [1,2,3]; [2,1]+[3]=[3,2,1] [2,3,1] [2,1,3]
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    if (nums.length === 1) {
        return [nums]
    }
    var curr = permute(nums.slice(1))
    var ret = []
    for (var n of curr) {
        for (var j = 0; j <= n.length; j++) {
            ret.push([...n.slice(0, j), nums[0], ...n.slice(j)])
        }
    }
    return ret
};
// 只要是组合一般都能用dfs来搞定
var permute = function (nums) {
    var ret = []
    var used = []
    var dfs = function (curr) {
        if (curr.length === nums.length) {
            ret.push(curr.slice())
            return;
        }
        for (var i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue
            }
            used[i] = true
            curr.push(nums[i])
            dfs(curr)
            used[i] = false
            curr.pop()
        }
    }
    dfs([])
    return ret
};
// 47. Permutations II 给定一个可包含重复数字的序列，返回所有不重复的全排列。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    var ret = []
    var used = []
    nums.sort((a, b) => a - b)
    var dfs = function (curr) {
        if (curr.length === nums.length) {
            ret.push(curr.slice())
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i - 1] === nums[i] && used[i - 1] === false)) {
                continue;
            }
            curr.push(nums[i])
            used[i] = true;
            dfs(curr)
            used[i] = false;
            curr.pop()
        }
    }
    dfs([], used)
    return ret
};
// 48. Rotate Image  给定一个 n × n 的二维矩阵表示一个图像。 将图像顺时针旋转 90 度
/**
 *
[                       [
    [1,2,3],              [7,4,1],
    [4,5,6], ====>        [8,5,2],
    [7,8,9]               [9,6,3]
],                      ]
[                       [
  [ 5, 1, 9,11],            [15,13, 2, 5],
  [ 2, 4, 8,10],====>       [14, 3, 4, 1],
  [13, 3, 6, 7],            [12, 6, 8, 9],
  [15,14,12,16]             [16, 7,10,11]
],                      ]
首先以从对角线为轴翻转，然后再以x轴中线左右翻转即可得到结果
 *
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    var n = matrix.length
    for (var i = 0; i < n; i++) {
        // 以对角线为轴进行翻转，j取 i+1到 n, 因为对称轴是（i,i）
        for (var j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
        // 以中间为轴进行左右翻转
        matrix[i].reverse()
    }
};
// 49. Group Anagrams 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
/**
 * ["eat", "tea", "tan", "ate", "nat", "bat"]
 * [
        ["ate","eat","tea"],
        ["nat","tan"],
        ["bat"]
    ]
    此题在于如何确定 "ate","eat","tea"这些是相同的字符串，我的一个想法很简单，a-z每个字符对应一个素数，每个单词乘积相等就是同一个串
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const cache = {}
    const prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103];
    let total = 1
    for (const str of strs) {
        total = 1
        for (const s of str) {
            total *= prime[s.charCodeAt(0) - 97]
        }
        if (total in cache) {
            cache[total].push(str)
        } else {
            cache[total] = [str]
        }
    }
    return Object.values(cache)
};
// 53. Maximum Subarray 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
/**
 * 需要O(n)复杂度，要得到连续子数组和最大，假设当前为num[i]，前面的和为sum, 当前的和为num[i]+sum, 如果这个数小于num[i]，那就直接等于num[i]，否则就是num[i] + sum 再与之前的max值进行比较
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let sum = 0
    let max = Number.MIN_SAFE_INTEGER
    for (const n of nums) {
        sum = Math.max(n + sum, n)
        max = Math.max(sum, max)
    }
    return max
};
// 55. Jump Game 给定一个非负整数数组，你最初位于数组的第一个位置。 数组中的每个元素代表你在该位置可以跳跃的最大长度。 判断你是否能够到达最后一个位置。
/**
 * 每个元素代表你能向后挑的长度，直接循环数组，用max记录当前跳跃的最远距离，每次当前索引加上当前值和最远距离做对比，记录最远的位置
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    var max = 0
    for (const [i, val] of nums.entries()) {
        // 前面已经走不到当前索引了，直接返回false
        if (max < i) {
            return false
        }
        max = Math.max(i + val, max)
    }
    return max > nums.length
};
// 56. Merge Intervals 给出一个区间的集合，请合并所有重叠的区间。
/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
    输出: [[1,6],[8,10],[15,18]]
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function (intervals) {
    if (!intervals.length) {
        return intervals
    }
    // intervals.sort((a, b) => a.start - b.start)
    var ret = [intervals[0]]
    for (let i = 1; i < intervals.length; i++) {
        var inter = intervals[i]
        if (i > 0 && inter.start <= ret[ret.length - 1].end) {
            ret[ret.length - 1].end = inter.end
        } else {
            ret.push(inter)
        }
    }
    return ret
};

// 59. Spiral Matrix II 给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
/**
 * →(右) ---> ↓(下) ---> ←（左） --->  ↑（上）
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    // 构造一个N*N的二维数组
    var ret = Array(n).fill(0).map(v => Array(n).fill(0))
    var i, j = 0,
        count = 0
    while (count++ <= n * n) {
        // ➡️ [j][i] j行 i 列；i=j --> i < n-j
        for (i = j; i < n - j; i++) {
            ret[j][i] = count++
        }
        // ➡⤵️[i][n-j-1]  i = j+1 ---> n-j;
        for (i = j + 1; i < n - j; i++) {
            ret[i][n - j - 1] = count++
        }
        // ➡⬅️[n-j-1][i] i = n-j-2 --> j
        for (i = n - j - 2; i >= j; i--) {
            ret[n - j - 1][i] = count++
        }
        // ➡⬅⤴️ i= n -j -2 --> j
        for (i = n - j - 2; i > j; i--) {
            ret[i][j] = count++
        }
        j++
    }
    return ret
}
// 62. Unique Paths
/**
 * m*n 第一行第一列都是1 以后每格的值都是[i-1][j]+[j-1][i]
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    // 其实可以用一维数组搞定
    var dp = Array(m).fill(1).map(v => Array(n).fill(1))
    for (var i = 1; i < m; i++) {
        for (var j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
};
// 63. Unique Paths II 不同路径 II
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    var m = obstacleGrid.length
    if (!m) {
        return 0
    }
    var n = obstacleGrid[0].length
    var dp = Array(m).fill(1).map(v => Array(n).fill(1))
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 0) {
                dp[i][j] = 0
            } else if (i === 0 && j === 0) {
                dp[i][j] = 1
            } else if (i === 0) {
                dp[i][j] = dp[i][j - 1]
            } else if (j === 0) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            }
        }
    }
    return dp[m - 1][n - 1]
};
// 64. Minimum Path Sum 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
/**
 * 最小路径，dp[i][j] = Math.min(grid[i][j] + dp[i - 1][j], grid[i][j] + dp[i][j - 1])
 *
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    var m = grid.length
    var n = grid[0].length
    var dp = Array(m).fill(0).map(v => Array(n).fill(0))
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                dp[i][j] = grid[i][j]
            } else if (i === 0) {
                dp[i][j] = grid[i][j] + dp[i][j - 1]
            } else if (j === 0) {
                dp[i][j] = grid[i][j] + dp[i - 1][j]
            } else {
                dp[i][j] = Math.min(grid[i][j] + dp[i - 1][j], grid[i][j] + dp[i][j - 1])
            }
        }
    }
    return dp[m - 1][n - 1]
};
// 直接修改grid 的值，不用新创建二维数组
var minPathSum = function (grid) {
    var m = grid.length
    var n = grid[0].length
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            if (i === 0 && j !== 0) {
                grid[i][j] += grid[i][j - 1]
                continue;
            }
            if (j === 0 && i !== 0) {
                grid[i][j] += grid[i - 1][j]
                continue;
            }
            if (j !== 0 && i !== 0) {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
            }
        }
    }
    return grid[m - 1][n - 1]
};
// 69. Sqrt(x)
/**
 * 技巧 牛顿
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    var n = x
    while (n * n > x) {
        n = ((n + x / n) / 2) | 0
    }
    return n
};
// 70. Climbing Stairs
/**
 * 一次爬一步或者两步 爬到地n步的方式是 dp[n] = dp[n-1] + dp[n-2]
 * @param {number} n
 * @return {number}
 */
var climbStairs = (function () {
    var temp = {
        1: 1,
        2: 2
    }
    return function fn(n) {
        if (!(n in temp)) {
            temp[n] = fn(n - 1) + fn(n - 2)
        }
        return temp[n]
    }
}())
// 71. Simplify Path 简化路径
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
    var pathArr = path.split('/')
    var newPath = []
    for (let p of pathArr) {
        if (p === '' || p === '.') {
            continue;
        }
        if (p === '..') {
            newPath.pop()
        } else {
            newPath.push(p)
        }
    }
    return `/${newPath.join('/')}`
};
// 73. Set Matrix Zeroes 给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
/**
 * 先渠道i j 为 0 的 然后重置
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    var len = matrix.length
    var lineLen = matrix[0].length
    var vSet = new Set()
    var hSet = new Set()
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < lineLen; j++) {
            if (matrix[i][j] === 0) {
                vSet.add(i)
                hSet.add(j)
            }
        }
    }
    for (let i of vSet) {
        for (let v = 0; v < lineLen; v++) {
            matrix[i][v] = 0
        }
    }
    for (let j of hSet) {
        for (let h = 0; h < len; h++) {
            matrix[h][j] = 0
        }
    }
}
// 74. Search a 2D Matrix 搜索二维矩阵
function binarySearch() { }
/**
 * 从左到右按升序排列
 * 每行的第一个整数大于前一行的最后一个整数
 * 直接target 对比每一行最后一个元素的值，如果target小于这一行最后一个值，肯定就在这一行里面
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    var len = matrix.length
    var oneLen = len ? matrix[0].length : 0
    if (!len || !oneLen) {
        return false
    }
    var line = 0
    while (line < len) {
        if (target < matrix[line][oneLen - 1]) {
            return binarySearch(matrix[line], target)
        } else if (target === matrix[line][oneLen - 1]) {
            return true
        }
        line++
    }
    return false
}
// 75. Sort Colors 颜色分类
/**
 * 双指针 右边存储2  左边存储0 中间不动
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    var left = 0
    var right = nums.length - 1
    var i = 0
    while (left < right) {
        if (nums[i] === 0) {
            [nums[i], nums[left]] = [nums[left], nums[i]]
            left++
            i++
            continue;
        }
        if (nums[i] === 2) {
            [nums[i], nums[right]] = [nums[right], nums[i]]
            i++
            right--
        }
    }
    return nums
};
var sortColors = function (nums) {
    const n = nums.length
    let left = 0;
    let right = n - 1
    const swap = function (i, j) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
    for (let i = 0; i < n; i++) {
        while (nums[i] === 2 && i < right) {
            swap(i, right--)
        }
        while (nums[i] === 0 && i > left) {
            swap(i, left++)
        }
    }
};
// 77. Combinations 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
/**
 * 此题类似全排列。直接简答的DFS搞定
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    var nums = Array.from({ length: n }, (v, i) => i + 1)
    var ret = []
    var used = {}
    var dfs = function (current, start) {
        if (current.length === k) {
            return ret.push(current.slice());
        }
        for (let i = start; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true
            current.push(nums[i])
            dfs(current, i + 1)
            used[i] = false
            current.pop()
        }
    }
    dfs([], 0)
    return ret
};
// 78. Subsets 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。 说明：解集不能包含重复的子集。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    var ret = []
    var dfs = function (current, start) {
        for (var i = start; i < nums.length; i++) {
            current.push(nums[i])
            ret.push(current.slice())
            dfs(current, i + 1)
            current.pop()
        }
    }
    dfs([], 0)
    return ret
};
/**
 *
// 寻找规律，后面元素和前面元素集合的集合
//[]-->[]
//[1]-->[] | [1]
//[1,2]--> [] [1] | [2] [1,2]
//[1,2,3]--> [] [1] [2] [1,2] |  [3] [1,3] [2,3] [1,2,3]
 * @param {*} nums
 */
var subsets = function (nums) {
    var result = []
    for (const n of nums) {
        for (var i = 0, len = result.length; i < len; i++) {
            result.push([...result[i], n])
        }
        result.push([n])
    }
    result.push([])
    return result
};
// 79. Word Search 单词搜索
/**
 * dfs
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {

};

// 81. Search in Rotated Sorted Array II 搜索旋转排序数组 II
var search = function (nums, target) {
    var l = 0
    var r = nums.length
    var mid, curr
    while (l < r) {
        //处理重复数字
        while (l < r && nums[l] === nums[l + 1]) {
            l++
        }
        while (l < r && nums[r] === nums[r - 1]) {
            r--
        }
        mid = Math.floor((l + r) / 2)
        curr = nums[mid]
        if (curr === target) {
            return mid
        }
        if (curr >= nums[l]) {
            if (nums[l] < target && target < curr) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        } else {
            if (nums[r] > target && target > curr) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
    }
    return nums[l] === target ? l : -1;
};
var isObject = v => Object.prototype.toString.call(v) === "[object Object]"

function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const currKey = prefix ? `${prefix}.${key}` : key
        Object.assign(acc, isObject(obj[key]) ? flattenObject(obj[key], currKey) : {
            [currKey]: obj[key]
        });
        return acc
    }, {});
}


function permutate(str) {
    if (!str || str.length === 1) {
        return [str]
    }
    const ret;
    const res = permutate(str.slice(1));
    for (const curr of res) {
        for (let i = 0; i < curr.length; i++) {
            ret.push(curr.slice(0, i) + str[0] + curr.slice(i))
        }
    }
    return ret
}

function findSets(arr, ret) {
    const res = []
    find(arr, res, [], ret);
    return res
}
function find(arr, res, curr, ret, start) {
    if (ret === 0) {
        return res.push(curr.slice());
    }
    if (res < 0) {
        return;
    }
    for (let i = start; i < arr.length; i++) {
        curr.push(arr[i])
        find(arr, res, curr, ret - arr[i], i++)
        // 移除最后一个回退
        curr.pop();
    }
}

function quickSort(arr, left, right) {
    if (left < right) {
        const index = partition(arr, left, right)
        quickSort(arr, left, index - 1)
        quickSort(arr, index + 1, right)
    }
}
function partition(arr, left, right) {
    // left right mid 取中间值最优
    const first = arr[left];
    while (left < right) {
        while (left < right && arr[right] >= first) {
            right--
        }
        swap(arr, left, right)
        while (left < right && arr[left] <= first) {
            left++
        }
        swap(arr, left, right)
    }
    return left
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}
