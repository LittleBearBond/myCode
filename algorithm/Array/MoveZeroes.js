// LeetCode 283. Move Zeroes

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
	if (!Array.isArray(nums) || !nums.length) {
		return nums
	}
	let lastZeroIndex = 0
	const {
		length
	} = nums
	for (let i = 0; i < length; i++) {
		if (nums[i] !== 0) {
			nums[lastZeroIndex++] = nums[i]
		}
	}
	for (let i = lastZeroIndex; i < length; i++) {
		nums[i] = 0
	}
	return nums
};

console.log(moveZeroes([0, 1, 0, 3, 12]))
