/**
 * @author 熊建
 * @email
 * @create date 2018-04-25 08:03:53
 * @modify date 2018-04-25 08:03:53
 * @desc [description]
 */
function binarySearch(arr, num) {
	var left = 0;
	var right = arr.length - 1;
	var index
	//这里有坑 是<=
	while (left <= right) {
		//这里有坑 是<= 对应 Math.floor
		index = Math.floor((right + left) / 2);
		if (arr[index] < num) {
			//这里也有坑啊
			left = index + 1
		} else if (arr[index] > num) {
			right = index - 1
		} else {
			return index;
		}
	}
	return -1;
}

console.log(binarySearch([1, 3, 5, 6, 7], 1))
console.log(binarySearch([1, 3, 5, 6, 7], 7))
console.log(binarySearch([1, 3, 5, 6, 7], 3))
console.log(binarySearch([1, 3, 5, 6, 7], 8))
