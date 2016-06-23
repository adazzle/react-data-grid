var path = require("path");
var webpack = require('webpack');
var commonConfig = require('./webpack.common');
Object.assign = Object.assign || require('object-assign');

var config = Object.assign({}, commonConfig, {
  entry: {
    'react-data-grid': './src/index'
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    library: ["ReactDataGrid"],
    libraryTarget: "umd"
  },
  externals: {
    "react": {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    "react-dom": {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  }
}
);


module.exports = config;
