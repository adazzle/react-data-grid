var gulp = require('gulp');

gulp.task('default', ['clean', 'flow-win', 'test'], function(){
  gulp.start('watch');
});
