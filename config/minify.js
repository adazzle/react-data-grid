var webpack = require('webpack')
var config = require('./webpack')
var assign = require('object-assign')

config = assign({}, config)

config.output = assign({}, { filename: "[name].min.js"});
config.plugins = config.plugins.concat(new webpack.optimize.UglifyJsPlugin())

module.exports = config
