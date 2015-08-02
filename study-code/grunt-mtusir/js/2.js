'use strict';
module.exports = function(grunt) {

	grunt.registerTask('xj-task', function() {
		//1、-----------------------------------------------------------
		//console.log('hello world!');

		//2、-----------------------------------------------------------
		/*
		this.async
		如果一个任务是异步的，必须调用此方法以通知Grunt。此方法返回一个 "done" 函数，应当在任务执行完毕后调用。
		false 或 Error 对象都可以传递给done函数，以通知Grunt此任务执行失败。
		如果 this.async 方法没有被调用，此任务将会同步执行
		 */
		// Tell Grunt this task is asynchronous.
		/*var done = this.async();
		// Your async code.
		setTimeout(function() {
			// Let's simulate an error, sometimes.
			var success = Math.random() > 0.5;
			// All done!
			done(success);
		}, 1000);
		console.log(new Array(30).join('-'))*/

		//3、-----------------------------------------------------------
		//console.log(grunt.log)
		// console.dir(this)
		// console.log(this.files)
	});

	// 4、-----------------------------------------------------------
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
	grunt.registerTask('default', ['1', '2', '3']);
	grunt.registerTask('12', ['1', '2']);

};
