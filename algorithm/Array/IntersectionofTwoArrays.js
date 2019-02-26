// LeetCode 349. Intersection of Two Arrays
var intersection = function (nums1, nums2) {
	var map = {},
		arr = [];
	nums1.forEach(val => {
		if (!(val in map)) {
			map[val] = true;
		}
	})
	for (let item of new Set(nums2)) {
		if (item in map) {
			arr.push(item)
		}
	}
	return arr;
}
console.log(intersection([1, 2, 2, 1], [2, 2]))
console.log(intersection([1, 2, 2, 1, 3, 4, 5], [2, 2, 3, 3]))
