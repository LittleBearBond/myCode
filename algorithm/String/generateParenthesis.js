/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
	// DFS
	var result = []
	var str = ''
	var left = 0
	var right = 0
	// 写这么多 为了看着明白
	dfs(result, n, str, left, right)
	return result;
};

var dfs = function (result, n, str, left, right) {
	console.log(n, str, left, right, result)
	// 回退条件
	if (str.length === n * 2) {
		return result.push(str)
	}
	// 继续搜索
	// 添加左边括号的条件是  left < n
	if (left < n) {
		dfs(result, n, str + '(', left + 1, right)
	}
	if (right < left) {
		dfs(result, n, str + ')', left, right + 1)
	}
	// 添加右边括号的条件是  right < left
}

console.log(generateParenthesis(3))
