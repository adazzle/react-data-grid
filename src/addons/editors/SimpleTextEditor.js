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
    return (<input ref="input" type="text" onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value} onKeyDown={this.props.onKeyDown} />);
  }

};

module.exports = SimpleTextEditor;
