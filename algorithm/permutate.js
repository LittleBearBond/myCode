// https://www.cnblogs.com/star91/p/5615327.html


function permutate(str) {
	if (str.length == 1) {
		return [str]
	}
	let result = [];
	//n-length 的排列组合
	const preResult = permutate(str.slice(1));
	//循环里面每个排列
	for (let currStr of preResult) {
		for (var k = 0; k < currStr.length + 1; k++) {
			//把前面的元素插入进去
			result.push(currStr.slice(0, k) + str[0] + currStr.slice(k));
		}
	}
	return result;
}

console.log(permutate('abc'))
