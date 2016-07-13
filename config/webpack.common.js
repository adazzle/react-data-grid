var path = require("path");
var webpack = require('webpack');
var release = false;
var path = require("path");
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;


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
  plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.DefinePlugin({'global': 'window'})
    ],
  postLoaders: [
  {
    test: /\.js$/,
    exclude: /node_modules|testData/,
    loader: 'jshint'
  }]
}


module.exports = config;
