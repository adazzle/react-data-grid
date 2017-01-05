var gulp = require('gulp');
var concat = require('gulp-concat');
var webpack = require("webpack");
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require("path");


gulp.task('script-deps', function () {

  return gulp.src([
    'node_modules/es5-shim/es5-shim.js'
  ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./examples/build'))
});


gulp.task("copy-dist", ['dist'], function () {
  //copy dist folder to examples
  return gulp.src([
    'dist/**',
  ])
    .pipe(gulp.dest('./examples/build'))
});

gulp.task('minify-examples', ['copy-dist']);

gulp.task("examples", ['script-deps', 'minify-examples'], function (callback) {

  // run webpack
});
