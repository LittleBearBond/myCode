//https://segmentfault.com/a/1190000012864957

function LCS(str1, str2) {
	var rows = str1.split("")
	rows.unshift("")
	var cols = str2.split("")
	cols.unshift("")
	var m = rows.length
	var n = cols.length
	var dp = []
	for (var i = 0; i < m; i++) {
		dp[i] = []
		for (var j = 0; j < n; j++) {
			if (i === 0 || j === 0) {
				dp[i][j] = 0
				continue
			}
			if (rows[i] === cols[j]) {
				dp[i][j] = dp[i - 1][j - 1] + 1 //对角＋1
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) //对左边，上边取最大
			}
		}
		console.log(dp[i].join(""))//调试
	}
	return dp[i - 1][j - 1]
}

function LCS(str1, str2) {
	var m = str1.length
	var n = str2.length
	var dp = [new Array(n + 1).fill(0)] //第一行全是0
	for (var i = 1; i <= m; i++) { //一共有m+1行
		dp[i] = [0] //第一列全是0
		for (var j = 1; j <= n; j++) {//一共有n+1列
			if (str1[i - 1] === str2[j - 1]) {
				//注意这里，str1的第一个字符是在第二列中，因此要减1，str2同理
				dp[i][j] = dp[i - 1][j - 1] + 1 //对角＋1
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
			}
		}
	}
	return dp[m][n];
}
