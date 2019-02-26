function maxSubArray(nums) {
	var prev = 0;
	var max = -Number.MAX_VALUE;

	for (var i = 0, length = nums.length; i < length; i++) {
		prev = Math.max(prev + nums[i], nums[i]);
		max = Math.max(max, prev);
	}
	return max;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))