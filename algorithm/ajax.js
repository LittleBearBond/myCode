function ajax(url, opts = {
    type: 'get'
}, data = {}) {
    return new Promise((resolve, reject) => {
        const {
            type
        } = opts;
        const xhr = new XMLHttpRequest();
        xhr.readyStateChange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                resolve(xhr.responseText)
            } else {
                reject(xhr)
            }
        }
        /*  if (type === 'get') {
             //处理参数，加上随机水
             // url+=
         } */
        xhr.timeout = 10 * 1000
        xhr.ontimeout = (err) => reject(err)
        xhr.onerror = (err) => reject(err)
        xhr.open(type, url, true)
        if (opts.method === "post") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(data);
        } else {
            xhr.send(null);
        }
    })
}