/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var ExcelColumn             = require('../grids/ExcelColumn');

var SimpleTextEditor = React.createClass({

  propTypes : {
    value : React.PropTypes.any.isRequired,
    onBlur : React.PropTypes.func,
    column :  React.PropTypes.shape(ExcelColumn).isRequired
  },

  getValue(): any{
    var updated = {};
    updated[this.props.column.key] = this.refs.input.getDOMNode().value;
    return updated;
  },

  getInputNode(): HTMLInputElement{
    return this.getDOMNode();
  },

  render(): ?ReactElement {
    return (<input ref="input" type="text" onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value}/>);
  }

});

module.exports = SimpleTextEditor;
