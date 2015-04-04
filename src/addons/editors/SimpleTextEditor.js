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
    return (<input type="text" className="form-control" defaultValue={this.props.value} />);
  }

};

module.exports = SimpleTextEditor;
