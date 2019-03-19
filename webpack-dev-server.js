const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const open = require('opn');
const webpackCommon = require('./config/webpack.common.config');

const config = {
  ...webpackCommon,
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      './packages/react-data-grid-examples/src'
    ]
  },
  resolve: {
    symlinks: false
  },
  externals: {
    faker: 'faker'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: 'packages/react-data-grid-examples/src'
});

server.listen(8080, 'localhost', () => {
  open('http://localhost:8080/webpack-dev-server/');
});
