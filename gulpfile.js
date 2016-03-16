/*
 * @Author: chengfubei
 * @Date:   2016-03-15 19:42:46
 * @Last Modified by:   chengfubei
 * @Last Modified time: 2016-03-16 18:49:52
 */

'use strict';




var gulp = require('gulp')
var less = require('gulp-less')
var cssnano = require('gulp-cssnano')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var html = require('gulp-htmlmin')
var cssBase64 = require('gulp-css-base64');

/*
1.less 编译
 */
gulp.task('style', function() {
    gulp.src('src/styles/*.less')
        //调用less方法
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.reload(
            {stream:true}
            ));
});
/*
2.实现代码压缩, 混淆
 */
gulp.task('script', function() {
    /*js合并 压缩*/
    gulp.src('src/scripts/*.js')
        /*合并js代码*/
       /* .pipe(concat('all.js'))*/
        /*混淆代码*/
        .pipe(uglify())
        /*输出到dist文件夹*/
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload(
            {stream:true}
            ));
});
/*
3.img复制
 */
gulp.task('image', function() {
    /*迁移图片到生产环境*/
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload(
            {stream:true}
            ));
});

/*
4.html压缩,remove注释
 */
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(html({
            /*压缩代码*/
            collapseWhitespace: true,
            /*remove 注释*/
            removeComments: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload(
            {stream:true}
            ));

})

/*
5. css中图片转base
 */
gulp.task('default', function() {
    return gulp.src('src/styles/input.css')
        .pipe(cssBase64({
            baseDir: "./src/images/",
            maxWeightResource: 100,
            extensionsAllowed: ['.gif', '.jpg']
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload(
            {stream:true}
            ));
});
/*
6.监视文件auto refresh
*/

var browserSync = require('browser-sync');
gulp.task('serve', function() {
    /*修改了baseDir:[默认路径]*/
    browserSync({
                server: {
                    baseDir: ['dist']
                },
        },
        function(err, bs) {
            console.log(bs.options.getIn(["urls", "local"]));
        });
    /*监听小模块变动*/
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
})
