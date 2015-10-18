var gulp = require('gulp');

gulp.task('default', ['clean', 'flow'], function(){
  gulp.start('watch');
});
