/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react');
var ExcelColumn             = require('../grids/ExcelColumn');

var DropDownEditor = React.createClass({

  propTypes : {
    options : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    value : React.PropTypes.string.isRequired,
    onCommit : React.PropTypes.func.isRequired,
    column : React.PropTypes.shape(ExcelColumn).isRequired
  },

  getStyle(): {width: string}{
    return {
      width : '100%'
    }
  },

  render(): ?ReactElement{
    return (
      <select ref="select" style={this.getStyle()} defaultValue={this.props.value} onChange={this.onChange} onClick={this.onClick} onDoubleClick={this.onDoubleClick} >
        {this.renderOptions()}
      </select>);
  },

  renderOptions(): Array<ReactElement>{
    var options = [];
    this.props.options.forEach(function(name){
      options.push(<option key={name} value={name}  >{name}</option>);
    }, this);
    return options;
  },

  getValue(): Object{
    var updated = {};
    updated[this.props.column.key] = this.refs.select.getDOMNode().value;
    return updated;
  },

  getInputNode(): HTMLInputElement{
    return this.refs.select.getDOMNode();
  },

  onChange(){
    this.props.onCommit({key : 'Enter'});
  },

  onClick(e: Event){
    this.getInputNode().focus();
  },

  onDoubleClick(e: Event){
    this.getInputNode().focus();
  }

});

module.exports = DropDownEditor;
