/* eslint-disable no-redeclare */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    var cache = {}
    for (const item of nums) {
        if (item in cache) {
            return item;
        }
        cache[item] = 1
    }
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    nums.sort()
    for (let i = 1, length = nums.length; i < length; i++) {
        if (nums[i] === nums[i - 1]) {
            return nums[i];
        }
    }
    return -1;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    let slow = nums[0],
        fast = nums[nums[0]];

    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }
    fast = 0;

    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
};

console.log(findDuplicate([9, 4, 3, 5, 2, 2]))
