/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
	var result = new Array(nums.length);
	// left
	for (var i = 0, tmp = 1; i < nums.length; i++) {
		result[i] = tmp;
		tmp *= nums[i];
	}

	// right
	for (var i = nums.length - 1, tmp = 1; i >= 0; i--) {
		result[i] *= tmp;
		tmp *= nums[i];
	}
	console.log(result)
};

productExceptSelf([2, 3, 4, 5, 6, 7])
// old  [2, 3, 4, 5, 6, 7]
// left [1, 2, 6, 24, 120, 720]
// right[2520, 1680, 1260, 1008, 840, 720]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
	const result = new Array(nums.length)
	let temp = 1
	const {
		length
	} = nums
	for (let i = 0; i < length; i++) {
		// left 乘积
		result[i] = temp
		temp *= nums[i]
	}
	for (let i = length - 1, temp = 1; i >= 0; i--) {
		result[i] *= temp
		temp *= nums[i]
	}
	return result
}
productExceptSelf([2, 3, 4, 5, 6, 7])
