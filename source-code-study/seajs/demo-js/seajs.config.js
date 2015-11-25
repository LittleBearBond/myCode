seajs.config({

  // 别名配置
  // 使用 alias，可以让文件的真实路径与调用标识分开，有利于统一维护
  // 当模块标识很长时，可以使用 alias 来简化
  // var $ = require('jquery');
  //=> 加载的是 http://xxxxx/jquery/1.10.1/jquery.js

  alias: {
    'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
    'json': 'gallery/json/1.0.2/json',
    'jquery': 'jquery/jquery/1.10.1/jquery',
    'global': 'http://static.koocdn.com/framework/js/global.10149.js'
  },

  // 路径配置
  // 当目录比较深，或需要跨目录调用模块时，可以使用 paths 来简化书写
  // paths 配置可以结合 alias 配置一起使用
  //var underscore = require('gallery/underscore');
  //=> 加载的是 https://a.alipayobjects.com/gallery/underscore.js

  //var biz = require('app/biz');
  //=> 加载的是 path/to/app/biz.js
  //路径匹配问题  看源码实现
  paths: {
    'gallery': 'https://a.alipayobjects.com/gallery',
    'app': 'path/to/app',
  },
  //alias vs paths  初步处理后罪名的问题

  // 变量配置
  // 模块路径在运行时才能确定，这时可以使用 vars 变量来配置
  // var lang = require('./i18n/{locale}.js');
  //=> 加载的是 path/to/i18n/zh-cn.js

  vars: {
    'locale': 'zh-cn'
  },

  // 映射配置
  // 可对模块路径进行映射修改，可用于路径转换、在线调试等
  // var a = require('./a');
  //=> 加载的是 path/to/a-debug.js
  map: [
    ['http://example.com/js/app/', 'http://localhost/js/app/'],
    ['.js', '-debug.js']
  ],

  // 预加载项---- 没什么卵用
  preload: [
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ],

  // 调试模式
  debug: true,

  // Sea.js 的基础路径
  base: 'http://example.com/path/to/base/',

  // 文件编码
  charset: 'utf-8'
});
