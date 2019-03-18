function createScript(url) {
    const script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', url)
    script.async = true
    return script
}

function jsonp({
    url,
    callbackKeyName = 'callback',
    data = {}
} = {}) {
    return new Promise((resolve, reject) => {
        const cbName = 'jsonpcallback' + jsonp.index++
        const dataToStr = Object.entries(data).reduce((arr, [key, val]) => {
            arr.push(`${key}=${val}`)
            return arr;
        }, []).join('&')
        url += `${url.includes('?') ? `&` : `?`}${callbackKeyName}=${cbName}&${dataToStr}`
        const el = createScript(url)
        el.onerror = (error) => {
            destory()
            reject(error)
        }
        const destory = function () {
            el.parentNode.removeChild(el)
            delete window[cbName]
        }
        window[cbName] = function (data) {
            try {
                resolve(data)
            } finally {
                destory()
            }
        };
        (document.head || document.getElementsByTagName('head')[0]).appendChild(el)
    })
}
jsonp.index = 0
