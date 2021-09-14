import { resolve } from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

// TODO: remove `target` https://github.com/storybookjs/storybook/issues/15882
const target = 'browserslist:browserslist config, not maintained node versions';

export default (env, { mode }) => {
  const isDev = mode === 'development';

  return {
    target,
    entry: './website/root.tsx',

    output: {
      clean: true,
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: isDev ? '[name].js' : '[contenthash].js'
    },

    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',

    devServer: {
      open: true,
      client: {
        overlay: false
      },
      static: false
    },

    stats: {
      assets: false,
      entrypoints: false,
      modules: false
    },

    performance: {
      hints: false
    },

    resolve: {
      alias: {
        lodash: resolve('./node_modules/lodash-es')
      },
      extensions: ['.js', '.ts', '.tsx']
    },

    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimizer: ['...', new CssMinimizerPlugin()]
    },

    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { plugins: [isDev && 'react-refresh/babel'].filter(Boolean) }
            },
            {
              loader: '@linaria/webpack5-loader',
              options: { preprocessor: 'none' }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './website/index.html'
      }),
      isDev && new ReactRefreshWebpackPlugin({ overlay: false }),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: '[contenthash].css',
          chunkFilename: '[contenthash].css',
          ignoreOrder: true
        })
    ].filter(Boolean)
  };
};
