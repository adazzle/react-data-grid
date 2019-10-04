'use strict';

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');

const RELEASE = process.argv.slice(2).includes('--release');

const config = {
  mode: RELEASE ? 'production' : 'development',
  devtool: 'eval-source-map',
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      './examples',
      './packages/react-data-grid/style/react-data-grid.less',
      './packages/react-data-grid-addons/style/react-data-grid-addons.less',
      './packages/react-data-grid-addons/node_modules/react-select/dist/react-select.css'
    ]
  },
  resolve: {
    symlinks: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ],
    strictExportPresence: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
            // https://github.com/terser-js/terser/issues/308
            keep_fnames: true
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        }
      })
    ]
  }
};

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  open: true,
  contentBase: 'examples'
});

server.listen(8080, 'localhost');
