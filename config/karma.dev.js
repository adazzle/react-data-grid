/*
* In local config, only run tests using phantom js. No code coverage reports applied
*/
const webpack = require('webpack');
const path = require('path');
const karma = require('karma');
const argv = require('minimist')(process.argv.slice(2));

// load our current karma config file
const { preprocessors: defaultPreprocessors,
  files: defaultFiles,
  basePath,
  webpack: defaultWebpack,
  webpackServer } = karma.config.parseConfig(path.resolve('config/karma.js'));

let files = defaultFiles;
let preprocessors = defaultPreprocessors;
// if "--file" present, run only tests for that file and enable sourcemaps
if (argv.file) {
  const testFile = path.resolve(argv.file);
  files = [...defaultFiles.slice(0, defaultFiles.length - 1), testFile];
  preprocessors = Object.keys(defaultPreprocessors).reduce( (res, key) => {
    if (key === defaultFiles[defaultFiles.length - 1].pattern) {
      res[testFile] = [...defaultPreprocessors[key], 'sourcemap'];
    } else {
      res[key] = defaultPreprocessors[key];
    }
    return res;
  }, {});
  console.log(`Running just the tests in ${testFile}`);
} else {
  console.log('Running all tests.');
}

// Setup webpack file
const webpackCfg = Object.keys(defaultWebpack).reduce((res, key) => {
  let value = defaultWebpack[key];
  if (key === 'module') {
    value = Object.assign({}, value);
  } else if (key === 'plugins') {
    value = [...value, new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|jsx|tsx)($|\?)/i
    })];
  }
  res[key] = value;
  return res;
}, {});
webpackCfg.devtool = argv.file ? 'inline-source-map' : undefined;
webpackCfg.mode = 'development';

module.exports = function(config) {
  config.set({
    basePath,
    // test files & preprocessing
    files,
    preprocessors,
    // webpack
    webpack: webpackCfg,
    webpackServer,

    browserNoActivityTimeout: 1000000,
    // reporting
    reporters: ['mocha'],
    mochaReporter: {
      ignoreSkipped: true,
      output: !!argv.file ? 'full' : 'minimal'
    },
    // runs & watch
    autoWatch: true,
    singleRun: false,

    // test framework & browser setup
    frameworks: ['jasmine'],
    browsers: ['ChromeDebugging'],
    port: 9876,
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ],
        debug: true
      }
    }
  });
};
