var gulp      = require("gulp");
var gutil     = require("gulp-util");
var bundle   = require("./bundle");
var uglify = require('gulp-uglify');
var webpackMainConfig = require("../../config/webpack.react-data-grid.js");
var webpackPluginsConfig = require("../../config/webpack.ui-plugins.js");
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task("dist", function(callback) {

  var onBundle = function(){
    gulp.src('dist/react-data-grid.ui-plugins.js')
    .pipe(uglify())
    .pipe(rename('react-data-grid.ui-plugins.min.js'))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log)

    gulp.src('dist/react-data-grid.js')
    .pipe(uglify())
    .pipe(rename('react-data-grid.min.js'))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log)
    callback();
  }

  bundle(Object.create(webpackMainConfig), function() {
    bundle(Object.create(webpackPluginsConfig), onBundle);
  });

});
