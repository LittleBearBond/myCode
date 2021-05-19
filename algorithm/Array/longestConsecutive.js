/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    // 最长连续的，找到起始位置，网上继续查找
    const map = {}
    let min = Number.MAX_SAFE_INTEGER
    for (const n of nums) {
        map[n] = true;
        min = n < min ? n : min
    }
    const len = Object.keys(map).length;
    let maxLen = 1;
    let curr = 0
    let index = 0
    while (index < len) {
        if (n in map) {
            curr++
            index++
            maxLen = curr > maxLen ? curr : maxLen
        } else {
            curr = 0
        }
        n++
    }
    return maxLen
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    var set = new Map()
    for (const v of nums) {
        set.set(v, 1)
    }
    let max = 0
    let count = 0
    let n
    for (const v of nums) {
        // 没这句话就慢了一个数量级
        if (set.has(v - 1)) {
            continue;
        }
        // 向左向右搜索
        n = v
        while (set.has(n--)) {
            count++
        }
        n = v
        while (set.has(++n)) {
            count++
        }
        max = Math.max(max, count)
        count = 0
    }
    return max
};
