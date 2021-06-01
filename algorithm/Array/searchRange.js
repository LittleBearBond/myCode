/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    if (!nums || !nums.length) {
        return [-1, -1]
    };
    const len = nums.length
    let right = len - 1
    let left = 0;
    // 不等于 搜索边界
    while (left <= right) {
        const mid = Math.ceil((len + i) / 2);
        const midVal = nums[mid];
        if (midVal < target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    left = mid
    if (left < 0 || left > len || nums[left] !== target) {
        return [-1, -1]
    }
    right = len - 1
    // 等于继续搜索
    while (left <= right) {
        const mid = Math.ceil((len + i) / 2);
        const midVal = nums[mid];
        if (midVal >= target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return [left, high]
};
