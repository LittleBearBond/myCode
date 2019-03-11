// 560. Subarray Sum Equals K
/*
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
	let res = 0
	let sum = 0
	for (let i = 0; i < nums.length; i++) {
		sum = 0
		sum += nums[i]
		if (sum === k) {
			res++
		}
		for (let j = i + 1; j < nums.length; j++) {
			sum += nums[j]
			if (sum === k) {
				res++
			}
		}

	}
	return res
};

function subarraySum(nums, k) {
	const map = new Map([
		[0, 1]
	]);
	let sum = 0;
	let total = 0;
	for (let num of nums) {
		sum = sum + num;
		total += (map.get(sum - k) || 0);
		map.set(sum, (map.get(sum) || 0) + 1);
	}

	return total;
}

function subarraySum(nums, k) {
	const map = {
		0: 1
	};
	let sum = 0;
	let total = 0;
	for (let num of nums) {
		sum = sum + num;
		total += map[sum - k] || 0;
		map[sum] = (map[sum] || 0) + 1
	}
	return total;
}
console.log(subarraySum([0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0))
