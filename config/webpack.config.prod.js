const webpackCommon = require('./webpack.common.config');

const config =  {
  entry: {
    'react-data-grid/dist/react-data-grid': ['./packages/react-data-grid/src'],
    'react-data-grid-addons/dist/react-data-grid-addons': ['./packages/react-data-grid-addons/src'],
    'react-data-grid/dist/react-data-grid.min': ['./packages/react-data-grid/src'],
    'react-data-grid-addons/dist/react-data-grid-addons.min': ['./packages/react-data-grid-addons/src'],
    'react-data-grid-examples/dist/index': './packages/react-data-grid-examples/src'
  },
  output: {
    path: './packages',
    filename: '[name].js',
    library: ['ReactDataGrid'],
    libraryTarget: 'umd'
  }
};

module.exports = Object.assign({ }, webpackCommon, config);
