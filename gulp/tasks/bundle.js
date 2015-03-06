var Webpack = require("webpack");
var gutil     = require("gulp-util");

var defaultErrorHandler = function(err, ctx) {
  throw new gutil.PluginError(ctx, err);
};

module.exports = function (config, done, handlers) {
  handlers = handlers || {};
  handlers = {
    onFatalError: handlers.onFatalError || defaultErrorHandler,
    onError: handlers.onError || defaultErrorHandler,
    onWarning: handlers.onWarning || defaultErrorHandler
  };
  Webpack(config, function(err, stats) {

      if(err) return handlers.onFatalError(err, 'Fatal error');
      var jsonStats = stats.toJson();
      if(!jsonStats) {

      }
      if(jsonStats.errors.length > 0) {
        return handlers.onError(jsonStats.errors.toString(), 'Stats error');
      }
      if(jsonStats.warnings.length > 0) {
        return handlers.onWarning(jsonStats.warnings.toString(), 'Stats warning');
      }
      done();


    });
}
