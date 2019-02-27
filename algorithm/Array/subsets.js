// 78. Subsets

/**
 * @param {number[]} nums
 * @return {number[][]}
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
console.log(subsets([1, 2, 3]))
