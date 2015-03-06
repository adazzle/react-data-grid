var gulp = require('gulp');

gulp.task('default', ['clean', 'flow-win'], function(){
  gulp.start('watch');
});
