/**
 * @author 熊建
 * @email
 * @create date 2018-04-25 08:03:59
 * @modify date 2018-04-25 08:03:59
 * @desc [description]
 */
// https://www.jianshu.com/p/f5b157a974b0
function quickSort(arr, left, right) {
    /*
     * len为数组的长度;
     * left为需要数组中参与排序的起始点；right为数组中参与排序的终止点;
     * left如果有传数字那么就为left，没有传参则为0；
     * right如果有传参那么就为right，没有传参则为len-1;
     * 有传参可能会部分排序可能不会排序，没传参默认排序整个数组;
     * partitionIndex为分组界限;
     */
    var len = arr.length,
        partitionIndex,
        left = typeof left !== 'number' ? 0 : left,
        right = typeof right !== 'number' ? len - 1 : right;

    // 如果需要排序的起始索引小于终止索引则执行排序;递归的终止条件；
    if (left < right) {

        // partition的返回值作为partitionIndex来分隔数组；
        // 索引partitionIndex左边的元素均小于arr[partitionIndex]；
        // 右边的元素均大于arr[partitionIndex]；
        partitionIndex = partition(arr, left, right);

        // 数组中小于arr[partitionIndex]的部分(索引left到partitionIndex-1)再次使用quickSort排序；
        quickSort(arr, left, partitionIndex - 1);

        // 数组中大于arr[partitionIndex]的部分(索引partitionIndex+1到right)再次使用quickSort排序；
        quickSort(arr, partitionIndex + 1, right);
    }
    // 递归执行直到不满足left<right;返回本身；
    return arr;
}

function partition(arr, left, right) {
    /*
     * 这部分是具体实现排序的部分；
     * 将left赋值给pivot，作为参照物，因为left在最左边，只需要从左到右比较一遍即可判断整个数组；
     * index索引是arr中待交换位置；
     */
    var pivot = left,
        index = pivot + 1;
    // for循环从参照物arr[pivot]下一个元素arr[pivot+1]开始一直比较到子数组结束arr[right]；
    for (var i = index; i <= right; i++) {

        // 循环中如果有任何小于参照物的，就将他交换到index的位置，然后index向右移动到下一个位置；
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    /*
     * 因为每次都是交换完后index移动到下一个位置，所以在循环结束时，index仍为待交换的位置；
     * 此时索引pivot+1到index-1的元素都小于参照物arr[pivot]；
     */

    // 交换pivot和index-1索引的值之后index-1索引左边全都是小于arr[index-1]的元素；
    swap(arr, pivot, index - 1);

    // 返回index-1作为拆分子数组的分界线；
    return index - 1;
}
/*
 * 普通的交换，将a[i]和a[j]的数值交换；
 */
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
quickSort([5, 6, 4, 2, 111, 22, 45, 67, 88, 90, 87, 1, 3, 4, 2])

//me
function quickSort(arr = []) {
    if (arr.length <= 1 || !Array.isArray(arr)) {
        return arr;
    }
    const {
        length
    } = arr;
    const partitionIndex = Math.floor(length / 2);
    const partitionVal = arr.splice(partitionIndex, 1)
    const left = []
    const right = []
    for (let item of arr) {
        if (item < partitionVal) {
            left.push(item)
        } else {
            right.push(item)
        }
    }
    //concat(partitionVal这里有坑
    return quickSort(left).concat(partitionVal, quickSort(right))
}
quickSort([5, 6, 4, 2, 111, 22, 45, 67, 88, 90, 87, 1, 3, 4, 2])

function quickSortMinMermory(arr, left = 0, right) {
    left = typeof left === 'number' ? left : 0;
    right = typeof right === 'number' ? right : arr.length - 1;
    if (left < right) {
        const partitionIndex = partition(arr, left, right);
        quickSortMinMermory(arr, 0, partitionIndex - 1)
        quickSortMinMermory(arr, partitionIndex + 1, right)
    }
    return arr;
}

function partition(arr, left, right) {
    const val = arr[left];
    let index = left + 1;
    //i=index这里有坑
    for (let i = index; i <= right; i++) {
        if (arr[i] < val) {
            swap(arr, i, index)
            index++
        }
    }
    swap(arr, left, index - 1)
    return index - 1;
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

function findKthLargest(arr, k) {
    const {
        length
    } = arr;
    k = length - k;
    var left = 0;
    var right = length - 1;
    while (left < right) {
        var partitionIndex = partition(arr, left, right);
        if (partitionIndex > k) {
            right = partitionIndex - 1
        } else if (partitionIndex < k) {
            left = partitionIndex + 1;
        } else {
            //这里有坑
            break
        }
    }
    return arr[k]
}

function quickSortNew(arr, left = 0, right) {
    var left = typeof left === 'number' ? left : 0;
    var right = typeof right === 'number' ? right : arr.length - 1;
    if (left < right) {
        var partitionIndex = partitionNew(arr, left, right);
        quickSortNew(arr, 0, partitionIndex - 1)
        quickSortNew(arr, partitionIndex + 1, right)
    }
    return arr;
}

function partitionNew(arr, left, right) {
    var startval = arr[left];
    var index = left + 1;
    for (var i = index + 1; i <= right; i++) {
        if (arr[i] < startval) {
            swarNew(arr, i, index)
            index++
        }
    }
    swarNew(arr, left, index - 1)
    return index - 1;
}

function swarNew(arr, i, j) {
    if (i === j) {
        return;
    }
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function findKthLargestNew(arr, k) {
    const {
        length
    } = arr;
    k = length - k;
    let left = 0;
    let right = length - 1;
    while (left < right) {
        let partitionIndex = partition(arr, left, right);
        if (partitionIndex < k) {
            left = partitionIndex + 1
        } else if (partitionIndex > k) {
            right = partitionIndex - 1;
        } else {
            break
        }
    }
    return arr[k]
}

function getMaxLengthArr(arr, sum) {
    let left = 0;
    let right = left + 1;
    let index = 0,
        len = 0,
        arrSum = 0;
    const {
        length
    } = arr;
    while (left < length) {
        right = left + 1;
        arrSum = arr[left]
        while (right < length) {
            arrSum += arr[right];
            if (arrSum < sum && Math.max(len, right - left + 1) > len) {
                index = right - 1;
                len = Math.max(len, right - left + 1)
            } else if (arrSum >= sum) {
                break
            }
            right++
        }
        left++
    }
    console.log(index, len)
    return arr.slice(index, index + len)
}

function insertArr(firstArr, secondArr) {

    const arr = new Array(firstArr.length + secondArr.length);
    let firstIndex = 0
    let secondIndex = 0
    /*  Array.from({ length: firstArr.length + secondArr.length }, (v, i) => i).map((v, i) => {
     }) */
    for (let index of arr.keys()) {
        if (firstArr[firstIndex] > secondArr[secondIndex] || firstIndex === firstArr.length) {
            arr[index] = secondArr[secondIndex]
            secondIndex++
        } else {
            arr[index] = firstArr[firstIndex]
            firstIndex++
        }
    }
    return arr
}
