const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const RELEASE = argv.release;

const config = {
  mode: RELEASE ? 'production' : 'development',
  externals: {
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
