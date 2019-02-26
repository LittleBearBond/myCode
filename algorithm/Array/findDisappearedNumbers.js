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
