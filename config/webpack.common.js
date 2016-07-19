var path = require("path");
var webpack = require('webpack');
var release = false;
var path = require("path");
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;

function getPlugins() {
  var nodeEnv = RELEASE ? '"production"' : '"development"';
  var pluginsBase =  [
    new webpack.DefinePlugin({'process.env.NODE_ENV': nodeEnv, 'global': 'window'})
  ];

  if (RELEASE) {
    pluginsBase.push(new webpack.optimize.DedupePlugin());
    pluginsBase.push(new webpack.optimize.OccurenceOrderPlugin());
    pluginsBase.push(new webpack.optimize.AggressiveMergingPlugin());
  }
  return pluginsBase;
};

var config = {
  externals: {
    "react": {
      root : 'React',
      commonjs : 'react',
      commonjs2 : 'react',
      amd : 'react'
    },
    "react-dom": {
			root : 'ReactDOM',
			commonjs : 'react-dom',
			commonjs2 : 'react-dom',
			amd : 'react-dom'
		},
    "moment" : "moment"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: getPlugins(),
  postLoaders: [
  {
    test: /\.js$/,
    exclude: /node_modules|testData/,
    loader: 'jshint'
  }]
}


module.exports = config;
