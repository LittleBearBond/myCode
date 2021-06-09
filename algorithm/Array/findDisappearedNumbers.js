/* 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。
请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
	const {
		length
	} = nums
	let newArr = []
	for (let i = 0; i < length; i++) {
		// 1 ≤ a[i] ≤ n
		let val = Math.abs(nums[i]) - 1
		if (nums[val] > 0) {
			// 将该索引指向的值标记为负数
			nums[val] = -nums[val];
		}
	}
	for (let i = 0; i < length; i++) {
		if (nums[i] > 0) {
			newArr.push(i + 1);
		}
	}
	return newArr
};
console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))
