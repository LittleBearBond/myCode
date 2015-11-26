var Client = require('ftp');
var fs = require('fs');
var path = require("path");
var getFilesByDir = require("../generator/my-2.js");

var c = new Client();
c.on('ready', function() {
    c.list(function(err, list) {
        if (err) {
            console.log(err)
            return;
        }
        console.dir(list);
        uploadFile();
        //c.end();
    });
});


var uploadFile = function() {
    var len;
    var putFile = function(file) {
        c.put(file, path.basename(file), function(err) {
            len--;
            if (err) {
                console.log(err);
                return;
            }
            if (len === 0) {
                console.log('all succ');
            }
        });
    };


    getFilesByDir(path.join(__dirname, '../generator')).then(function(data) {
        len = data && data.length;
        if (!len) {
            console.log('data is null');
            c.end();
            return;
        }
        data.map(function(item) {
            return item.fullPath;
        }).forEach(function(val) {
            putFile(val);
        });
    }, function(error) {
        console.log(err);
        c.end();
    });
}

c.on('error', function(err) {
    console.log(err);
    c.end();
});

c.connect(require('./config'));
