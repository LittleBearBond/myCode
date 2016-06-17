'use strict';
/**
 * author           xj
 * @date            2016-06-17 10:26:35
 * @email           littlebearbond@qq.com
 * @description
 */

function getId() {
    var id = 0;
    return function() {
        return id++;
    }
}

function loadImage(images, callback, timeout) {
    if (!(this instanceof loadImage)) {
        return new loadImage(images, callback, timeout);
    }

    this.conut = 0;
    this.success = true;
    this.timeoutId = 0;
    this.isTimeout = false;
    this.callback = callback;

    var item;
    for (var key of images) {
        item = images[key];
        if (typeof item === 'string') {
            item = images[key] = {
                src: item
            }
        }
        if (!item || !item.src) {
            continue;
        }
        this.conut++;
        item.id = '__img__' + key + getId();
        item.img = window[item.id] = new Image;
        this.doLoad(item);
    }
    if (!this.conut) {
        this.callback(this.success);
        return this;
    }
    timeout && setTimeout(this.timeOut.bind(this), timeout);
    return this;
}

loadImage.prototype.timeOut = function(item) {
    this.isTimeout = true;
    this.callback(this.success);
};

loadImage.prototype.doLoad = function(item) {
    var allDone = function() {
        //释放
        item.img.onload = item.img.onerror = null;
        try {
            delete window[item.id];
        } catch (e) {
            console.error(e)
        }
        if (!--this.count && !isTimeout) {
            this.callback(this.success);
        }
    };

    this.load(item).then(allDone.bind(this), allDone.bind(this));
};

loadImage.prototype.load = function(item) {
    var that = this;
    return new Promise(function(resolve, reject) {
        item.status = 'loading';

        item.img.onload = function() {
            item.status = 'loaded';
            that.success = that.success & true;
            resolve(item);
        };

        item.img.onerror = function() {
            item.status = 'error';
            that.success = false;
            reject(item);
        };

        item.img.src = item.src;
    });
};
