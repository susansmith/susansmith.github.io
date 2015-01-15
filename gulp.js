var gulp = require('gulp');
var imageop = require('gulp-image-optimization');

gulp.task('images', function(cb) {
    gulp.src(['../src/img/*.png','../src/img/*.jpg','../src/img/*.gif','../src/img/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('img')).on('end', cb).on('error', cb);
});


var gulp = require('gulp'),
var minifyCSS = require('gulp-minify-css');

gulp.task('minify-css', function() {
  gulp.src('../src/css/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./dist/css'))
});

var minifyHTML = require('gulp-minify-html');

gulp.task('minify-html', function() {
    var opts = {comments:true,spare:true};

     gulp.src('../src/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./'))
});

var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  gulp.src('../src/lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(‘./'))
});