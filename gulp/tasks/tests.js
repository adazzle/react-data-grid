var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var karma = require('karma').server;
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;


gulp.task('test', function (cb) {
  var singleRun = argv.debug ? false : true;
  karma.start({
    configFile:  '../../../config/karma.js',
    singleRun: singleRun,
    debug: argv.debug
  }, cb);
});
