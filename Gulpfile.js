var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  csslint = require('gulp-csslint'),
  gutil = require('gulp-util'),
  fs = require('fs');

gulp.task('cssConcat', function() {
  gulp.src('./css/*.css')
    .pipe(plumber())
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(autoprefixer())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('cssMin', function() {
  gulp.src('./css/*.css')
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jsConcat', function() {
  gulp.src('./js/*.js')
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jsMin', function() {
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compressImages', function() {
  gulp.src('./images/*.*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('release', function() {
  var number = gutil.env.number;

  if (fs.existsSync('./releases/' + number)) {
    return console.error('Number ' + number + ' already exists');
  }

  console.log('Making release' + number + ' ');
  gulp.src("./dist/**/*.*")
    .pipe(gulp.dest("./releases/" + number + "/"));

});

gulp.task('build', ['cssMin', 'jsMin', 'compressImages']);

gulp.task('watch', function() {
  gulp.watch('./css/*.css', ['cssConcat']);
  gulp.watch('./js/*.js', ['jsConcat']);
});

gulp.task('default', ['cssConcat', 'jsConcat', 'watch']);
