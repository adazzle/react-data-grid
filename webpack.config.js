var webpack = require('webpack');

module.exports =  {
  debug: true,
  entry: {
    'react-data-grid': './packages/react-data-grid/src',
    'react-data-grid.ui-plugins': './packages/react-data-grid-addons/src/',
    'index': './examples/index.js',
    'shared': './examples/shared.js',
    'examples': './examples/examples.js',
    // 'documentation': './examples/documentation.js'
  },
  output: {
    path: "./examples/build",
    filename: "[name].js",
    libraryTarget: "umd"
  },
  resolve: {
    alias: {
      react: './node_modules/react',
      'react-dom': './node_modules/react-dom'
    }
  },
  externals: {
    "react": 'React',
    "react/addons": 'React',
    "react-dom": 'ReactDOM',
    'faker': 'faker',
    "moment": "moment"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"', 'global': 'window'})
  ]
};
