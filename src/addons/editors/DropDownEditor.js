/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React      = require('react');
var EditorBase = require('./EditorBase');

class DropDownEditor extends EditorBase{

  render(): ?ReactElement{
    return (
      <select ref="select" style={{width:'100%'}} defaultValue={this.props.value} onChange={this.props.onCommit} onClick={this.onClick} >
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

  getInputNode(): HTMLInputElement{
    return this.refs.select.getDOMNode();
  }

  onClick(e: Event){
    e.stopPropagation();
    e.preventDefault();
  }

};


DropDownEditor.propTypes = {
    options : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
}

module.exports = DropDownEditor;
