// LeetCode 169. Majority Element
var majorityElement = function (nums) {
	if (!nums.length) {
		return;
	}
	if (nums.length === 1) {
		return nums[0];
	}
	var cache = {},
		count = nums.length / 2;
	for (let num of nums) {
		if (!cache[num]) {
			cache[num] = 1
		} else {
			cache[num]++;
			if (cache[num] >= count) {
				return num;
			}
		}
	}
}
console.log(majorityElement([1, 2, 2, 1, 1]))
