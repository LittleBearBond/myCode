//LeetCode 242. Valid Anagram

var isAnagram = function (s, t) {
	if (s.length !== t.length) {
		return false;
	}
	return s.split('').sort().join('') === t.split('').sort().join('');
}
console.log(isAnagram('anagram', 'nagaram'))
console.log(isAnagram('rat', 'car'))
