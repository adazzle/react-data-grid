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
    return (<input className="react-grid-CheckBox" type="checkbox" checked={this.props.value} onChange={this.handleChange} />);
  },

  handleChange(e: Event){
    this.props.column.onRowSelect(this.props.rowIdx)
  },

  shouldComponentUpdate(nextProps: any, nextState: any): boolean{
    return this.props.value != nextProps.value;
  }

});

module.exports = CheckBoxEditor;
