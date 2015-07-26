module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'default': {
			// 如果使用registerMultiTask注册任务
			// 至少要有一个子任务配置，如task0
			'task1': {},
			'task2': {
				src: 'js/test.js',
				dest: 'dist/test.js'
			}
		},
		'my': {
			'1': {},
			'2': {}
		}
	});
	/**
	 * 使用registerMultiTask方法注册的任务中this对象会挂接更多的属性、方法
	 * 比如 this.files
	 * 详细的属性、方法列表可以参考http://www.gruntjs.net/api/inside-tasks/
	 *
	 * 使用registerMultiTask方法注册任务时
	 * 要求配置文件中有任务的配置参数(本例为default)，
	 * 且必须有一个子任务配置(本例为task0)，
	 * 否则会报错
	 */
	var cb = function() {
		grunt.log.ok('文件描述对象个数', this.files.length);
		this.files.forEach(function(ofile) {
			grunt.log.writeln('我是谁');
			// read 可以识别相对路径，以工作目录为基础目录查找
			grunt.log.ok(grunt.file.read(ofile.src));

			grunt.log.writeln('我从哪儿来');
			grunt.log.ok(typeof ofile.src, ofile.src);

			grunt.log.writeln('我要到哪里去');
			grunt.log.ok(typeof ofile.dest, ofile.dest);
			// 拷贝过去
			//grunt.file.copy(ofile.src, ofile.dest);
		});
	}
	grunt.registerMultiTask('default', cb);
	grunt.registerMultiTask('my', cb);
};
