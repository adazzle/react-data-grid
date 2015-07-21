var path = require("path");
var webpack = require('webpack');
var release = false;
var path = require("path");

module.exports = {
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
    "moment" : "moment"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional[]=runtime'
      } 
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  postLoaders: [
  {
    test: /\.js$/,
    exclude: /node_modules|testData/,
    loader: 'jshint'
  }]
}
