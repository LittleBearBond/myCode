// LeetCode 38. Count and Say
var countAndSay = function (n) {
	if (n < 1) {
		return '1'
	}
	n = String(n);
	var count = 1;
	var preIndex, countSay = '',
		code = n[0],
		index = 1,
		len = n.length;
	if (len === 1) {
		return '1' + n;
	}
	while (index < len) {
		if (n.charAt(index) === code) {
			count++
		} else {
			//几个 code
			countSay = countSay + count + code;
			code = n[index];
			count = 1;
		}
		index++;
	}
	countSay = countSay + count + code;
	return countSay;
}
console.log(countAndSay(1))
console.log(countAndSay(11))
console.log(countAndSay(21))
console.log(countAndSay(12111))

// LeetCode 125. Valid Palindrome

var isPalindrome = function (str) {
	if (!str) {
		return false;
	}
	str = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
	return str === str.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal: Panama"))
console.log(isPalindrome("sdfd df"))



// LeetCode 258. Add Digits
// num = 38，則 3+8 = 11，1+1 = 2, 2是個為數，回傳2。
var addDigits = function (num) {
	if (num < 10) {
		return num
	}
	sum = String(num).split('').reduce((pre, next) => {
		return (pre | 0) + (next | 0)
	}, 0)
	return addDigits(sum);
	/*if (num == 0) {
	    return 0;
	}
	if (num % 9 == 0) {
	    return 9;
	}
	return num % 9;*/
}
console.log(addDigits(38))
console.log(addDigits(138))
