var path = require("path");
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));
var RELEASE = argv.release;

var assign = require('object-assign')

var config = {
  entry: {
    'react-data-grid' : './src/index',
    'react-data-grid-with-addons' : './src/addons/index'
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    library: ["ReactDataGrid"],
    libraryTarget: "umd"
  },
  externals: {
    "react": {
      root : 'React',
      commonjs : 'react',
      commonjs2 : 'react',
      amd : 'react'
    },
    "react/addons": {
			root : 'React',
			commonjs : 'react',
			commonjs2 : 'react',
			amd : 'react'
		},
    "react-dom": {
			root : 'ReactDOM',
			commonjs : 'react-dom',
			commonjs2 : 'react-dom',
			amd : 'react-dom'
		},
    "moment" : "moment"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional[]=runtime'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
}

var prod = assign({}, config)

prod.output = assign({}, config.output, { filename: "[name].min.js"});
prod.plugins = prod.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: {
    warnings: false }
  })
])

module.exports = [config, prod]
