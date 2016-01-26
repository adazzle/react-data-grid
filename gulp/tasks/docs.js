var gulp = require('gulp');

var ghpages = require('gh-pages');
var path = require('path');
gulp.task('docs', function (done) {
  ghpages.publish(path.join(__dirname, '../../examples'), function(err) {
    gutil.log("[publish error]", stats.toString({
      // output options
    }));
    throw err;
    });
});
