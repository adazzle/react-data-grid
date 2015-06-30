/* @flow */
/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react');

var CheckBoxEditor = React.createClass({


  PropTypes : {
    value : React.PropTypes.bool.isRequired,
    rowIdx : React.PropTypes.number.isRequired
  },

  render(): ?ReactElement{
    var checked = this.props.value != null ? this.props.value : false;
    return (<input className="react-grid-CheckBox" type="checkbox" checked={checked} onClick={this.handleChange} />);
  },

  handleChange(e: Event){
    e.stopPropagation();
    this.props.column.onRowSelect(this.props.rowIdx)
  }
});

module.exports = CheckBoxEditor;
