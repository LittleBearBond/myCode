const router = require('koa-router')()
//logger 是log4js的实例
var logger = require('../logger');

router.prefix('/users')

router.get('/', function (ctx, next) {
    logger.info(`req ${ctx.request.url}`);

    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

module.exports = router
