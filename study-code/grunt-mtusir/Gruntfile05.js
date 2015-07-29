module.exports = function(grunt) {
	grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			'default': {
				//一般配置，最弱的配置
				// 我们的原始目标是：将A目录的指定文件移动到B目录
				// 但是得到的结果好像不太对。。。
				'0': {
					src: 'xxx',
					dist: 'dao-->xxxx'
				},
				// 文件数组方式配置多文件
				'1': {
					files: [{
						src: 'js/1.js',
						dest: 'dist/1.js'
					}, {
						src: 'js/2.js',
						dest: 'dist/2.js'
					}]
				},
				// 文件对象方式配置多文件
				'2': {
					files: {
						'dist/1.js': 'js/1.js',
						'dist/2.js': 'js/2.js'
						'dist/3.js': ['js/3.js', 'js/1.js']
					}
				},
				/*
				http://www.gruntjs.net/configuring-tasks
				expand 设置为true用于启用下面的选项：
				cwd 所有src指定的匹配都将相对于此处指定的路径（但不包括此路径） 。
				src 相对于cwd路径的匹配模式。
				dest 目标文件路径前缀。
				ext 对于生成的dest路径中所有实际存在文件，均使用这个属性值替换扩展名。
				extDot 用于指定标记扩展名的英文点号的所在位置。可以赋值 'first' （扩展名从文件名中的第一个英文点号开始） 或 'last' （扩展名从最后一个英文点号开始），默认值为 'first' [添加于 0.4.3 版本]
				flatten 从生成的dest路径中移除所有的路径部分。
				rename 对每个匹配的src文件调用这个函数(在重命名后缀和移除路径之后)。dest和匹配的src路径将被作为参数传入，此函数应该返回一个新的dest值。 如果相同的dest返回不止一次，那么，每个返回此值的src来源都将被添加到一个数组中作为源列表
				 */
				// 多文件处理的标准写法
				'3': {
					expand: true,
					src: 'js/*.js',
					dest: 'dist/'
				}
			},
			clean: {
				//清除
				dist: {
					//一个*不匹配反斜杠  一个星匹配任意字符
					src: ['dist/**/*.html'],
					//'isFIle,isDirectory,isXX'具体见官网说嘛， 也可以是自定义函数
					filter: function(filePath) {
						return !grunt.file.isDir(filePath);
					},
					expand: true,
					cwd: '',
					ext: '.min.html',
					dest: 'dist/',
					//last   index.xx.html--->index.xx.min.html
					//first  index.xx.html--->index.min.html
					extDot: 'first',
					//true  去掉中间各层目录
					flatten: false, //true
					rename: function(dest, src) {
						return (dest + 'js/' + src);
					}
					//nonull
					//dot:true 名字以点开头的文件
					//matchBase:true  //a?b --- 1/acb  a/acb/acb/abc----  只能命中 1/acb
				}
			}
		},
		'my': {
			'1': {},
			'2': {}
		},
		'my-multi-task': {
			'1': {},
			'2': {
				files: {
					'dist/1.js': 'js/1.js',
					'dist/2.js': 'js/2.js'
				}
			}
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
	console.log(this.name, '----------------------------start--------------------------')
	grunt.log.ok('文件描述对象个数', this.files.length);
	this.files.forEach(function(file) {
		console.log('file:', file);
		grunt.log.ok('file.src', typeof file.src, file.src);
		grunt.log.ok('file.dest', typeof file.dest, file.dest);
	});
	console.log(this.name, '-----------------------------end-------------------------')
}
grunt.registerMultiTask('myclean', function() {
	/**
	 *  如果只需要处理文件本身，而不关注文件去哪儿
	 *  可以使用 this.filesSrc 属性获得文件来源数组
	 */
	// 不处理任何异常情况
	this.filesSrc.forEach(function(src) {
		grunt.file.delete(src);
		grunt.log.ok('已删除文件/路径：' + src);
	});
});
// 不处理任何异常情况
grunt.registerMultiTask('mycopy', function() {
	this.files.forEach(function(ofile) {
		grunt.file.copy(ofile.src[0], ofile.dest);
		grunt.log.ok('新增文件：' + dest);
	});
});

grunt.registerMultiTask('default', cb);
grunt.registerMultiTask('my', cb);
grunt.registerTask('mytask', function() {
	console.dir(this);
	/*
	{ nameArgs: 'mytask',
	  name: 'mytask',
	  args: [],
	  flags: {},
	  async: [Function],
	  errorCount: [Getter],
	  requires: [Function],
	  requiresConfig: [Function],
	  options: [Function] }
	 */
});
//在initConfit 中必须有一个名字与之对应
//当运行一个多任务时，Grunt会自动从项目的配置对象中查找同名属性。多任务可以有多个配置，并且可以使用任意命名的'targets'。
grunt.registerMultiTask('my-multi-task', function() {
	console.dir(this);
	/*
	{ nameArgs: 'my-multi-task:1',
	  name: 'my-multi-task',
	  args: [],
	  flags: {},
	  async: [Function],
	  errorCount: [Getter],
	  requires: [Function],
	  requiresConfig: [Function],
	  options: [Function],
	  target: '1',
	  data: {},
	  files: [],
	  filesSrc: [Getter] }
	 */
});
};
