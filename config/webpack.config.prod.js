const webpackCommon = require('./webpack.common.config');
const path = require('path');

const config =  {
  entry: {
    'react-data-grid/dist/react-data-grid': [path.resolve('packages/react-data-grid/src')],
    'react-data-grid-addons/dist/react-data-grid-addons': [path.resolve('packages/react-data-grid-addons/src')],
    'react-data-grid/dist/react-data-grid.min': [path.resolve('packages/react-data-grid/src')],
    'react-data-grid-addons/dist/react-data-grid-addons.min': [path.resolve('packages/react-data-grid-addons/src')],
    'react-data-grid-examples/dist/index': [path.resolve('packages/react-data-grid-examples/src')]
  },
  output: {
    path: path.resolve('packages'),
    filename: '[name].js',
    library: ['ReactDataGrid'],
    libraryTarget: 'umd'
  }
};

module.exports = Object.assign({ }, webpackCommon, config);
