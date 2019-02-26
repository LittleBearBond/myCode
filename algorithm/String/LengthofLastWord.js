// LeetCode 58. Length of Last Word
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
	if (!s) {
		return 0;
	}
	var arr = s.split(/\s+/);
	if (!arr.length) {
		return 0;
	}
	var str = arr.pop();
	while (arr.length) {
		if (str.length) {
			return str.length;
		}
		str = arr.pop();
	}
	return 0;
}
console.log(lengthOfLastWord('hello word  '))
