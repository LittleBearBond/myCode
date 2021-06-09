// 121. Best Time to Buy and Sell Stock
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
// 多次买卖
var maxProfit = function (prices) {
    var max = 0
    for (var i = 0, length = prices.length - 1; i < length; i++) {
        if (prices[i] < prices[i + 1]) {
            max += (prices[i + 1] - prices[i])
        }
    }
    return max
};
/*
在一次的买卖当中想要获取到最大的利润就需要在最低的价格买入最高的价格卖出，即买卖的价格差最大；
第二次买卖则是在第一次卖出之后再次找到一个最大的价格差。可以假设初始拥有的资金为0，可以借钱买入股票，
则在买入价格为n的股票后，手上剩余的钱即为-n， -n越大则代表买入的价格越低；
而以价格m卖出之后手上剩余的钱即为m - n， m - n 越大代表获得的利润越高。
只要我们在进行两次买卖操做的过程中保证两次买入和两次卖出后剩余的钱一直是最多的，那第二次卖出后手上的钱就是最大的利润。
 */
// 限制两次买卖
var maxProfit = function (prices) {
    var s1 = Number.MIN_VALUE, buy1 = 0, s2 = Number.MIN_VALUE, buy2 = 0;
    for (var i = 0, length = prices.length; i < length; i++) {
        // 低价买入
        buy1 = Math.max(buy1, -prices[i])
        // 当前价格减去买入价格为利润
        s1 = Math.max(s1, prices[i] + buy1);
        // 减去成本是手上的利润，s1 - prices[i]来计算第二次买入后手上剩余的钱
        buy2 = Math.max(buy2, s1 - prices[i])
        // 手上的钱
        s2 = Math.max(s2, prices[i] + buy2)
        console.log(buy1, s1, buy2, s2)
    }
    return s2
};
var maxProfit = function (prices) {
    let min1 = prices[0];
    let min2 = prices[0];
    let max1 = 0; let max2 = 0;
    for (let index = 1; index < prices.length; index++) {
        // 当前遇到的最低价   
        min1 = Math.min(min1, prices[index]);
        // 当前为止，第一次交易赚的钱的最大值  
        max1 = Math.max(max1, prices[index] - min1);
        // 当前买入的综合最低价(计算了上一个交易的利润)   
        min2 = Math.min(min2, prices[index] - max1);
        // 当前卖出的最高利润    
        max2 = Math.max(max2, prices[index] - min2);
    } return max2;
};


maxProfit([3, 3, 5, 0, 0, 3, 1, 4])


// 不限制次数的买卖
var maxProfit = function (prices) {
    const k = Math.min(0, Math.floor(prices.length / 2))
    if (k === 0) {
        return
    }
    if (k > Math.floor(prices.length / 2)) {
        // 任意次数  直接不断买卖
    }
    const buy = Array(k + 1).fill(Math.MIN_VALUE)
    const sell = Array(K + 1).fill(0)
    for (var i = 0, length = prices.length; i < length; i++) {
        for (let j = 1; j <= k; j++) {
            // 前一天手上的钱 减去今天的价格
            buy[j] = Math.max(buy[j], buy[j - 1] - prices[i])
            //当前利润加上当前价格
            sell[j] = Math.max(sell[j], buy[j] + prices[i]);
        }
    }
    return sell[k];
};
