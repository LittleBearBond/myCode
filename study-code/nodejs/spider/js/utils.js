var cheerio = require('cheerio');
var url = require("url");


/*
var url = 'http://cl.mocl.xyz/thread0806.php?fid=2&search=&page=2';
{
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'cl.mocl.xyz',
  port: null,
  hostname: 'cl.mocl.xyz',
  hash: null,
  search: '?fid=2&search=&page=2',
  query: 'fid=2&search=&page=2',
  pathname: '/thread0806.php',
  path: '/thread0806.php?fid=2&search=&page=2',
  href: 'http://cl.mocl.xyz/thread0806.php?fid=2&search=&page=2'
}

file: "thread0806.php"
hash: ""
host: "cl.mocl.xyz"
params: Object
path: "/thread0806.php"
port: ""
protocol: "http"
query: "?fid=2&search=&page=2"
relative: "/thread0806.php?fid=2&search=&page=2"
segments: Array[1]
source: "http://cl.mocl.xyz/thread0806.php?fid=2&search=&page=2"
 */
exports.parseURL = function(src) {
    var obj = url.parse(src);
    obj.params = (function() {
        var ret = {},
            seg = obj.search.replace(/^\?/, '').split('&'),
            len = seg.length,
            i = 0,
            s;
        for (; i < len; i++) {
            if (!seg[i]) {
                continue;
            }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
        }
        return ret;
    })();
    obj.file = (obj.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1];
    return obj;
}

exports.extend = function() {
    var args = arguments,
        o = args[0],
        len = args.length,
        curr;
    for (var j = 1; j < len; j++) {
        curr = args[j];
        for (var i in curr) {
            curr.hasOwnProperty(i) && (o[i] = curr[i]);
        }
    }
    return o;
    /*var o = {},
        c,
        args = arguments,
        len = args.length,
        start = 1,
        src = args[0];
    if (mt.isObject(src)) {
        for (c in src) {
            mt.hasOwn.call(src, c) && (o[c] = src[c]);
        }
    }
    for (; start < len; start++) {
        var curr = args[start];
        if (mt.isObject(curr)) {
            for (c in curr) {
                mt.hasOwn.call(curr, c) && (o[c] = curr[c]);
            }
        }
    }
    return o;*/
};
