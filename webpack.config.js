const webpackCommon = require('./config/webpack.common.config');

const config =  {
  entry: {
    'index': ['./packages/react-data-grid-examples/src/index.js'],
    'shared': './packages/react-data-grid-examples/src/shared.js',
    'examples': './packages/react-data-grid-examples/src/examples.js'
  },
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
