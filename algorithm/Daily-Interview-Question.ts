// 实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/387
Promise.prototype.retry = function (fn, times: number) {
    return new Promise(async (resolve, reject) => {
        while (times--) {
            try {
                const res = await fn();
                resolve(res)
                break;
            } catch (error) {
                if (times === 0) {
                    reject(error)
                }
            }
        }
    });
};
Promise.prototype.retry = function (fn, times: number) {
    const excute = function () {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fn();
                resolve(res)
            } catch (error) {
                if (times === 0) {
                    reject()
                } else {
                    excute
                }
            }
        });
    }
    return excute()
};

// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/382
/*
第 156 题：求最终 left、right 的宽度（变形） #382
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>
<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 300px;
    background: red;
  }
  .right {
    flex: 2 1 200px;
    background: blue;
  }
</style>
 */
/*
总宽度600 left 为300 right 为200
flex: 伸 缩 初始值
200+300>600 伸
900-300-200=100
100（1+3）=33.333
left = 300+33.333*1=333.3333
right = 200 + (33.333*2) = 266.6666
 */

/*
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 500px;
    background: red;
  }
  .right {
    flex: 2 1 400px;
    background: blue;
  }
</style>
 */
/*
总宽度600 left 为300 right 为200
flex: 伸 缩 初始值
 500+400> 600 缩
900 - 600 =300
超出 300

2*500 + 1*400 = 1400

500 - 300*2 * 500/1400
300 - 300*1 * 400/1400

对应题目：

子项溢出空间的宽度为 $500 + 400 - 600 = 300$
left 收缩比例：$(500 × 2) ÷ (500 × 2 + 400 × 1) ≈ 0.7143$
right 收缩比例：$(400 × 1) ÷ (500 × 2 + 400 × 1) ≈ 0.2857$
对应的：

left 收缩宽度：$0.7143 × 300 = 214.29$
right 收缩宽度：$0.2857 × 300 = 85.71$
所以：

left 最终宽度：$500 - 214.29 = 285.71$
right 最终宽度：$400 - 85.71 = 314.29$
 */

/*
第 153 题：实现一个批量请求函数 multiRequest(urls, maxNum) #378
要求最大并发数 maxNum
每当有一个请求返回，就留下一个空位，可以增加新的请求
所有请求完成后，结果按照 urls 里面的顺序依次打出
*/

function loadImage(url, index): Promise<number> {
    return new Promise((reslove, reject) => {
        const img = new Image()
        img.onload = () => {
            reslove(index)
        }
        img.onerror = () => {
            reject(index)
        }
        img.src = url
    });
}

function multiRequest(urls: string[], maxNum: number) {
    const requests = urls.slice(0, maxNum).map((url, i) => loadImage(url, i).then((index) => {
        console.log(url, i)
        return index
    }));

    return urls.slice(maxNum).reduce((pro, url, i) => {
        return pro.then(() => {
            return Promise.race(requests)
        }).catch(err => {
            // 这里的 catch 不仅用来捕获 前面 then 方法抛出的错误
            // 更重要的是防止中断整个链式调用
            console.error(err)
        }).then(index => {
            requests[index] = loadImage(url, index).then(() => {
                console.log(url, i)
                return index
            });
        });
    }, Promise.resolve()).then(() => {
        return Promise.all(requests)
    });
}

// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/320
// 二分查找如何定位左边界和右边界

function binarySearch(arr: Array<string | number>, target) {
    let left = 0
    /**
     * 这里是有讲究的
     * right = arr.length -1 ,一直搜索到【left,right】   while(left <= rigth) right = middle-1
     * right = arr.length    ,一直搜索到【left,right-1】 while(left < rigth) right = middle
     */
    let right = arr.length - 1
    while (left <= right) {
        const middle = Math.floor((left + right) / 2)
        if (arr[middle] === target) {
            return middle
        }
        if (arr[middle] < target) {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }
    return -1
}

// 明白了开闭区间，在写一个能够制定左右搜索的方法,这个用递归来实现一下
function binarySearch1(arr: Array<string | number>, target) {
    // 这个是【left,right】
    const search = function (arr: Array<string | number>, ret, left = 0, right) {
        if (left <= right) {
            return -1
        }
        const middle = Math.floor((left + right) / 2)
        if (arr[middle] === ret) {
            return;
        }
        if (arr[middle] < ret) {
            return search(arr, ret, left + 1, middle)
        } else {
            return search(arr, ret, left, middle - 1)
        }
    }
    return search(arr, target, 0, target.legth - 1)
}
function binarySearchLeft(arr: Array<string | number>, target) {
    let left = 0
    let right = arr.length
    while (left < right) {
        const middle = Math.floor((left + right) / 2)
        if (arr[middle] === target) {
            right = middle // 重点 右边往左移动
        } else if (arr[middle] < target) {
            left = middle + 1
        } else {
            right = middle
        }
    }
    if (left === arr.length) {
        return -1
    }
    return arr[left] === target ? left : -1
}
function binarySearchRight(arr: Array<string | number>, target) {
    let left = 0
    let right = arr.length
    while (left < right) {
        const middle = Math.floor((left + right) / 2)
        if (arr[middle] === target) {
            left = middle + 1 // 重点 左边在往右移，最后找到的时候right= left-1
        } else if (arr[middle] < target) {
            left = middle + 1
        } else {
            right = middle
        }
    }
    // left 左边的都是<=target
    if (left === 0) {
        return -1
    }
    return arr[left - 1] === target ? left - 1 : -1
}
const searchLeftRight = function (nums, target) {
    let left = 0, mid, right = nums.length;
    while (left < right) {
        mid = (left + right) >>> 1;
        if (nums[mid] > target) {
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] == target) {
            right = mid;
        }
    }
    let leftIndex = -1, rightIndex = -1;
    if (left == nums.length) {
        return [-1, -1];
    }
    else {
        leftIndex = nums[left] == target ? left : -1;
    }
    left = 0; right = nums.length;
    while (left < right) {
        mid = (left + right) >>> 1;
        if (nums[mid] > target) {
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] == target) {
            left = mid + 1;
        }
    }
    if (left == 0) {
        return [-1, -1];
    }
    else {
        rightIndex = nums[left - 1] == target ? left - 1 : -1;
    }
    return [leftIndex, rightIndex];
};
