/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	var min = Number.MAX_VALUE
	var max = 0
	for (var i = 0, length = prices.length; i < length; i++) {
		// 记录最小值
		min = Math.min(min, prices[i])
		max = Math.max(max, prices[i] - min)
	}
	return max
};
