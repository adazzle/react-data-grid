// not including this
// it currently requires the whole of moment, which we dont want to take as a dependency
import ImageFormatter from './ImageFormatter';
const DropDownFormatter = require('./DropDownFormatter');

const Formatters = {
  ImageFormatter: ImageFormatter,
  DropDownFormatter: DropDownFormatter
};

module.exports = Formatters;
