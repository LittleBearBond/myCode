// 75. Sort Colors
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
	let n = nums.length
	let left = 0;
	let right = n - 1
	let swap = function (i, j) {
		[nums[i], nums[j]] = [nums[j], nums[i]]
	}
	for (let i = 0; i < n; i++) {
		while (nums[i] === 2 && i < right) {
			swap(i, right--)
		}
		while (nums[i] === 0 && i > left) {
			swap(i, left++)
		}
	}
};
var arr = [2, 0, 2, 1, 1, 0]
sortColors(arr)
console.log(arr)
