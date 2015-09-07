/* var gulp = require('gulp');

 gulp.task('default', function() {
     // 将你的默认的任务代码放在这
 });*/

/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload gulp-sourcemaps tiny-lr st --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩
    sass = require('gulp-ruby-sass'), //sass
    minifycss = require('gulp-minify-css'), //css压缩
    jshint = require('gulp-jshint'), //js检查
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'), //清空文件夹
    //tinylr = require('tiny-lr'), //livereload
    //server = tinylr(),
    //port = 35729,
    livereload = require('gulp-livereload'), //livereload
    sourcemaps = require('gulp-sourcemaps'),
    http = require('http'),
    st = require('st');
// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload());
});

// 样式处理
gulp.task('css', function() {
    var cssSrc = './src/css/',
        cssDst = './dist/css';
    /*// gulp-ruby-sass: 0.7.1
    gulp.task('sass', function() {
        return gulp.src('path/to/scss')
            .pipe(sass({ style: 'expanded' }))
            .pipe(gulp.dest('path/to/css'));
    });
    // gulp-ruby-sass: 1.x
    gulp.task('sass', function() {
        return sass('path/to/scss', { style: 'expanded' })
            .pipe(gulp.dest('path/to/css'));
    });*/
    return sass(cssSrc, {
            style: 'expanded',
            sourcemap: true
                /*precision: 6,
                stopOnError: true,
                cacheLocation: './',
                loadPath: ['library', '../../shared-components']*/
        })
        .on('error', sass.logError)
        // For inline sourcemaps
        .pipe(sourcemaps.write())
        // For file sourcemaps
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst))
        .pipe(livereload());
});

// 图片处理
gulp.task('images', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst))
        .pipe(livereload());
})

// js处理
gulp.task('js', function() {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';

    gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst))
        .pipe(livereload());
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], {
            read: false
        })
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'css', 'images', 'js');
});

gulp.task('server', function(done) {
    http.createServer(
        st({
            path: __dirname + '/dist',
            index: 'index.html',
            cache: false
        })
    ).listen(8080, done);
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', ['server'], function() {

    /*livereload.listen({
        port: 8080
    });*/

    livereload.listen({
        basePath: 'dist'
    });

    // 监听html
    gulp.watch('./src/*.html', function(event) {
        gulp.run('html');
    })

    // 监听css
    gulp.watch('./src/css/*.scss', function() {
        gulp.run('css');
    });

    // 监听images
    gulp.watch('./src/images/**/*', function() {
        gulp.run('images');
    });

    // 监听js
    gulp.watch('./src/js/*.js', function() {
        gulp.run('js');
    });

    //});
});
