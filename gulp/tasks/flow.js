var gulp = require('gulp');
var execFile = require('child_process').execFile;

gulp.task('flow-win', function() {
  execFile('./flow/flow.exe', ['check','--lib','./flow/libs','--strip-root','./flow'],function (err, stdout, stderr) {
    if(err) console.log('Error:' + err);
    if(stdout) console.log(stdout);
  });
});


gulp.task('flow-examples', ['examples'], function() {
  execFile('./flow/flow.exe', ['check','--lib','./flow/libs','--strip-root','./flow/examples'],function (err, stdout, stderr) {
    if(err) console.log('Error:' + err);
    if(stdout) console.log(stdout);
  });
});

//this is how we WANT to run flow
//but due to flow-bin not working on windows (because there isnt an official build https://github.com/facebook/flow/issues/6)
//we cant require it as then npm install fails on any win environment (err.. appveyor)
//if you are on *nix platform, npm install flow-bin, and then uncomment this task

// var flow = require('gulp-flowtype');
//
// gulp.task('flow', function() {
//   return gulp.src('./flow')
//     .pipe(flow({
//         all: false,
//         weak: false,
//         declarations: './flow/libs',
//         killFlow: false,
//         beep: true,
//         generalErrorRegEx: /./
//     }));
//
// })
