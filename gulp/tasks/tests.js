var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var karma = require('karma').server;
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;


gulp.task('test', function (cb) {
  //to debug a single test, teh easiest way is just call:
  //put a debugger statement in your test
  //gulp test --browsers Chrome (or IE/Firefox)
  //hit f12 quickly, and you are done
  karma.start({
    configFile:  '../../../config/karma.js',
    singleRun: false
  }, cb);
});
