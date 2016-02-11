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
      <select style={this.getStyle()} defaultValue={this.props.value} onBlur={this.props.onBlur} onChange={this.onChange} >
        {this.renderOptions()}
      </select>);
  }

  renderOptions(): Array<ReactElement>{
    var options = [];
    this.props.options.forEach(function(name){
      if (typeof(name)==='string'){
        options.push(<option key={name} value={name}  >{name}</option>);
      }
      else {
        options.push(<option key={name.id} value={name.value} title={name.title}  >{name.value}</option>);
      }
    }, this);
    return options;
  }

};


DropDownEditor.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.objectOf({ id: React.PropTypes.string, title: React.PropTypes.string, meta: React.PropTypes.string })])).isRequired;
}

module.exports = DropDownEditor;
