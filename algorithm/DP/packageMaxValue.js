/* eslint-disable no-redeclare */
//https://cloud.tencent.com/developer/article/1050285
/**
 *
 * @param {Array} weight 重量
 * @param {Array} value 对应价值
 * @param {Number} size
 */
function packageMaxValue(weight, value, size) {
    // 省略参数合法性校验
    let bagMatrix = []
    let wLen = weight.length
    for (let w = 0; w <= size; w++) {
        // js不能直接创建二维数组，所以在此初始化数组
        bagMatrix[w] = []
        for (let j = 0; j < wLen; j++) {
            // 背包的容量为0，那么一个东西也装不下，此时的值肯定也是为0
            if (w === 0) {
                bagMatrix[w][j] = 0
                continue
            }
            // 背包的容量小于物品j的重量，那么就没有上述情况a了
            if (w < weight[j]) {
                bagMatrix[w][j] = bagMatrix[w][j - 1] || 0
                continue
            }
            bagMatrix[w][j] = Math.max((bagMatrix[w - weight[j]][j - 1] || 0) + value[j], bagMatrix[w][j - 1] || 0)
        }
    }
    return bagMatrix
}

let weight = [4, 5, 6, 2, 2]
let value = [6, 4, 5, 3, 6]

console.log(packageMaxValue(weight, value, 10))

/* function packageMaxValue1(weights, values, w) {
	var arr = [[]];
	const { length } = weights
	//填充第一行
	for (let i = 0; i <= w; i++) {
		if (i < weights[0]) {
			arr[0][i] = 0
		} else {
			arr[0][i] = weights[0]
		}
	}
	const arr = new Array()
	for (let j = 0; j <= w; j++) {
		for (let k = 1; k <= length - 1; k++) {
			if (!arr[k]) {
				arr[k] = []
			}
			//目前重量小于当前这个物品的重量，这个时候之前取之前的最优值
			if (j < weights[k]) {
				arr[k][j] = arr[k - 1][j];
			} else {
				//取到最大值，对比前面最大值（不装入当前物品）和装入当前这个物品
				arr[k][j] = Math.max(arr[k - 1][j], arr[k - 1][j - weights[i]] + values[k])
			}
		}
	}
	return f[length - 1][w]
} */

function knapsack(weights, values, W) {
    var n = weights.length;
    var f = new Array(n).fill([])
    for (var i = 0; i < n; i++) {
        for (var j = 0; j <= W; j++) {
            if (i === 0) { //第一行
                f[i][j] = j < weights[i] ? 0 : values[i]
                continue
            }
            if (j < weights[i]) { //等于之前的最优值
                f[i][j] = f[i - 1][j]
            } else {
                f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i])
            }
        }
    }
    return f[n - 1][W]
}

function knapsack(weights, values, W) {
    var n = weights.length;
    var f = new Array(n)
    f[-1] = new Array(W + 1).fill(0)
    for (var i = 0; i < n; i++) { //注意边界，没有等号
        f[i] = new Array(W).fill(0)
        for (var j = 0; j <= W; j++) { //注意边界，有等号
            if (j < weights[i]) { //注意边界， 没有等号
                f[i][j] = f[i - 1][j]
            } else {
                f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i]); //case 3
            }
        }
    }
    var j = W,
        w = 0,
        selected = []
    for (var i = n - 1; i >= 0; i--) {
        if (f[i][j] > f[i - 1][j]) {
            selected.push(i)
            console.log("物品", i, "其重量为", weights[i], "其价格为", values[i])
            j = j - weights[i];
            w += weights[i]
        }
    }
    console.log("背包最大承重为", W, " 现在重量为", w, " 总价值为", f[n - 1][W])
    return f[n - 1][W]
}

function knapsack(weights, values, W) {
    var n = weights.length
    var lineA = new Array(W + 1).fill(0)
    var lineB = [],
        lastLine = 0,
        currLine
    var f = [lineA, lineB]; //case1 在这里使用es6语法预填第一行
    for (var i = 0; i < n; i++) {
        currLine = lastLine === 0 ? 1 : 0 //决定当前要覆写滚动数组的哪一行
        for (var j = 0; j <= W; j++) {
            f[currLine][j] = f[lastLine][j] //case2 等于另一行的同一列的值
            if (j >= weights[i]) {
                var a = f[lastLine][j]
                var b = f[lastLine][j - weights[i]] + values[i]
                f[currLine][j] = Math.max(a, b); //case3
            }

        }
        lastLine = currLine //交换行
    }
    return f[currLine][W];
}

function knapsack(weights, values, W) {
    var n = weights.length;
    var f = new Array(W + 1).fill(0)
    for (var i = 0; i < n; i++) {
        for (var j = W; j >= weights[i]; j--) {
            f[j] = Math.max(f[j], f[j - weights[i]] + values[i]);
        }
    }
    return f[W];
}
console.log(knapsack([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10))
