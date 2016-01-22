var path = require("path");
var webpack = require('webpack');
var release = false;
var path = require("path");
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;


var config = {
  entry: {
    'react-data-grid' : './src/index',
    'react-data-grid-with-addons' : './src/addons/index'
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    library: ["ReactDataGrid"],
    libraryTarget: "umd"
  },
  externals: {
    "react": {
      root : 'React',
      commonjs : 'react',
      commonjs2 : 'react',
      amd : 'react'
    },
    "react/addons": {
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
  postLoaders: [
  {
    test: /\.js$/,
    exclude: /node_modules|testData/,
    loader: 'jshint'
  }]
}


module.exports = config;
