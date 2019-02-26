// LeetCode 344. Reverse String

var reverseString = function (str) {
	if (!str) {
		return str;
	}
	return str.split('').reverse().join('');
}
var reverseString = function (str) {
	if (!str) {
		return str;
	}
	var result = '';
	var arr = str.split('');
	var len = arr.length;
	while (len--) {
		result += arr[len];
	}
	return result;
}
console.log(reverseString('hello xj'))
