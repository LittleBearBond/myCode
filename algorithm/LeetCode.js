// LeetCode 38. Count and Say
var countAndSay = function(n) {
    if (n < 1) {
        return '1'
    }
    n = String(n);
    var count = 1;
    var countSay = '',
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

// LeetCode 125. Valid Palindrome

var isPalindrome = function(str) {
    if (!str) {
        return false;
    }
    str = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    return str === str.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal: Panama"))
console.log(isPalindrome("sdfd df"))



// LeetCode 258. Add Digits
// num = 38，則 3+8 = 11，1+1 = 2, 2是個為數，回傳2。
var addDigits = function(num) {
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


/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
let visited
var exist = function(board, word) {
    const arr = new Array(board[0].length)
    visited = Array.from({
        length: board.length
    }, () => [...arr])
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === word.charAt(0) && dfs(board, word, i, j, 0)) {
                return true
            }
        }
    }
    return false
};
const dfs = function(board, word, i, j, index) {
    if (index === word.length) {
        return true
    }
    if (i < 0 || i >= board.length || j < 0 || j >= board[i].length || word.charAt(index) !== board[i][j] || visited[i][j]) {
        return false
    }
    visited[i][j] = true
    if (
        dfs(board, word, i - 1, j, index + 1) ||
        dfs(board, word, i + 1, j, index + 1) ||
        dfs(board, word, i, j - 1, index + 1) ||
        dfs(board, word, i, j + 1, index + 1)
    ) {
        return true
    }
    visited[i][j] = false
    return false
}
debugger
exist([
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"]
], "ABCCED")

var maxProduct = function(nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    const n = nums.length
    if (n == 1) {
        return nums[0];
    }
    const maxhere = new Array(n)
    const minhere = new Array(n)
    maxhere[0] = nums[0];
    minhere[0] = nums[0];
    let res = nums[0];

    for (let i = 1; i < nums.length; i++) {
        maxhere[i] = Math.max(Math.max(maxhere[i - 1] * nums[i], nums[i]), minhere[i - 1] * nums[i]);
        minhere[i] = Math.min(Math.min(minhere[i - 1] * nums[i], nums[i]), maxhere[i - 1] * nums[i]);
        res = Math.max(res, maxhere[i]);
    }

    return res;
};
var maxProduct = function(nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    const n = nums.length
    if (n == 1) {
        return nums[0];
    }
    let maxhere = nums[0]
    let minhere = nums[0];
    let res = nums[0];
    let maxPre;
    for (let i = 1; i < nums.length; i++) {
        maxPre = maxhere
        maxhere = Math.max(Math.max(maxPre * nums[i], nums[i]), minhere * nums[i]);
        minhere = Math.min(Math.min(minhere * nums[i], nums[i]), maxPre * nums[i]);
        res = Math.max(res, maxhere);
    }
    return res;
};
debugger
// maxProduct([2, 3, -2, 4])
maxProduct([-2, 0, -1])

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const n = nums.length
    const res = []
    let begin, end, sum;
    if (!n || n < 3) {
        return []
    }
    nums.sort((a, b) => a - b)
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            break
        }
        if (nums[i] === nums[i - 1]) {
            continue
        }
        begin = i + 1
        end = n - 1;
        while (begin < end) {
            sum = nums[i] + nums[begin] + nums[end];
            if (sum === 0) {
                res.push([nums[i], nums[begin], nums[end]]);
                begin++;
                end--;
                // 前后相等
                while (begin < end && nums[begin] === nums[begin - 1]) {
                    begin++;
                }
                // 前后相等
                while (begin < end && nums[end] === nums[end + 1]) {
                    end--;
                }
            } else if (sum > 0) {
                // 后面往前
                end--;
            } else {
                // <0  前面往后
                begin++;
            }
        }
    }
    return res
}


/**
 * @param {string} str
 * @return {number}
 */
