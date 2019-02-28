// 78. Subsets

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
	var result = []
	for (const n of nums) {
		for (var i = 0, len = result.length; i < len; i++) {
			result.push([...result[i], n])
		}
		result.push([n])
	}
	result.push([])
	return result
};
console.log(subsets([1, 2, 3]))
var findUnsortedSubarray = function(nums) {
    var len = nums.length;
    var temp = nums.slice().sort();

    var start = 0;
    while (start < len  && nums[start] === temp[start]) {
        start++;
    }

    var end = len - 1;
    while (end > start  && nums[end] === temp[end]) {
        end--;
    }

    return end - start + 1;
};

console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]))
