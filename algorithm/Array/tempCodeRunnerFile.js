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