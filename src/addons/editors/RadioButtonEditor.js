/* @flow */
/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var RadioButtonEditor = React.createClass({

  PropTypes : {
    value : React.PropTypes.bool.isRequired,
    rowIdx : React.PropTypes.number.isRequired,
    column: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      onCellChange: React.PropTypes.func.isRequired
    }).isRequired
  },

  render(): ? ReactElement {
    var checked = this.props.value != null ? this.props.value : false;
    return (<input className="react-grid-radio-button radio" type="radio" checked={checked} onClick={this.handleChange} />);
  },

  handleChange(e: Event){
    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e);
  }
});

module.exports = RadioButtonEditor;
