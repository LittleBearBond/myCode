var fs = require('fs');
var path = require('path');

function travel(dir, callback) {
	fs.readdirSync(dir).forEach(function(file) {
		var pathname = path.join(dir, file);

		if (fs.statSync(pathname).isDirectory()) {
			travel(pathname, callback);
		} else {
			callback(pathname);
		}
	});
}
//如果读取目录或读取文件状态时使用的是异步API，目录遍历函数实现起来会有些复杂，但原理完全相同。travel函数的异步版本如下
function travelsync(dir, callback, finish) {
	fs.readdir(dir, function(err, files) {
		(function next(i) {
			if (i < files.length) {
				var pathname = path.join(dir, files[i]);

				fs.stat(pathname, function(err, stats) {
					if (stats.isDirectory()) {
						travel(pathname, callback, function() {
							next(i + 1);
						});
					} else {
						callback(pathname, function() {
							next(i + 1);
						});
					}
				});
			} else {
				finish && finish();
			}
		}(0));
	});
}
travel('E:\\MyCode\\myTest\\nodejs', function(pathname) {
	console.log(pathname);
});
