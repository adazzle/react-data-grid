var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(cb) {
    del(['examples/build/', 'lib', 'dist'], cb);
});