var longestValidParentheses = function(str) {
    let res = 0;
    let arr = [-1]
    for (const i = 0; i < str.length; i++) {
        let s = str[i]
        if ('(' === s) {
            arr.push(i)
        } else if (s === ')') {
            arr.pop()
            if (arr.length) {
                res = Math.max(res, i - arr[arr.length - 1]);
            } else {
                arr.push(i)
            }
        }
    }
    return res
};
console.log(longestValidParentheses('(()'))

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    var item = new Array(obstacleGrid[0].length)
    var arr = new Array(obstacleGrid.length).fill([...item])
    for (let i = 0; i < obstacleGrid.length; i++) {
        for (let j = 0; j < obstacleGrid[i].length; j++) {
            if (i === 0 && j === 0) {
                arr[i][j] = 1
            } else if (i === 0) {
                arr[i][j] = arr[i][j - 1]
            } else if (j === 0) {
                arr[i][j] = arr[i - 1][j]
            } else if (obstacleGrid[i][j] === 1) {
                arr[i][j] = 0
            } else {
                arr[i][j] = arr[i - 1][j] + arr[i][j - 1]
            }
        }
    }
    return obstacleGrid[i - 1][j - 1]
};
uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
])

/**
 * @author xiongjian
 * @email xiongjian@didichuxing.com
 * @create date 2018-11-27 10:30:08
 * @modify date 2018-11-27 10:45:20
 * @desc [description]
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const map = {}
    for (const v of nums) {
        if (v in map) {
            return true
        }
        map[v] = true
    }
};

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    const map = {}
    for (const v of s) {
        if (v in map) {
            map[v]++
                continue
        }
        map[v] = 1
    }
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] === 1) {
            return i
        }
    }
    return -1
};

var plusOne = function(digits) {
    let {
        length
    } = digits
    let pre = 1
    let curr
    while (length-- > 0) {
        curr = digits[length]
        curr += pre
        if (curr < 10) {
            digits[length] = curr
            break
        }
        if (curr === 10) {
            pre = 1
            digits[length] = 0
            if (length === 0) {
                digits.unshift(1)
            }
        }
    }
    return digits
};

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let i = m - 1
    let j = n - 1
    let index = m + n - 1
    while (i >= 0 || j >= 0) {
        if (nums1[i] >= nums2[j]) {
            nums1[index--] = nums1[i--]
        } else if (nums1[i] <= nums2[j]) {
            nums1[index--] = nums2[j--]
        } else if (i >= 0) {
            nums1[index--] = nums1[i--]
        } else if (j >= 0) {
            nums1[index--] = nums2[j--]
        }
    }
    return nums1
};
const fn = (function() {
    const temp = {
        0: 0,
        1: 1
    };
    return function fib(n) {
        if (!(n in temp)) {
            temp[n] = fib(n - 1) + fib(n - 2);
        }
        return temp[n];
    }
}())

function fiboDp(n) {
    let current = 0;
    let next = 1;
    for (let i = 0; i < n; i++) {
        [current, next] = [next, current + next];
    }
    return current;
}


/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    var set = new Set()
    for (const v of nums) {
        set.add(v, 0)
    }
    let max = 0
    let count = 0
    let n
    for (const v of nums) {
        n = v
        while (set.has(n--)) {
            count++
        }
        n = v
        while (set.has(++n)) {
            count++
        }
        max = Math.max(max, count)
        count = 0
    }
    return max
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root != null) {
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
    }
    return 0
};

var singleNumber = function(nums) {
    var sum = n => n.reduce((sum, curr) => {
        return sum += curr
    }, 0)
    return sum([...new Set(sum)]) * 2 - sum(nums)
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var List = new ListNode(0);
    var head = List;
    var sum = 0;
    var carry = 0;

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
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
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
    return str.split('')
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if (!s) {
        return true
    }
    var start = 0
    var end = s.length - 1
    var reg = /[a-zA-Z]|[0-9]/
    s = s.toLowerCase()
    while (start <= end) {
        if (!reg.test(s[start])) {
            start++
            continue;
        }
        if (!reg.test(s[end])) {
            end--
            continue;
        }
        if (s[start] !== s[end]) {
            return false
        }
        start++
        end--
    }
    return true
};

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function(A, K) {
    var res = []
    var pre = 0
    var a
    while (A.length) {
        a = A.pop()
        res.unshift((a + K % 10 + pre) % 10)
        pre = Math.floor((a + K % 10 + pre) / 10)
        K = Math.floor(K / 10)
    }
    if (K > 0) {
        k += pre
        while (K > 0) {
            res.unshift(K % 10)
            K = Math.floor(K / 10)
        }
    } else if (pre) {
        res.unshift(pre)
    }

    console.log(res)
};

var addStrings = function(num1, num2) {
    var pre = 0
    var curr, ret = ''
    num1 = num1.split('')
    num2 = num2.split('')
    while (num1.length || num2.length) {
        var n1 = num1.pop() | 0
        var n2 = num2.pop() | 0
        curr = n1 + n2 + pre
        ret = curr % 10 + ret
        pre = Math.floor(curr / 10)
    }
    if (pre > 0) {
        ret = pre + ret
    }
    return ret
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b)
    var closet = nums[0] + nums[1] + nums[2],
        len = nums.length
    var l, r, curr
    for (i = 0; i < len - 2; i++) {
        l = i + 1
        r = len - 1
        while (l < r) {
            curr = nums[i] + nums[l] + nums[r]
            if (Math.abs(curr - target) < Math.abs(closet - target)) {
                closet = curr
            }
            if (closet > target) {
                r--
            } else if (closet < target) {
                l++
            } else {
                return closet
            }
        }
    }
    return closet
};


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b)
    var len = nums.length
    var ret = [],
        sum
    for (i = 0; i < len - 2; i++) {
        if (nums[i] === nums[i - 1]) {
            continue;
        }
        var j = i + 1;
        var k = len - 1
        while (j < k) {
            sum = nums[i] + nums[j] + nums[k]
            if (sum === 0) {
                ret.push([nums[i], nums[j], nums[k]])
                k--
                j++
                // j向右移动，剔除相同的值
                while (j < k && nums[j] === nums[j - 1]) {
                    j++
                }
                // k向左移动，剔除相同的值
                while (j < k && nums[k] === nums[k + 1]) {
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

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b)
    var len = nums.length
    var ret = [],
        sum, threeSum
    for (i = 0; i < len - 3; i++) {
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

function twoSum(nums, target) {
    var cache = {}
    for (const n of nums) {
        if ((target - n) in cache) {
            return [n, target - n]
        } else {
            cache[n] = true
        }
    }
    return []
}

function threeSum(nums, target) {
    nums.sort((a, b) => a - b)
    var len = nums.length
    var twoSum, ret = []
    for (let i = 0; i < len - 2; i++) {
        if (nums[i] === nums[i - 1]) {
            continue;
        }
        var l = i + 1
        var r = len - 1
        while (l < r) {
            twoSum = target - nums[i] - nums[l] - nums[r]
            if (twoSum === 0) {
                ret.push([nums[i], nums[l], nums[r]])
                l++
                r--
                while (l < r && nums[l] === nums[l - 1]) {
                    l++
                }
                while (l < r && nums[r] === nums[r + 1]) {
                    r--
                }
            } else if (twoSum < 0) {
                r--
            } else {
                l++
            }
        }
    }
    return ret
}

function fourSum(nums, target) {
    var i = 0
    var len = nums.length
    var ret = [];
    nums.sort((a, b) => a - b)
    for (; i < len - 1; i++) {
        if (nums[i] === nums[i - 1]) {
            continue;
        }
        var threeResult = threeSum([...nums.slice(0, i), ...nums.slice(i + 1, len)], target - nums[i]);
        console.log(threeResult, target - nums[i])
        if (threeResult.length) {
            ret.push(...threeResult.map(v => ([nums[i], ...v])))
        }
    }
    return ret
}