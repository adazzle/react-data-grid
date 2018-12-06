const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const RELEASE = argv.release;

const config = {
  mode: RELEASE ? 'production' : 'development',
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
    moment: 'moment',
    immutable: {
      root: 'Immutable',
      commonjs: 'immutable',
      commonjs2: 'immutable'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      common: path.resolve('packages/common/')
    }
  }
};


module.exports = config;
