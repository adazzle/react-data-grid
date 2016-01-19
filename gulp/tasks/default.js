var gulp = require('gulp');

gulp.task('default', ['clean', 'test', 'eslint'], function(){
  gulp.start('watch');
});
