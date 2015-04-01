var gulp      = require("gulp");
var gutil     = require("gulp-util");
var bundle   = require("./bundle");
var uglify = require('gulp-uglify');
var webpackConfig = require("../../config/webpack.config.js");
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task("dist", function(callback) {

  var onBundle = function(){
    gulp.src('dist/react-data-grid-with-addons.js')
    .pipe(uglify())
    .pipe(rename('react-data-grid-with-addons.min.js'))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log)

    gulp.src('dist/react-data-grid.js')
    .pipe(uglify())
    .pipe(rename('react-data-grid.min.js'))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log)
    callback();
  }

  bundle(Object.create(webpackConfig), onBundle);



});
