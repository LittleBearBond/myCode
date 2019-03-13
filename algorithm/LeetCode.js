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
}
