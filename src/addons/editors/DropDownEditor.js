/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React = require('react');
var EditorBase = require('./EditorBase');

class DropDownEditor extends EditorBase {

  getInputNode(): HTMLInputElement{
    return React.findDOMNode(this);
  }

  onClick(e: Event){
    this.getInputNode().focus();
  }

  onDoubleClick(e: Event){
    this.getInputNode().focus();
  }

  render(): ?ReactElement{
    return (
      <select style={this.getStyle()} defaultValue={this.props.value} onChange={this.onChange} >
        {this.renderOptions()}
      </select>);
  }

  renderOptions(): Array<ReactElement>{
    var options = [];
    this.props.options.forEach(function(name){
      options.push(<option key={name} value={name}  >{name}</option>);
    }, this);
    return options;
  }

};


DropDownEditor.propTypes = {
    options : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
}

module.exports = DropDownEditor;
