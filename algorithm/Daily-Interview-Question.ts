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

