var requestPage = require('./js/requestPage');
var utils = require('./js/utils');
var urlMpudle = require("url");

//var url = 'http://cl.mocl.xyz/thread0806.php?fid=2&search=&page=2';
var url = 'http://cl.clvv.biz/thread0806.php?fid=2&search=&page=';
//当前页面
var startPage = 8;
//总共看几个页面
var totalOpenNum = 5;
//已经打开多少个
var hasOpenNum = 0;
var cb = function(data) {
    hasOpenNum += data.length;
    console.log('hasOpenNum', data.length, hasOpenNum)
    if (hasOpenNum < totalOpenNum) {
        setTimeout(function() {
            requestPage.request(url + (++startPage), {}, cb);
        }, 1000);
    }
}
console.log('-----------------------------')
requestPage.request(url + startPage, {}, cb);
//console.log(typeof JSON.stringify({a:1,b:{c:2,d:'zxcv'}}))
//console.log(utils.parseURL(url));
//console.log(JSON.stringify(urlMpudle.parse(url)));
//console.dir(utils.parseURL(url));
console.log('-----------------------------')
