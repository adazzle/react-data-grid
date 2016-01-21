var gulp = require('gulp');

gulp.task('default', ['clean', 'buildTest', 'eslint'], function() {
  gulp.start('watch');
});
