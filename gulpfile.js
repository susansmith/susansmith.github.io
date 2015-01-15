
// Include gulp
var gulp = require('gulp');

//Include Plugins
var imageop = require('gulp-image-optimization');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');

//Gzip Big CSS Files
gulp.task('zipcss', function() {
    gulp.src('../src/css/*.css')
    .pipe(gzip())
    .pipe(gulp.dest('./css'));
    gulp.src('../src/views/css/*.css')
    .pipe(gzip())
    .pipe(gulp.dest('./views/css'));
});


//Gzip big js files
gulp.task('zipjs', function() {
    gulp.src('../src/js/*.js')
    .pipe(gzip())
    .pipe(gulp.dest('./js'));
    gulp.src('../src/views/js/*.js')
    .pipe(gzip())
    .pipe(gulp.dest('./views/js'));
});

//Gzip big js files
gulp.task('zipimage', function() {
    gulp.src('../src/img/*.jpg')
    .pipe(gzip())
    .pipe(gulp.dest('./img'));
    gulp.src('../src/views/images/*.jpg')
    .pipe(gzip())
    .pipe(gulp.dest('./views/images'));
});


// Optimize other Images
gulp.task('images', function(cb) {
    gulp.src(['../src/img/*.png','../src/img/*.gif','../src/img/*.jpg']).pipe(imageop({
        optimizationLevel: 1,
        progressive: false,
        interlaced: false
    })).pipe(gulp.dest('./img')).on('end', cb).on('error', cb);
    gulp.src(['../src/views/images/*.png','../src/views/images/*.gif','../src/views/images/*.jpg']).pipe(imageop({
        optimizationLevel: 1,
        progressive: false,
        interlaced: false
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
     gulp.src('./src/*.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./'));
    gulp.src('../src/views/*.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./views'))
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
    gulp.watch('../src/**/*.js', ['compress']);
    gulp.watch('../src/**/*.css', ['minify-css']);
    gulp.watch('../src/*.html', ['minify-html']);
    gulp.watch(['../src/**/*.jpg','../src/**/*.gif','../src/**/*.jpeg'], ['images']);
    gulp.watch('../src/img/*.*', ['gzip']);
    gulp.watch('../src/views/images/*.*', ['gzip']);
    gulp.watch('../src/css/*.*', ['gzip']);
    gulp.watch('../src/views/css/*.*', ['gzip']);
    gulp.watch('../src/js/*.*', ['gzip']);
    gulp.watch('../src/views/js/*.*', ['gzip']);
});

//Default Task
gulp.task('default', ['minify-css','minify-html','compress','zipcss','zipjs','images','zipimage']);
