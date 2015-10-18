var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var karma = require('karma').Server;
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;


gulp.task('test', function (done) {
  var debug = argv.debug;
  var singleRun = debug ? false : true;

  var karmaServer = new karma({
    configFile:  '../../../config/karma.js',
    singleRun: singleRun,
    debug: debug
  }, done);
  karmaServer.start();
});
