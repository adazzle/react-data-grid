const webpackCommon = require('./webpack.common.config');

const config =  {
  entry: {
    'react-data-grid/dist/react-data-grid': ['./packages/react-data-grid/src'],
    'react-data-grid-addons/dist/react-data-grid-addons': ['./packages/react-data-grid-addons/src'],
    'react-data-grid/dist/react-data-grid.min': ['./packages/react-data-grid/src'],
    'react-data-grid-addons/dist/react-data-grid-addons.min': ['./packages/react-data-grid-addons/src'],
    'react-data-grid-examples/dist/shared': './packages/react-data-grid-examples/src/shared.js',
    'react-data-grid-examples/dist/examples': './packages/react-data-grid-examples/src/examples.js',
    'react-data-grid-examples/dist/index': './packages/react-data-grid-examples/src/index.js',
    'react-data-grid-examples/dist/documentation': './packages/react-data-grid-examples/src/documentation.js'
  },
  output: {
    path: './packages',
    filename: '[name].js',
    library: ['ReactDataGrid'],
    libraryTarget: 'umd'
  }
};

module.exports = Object.assign({ }, webpackCommon, config);
