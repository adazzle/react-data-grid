const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const open = require('open');
const webpackCommon = require('./config/webpack.common.config');

const config = {
  ...webpackCommon,
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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
    ]
  },
  resolve: {
    symlinks: false
  },
  externals: {},
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: 'examples'
});

server.listen(8080, 'localhost', () => {
  open('http://localhost:8080/webpack-dev-server/');
});
