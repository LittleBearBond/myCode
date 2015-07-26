function get(uri){
    return http(uri, 'GET', null);
}

function post(uri,data){
    if(typeof data === 'object' && !(data instanceof String || (FormData && data instanceof FormData))) {
        var params = [];
        for(var p in data) {
            if(data[p] instanceof Array) {
                for(var i = 0; i < data[p].length; i++) {
                    params.push(encodeURIComponent(p) + '[]=' + encodeURIComponent(data[p][i]));
                }
            } else {
                params.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
            }
        }
        data = params.join('&');
    }


    return http(uri, 'POST', data || null, {
        "Content-type":"application/x-www-form-urlencoded"
    });
}

function http(uri,method,data,headers){
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method,uri,true);
        if(headers) {
            for(var p in headers) {
                xhr.setRequestHeader(p, headers[p]);
            }
        }
        xhr.addEventListener('readystatechange',function(e){
            if(xhr.readyState === 4) {
                if(String(xhr.status).match(/^2\d\d$/)) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr);
                }
            }
        });
        xhr.send(data);
    })
}

function wait(duration){
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}

function waitFor(element,event,useCapture){
    return new Promise(function(resolve, reject) {
        element.addEventListener(event,function listener(event){
            resolve(event)
            this.removeEventListener(event, listener, useCapture);
        },useCapture)
    })
}

function loadImage(src) {
    return new Promise(function(resolve, reject) {
        var image = new Image;
        image.addEventListener('load',function listener() {
            resolve(image);
            this.removeEventListener('load', listener, useCapture);
        });
        image.src = src;
        image.addEventListener('error',reject);
    })
}

function runScript(src) {
    return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load',resolve);
        script.addEventListener('error',reject);
        (document.getElementsByTagName('head')[0] || document.body || document.documentElement).appendChild(script);
    })
}

function domReady() {
    return new Promise(function(resolve, reject) {
        if(document.readyState === 'complete') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded',resolve);
        }
    })
}
