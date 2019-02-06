const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const RELEASE = argv.release;

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

const config = {
  mode: RELEASE ? 'production' : 'development',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.min\.css$/g
      })
    ]
  },
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: ['> 1%', 'last 2 versions']
              },
              useBuiltIns: 'entry'
            }],
            '@babel/react'
          ],
          plugins: [
            ['transform-react-remove-prop-types', {
              mode: 'wrap',
              ignoreFilenames: ['node_modules']
            }],
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-property-literals',
            '@babel/plugin-transform-member-expression-literals',
            '@babel/plugin-transform-runtime'
          ],
          sourceType: 'unambiguous'
        }
      },
      {
        test: /\.css$/,
        use: [
          RELEASE ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: RELEASE ? 'production' : 'development',
      DEBUG: !RELEASE
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    alias: {
      common: path.resolve('packages/common/')
    }
  }
};

module.exports = config;
