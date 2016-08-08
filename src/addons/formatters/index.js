/* @flow */
// not including this
// it currently requires the whole of moment, which we dont want to take as a dependency
const ImageFormatter = require('./ImageFormatter');

const Formatters = {
  ImageFormatter: ImageFormatter
};

module.exports = Formatters;
