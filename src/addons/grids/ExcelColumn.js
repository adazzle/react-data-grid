/* @flow */
const React = require('react');

const ExcelColumnShape = {
  name: React.PropTypes.string.isRequired,
  key: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired
};

module.exports = ExcelColumnShape;
