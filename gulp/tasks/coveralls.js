var gulp = require('gulp');
var gutil = require("gulp-util");

gulp.task('coveralls', function (done) {
  return submitToCoveralls('test/reports/coverage/report-lcov/lcov.info', function(){
  done();
  });
});


function submitToCoveralls(fileName, callback) {
  gutil.log(gutil.colors.cyan('Coveralls:', 'Submitting file to coveralls.io: ' + fileName));

  var coveralls = require('coveralls');

  // Override coveralls option processing until it handles use as a srcrary better (TODO)
  coveralls.getOptions = coveralls.getBaseOptions;
  console.log(coveralls.getBaseOptions);

  var fs = require('fs');

  fs.readFile(fileName, 'utf8', function(err, fileContent) {
    if (err) {
      gutil.log('Coveralls:', "Failed to read file '" + fileName + "', with error: " + err);
      return callback(false);
    }

    coveralls.handleInput(fileContent, function(err) {
      if (err) {
        gutil.log('Coveralls:', "Failed to submit '" + fileName + "' to coveralls: " + err);
        return callback(false);
      }

      gutil.log('Coveralls:', "Successfully submitted " + fileName + " to coveralls");
      callback(true);
    });
  });
}
