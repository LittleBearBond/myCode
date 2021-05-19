/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    // 从第一部开始  看每一步能达到的最远位置，挨个检查能到达位置的每个位置 能到达下个位置的最远距离，去最远的这个，以此反复往后推
    const len = nums.length;
    if (len == 1) {
        return 0;
    }
    let pos = 0, count = 0, end = 0;
    for (let i = 0; i < len; i++) {
        pos = Math.max(pos, nums[i] + i);
        // 跳到最后了
        if (pos > len - 1) {
            return count++
        }
        // 下标到达跳转最远位置
        if (end === i) {
            end = pos
            count++
        }

    }
    return count;
};
