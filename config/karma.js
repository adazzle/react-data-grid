/*
* In local config, only run tests using phantom js. No code coverage reports applied
*/
var webpack = require('webpack');
var webpackConfig = require('./webpack.common.config.js');
var RewirePlugin = require("rewire-webpack");
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = !!argv.release;
var DEBUG = !!argv.debug;
var BROWSERS = argv.browsers;


module.exports = function (config) {

  function getReporters(){
    if(RELEASE === true){
      return  ['junit', 'progress', 'coverage']
    }else{
      return ['junit', 'progress']
    }
  };

  function getBrowsers(){
    var browsers = ['PhantomJS'];
    if(BROWSERS) {
      return BROWSERS.split(',');
    }
    if(RELEASE){
      browsers = ['Chrome','Firefox','IE']
    }else if(DEBUG){
      browsers = ['ChromeDebugging'];
    }
    return browsers;
  };

  function getFiles() {
    var files;
    if(RELEASE === true ||  DEBUG === true) {
      files = [
     'node_modules/es5-shim/es5-shim.js',
     'node_modules/es5-shim/es5-sham.js',
     'test/FullTests.jsx'
     ]
    } else {
    files = [
     'node_modules/es5-shim/es5-shim.js',
     'node_modules/es5-shim/es5-sham.js',
     'test/unitTests.jsx'
     ]
    }
    return files;
  }

  function getPreprocessors() {
    var preprocessors;
    if(RELEASE === true ||  DEBUG === true) {
      preprocessors = {
        'test/FullTests.jsx': ['webpack']
      }
    } else {
      preprocessors = {'test/unitTests.jsx': ['webpack']}
    }
    return preprocessors;
  }

  function lookupPhantomJS() {
    try {
      return require('phantomjs').path;
    } catch(e){
      return;
    }
  }

  config.set({

    basePath: path.join(__dirname, '../'),

    files: getFiles(),

    preprocessors: getPreprocessors(),

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: webpackConfig.module.loaders
      },
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
      },
      plugins: [
        new RewirePlugin()
      ],
      externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true,
        // https://github.com/airbnb/enzyme/issues/968
        'react-addons-test-utils': true
      }
    },

    webpackServer: {
      stats: {
        colors: true
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    browserNoActivityTimeout: 1000000,
    browserDisconnectTimeout: 5000,
    browserDisconnectTolerance: 3,

    // coverage reporter generates the coverage
    reporters: ['junit', 'progress', 'coverage'],


    coverageReporter: {
      // specify a common output directory
      dir: 'test/coverage',
      reporters: [
      // reporters not supporting the `file` property
      { type: 'html', subdir: 'report-html' },
      { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    // the default configuration
    junitReporter: {
      outputFile: 'test/coverage/test-results.xml',
      outputDir: 'test/coverage',
      suite: ''
    },

    autoWatch: false,

    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    browsers: getBrowsers(),

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher-nonet',
      'karma-ie-launcher',
      'karma-jasmine',
      'karma-jasmine-matchers',
      'karma-webpack',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    customLaunchers: {
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      IE8: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE8'
      },
      ChromeDebugging: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ],
        debug: true
      }
    },

    phantomjsLauncher: {
      // configure PhantomJS executable for each platform
      cmd: {
        linux: lookupPhantomJS(),
        darwin: lookupPhantomJS(),
        win32: path.join(__dirname, '../test/browser/phantomjs.exe')
      }
    }
  });
};
