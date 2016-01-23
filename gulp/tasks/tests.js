var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var karma = require('karma').Server;
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;


function testTaskRunner(done) {
  var debug = argv.debug;
  var singleRun = debug ? false : true;

  var karmaServer = new karma({
    configFile:  '../../../config/karma.js',
    singleRun: singleRun,
    debug: debug
  }, done);
  karmaServer.start();
}

gulp.task('buildTest', function(done) {
  testTaskRunner(done);
});

// Run build before testing on local environment.
gulp.task('test', ['dist'], function(done) {
  testTaskRunner(done);
});
