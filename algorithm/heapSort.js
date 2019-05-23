/* eslint-disable no-unused-vars */
function headSort(nums) {
    let { length: len } = nums
    if (!len) {
        return nums
    }
    // build max heap
    function buildMaxHeap(arr) {
        for (let i = arr.length / 2; i >= 0; i--) {
            headpify(arr, i)
        }
    }

    function swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    function headpify(arr, i) {
        let left = 2 * i + 1
        let right = 2 * i + 2
        let index = i
        // max heap arr[i] >= arr[2i+1] && arr[i] >= arr[2i+2]
        // min heap arr[i] <= arr[2i+1] && arr[i] <= arr[2i+2]
        if (left < len && arr[left] > arr[index]) {
            index = left
        }
        if (right < len && arr[right] > arr[index]) {
            index = right
        }
        if (index != i) {
            swap(arr, i, index)
            headpify(arr, index)
        }
    }

    buildMaxHeap(nums)
    // 调整堆结构+交换堆顶元素与末尾元素
    for (let i = nums.length - 1; i >= 0; i--) {
        swap(nums, 0, i);
        len--
        headpify(nums, 0)
    }
    return nums
}
