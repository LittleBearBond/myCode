"use strict";

var path = require("path");
// var walk = require("./1-1.js").walk;
var walk = require("./2-my.js").walk;


var readPth = path.join(__dirname, "../");
var results = [];
walk(readPth, function(err, result) {
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
});
