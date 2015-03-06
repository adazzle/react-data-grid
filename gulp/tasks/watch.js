var gulp = require('gulp');
var del = require('del');
gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch('themes/**', ['styles']);
	gulp.watch('src/**', ['examples']);

});
