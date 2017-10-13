/* @flow */
const PropTypes = require('prop-types');

const ExcelColumnShape = {
  name: PropTypes.node.isRequired,
  key: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  filterable: PropTypes.bool
};

module.exports = ExcelColumnShape;
