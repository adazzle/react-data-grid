var gulp = require('gulp');

gulp.task('default', ['clean', 'flow', 'test'], function(){
  gulp.start('watch');
});
