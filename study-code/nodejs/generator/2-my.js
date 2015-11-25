"use strict";
var path = require('path');

var fs = require('fs');


var readDir = (dir, done) => {
    var readFiles = [];

    fs.readdir(dir, function(err, list) {
        if (err) {
            return done(null, readFiles);
        }
        var len = list.length;
        var index = 0;

        (function next() {
            var name = list[index++];
            if (!name) {
                return done(null, readFiles);
            }
            var fullPath = path.join(dir, name);

            fs.stat(fullPath, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    readDir(fullPath, function(err, res) {
                        readFiles = readFiles.concat(res);
                        next();
                    });
                } else {
                    readFiles.push({
                        fileName: path.basename(fullPath),
                        fullPath: fullPath,
                        size: stat.size
                    });
                    //readFiles.push(fullPath);
                    next();
                }
            });
        }());
        /* //循环当前目录
         list.forEach(name => {
             //读取到这一级的文件 和目录
             var fullPath = path.join(dir, name);

             fs.stat(fullPath, (err, stat) => {
                 len--;
                 if (stat && stat.isDirectory()) {
                     readDir(fullPath, (err, result) => {
                         //把里面的添加到自己当中
                         readFiles = readFiles.concat(result);
                         len || done(null, readFiles);
                     });
                 } else {
                     readFiles.push({
                         fileName: path.basename(fullPath),
                         fullPath: fullPath,
                         size: stat.size
                     });
                     len || done(null, readFiles);
                 }
             });
         });*/
    });
}

exports.walk = readDir;
