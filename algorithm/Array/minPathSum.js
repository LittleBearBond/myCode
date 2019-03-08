// 64. Minimum Path Sum
/**
 * DP
 * i=0 grid[i][j] += grid[i][j - 1]
 * j=0 grid[i][j] += grid[i - 1][j]
 * grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
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
	console.log(grid)
	return grid[m - 1][n - 1]
};

var input = [
	[1, 3, 1],
	[1, 5, 1],
	[4, 2, 1]
]

console.log(minPathSum(input))
