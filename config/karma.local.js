/*
* In local config, only run tests using phantom js. No code coverage reports applied
*/

'use strict';

var webpackConfig = require('./webpack.config.js');
var RewirePlugin = require("rewire-webpack");
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = !!argv.release;


module.exports = function (config) {
  config.set({

    basePath: __dirname,

    files: [
      '../node_modules/es5-shim/es5-shim.js',
      '../test/Grid.spec.js'
    ],

    preprocessors: {
      '../test/Grid.spec.js': ['webpack']
    },

    webpack: {
      cache: true,
      module: {
        loaders: webpackConfig.module.loaders
    },
    plugins: [
    new RewirePlugin()
    ]
  },

  browserNoActivityTimeout: 1000000,

  reporters: ['progress'],

  autoWatch: false,

  frameworks: ['jasmine'],

  browsers: ['PhantomJS'],

  phantomjsLauncher: {
    // configure PhantomJS executable for each platform
    cmd: {
      win32: path.join(__dirname, '../test/browser/phantomjs.exe')
    }
  },

  webpackMiddleware: {
    noInfo: true
  },

  plugins: [
  'karma-jasmine',
  'karma-webpack',
  'karma-phantomjs-launcher-nonet'
  ]
});
};
