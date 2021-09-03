'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function ({ config, mode }) {
  const isProd = mode === 'PRODUCTION';

  config.module.rules = [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: { cacheDirectory: !isProd }
        },
        {
          loader: '@linaria/webpack-loader',
          options: { preprocessor: 'none', sourceMap: !isProd }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-nested']
            }
          }
        }
      ]
    }
  ];

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
      ignoreOrder: true
    })
  );

  return config;
};
