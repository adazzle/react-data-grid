// require all modules ending in "spec.js" from the
// current directory and all subdirectories
import '@babel/polyfill';
var testsContext = require.context("../packages", true, /^.*\.(spec)$/);
testsContext.keys().forEach(testsContext);
