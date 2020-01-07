import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const RELEASE = process.argv.slice(2).includes('--release');

const compiler = webpack({
  mode: RELEASE ? 'production' : 'development',
  devtool: 'eval-source-map',
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      './examples',
      './style/react-data-grid.less'
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }, {
          loader: 'ts-loader',
          options: { onlyCompileBundledFiles: true }
        }]
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
  }
});

const server = new WebpackDevServer(compiler, {
  hot: true,
  open: true,
  contentBase: 'examples'
});

server.listen(8080, 'localhost');
