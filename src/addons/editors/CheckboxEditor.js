/* @flow */
/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react');

var CheckboxEditor = React.createClass({

  PropTypes : {
    value : React.PropTypes.bool.isRequired,
    rowIdx : React.PropTypes.number.isRequired,
    column: React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      onCellChange: React.PropTypes.func.isRequired
    }).isRequired
  },

  render(): ? ReactElement {
    var formatter = <span> n/a </span>
    if (this.props.value != null ) {
      var checked = this.props.value;
      formatter = <input className="react-grid-CheckBox" type="checkbox" checked={checked} onClick={this.handleChange} />
    }
    return (formatter);
  },

  handleChange(e: Event){
    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, e);
  }
});

module.exports = CheckboxEditor;
