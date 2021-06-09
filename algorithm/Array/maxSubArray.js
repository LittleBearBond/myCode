/*
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
 */
// 53. Maximum Subarray
function maxSubArray(nums) {
    var maxSoFar = nums[0],
        maxEndingHere = nums[0];
    for (let i = 1; i < nums.length; ++i) {
        maxEndingHere = Math.max(maxEndingHere + nums[i], nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}

function maxSubArray(nums) {
    var pre = 0;
    var max = -Number.MAX_VALUE;
    for (var i = 0, length = nums.length; i < length; i++) {
        pre = Math.max(pre + nums[i], nums[i])
        max = Math.max(pre, max)
    }
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
