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
      onRowSelect: React.PropTypes.func.isRequired
    }).isRequired
  },

  render(): ? ReactElement {
    var checked = this.props.value != null ? this.props.value : false;
    return (<input className="react-grid-CheckBox" type="checkbox" checked={checked} onClick={this.handleChange} />);
  },

  handleChange(e: Event){
    this.props.column.onRowSelect(this.props.rowIdx, e);
  }
});

module.exports = CheckboxEditor;
