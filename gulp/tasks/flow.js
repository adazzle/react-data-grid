var gulp = require('gulp');
var execFile = require('child_process').execFile;

gulp.task('flow', function() {
  if (process && process.platform === 'win32') {
    //due to flow-bin not working on windows (because there isnt an official build https://github.com/facebook/flow/issues/6)
    execFile('./flow/flow.exe', ['check','--lib','./flow/libs','--strip-root','./flow'],function (err, stdout, stderr) {
      if(err) console.log('Error:' + err);
      if(stdout) console.log(stdout);
    });
  }

  //if you are not on Windows and want to use Flow, run npm install gulp-flowtype and then uncomment these lines
  //we haven't included gulp-flowtype in our package.json as it pulls the latest version of Flow from Facebook directly and does not download via npm
  //this may be a security concern for some users
   
  //else {
  //   var flow = require('gulp-flowtype');
  //
  //   return gulp.src('./flow')
  //     .pipe(flow({
  //         all: false,
  //         weak: false,
  //         declarations: './flow/libs',
  //         killFlow: false,
  //         beep: true,
  //         generalErrorRegEx: /./
  //     }));
  // }
});


gulp.task('flow-examples', function() {
  execFile('./flow/flow.exe', ['check','--lib','./flow/libs','--strip-root','./flow/examples'],function (err, stdout, stderr) {
    if(err) console.log('Error:' + err);
    if(stdout) console.log(stdout);
  });
});
