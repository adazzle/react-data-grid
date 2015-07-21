/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var keyboardHandlerMixin    = require('../../KeyboardHandlerMixin');
var ExcelColumn             = require('../grids/ExcelColumn');

class EditorBase extends React.Component {

  getStyle(): {width: string}{
    return {
      width : '100%'
    }
  }

  getValue(): any{
    var updated = {};
    updated[this.props.column.key] = this.getInputNode().value;
    return updated;
  }

  getInputNode(): HTMLInputElement{
    var domNode = React.findDOMNode(this);
    if(domNode.tagName === 'INPUT'){
      return domNode;
    }else{
      return domNode.querySelector("input:not([type=hidden])");
    }
  }

  inheritContainerStyles(): boolean{
    return true;
  }

}

EditorBase.propTypes = {
  onKeyDown : React.PropTypes.func.isRequired,
  value : React.PropTypes.any.isRequired,
  onBlur : React.PropTypes.func.isRequired,
  column :  React.PropTypes.shape(ExcelColumn).isRequired,
  commit : React.PropTypes.func.isRequired
}


module.exports = EditorBase;
