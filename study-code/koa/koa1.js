// var koa = require('koa');
// var app = koa();

// app.use(function *(){
//   this.body = 'Hello World';
// });

// app.listen(3000);
//https://github.com/koajs/examples/blob/master/compose/app.js

var koa = require('koa');
var app = koa();

app.name = 'littlebear-test';

app.on('error', function(err, ctx) {
    console.error('server error', err, ctx);
});
// x-response-time
app.use(function*(next) {
    // (1) 进入路由
    var start = new Date;
    yield next;
    // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    // (6) 返回 this.body
});

// logger
app.use(function*(next) {
    // (2) 进入 logger 中间件
    var start = new Date;
    yield next;
    // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function*(next) {
    yield next;
    if (404 != this.status) {
        return;
    }
    // we need to explicitly set 404 here
    // so that koa doesn't assign 200 on body=
    this.status = 404;

    switch (this.accepts('html', 'json')) {
        case 'html':
            this.type = 'html';
            this.body = '<p>Page Not Found</p>';
            break;
        case 'json':
            this.body = {
                message: 'Page Not Found'
            };
            break;
        default:
            this.type = 'text';
            this.body = 'Page Not Found';
    }
});

app.use(function*(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.type = 'html';
        this.body = '<p>Something <em>exploded</em>, please contact Maru.</p>';
        this.app.emit('error', err, this);
    }
});

// response
app.use(function*(next) {
    yield next;
    if ("/" !== this.url) {
        return;
    }
    // (3) 进入 response 中间件，没有捕获到下一个符合条件的中间件，传递到 upstream
    var str = '';
    //'socket',
    ['header', 'method', 'url', 'path', 'query', 'query', 'querystring', 'querystring', 'length',
        'host', 'fresh', 'stale', 'protocol', 'secure', 'ip', 'ips', 'subdomains'
    ].forEach(val => {
        str += '<b>' + val + ':</b>';
        str += typeof this[val] === 'object' ? JSON.stringify(this[val], null, '<hr>') + '<hr>' : (this[val] + '<hr>');
    });
    this.body = str;
    str = null;
    this.type = 'text/html';
});

app.use(function*() {
    this.cookies.set('view', (this.cookies.get('view') | 0 + 1));
});

app.listen(3001);
