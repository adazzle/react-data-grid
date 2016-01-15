/* @flow */
var React = require('react');

var ExcelColumnShape = {
  name: React.PropTypes.string,
  key: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired,
  width: React.PropTypes.number.isRequired
}

module.exports = ExcelColumnShape;
