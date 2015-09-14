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
    livereload = require('gulp-livereload'), //livereload
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    jpegtran = require('imagemin-jpegtran'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer');

//Gulp 仅有 5 个方法就能组合出你需要的任务流程：task, run, watch, src, dest
var src = './src/';
var destSrc = './dist/';
// HTML处理
gulp.task('html', function() {
    var htmlSrc = src + '*.html',
        htmlDst = destSrc;

    return gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
});

// 样式处理
gulp.task('css', function() {
    var cssSrc = src + 'css/',
        cssDst = destSrc + 'css';
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
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest(cssDst))
        /*.pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())*/
        .pipe(gulp.dest(cssDst))
        .pipe(notify({
            message: 'sass ok !'
        }));
});

// 图片处理
gulp.task('images', function() {
    var imgSrc = src + 'images/**/*.*', //*.+(jpeg|jpg|png)'
        imgDst = destSrc + 'images/';
    // 1. 找到图片
    gulp.src(imgSrc)
        // 2. 压缩图片
        // 只有新的或更动的图片会被压缩
        .pipe(cache(imagemin({
            progressive: true,
            quality: '65-80',
            interlaced: true
        })))
        .on('error', function(e) {
            console.log(e);
        })
        // 3. 另存图片
        .pipe(gulp.dest(imgDst))
        .pipe(notify({
            message: 'compress ok !'
        }));
});

// 任务：压缩jpg
//gulp.task('jpgmin',function(){
//    return gulp.src('images/**/*.jpg')
//           .pipe(imagemin({
//                progressive: true,
//                use:[jpegtran()]
//           }))
//           .pipe(gulp.dest(destSrc + 'images/'));
//});

// 任务：压缩png
//gulp.task('pngmin',function(){
//    return gulp.src('images/**/*.png')
//           .pipe(imagemin({
//                quality: '65-80',
//                speed: 4,
//                use:[pngquant()]
//           }))
//           .pipe(gulp.dest(destSrc + 'images/'));
//});

// js处理
gulp.task('js', function() {
    var jsSrc = src + 'js/*.js',
        jsDst = destSrc + 'js';

    return gulp.src(jsSrc)
        .pipe(jshint('.jshintrc'))
        .on('error', function(e) {
            console.log(e);
        })
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    return gulp.src([destSrc + 'css', destSrc + 'js', destSrc + 'images'], {
            read: false //file.contents 会返回空值（null），并不会去读取文件
        })
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean', 'html', 'css', 'images', 'js'] /*, function() {gulp.start(); }*/ );


// web服务 Server + watching scss/js files
gulp.task('web-server', function() {
    browserSync.init({
        server: './dist',
        index: 'index.html',
        port: 3000,
        /*ui: {
            port: 8080
        },*/
        logLevel: 'debug',
        logPrefix: 'bear',
        open: true,
        logConnections: true,
        //监听文件
        files: [destSrc + '**/*.js', destSrc + '**/*.css', destSrc + '**/*.html'] //监控变化
    });
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', ['web-server'], function() {

    // 监听html
    gulp.watch(src + '*.html', function(event) {
        gulp.run('html');
    })

    // 监听css
    gulp.watch(src + 'css/*.scss', function() {
        gulp.run('css');
    });

    // 监听images
    gulp.watch(src + 'images/**/*', function() {
        gulp.run('images');
    });

    // 监听js
    gulp.watch(src + 'js/*.js', function() {
        gulp.run('js');
    });

    //});
});

/*
 *gulp test-args  --type dev --dist distSrc
 *{ _: [ 'test-args' ], type: 'dev', dist: 'distSrc' }
 *{ '0': [Function] }
 */
gulp.task('test-args', function() {
    console.dir(gulp.env);
    console.log(arguments)
})
