/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var ExcelColumn             = require('../grids/ExcelColumn');

class Editor extends React.Component {

  getValue(): any{
    var updated = {};
    updated[this.props.column.key] = this.refs.input.getDOMNode().value;
    return updated;
  }

  getInputNode(): HTMLInputElement{
    return this.getDOMNode();
  }

}

Editor.propTypes = {
  onKeyDown : React.PropTypes.func.isRequired,
  value : React.PropTypes.any.isRequired,
  onBlur : React.PropTypes.func.isRequired,
  column :  React.PropTypes.shape(ExcelColumn).isRequired
}



class SimpleTextEditor extends Editor{

  render(): ?ReactElement {
    return (<input ref="input" type="text" onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value} onKeyDown={this.props.onKeyDown} />);
  }

};

module.exports = SimpleTextEditor;
