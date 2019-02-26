// LeetCode 165. Compare Version Numbers
var compareVersion = function (version1, version2) {
	var v1 = version1.split('.')
	var v2 = version2.split('.')
	var len1 = v1.length;
	var len2 = v2.length;
	var len = len1 > len2 ? len1 : len2;
	var index = 0,
		i1, i2;
	for (; index < len; index++) {
		i1 = v1[index] | 0;
		i2 = v2[index] | 0;
		if (i1 === i2) {
			continue;
		}
		return i1 > i2 ? 1 : -1;
	}
	return 0;
}
console.log(compareVersion('1.1.5', '1.2.2'))
console.log(compareVersion('0.1.5', '1.2.2'))
console.log(compareVersion('1.3.5', '1.2.2'))
console.log(compareVersion('1.1.1', '1.1.1'))
console.log(compareVersion('1.1.1', '1.1.1.0.1'))
