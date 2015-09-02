var fs = require("fs");
var request = require('request');
var cheerio = require('cheerio');
var utils = require('./utils');
var openWin = require("open");
//var $ = require('jquery');
//var url = 'http://cl.mocl.xyz/thread0806.php?fid=2&search=&page=2';

var optins = {
    reviewNums: 25
};

exports.request = function(url, opts, cb) {
    var outStream = fs.WriteStream('pages/urls.txt');
    var urlObj = utils.parseURL(url);
    opts = utils.extend({}, optins, opts);

    if (!urlObj.host) {
        return;
    }
    console.log(url)

    request({
        url: url,
        'accept-charset': 'utf-8',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
        }
    }, function(error, response, body) {
        if (error) {
            return console.error(error);
        }
        console.log('成功爬取到页面： ' + url);

        var $ = cheerio.load(response.body.toString());
        var $main = $('#ajaxtable');

        var findData = function($trs) {
            var dataObj = [];
            var nowTime = +new Date;
            for (var i = 0, len = $trs.length; i < len; i++) {
                var $curr = $($trs[i]);
                var data = {
                    isNew: false,
                    href: '',
                    title: '',
                    authorName: '',
                    authorAddr: '',
                    reviewNums: 0,
                    publishTime: nowTime,
                    publishLastTime: nowTime,

                };
                var $tds = $curr.find('td');
                var $td1 = $tds.eq(1);
                var $td2 = $tds.eq(2);

                var $a1 = $td1.find('a');
                var $a2 = $td2.find('a');

                data.isNew = !!$td1.find('i').length;
                data.href = 'http://' + urlObj.host + '/' + $a1.attr('href');
                data.title = $a1.html();
                data.authorName = $a2.html();
                data.authorAddr = urlObj.host + '/' + $a2.attr('href');
                data.reviewNums = $tds.eq(3).html() | 0;
                data.publishTime = new Date($td2.find('div').html());
                data.publishLastTime = new Date($tds.eq(4).find('a').html());

                dataObj.push(data);
            }

            return dataObj.filter(function(curr) {
                return curr && curr.reviewNums >= opts.reviewNums;
            });
        };

        if (urlObj.params) {
            urlObj.params.page = urlObj.params.page || 1;
            var htmlStream = fs.WriteStream('pages/' + urlObj.file + urlObj.params.page + '.html');
            htmlStream.write(response.body.toString());
            htmlStream.end();
        }
        /*console.log(
            findData(
                $main.find('tr.tr3')
            ).map(function(curr) {
                return JSON.stringify(curr);
            }).join('\r\n')
        );*/

        var arrData = findData(
            $main.find('tr.tr3').slice(5)
        ).sort(function(curr, next) {
            return curr.reviewNums < next.reviewNums;
        }).map(function(curr) {
            setTimeout(function() {
                openWin(curr.href);
            })
            return JSON.stringify(curr);
        });

        outStream.write(arrData.join('\r\n'));

        outStream.end();
        cb(arrData);

        console.log('---------------end---------------')
    });

}
