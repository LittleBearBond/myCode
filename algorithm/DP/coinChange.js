/* https://leetcode-cn.com/problems/coin-change/solution/dong-tai-gui-hua-yin-ru-pian-zhu-bu-tan-suo-zhao-l/ */

const coinChange = (coins, amount) => {
    /*
    f[0] = 0 (n=0)
    f[n] = min(f[n-cᵢ]) + 1 (n>0)
    */

    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = [0]
    for (let i = 0; i <= amount; i++) {
        for (curr of confirm) {
            if (curr <= i) {
                dp[i] = Math.min(dp[i], dp[i - curr] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
}
