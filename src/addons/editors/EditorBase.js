/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var ExcelColumn             = require('../grids/ExcelColumn');

class EditorBase extends React.Component {

  getValue(): any{
    var updated = {};
    updated[this.props.column.key] = this.getInputNode().value;
    return updated;
  }

  getInputNode(): HTMLInputElement{
    return React.findDOMNode(this);
  }

}

EditorBase.propTypes = {
  onKeyDown : React.PropTypes.func.isRequired,
  value : React.PropTypes.any.isRequired,
  onBlur : React.PropTypes.func.isRequired,
  column :  React.PropTypes.shape(ExcelColumn).isRequired
}


module.exports = EditorBase;
