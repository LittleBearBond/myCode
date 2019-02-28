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
	var {
		length
	} = matrix
	var i = 0;
	var j = 0;
	// 一次旋转四个点

	return matrix
};
console.log(rotate(
	[
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	]))
