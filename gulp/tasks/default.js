var gulp = require('gulp');

gulp.task('default', ['clean', 'test'], function(){
  gulp.start('watch');
});
