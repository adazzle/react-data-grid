var gulp = require('gulp');
var gutil = require("gulp-util");

gulp.task('coveralls', function (done) {
  return submitToCoveralls('test/coverage/report-lcov/lcov.info', function(){
    done();
  });
});


function submitToCoveralls(fileName, callback) {
  process.env.NODE_COVERALLS_DEBUG = '1'
  gutil.log(gutil.colors.cyan('Coveralls:', 'Submitting file to coveralls.io: ' + fileName));

  var coveralls = require('avcoveralls');
  var run_at = process.env.COVERALLS_RUN_AT || JSON.stringify(new Date()).slice(1, -1);
  var options = {
    service_name : process.env.COVERALLS_SERVICE_NAME,
    service_job_id : process.env.COVERALLS_SERVICE_JOB_ID,
    run_at : run_at,
    repo_token : process.env.COVERALLS_REPO_TOKEN,
    service_pull_request : process.env.APPVEYOR_PULL_REQUEST_NUMBER,
    git: {
      "head": {
        "id": process.env.APPVEYOR_REPO_COMMIT,
        "author_name": process.env.APPVEYOR_REPO_COMMIT_AUTHOR,
        "author_email": process.env.APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL,
        "committer_name": process.env.APPVEYOR_REPO_COMMIT_AUTHOR,
        "committer_email": process.env.APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL,
        "message": process.env.APPVEYOR_REPO_COMMIT_MESSAGE
      },
      "branch": process.env.APPVEYOR_REPO_BRANCH,
      "remotes": [
      {
        "name": "origin",
        "url": "git@github.com:adazzle/react-data-grid.git"
      }
      ]
    }
  };

  coveralls.getOptions = function(cb){
    var runAt = process.env.COVERALLS_RUN_AT || JSON.stringify(new Date()).slice(1, -1)
    return cb(null, options);
  };




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
