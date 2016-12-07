const webpack = require('webpack');

module.exports =  {
  debug: true,
  entry: {
    'react-data-grid': ['./packages/react-data-grid/'],
    'react-data-grid-addons': ['./packages/react-data-grid-addons/'],
    index: ['./packages/examples/src'],
    shared: './packages/examples/src/shared.js',
    examples: './packages/examples/src/examples.js'
    // 'documentation': './examples/documentation.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    library: ['ReactDataGrid'],
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      react: './node_modules/react',
      'react-dom': './node_modules/react-dom'
    }
  },
  externals: {
    react: 'React',
    'react/addons': 'React',
    'react-dom': 'ReactDOM',
    faker: 'faker',
    moment: 'moment'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"', 'global': 'window'})
  ]
};
