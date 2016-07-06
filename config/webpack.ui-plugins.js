var path = require("path");
var commonConfig = require('./webpack.common');
var webpack = require('webpack');
Object.assign = Object.assign || require('object-assign');

var config = Object.assign({}, commonConfig, {
  entry: {
    'react-data-grid.ui-plugins': './src/addons/index'
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    library: ["ReactDataGrid"],
    libraryTarget: "umd"
  }
});


module.exports = config;
