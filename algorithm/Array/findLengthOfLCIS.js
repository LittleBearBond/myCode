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
