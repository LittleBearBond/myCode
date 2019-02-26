// LeetCode 20. Valid

/**
 * @param {string} str
 * @return {boolean}
 */
var isValid = function (str) {
	var matchLeftMap = {
		'(': true,
		'[': true,
		'{': true
	}
	var matchRightMap = {
		')': '(',
		']': '[',
		'}': '{'
	}
	var stack = [],
		code;
	for (var s in str) {
		code = str.charAt(s);
		if (matchLeftMap[code]) {
			stack.push(code);
			continue;
		}
		if (matchRightMap[code]) {
			if (matchRightMap[code] !== stack.pop()) {
				return false;
			}
			continue;
		}
	}
	return stack.length === 0;
}
console.log(isValid('(({hello word  }))'))
console.log(isValid('(({hello word  }'))
console.log(isValid('()[]{}'))
