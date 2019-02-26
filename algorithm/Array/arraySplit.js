function* splitArr(arr) {
	for (let arrItem of arr) {
		if (Array.isArray(arrItem)) {
			yield* splitArr(arrItem)
		} else {
			yield arrItem
		}
	}
}
Array.from(splitArr([11, [2, [3, 4, 5], 7, 8, 9], 4, 5, 6]))


function splitArr(arr) {
	return [].concat(...arr.map(v => { return Array.isArray(v) ? splitArr(v) : v }))
}

splitArr([11, [2, [3, 4, 5], 7, 8, 9], 4, 5, 6])
