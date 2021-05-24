// https://zhuanlan.zhihu.com/p/79811305
// 按列来求
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let count = 0
    for (let i = 1; i < height.length - 1; i++) {

        // 向左
        let maxL = 0
        for (let l = 0; l < i; i++) {
            maxL = maxL > height[l] ? maxL : height[l]
        }
        // 向右
        let maxR = 0
        for (let r = i; r < height.length; r++) {
            maxR = maxR > height[r] ? maxR : height[r]
        }
        // 取小
        let minH = maxL > maxR ? maxR : maxL
        // 计算值
        if (minH > height[i]) {
            // 累加
            count += (minH - height[i])
        }
    }
    return count
};
