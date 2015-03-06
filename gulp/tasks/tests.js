var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var karma = require('karma').server;

gulp.task('test', ['build'], function (cb) {
  karma.start({
    configFile: '../../../config/karma.js',
    singleRun: true
  }, cb);
});
