'use strict';
module.exports = function(grunt) {
	// 5、-----------------------------------------------------------
	/*grunt.initConfig({
		log: {
			foo: [1, 2, 3],
			bar: 'hello world',
			baz: false
		}
	});
	grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
		if (arguments.length === 0) {
			grunt.log.writeln(this.name + ", no args");
		} else {
			grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
		}
	});

	grunt.registerMultiTask('log', 'Log stuff.', function() {
		grunt.log.writeln(this.target + ': ' + this.data);
	});*/

	// 6、-----------------------------------------------------------
	grunt.registerTask('1', function() {
		console.log('翯翯');
	});
	grunt.registerTask('2', function() {
		console.log('么么');
		//return false; // 返回错误
	});
	grunt.registerTask('3', function() {
		console.log('然并卵');
	});

	grunt.registerTask('123all', function() {
		//grunt.task.run('1', '2', '3');
		//or
		grunt.task.run(['1', '2', '3']);
	});

	grunt.registerTask('default', ['1', '2', '3']);
	grunt.registerTask('12', ['1', '2']);

};
