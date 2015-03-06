/* @flow */
//not including this
//it currently requires the whole of moment, which we dont want to take as a dependency
var ImageFormatter = require('./ImageFormatter');

var Formatters = {
  ImageFormatter : ImageFormatter
}

module.exports = Formatters;
