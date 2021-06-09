
/*
给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，
那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
    if (!Array.isArray(nums) || !nums.length) {
        return 0
    }
    let currLen = 1;
    let maxLen = 0;
    let left = 0;
    let right = 1
    while (right < nums.length) {
        if (nums[right] > nums[left]) {
            currLen++
        } else {
            currLen = 1
        }
        maxLen = Math.max(maxLen, currLen)
        left++
        right++
    }
    return maxLen
};
