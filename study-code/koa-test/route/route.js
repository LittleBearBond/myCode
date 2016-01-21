var router = require('koa-router')();

module.exports = function (app) {
    router
        .get('/',function *(next) {
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
        })
        .post('/users',function *(next) {
            this.body = '/users';
        })
        .get('/users/:id',function *(next) {
            this.body = '/users';
        })
        .put('/users/:id',function *(next) {
            this.body = 'put/users/:id';
        })
        .del('/users/:id',function *(next) {
            this.body = 'del/users/:id';
            router.redirect('/');
        });
    app.use(router.routes()).use(router.allowedMethods());
}
