module.exports = function(grunt) {
	require('time-grunt')(grunt);
	//////////////////////////////////////////
	//require('load-grunt-config')(grunt); //
	//////////////////////////////////////////
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		zeptodir: 'content/js/zepto/src/',
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'author: <%= pkg.author %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			src: ['dist']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				//定义一个用于插入合并输出文件之间的字符
				separator: ';',
				stripBanners: true
			},
			dist: {
				//用于连接的文件
				src: [
					'<%= zeptodir %>zepto.js',
					'<%= zeptodir %>ajax.js',
					'<%= zeptodir %>assets.js',
					'<%= zeptodir %>callbacks.js',
					'<%= zeptodir %>data.js',
					'<%= zeptodir %>deferred.js',
					'<%= zeptodir %>detect.js',
					'<%= zeptodir %>event.js',
					'<%= zeptodir %>form.js',
					'<%= zeptodir %>fx.js',
					'<%= zeptodir %>fx_methods.js',
					'<%= zeptodir %>gesture.js',
					'<%= zeptodir %>ie.js',
					'<%= zeptodir %>ios3.js',
					'<%= zeptodir %>selector.js',
					'<%= zeptodir %>stack.js',
					'<%= zeptodir %>touch.js',
					'<%= zeptodir %>cookie.js'
				],
				//返回的JS文件位置
				dest: 'dist/zepto.js'
			},
			dist1: {
				//用于连接的文件
				src: ['content/js/slidePage1.2.js', 'js/utils.js', 'js/index.js'],
				//返回的JS文件位置
				dest: 'dist/index.js'
			}
		},
		uglify: {
			options: {
				//生成一个banner注释并插入到输出文件的顶部
				banner: '/*!!! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/zepto.min.js': ['<%= concat.dist.dest %>'],
					'dist/index.min.js': ['<%= concat.dist1.dest %>']
				}
			}
		}
	});

	grunt.registerTask('default', ['clean', 'concat', 'uglify']);
};
