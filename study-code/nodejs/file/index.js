const fs = require('fs');
const path = require('path');

const inputFile = '/Users/didi/Downloads/google-download/互联网招聘网站数据.json';
const outputFile = path.resolve('./test.txt');

const input = fs.createReadStream(inputFile);
const output = fs.createWriteStream(outputFile);
let cacheJsonStr = '';
const replaceStartEnd = /^("|\n|\t)|("|\n)$/g;

const analysisCurr = (str) => {
    const obj = str.replace(replaceStartEnd, '').split(/\,\n/).reduce((obj, item) => {
        let [key, val] = item.replace(replaceStartEnd, '').split('":"');
        obj[key] = val;
        return obj
    }, {})
    console.log(obj)
}
const analysisJson = (jsonStr) => {
    //查找{}括号，
    //分析写入
    //最后一个串做缓存处理
    let i = 0
    let left, right, str;
    while (i < jsonStr.length) {
        if (jsonStr.charAt(i) === "{") {
            left = i;
            i++;
            continue;
        }
        if (jsonStr.charAt(i) === "}") {
            right = i;
            str = jsonStr.slice(left + 1, right);
            analysisCurr(str)
            i++;
            continue;
        }
        i++;
    }
}

input.on('data', function (chunk) {
    cacheJsonStr = cacheJsonStr + chunk.toString();
    analysisJson(cacheJsonStr)
    var lines = chunk.split('\n');

});

input.on('end', function () {
    console.log('end');
    output.end(function () {
        printMemoryUsage();
        process.exit();
    });
});

function printMemoryUsage() {
    var info = process.memoryUsage();
    function mb(v) {
        return (v / 1024 / 1024).toFixed(2) + 'MB';
    }
    console.log('rss=%s, heapTotal=%s, heapUsed=%s',
        mb(info.rss), mb(info.heapTotal), mb(info.heapUsed));
}