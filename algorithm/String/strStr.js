// LeetCode 28. Implement strStr()
//
var strStr = function (haystack, needle) {
	// return haystack.indexOf(needle);
	if (!needle || !haystack) {
		return -1;
	}
	if (needle.length > haystack.length) {
		return -1;
	}
	var len = haystack.length;
	var needleLen = needle.length;
	var index = 0;
	var j = 1;

	for (; index < len; index++) {
		if (haystack.charAt(index) !== needle.charAt(0)) {
			continue;
		}
		for (j = 1; j < needleLen; j++) {
			if (haystack.charAt(index + j) !== needle.charAt(j)) {
				break;
			}
		}
		if (j === needleLen) {
			return index;
		}
	}
}

var strStr = function (sourceStr, searchStr) {
	var i = 0,
		j = 0,
		sourceLen = sourceStr.length,
		searchLen = searchStr.length;
	if (sourceLen === 0 && searchLen === 0 || searchLen === 0) {
		return 0
	}
	if (searchLen > sourceLen) {
		return -1
	}
	while (i < sourceLen) {
		// 两字母相等则继续
		if (sourceStr.charAt(i) === searchStr.charAt(j)) {
			i++;
			j++;
		} else { // 两字母不等则角标后退重新开始匹配
			i = i - j + 1; // i 回退到上次匹配首位的下一位
			j = 0; // j回退到子串的首位
		}
		//是字符串的长度
		if (j === searchLen) {
			//匹配起始位置
			return i - j;
		}
	}
	return -1;
}

console.log(strStr('adfddsf', 'sf'))
