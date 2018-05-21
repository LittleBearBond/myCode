function MinCoinChange(coins) {
	var coins = coins; //{1}
	var cache = {}; //{2}
	this.makeChange = function (amount) {
		var me = this;
		if (!amount) { //{3}
			return [];
		}
		if (cache[amount]) { //{4}
			return cache[amount];
		}
		var min = [], newMin, newAmount;
		for (var i = 0; i < coins.length; i++) { //{5}
			var coin = coins[i];
			newAmount = amount - coin; //{6}
			if (newAmount >= 0) {
				newMin = me.makeChange(newAmount); //{7}
			}
			if (
				newAmount >= 0 && //{8}
				(newMin.length < min.length - 1 || !min.length)//{9}
				&& (newMin.length || !newAmount))//{10})
			{
				min = [coin].concat(newMin); //{11}
				console.log('new Min ' + min + ' for ' + amount);
			}
		}
		return (cache[amount] = min); //{12}
	};
}
var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
debugger
console.log(minCoinChange.makeChange(36));
/*
    MinCoinChange类接收coins参数（行{1}），该参数代表问题中的面额。对美国的硬币系
    统而言，它是[1, 5, 10, 25]。我们可以随心所欲传递任何面额。此外，为了更加高效且不重
    复计算值，我们使用了cache（行{2}）。
    接下来是makeChange方法，它也是一个递归函数，找零问题由它解决。首先，若amount
    不为正（< 0），就返回空数组（行{3}）；方法执行结束后，会返回一个数组，包含用来找零的各
    个面额的硬币数量（最少硬币数）。接着，检查cache缓存。若结果已缓存（行{4}），则直接返
    回结果；否则，执行算法。
    我们基于coins参数（面额）解决问题。因此，对每个面额（行{5}），我们都计算newAmount
    （行{6}）的值，它的值会一直减小，直到能找零的最小钱数（别忘了本算法对所有的x < amount
    都会计算makeChange结果）。若newAmount是合理的值（正值），我们也会计算它的找零结果（行
    {7}）。
    最后，我们判断newAmount是否有效，minValue （最少硬币数）是否是最优解，与此同时
    minValue和newAmount是否是合理的值（{行10}）。若以上判断都成立，意味着有一个比之前
    更优的答案（行{11}。以5美分为
*/


function minCoinChange1(coins) {
	var cache = {};
	this.makeChange = function (count) {
		//小于等于0 返回空数组
		if (count === 0) {
			return [];
		}
		//已经计算过，返回之前的结果
		if (cache[count]) {
			return cache[count]
		}
		var min = []
		var newCount;
		var newMin
		//每次调用makeChange 传入count 都会循环一次所有硬币，找到最小组合的那一个
		for (let coin of coins) {
			//总和减去当前的硬币大小值，得到一个新的总和值
			newCount = count - coin
			if (newCount >= 0) {
				//把新值用递归方式去查找
				newMin = this.makeChange(newCount)
			}
			if (newCount >= 0 &&
				//当前 min 没有值，或者新找到的比当前这个min 还要小
				(newMin.length < min.length - 1 || !min.length) &&
				//newCount 为0 或者 newMin 有值长度；newMin 在 count - coin 为0
				(newCount === 0 || newMin.length)
			) {
				min = [coin].concat(newMin); //{11}
				console.log(`min ${count} `, min)
			}
		}
		return (cache[count] = min)
	}
}
