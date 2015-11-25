"use strict";
var path = require('path');
var fs = require('fs');
var co = require('co');
var thunkify = require('thunkify');
var fsReaddir = thunkify(fs.readdir);
var fsStat = thunkify(fs.stat);

var readDir = (dir, done) => {
    var readFiles = [];

    fs.readdir(dir, function(err, list) {
        if (err) {
            return done(null, readFiles);
        }
        var len = list.length;
        var index = 0;

        list = list.map(function(val) {
            return path.join(dir, val);
        });

        (function next() {
            var fullPath = list[index++];
            if (!fullPath) {
                return done(null, readFiles);
            }

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

    });
}




/* var files = yield readdir(dir);
 var stats = yield files.map(function(file) {
     return stat(path.join(dir, file));
 });
 var largest = stats
     .filter(function(stat) {
         return stat.isFile()
     })
     .reduce(function(prev, next) {
         if (prev.size > next.size) return prev
         return next;
     })
 return files[stats.indexOf(largest)];
});*/
