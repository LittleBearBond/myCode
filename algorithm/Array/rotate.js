// 48. Rotate Image

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
	var {
		length
	} = matrix
	var i = 0;
	var j = 0;
	var result = [];
	for (; i < length; i++) {
		result[i] = []
		for (j = length - 1; j >= 0; j--) {
			result[i].push(matrix[j][i])
		}
	}
	matrix = result
	return matrix
};
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
	var n = matrix.length
	var i = 0;
	var j = 0;
	var temp;
	/*
		i=0,j=0 	i=0,j=1		i=0,j=2		i=1,j=1
		0 	0		0 	1		0 	2		1 	1
		3 	0		2 	0		1 	0		2 	1
		3 	3		3 	2		3 	1		2 	2
		0 	3		1 	3		2 	3		1 	2
		[i][j]
		[n-1-j][i]
		[n-1-i][n-1-j]
		[j][n - 1 - i]
		一次旋转四个点,每个点的规律如上
	*/
	for (i = 0; i < (n + 1) / 2; i++) {
		for (j = i; j < n - 1 - i; j++) {
			temp = matrix[i][j];
			matrix[i][j] = matrix[n - 1 - j][i];
			matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
			matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
			matrix[j][n - 1 - i] = temp;
		}
	}
	return matrix
};

console.log(rotate(
	[
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	]))
console.log(rotate(
	[
		[5, 1, 9, 11],
		[2, 4, 8, 10],
		[13, 3, 6, 7],
		[15, 14, 12, 16]
	]))
