// https://www.shenyujie.cc/2018/05/25/log4js-basic/
// https://zhuanlan.zhihu.com/p/22110802
// https://juejin.im/post/57b962af7db2a200542a0fb3
// https://www.jianshu.com/p/9604d08db899
//testLog4.js
const log4js = require('log4js');
const moment = require('moment');
//logger 是log4js的实例
const logger = log4js.getLogger('cheese');
const defualtConfig = {
    // 指定编码格式为 utf-8
    encoding: 'utf-8',
    // 日志文件按日期（天）切割
    pattern: "-yyyy-MM-dd",
    // 输出的日志文件名是都始终包含 pattern 日期结尾
    alwaysIncludePattern: true,
    layout: {
        type: "pattern",
        pattern: '[%p][%x{nowTime}][%z][%e] [%h] %c %m',
        tokens: {
            nowTime() {
                return moment().format('YYYY-MM-DDTHH:mm:ss.SSS+0800')
            },
        },
        // 配置模式，下面会有介绍
        // pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
    },
}
/*
pattern
%r 日志输出时间，以 toLocaleTimeString 函数格式化
%p 日志等级
%c 日志分类
%h 访问计算机的 hostname
%m 打印的日志主题内容
%n 换行标识
%d 日志输出日期 ( 默认以 ISO8601 方式格式化 )
可自定义输出类型 %d{yyyy/MM/dd-hh.mm.ss},输出 2018/05/22-15.42.18
%z 记录进程 pid 号 ( 数据来自 node 方法 process.pid )
%x{} 输出自定义 tokens 中的项目，例如上述例子中的 user
%[ 想要输出的内容 %] 用来给被扩起来的内容着色，颜色和日志 level 有关
*/

log4js.configure({
    // appenders: { cheese: { type: 'file', filename: 'test.log' } },
    appenders: {
        stdout: {
            type: 'stdout',
            ...defualtConfig
        },
        cheese: {// 设置类型为 dateFile
            type: 'dateFile',// 可以设置成 console、file、dateFile三种
            // 配置文件名为 log.log
            filename: 'logs/log_logic',
            // maxLevel: "error" // 设置log输出的最高级别
            maxLogSize: 100000,
            backups: 5,
            keepFileExt: true,
            compress: true,
            // 配置 layout，此处使用自定义模式 pattern
            // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
            keepFileExt: true,
            ...defualtConfig
        },
        trace: {
            type: "dateFile",
            filename: "logs/log_trace",
            maxLogSize: 31457280,
            ...defualtConfig
        },
        http: {
            type: "dateFile",
            level: "trace",
            filename: 'logs/log_http',
            maxLevel: "trace",
            ...defualtConfig
        },
        error: {
            type: "dateFile",
            filename: "logs/log_error",
            maxLogSize: 10000000,
            compress: true,
            ...defualtConfig
        },
    },
    categories: {
        // 设置默认的 categories
        default: { appenders: ['cheese'], level: 'all' },
        error: { appenders: ['error'], level: 'all' },
        request: {
            appenders: ['http'],
            level: 'info',
        },
    }
    /* appenders: {
        out: { type: 'stdout', layout: { type: 'messagePassThrough' } }
    },
    categories: {
        default: { appenders: ['out'], level: 'info' }
    } */
});

logger.info("this is info");
logger.warn("this is warn");
log4js.getLogger('error').error('test error')

module.exports = logger
/*
{
  ALL: new Level(Number.MIN_VALUE, "ALL"),
  TRACE: new Level(5000, "TRACE"),
  DEBUG: new Level(10000, "DEBUG"),
  INFO: new Level(20000, "INFO"),
  WARN: new Level(30000, "WARN"),
  ERROR: new Level(40000, "ERROR"),
  FATAL: new Level(50000, "FATAL"),
  MARK: new Level(9007199254740992, "MARK"), // 2^53
  OFF: new Level(Number.MAX_VALUE, "OFF")
}
 */
