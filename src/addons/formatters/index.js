/* @flow */
// not including this
// it currently requires the whole of moment, which we dont want to take as a dependency
const ImageFormatter = require('./ImageFormatter');
const CellCheckboxFormatter = require('./CellCheckboxFormatter');

const Formatters = {
  ImageFormatter: ImageFormatter,
  CellCheckboxFormatter: CellCheckboxFormatter
};

module.exports = Formatters;
