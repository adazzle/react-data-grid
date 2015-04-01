var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var karma = require('karma').server;
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;


gulp.task('test', ['dist'], function (cb) {
  // var configFile = RELEASE ? '../../../config/karma.release.js' : '../../../config/karma.local.js';
  // console.log('configFile =' + configFile);
  // karma.start({
  //   configFile: configFile,
  //   singleRun: true
  // }, cb);
  cb()
});
