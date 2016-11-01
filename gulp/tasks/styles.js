var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
// task
gulp.task('styles', function () {
  return gulp.src('./themes/react-data-grid.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dist'));
});

