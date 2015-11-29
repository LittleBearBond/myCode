"use strict";

var path = require("path");
// var walk = require("./1-1.js").walk;
var getFilesByDir = require("./getFilesByDir-1.js");
var getMaxFile = require("./1-4.js");
var getfiles = require("./getFilesByDir-2.js");
var getallfiles = require("./getFilesByDir-3.es6");

var readPth = path.join(__dirname, "../");
var results = [];
var logResult = function(err, result) {
    Array.prototype.push.apply(results, result);

    results.sort(function(pre, next) {
        if (next.size > pre.size) {
            return 1;
        }
        if (next.size < pre.size) {
            return -1;
        }
        return 0;
    });

    console.log(results.map(function(curr) {
        return curr.size + "----------" + curr.fullPath;
    }).join("\n"));
};

/*getFilesByDir(readPth, logResult);

getfiles(readPth).then(function(result) {
    console.log(result);
}, function(result) {
    console.log(result);
});*/

getallfiles(readPth);

/*getMaxFile('./')
    .then(function(filename) {
        console.log('largest file is:', filename);
    });
*/
