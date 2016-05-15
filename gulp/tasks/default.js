var gulp = require('gulp');

gulp.task('default', ['clean', 'eslint'], function() {
  gulp.start('watch');
});
