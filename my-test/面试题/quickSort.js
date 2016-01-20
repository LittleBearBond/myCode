/* @grunt-build */
/**
 * author           xj
 * @date            2016-01-20 15:45:36
 * @email           littlebearbond@qq.com
 * @description
 */

function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partitionMe(items, left, right) {
    var centervVal = items[Math.floor((left + right) / 2)];
    while (left < right) {
        //左边右移动
        while (items[left] < centervVal) {
            left++;
        }

        //右边向左移动
        while (items[right] > centervVal) {
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

var items = [3, 6, 1, 9, 0, 3, 2, 4, 6, 12, 34, 56, 88];
// first call
console.log(quickSortMy(items, 0, items.length - 1));
