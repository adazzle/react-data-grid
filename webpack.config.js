const webpackCommon = require('./config/webpack.common.config');
const webpack = require('webpack');

const config =  {
  entry: {   
    'index': ['./packages/react-data-grid-examples/src/index.js'],
    'shared': './packages/react-data-grid-examples/src/shared.js',
    'examples': './packages/react-data-grid-examples/src/examples.js'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"webpack-dev-server"', 'global': 'window'})
  ],
  output: {
    path: './',
    filename: '[name].js',
    library: ['ReactDataGrid'],
    libraryTarget: 'umd'
  },
  externals: {
    react: 'React',
    'react/addons': 'React',
    'react-dom': 'ReactDOM',
    faker: 'faker',
    moment: 'moment'
  }
};

module.exports = Object.assign({ }, webpackCommon, config);
