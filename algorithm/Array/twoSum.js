// 1. Two Sum
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	var sIndex = 0;
	var eIndex, curr;
	var len = nums.length;
	while (sIndex < len - 1) {
		curr = nums[sIndex];
		eIndex = sIndex + 1
		while (eIndex < len) {
			if (curr + nums[eIndex] === target) {
				return [sIndex, eIndex];
			}
			eIndex++;
		}
		sIndex++;
	}
};
var twoSum = function (nums, target) {
	var map = {};
	var sIndex = 0,
		curr;
	var len = nums.length;
	while (sIndex < len) {
		curr = nums[sIndex]
		if (map[target - curr] >= 0) {
			return [map[target - curr], sIndex];
		} else {
			map[curr] = sIndex;
		}
		sIndex++;
	};
}

var twoSum = function (nums, target) {
	const cache = {}
	for (let i = 0, length = nums.length; i < length; i++) {
		if ((target - nums[i]) in cache) {
			return [cache[target - nums[i]], i]
		} else {
			cache[nums[i]] = i
		}
	}
}
console.log(twoSum([2, 7, 11, 15], 26))
console.log(twoSum([2, 7, 11, 15], 9))
