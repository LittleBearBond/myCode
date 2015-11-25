//https://github.com/seajs/seajs/issues/258
require('./a')
require('a')
require('../a')
require('/a')
require('http:www.xxx.com/a')

// ".js" 后缀可以省略：
require.resolve('http://example.com/js/a');
require.resolve('http://example.com/js/a.js');
// ".css" 后缀不可省略：
require.resolve('http://example.com/css/a.css');
// => http://example.com/css/a.css
// 当路径中有问号（"?"）时，不会自动添加后缀：
require.resolve('http://example.com/js/a.json?callback=define');
// => http://example.com/js/a.json?callback=define
// 当路径以井号（"#"）结尾时，不会自动添加后缀，且在解析时，会自动去掉井号：
require.resolve('http://example.com/js/a.json#');
// => http://example.com/js/a.json
// 在模块代码里：
require.resolve('http:XXX.com/jquery/1.9.1/jquery');
// => http:XXX.com/jquery/1.9.1/jquery.js
