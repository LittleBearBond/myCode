/* @grunt-build */
/**
 * author           xj
 * @date            2016-01-20 15:45:36
 * @email           littlebearbond@qq.com
 * @description
 */
//http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partitionMe(items, left, right) {
    var pivot = items[Math.floor((left + right) / 2)];
    while (left < right) {
        //左边右移动
        while (items[left] < pivot) {
            left++;
        }

        //右边向左移动
        while (items[right] > pivot) {
            right--;
        }

        //交换
        if (left <= right) {
            swap(items, left, right);
            right--;
            left++;
        }
    }
    return left;
}

function quickSortMy(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partitionMe(items, left, right);
    };
    if (left < index - 1) {
        quickSortMy(items, left, index - 1);
    };
    if (right > index) {
        quickSortMy(items, index, right);
    };
    return items;
}

function quickSort1(arr) {
    if (arr.length <= 1) {
        return arr;
    };
    var i = 0;
    var pivotIndex = Math.floor(arr.length / 2);
    //取出这个值 可是每次都这样操作数组好吗？
    var pivotVal = arr.splice(pivotIndex, 1)[0];
    var left = [],
        right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivotVal) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort1(left).concat([pivotVal], quickSort1(right));
}
var items = [3, 6, 1, 9, 0, 3, 2, 4, 6, 12, 34, 56, 88];
// first call
console.log(quickSortMy(items, 0, items.length - 1));
debugger
console.log(quickSort1([3, 6, 1, 9, 0, 3, 5, 4, 6, 12, 34, 56, 88]));
