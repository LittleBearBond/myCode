/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
	const result = [];
	findSets(candidates, result, [], target, 0);
	return result;
}

/**
 *
 * @param {number[]} candidates
 * @param {number[][]} result
 * @param {number[]} current
 * @param {number} remainder
 * @param {number} start
 * @return {void}
 */
function findSets(candidates, result, current, remainder, start) {
	console.log(result, current, remainder, start)
	if (remainder === 0) {
		return result.push(current.slice());
	}

	if (remainder < 0) {
		return;
	}

	// Track start to prevent going backwards, avoiding duplicates
	for (let i = start; i < candidates.length; i++) {
		current.push(candidates[i]);
		findSets(candidates, result, current, remainder - candidates[i], i);
		// 回退
		current.pop();
	}
}

// console.log(combinationSum([2, 3, 6, 7], 7))
console.log(combinationSum([2, 3, 5], 8))


function combinationSum(nums, target) {
	var result = []
	var current = []
	// 升序排序
	nums.sort((a, b) => a - b)
	findSets(nums, current, result, target, 0)
	return result
}

/**
 *
 *
 * @param {number[]} nums
 * @param {number[]} current
 * @param {number[][]} result
 * @param {number} target
 * @param {number} start
 */
function findSets(nums, current, result, target, start) {
	if (target === 0) {
		// 符合条件的集合添加到结果中，回退
		return result.push(current.slice())
	}
	if (target < 0) {
		// 回退
		return
	}
	for (var i = start; i < nums.length; i++) {
		current.push(nums[i])
		findSets(nums, current, result, target - nums[i], i)
		// 删除最后一个元素 回退
		current.pop()
	}
}
