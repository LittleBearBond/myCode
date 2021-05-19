/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    // 记住每次能调的最远距离，每个位置都跳一次，不断更新最远距离，最远距离达不到下标  就跳不了了
    const len = nums.length;
    let max = 0;
    let i = 0;
    while (i < len) {
        if (max < i) {
            return false
        } else {
            max = Math.max(i + nums[i], max)
        }
        i++
    }
    return true
};
