const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));
const RELEASE = argv.release;

var extractCSS = new ExtractTextPlugin('[name].css');

function getPlugins() {
  const nodeEnv = RELEASE ? '"production"' : '"development"';
  var pluginsBase =  [
    new webpack.DefinePlugin({'process.env.NODE_ENV': nodeEnv, 'global': 'window'}),
    extractCSS
  ];

  if (RELEASE) {
    pluginsBase.push(new webpack.optimize.DedupePlugin());
    pluginsBase.push(new webpack.optimize.OccurenceOrderPlugin());
    pluginsBase.push(new webpack.optimize.AggressiveMergingPlugin());
    pluginsBase.push(new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: { warnings: false }
    }));
  }
  return pluginsBase;
}

const config = {
  debug: !RELEASE,
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    },
    'react/addons': 'React',
    moment: 'moment'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: extractCSS.extract('style-loader', 'css-loader') }
    ]
  },
  plugins: getPlugins(),
  postLoaders: [
    {
      test: /\.js$/,
      exclude: /node_modules|testData/,
      loader: 'jshint'
    }]
};


module.exports = config;
