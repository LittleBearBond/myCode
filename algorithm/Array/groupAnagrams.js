/* eslint-disable no-redeclare */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const cache = {}
    const prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103];
    let total = 1
    let codeNumber
    for (const word of strs) {
        total = 1;
        for (const code of word) {
            codeNumber = prime[code.charCodeAt(0) - 97]
            total *= codeNumber
        }
        if (total in cache) {
            cache[total].push(word)
        } else {
            cache[total] = [word]
        }
    }
    return Object.entries(cache).reduce((data, [, val]) => {
        data.push(val)
        return data
    }, [])
};

var groupAnagrams = function (strs) {
    const cache = {}
    for (const word of strs) {
        var key = word.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('')
        if (key in cache) {
            cache[key].push(word)
        } else {
            cache[key] = [word]
        }
    }
    return Object.entries(cache).reduce((data, [, val]) => {
        data.push(val)
        return data
    }, [])
};
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
