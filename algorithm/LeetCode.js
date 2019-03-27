// LeetCode 38. Count and Say
var countAndSay = function (n) {
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

var isPalindrome = function (str) {
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


/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
let visited
var exist = function (board, word) {
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
const dfs = function (board, word, i, j, index) {
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

var maxProduct = function (nums) {
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
var maxProduct = function (nums) {
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
var threeSum = function (nums) {
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
var longestValidParentheses = function (str) {
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
var uniquePathsWithObstacles = function (obstacleGrid) {
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
var containsDuplicate = function (nums) {
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
var firstUniqChar = function (s) {
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

var plusOne = function (digits) {
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
var merge = function (nums1, m, nums2, n) {
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
const fn = (function () {
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
var longestConsecutive = function (nums) {
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
var maxDepth = function (root) {
    if (root != null) {
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
    }
    return 0
};

var singleNumber = function (nums) {
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
var addTwoNumbers = function (l1, l2) {
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

var longestPalindrome = function (str) {
    let left;
    var maxLen = 0
    var find = function (i, j) {
        while (i >= 0 && j < str.length && str[i] === str[j]) {
            i--;
            j++
        }
        if (j - i - 1 > maxLen) {
            maxLen = j - i - 1
            left = i + 1
        }
    }
    for (var i = 0 ; i< str.length;i++) {
        find(i, i)
        find(i, i + 1)
    }
    return str.slice(left, maxLen + left)
};
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (str) {
    var count = 0
    var find = function (i, j) {
        while (i >= 0 && j < str.length && str[i] === str[j]) {
            i--;
            j++
            count++
        }
    }
    for (var i = 0 ; i< str.length;i++) {
        find(i, i)
        find(i, i + 1)
    }
    return count
};

function longestPalindromeSubseq(s) {
    var {
        length: n
    } = s
    var dp = [...Array(n)].map(() => Array(n).fill(0))

    for (var i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (var j = i + 1; j < n; j++) {
            if (s[i] == s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[0][n - 1];
}


function ListNode(val) {
    this.val = val;
    this.next = null;
}
var n1 = new ListNode(1)
var n2 = new ListNode(2)
var n3 = new ListNode(3)
var n4 = new ListNode(4)
n1.next = n2
n2.next = n3
n3.next = n4

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    var dummy = new ListNode(0),
        first = dummy,
        second = dummy;
    dummy.next = head;
    while (first.next !== null && first.next.next !== null) {
        // 2
        first = first.next.next;
        // 3
        second.next.next = first.next;

        first.next = second.next;
        second.next = first;
        first = first.next;
        second = first;
    }
    return dummy.next;
};

var swapPairs = function (head) {
    let a = head;
    const dummy = new ListNode(0);
    let temp = dummy;
    while (a !== null && a.next !== null) {
        const next = a.next.next;
        const b = a.next;
        b.next = a;
        temp.next = b;
        temp = a;
        a = next;
    }
    if (a) {
        temp.next = a;
        a.next = null;
    } else {
        temp.next = null;
    }

    return dummy.next;
};

var swapPairs = function (head) {
    var dummy = new ListNode(0)
    var temp = dummy;
    var a = head;
    while (a !== null && a.next !== null) {
        // 3 5 7
        var next = a.next.next;
        // 2 4 6
        var b = a.next
        // 0-->2 1-->4  3-->6
        temp.next = b
        // 2 -->1  4-->3 6-->5
        b.next = a
        // 1 3 5
        temp = a
        // 3 5 7
        a = next
    }
    if (a) {
        temp.next = a
        a.next = null
    } else {
        temp.next = null
    }
    return dummy.next
}
var removeNthFromEnd = function (head, n) {
    let pre = head;
    let next;
    let index = 0
    next = head
    while (index++ < n) {
        next = next.next
    }
    while (next.next) {
        pre = pre.next
        next = next.next
    }
    pre.next = pre.next.next
};


/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = (function (n) {
    var temp = {
        1: 1,
        2: 2
    }
    return function fn() {
        if (n in temp) {
            return temp[n]
        }
        return fn(n - 1) + fn(n - 2)
    }
}())
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    if (!nums.length) {
        return 0
    }
    if (nums.length === 1) {
        return nums[0]
    }
    nums[1] = Math.max(nums[0], nums[1])
    for (const [index, val] of nums.entries()) {
        if (index < 2) {
            continue
        }
        nums[index] = Math.max(nums[index] + nums[index - 2], nums[index - 1])
    }
    console.log(nums)
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    if (!nums.length) {
        return 0
    }
    if (nums.length === 1) {
        return nums[0]
    }
    var pre = nums[0]
    var curr = Math.max(nums[0], nums[1])
    var temp
    for (const [_, val] of nums.slice(2).entries()) {
        // if (index < 2) {
        //            continue
        //        }
        temp = curr
        curr = Math.max(val + pre, curr)
        pre = temp
    }
    return curr
};

/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
    var i = 0
    var reg = /1/g
    var arr = new Array(num)
    var match
    while (i <= num) {
        match = i.toString(2).match(reg)
        arr[i] = match ? match.length : 0
        i++
    }
    return arr
};
