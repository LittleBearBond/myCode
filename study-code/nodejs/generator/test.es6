var co = require('co');
var thunkify = require('thunkify');
var request = require('request');
var get = thunkify(request.get);

/*co(function*() {
    var a = yield get('http://baidu.com');
    var b = yield get('http://yahoo.com');
    var c = yield get('http://cloudup.com');
    console.log(a[0].statusCode);
    console.log(b[0].statusCode);
    console.log(c[0].statusCode);
}).catch(function(err) {
    console.log(err)
});*/

co(function*() {
    var a = get('http://google.com');
    var b = get('http://yahoo.com');
    var c = get('http://cloudup.com');
    var d = yield [a, b, c];
    console.log(d);
}).catch(function(err) {
    console.log(err)
});
