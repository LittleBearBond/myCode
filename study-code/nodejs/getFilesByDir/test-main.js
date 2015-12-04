"use strict";

var path = require("path");
// var walk = require("./1-1.js").walk;
var getFilesByDir = require("./getFilesByDir-1.js");
var getMaxFile = require("./1-4.js");
var getfiles = require("./getFilesByDir-2.js");


var readPth =  path.join(__dirname, "../");//'E:/Work-XDF/code/static/project/cms-mix/1.x/js'; 
var topNum = 10;
var results = [];
var logResult = function(err, result) {
    if (!result) {
        result = err;
    }
    Array.prototype.push.apply(results, result);

    results = results.filter(function(curr) {
        return curr.fullPath && curr.fullPath.trim().endsWith('.js');
    }).sort(function(pre, next) {
        if (next.size > pre.size) {
            return 1;
        }
        if (next.size < pre.size) {
            return -1;
        }
        return 0;
    }).slice(0, topNum);

    console.log(results.map(function(curr) {
        return curr.size + ":" + curr.fullPath;
    }).join("\n"));
};

/*getFilesByDir(readPth, logResult);
 */
getfiles(readPth).then(logResult, function(result) {
    console.log(result);
});
