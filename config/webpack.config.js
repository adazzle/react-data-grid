var path = require("path");
var webpack = require('webpack');
var release = false;
var path = require("path");

module.exports = {
  entry: {
    'ReactGrid' : './src/index',
    'ReactGridWithAddons' : './src/addons/index'
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    library: ["ReactGrid"],
    libraryTarget: "umd"
  },
  externals: {
    "react/addons": {
      root : 'React',
      commonjs : 'react/addons',
      commonjs2 : 'react/addons',
      amd : 'react/addons'
    },
    "react": {
      root : 'React',
      commonjs : 'react/addons',
      commonjs2 : 'react/addons',
      amd : 'react/addons'
    },
    "moment" : "moment"
  },
  module: {
    loaders: [
    { test: /\.js$/, loader: 'jsx-loader?stripTypes&harmony' } // loaders can take parameters as a querystring
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
