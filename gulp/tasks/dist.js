var gulp      = require("gulp");
var bundle   = require("./bundle");
var webpackConfig = require("../../config/webpack.js");

gulp.task("dist", function(callback) {
  bundle(webpackConfig, callback);
});
