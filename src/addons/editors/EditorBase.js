/* @flow */
'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ExcelColumn = require('../grids/ExcelColumn');

class EditorBase extends React.Component {

  getStyle(): {width: string} {
    return {
      width : '100%'
    }
  }

  getValue(): any {
    var updated = {};
    updated[this.props.column.key] = this.getInputNode().value;
    return updated;
  }

  getInputNode(): HTMLInputElement {
    var domNode = ReactDOM.findDOMNode(this);
    if (domNode.tagName === 'INPUT') {
      return domNode;
    }
    else {
      return domNode.querySelector('input:not([type=hidden])');
    }
  }

  focus() {
    var inputNode = this.getInputNode();

    if (typeof inputNode.focus === 'function')
      inputNode.focus();
  }
}

EditorBase.propTypes = {
  value : React.PropTypes.any,
  column :  React.PropTypes.shape(ExcelColumn).isRequired,
  onCommit : React.PropTypes.func.isRequired
}


module.exports = EditorBase;
