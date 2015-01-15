
// Include gulp
var gulp = require('gulp');

//Include Plugins
var imageop = require('gulp-image-optimization');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');


// Optimize Images
gulp.task('images', function(cb) {
    gulp.src(['../src/img/*.png','../src/img/*.jpg','../src/img/*.gif','../src/img/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('img')).on('end', cb).on('error', cb);
});

// Minify CSS
gulp.task('minify-css', function() {
  gulp.src('../src/css/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./dist/css'))
});


// Minify HTML
gulp.task('minify-html', function() {
    var opts = {comments:true,spare:true};

     gulp.src('../src/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./'))
});


// Compress JS
gulp.task('compress', function() {
  gulp.src('../src/lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('../src/js/*.js', ['compress']);
    gulp.watch('../src/css/*.css', ['minify-css']);
    gulp.watch('../src/*.html', ['minify-html']);
    gulp.watch(['../src/img/*.png','../src/img/*.jpg','../src/img/*.gif','../src/img/*.jpeg'], ['images']);
});

//Default Task
gulp.task('default', ['compress', 'minify-css', 'minify-html', 'images']);
