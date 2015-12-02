/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var ExcelColumn             = require('../grids/ExcelColumn');
var EditorBase              = require('./EditorBase');


class SimpleTextEditor extends EditorBase {

  render(): ?ReactElement {
    return (<textarea rows="1" ref="input" style={{resize:'none'}} onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value} />);
  }

};

module.exports = SimpleTextEditor;
