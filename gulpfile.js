
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
    })).pipe(gulp.dest('./img')).on('end', cb).on('error', cb);
    gulp.src(['../src/views/images/*.png','../src/views/images/*.jpg','../src/views/images/*.gif','../src/views/images/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./views/images')).on('end', cb).on('error', cb);
});

// Minify CSS
gulp.task('minify-css', function() {
  gulp.src('../src/css/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./css'));
  gulp.src('../src/views/css/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./views/css'))
});


// Minify HTML
gulp.task('minify-html', function() {
    var opts = {comments:true,spare:true};
     gulp.src('../src/*.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./'));
    gulp.src('../src/views/*.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./'))
});


// Compress JS at root
gulp.task('compress', function() {
  gulp.src('../src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./'));
  gulp.src('../src/views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./views/js'))
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
