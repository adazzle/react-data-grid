// require all modules ending in "spec.js" from the
// current directory and all subdirectories
var testsContext = require.context("../src", true, /^.*\.(spec)$/);
testsContext.keys().forEach(testsContext);
