// var koa = require('koa');
// var app = koa();

// app.use(function *(){
//   this.body = 'Hello World';
// });

// app.listen(3000);
//https://github.com/koajs/examples/blob/master/compose/app.js

var koa = require('koa');
var app = koa();
const logger = require('koa-logger');
var session = require('koa-session');



app.name = 'littlebear-test';

//logger
app.use(logger());

app.keys = ['some secret hurr'];
//session
app.use(session(app));

app.on('error', function (err, ctx) {
    console.error('server error', err, ctx);
});

// x-response-time
app.use(function* (next) {
    // (1) 进入路由
    var start = new Date;
    yield next;
    // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    // (6) 返回 this.body
});

// logger
app.use(function* (next) {
    // (2) 进入 logger 中间件
    var start = new Date;
    yield next;
    // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function* (next) {
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

app.use(function* (next) {
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
/*app.use(function* (next) {
    yield next;
    if ("/" !== this.url) {
        return;
    }
});*/

//record views
app.use(function* (next) {
    yield next;
    this.cookies.set('view', (~~this.cookies.get('view') + 1));
});

//add session view
app.use(function* (next) {
    yield next;
    // ignore favicon
    if (this.path === '/favicon.ico') {
        return;
    }

    this.session.views = this.session.views || 0;
    this.session.views++;
    console.log(this.session.views);
    this.cookies.set('session-view', this.session.views);
});

require('./route/route')(app);

app.listen(3001);
