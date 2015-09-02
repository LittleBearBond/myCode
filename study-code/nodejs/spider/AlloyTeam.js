
'use strict';
var http = require("http");
var fs = require("fs");

var url = "http://www.alloyteam.com/";
var data = "";

var req = http.request(url, function(res) {
    res.setEncoding("utf8");

    res.on('data', function(chunk) {
        data += chunk;
    });

    res.on('end', function() {
        dealData(data);
    });
});

req.on('error', function(e) {
    throw e;
});

req.end();
console.log("数据下载中...");


function dealData(data) {
    var reg = /<ul\s+class="articlemenu">\s+<li>\s+<a[^>]*>.*?<\/a>\s+<a href="(.*?)"[^>]*>(.*?)<\/a>[\s\S]*?<div\s+class="text">([\s\S]*?)<\/div>/g;
    var res = [];
    while (match = reg.exec(data)) {
        res.push({
            "url": match[1],
            "title": match[2],
            "excerpt": match[3].replace(/(<.*?>)((.*?)(<.*?>))?/g, "$3").slice(0, 120)
        });
    }
    writeFile(res)
}

function writeFile(data) {
    var str = "";
    for (var i = 0, len = data.length; i < len; i++) {
        str += "[" + data[i].title + "](" + data[i].url + ")\n>" + data[i].excerpt.replace(/\n\s*\n?/g, "\n>") + "\n\n";
    }
    fs.writeFile('index.md', str, function(err) {
        if (err) throw err;
        console.log('数据已保存～');
    });
}
