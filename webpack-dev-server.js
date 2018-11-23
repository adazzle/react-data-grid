const webpackCommon = require('./config/webpack.common.config');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const specificConfig =  {
  entry: {
    index: ['./packages/react-data-grid-examples/src']
  },
  output: {
    path: '/packages/react-data-grid-examples/src/',
    filename: '[name].js',
    library: ['ReactDataGrid'],
    libraryTarget: 'umd'
  },
  externals: {
    faker: 'faker'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

const config =  Object.assign({ }, webpackCommon, specificConfig);

config.entry.index.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  open: true,
  contentBase: 'packages/react-data-grid-examples/src'
});

server.listen(8080, () => {
  const open = require('open');
  open('http://localhost:8080/webpack-dev-server/');
});
