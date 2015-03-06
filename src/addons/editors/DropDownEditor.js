/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

var React                   = require('react/addons');
var cx                      = React.addons.classSet;

var DropDownEditor = React.createClass({

  propTypes : {
    options : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    value : React.PropTypes.string.isRequired,
    commit : React.PropTypes.func.isRequired
  },

  getStyle(): {width: string}{
    return {
      width : '100%'
    }
  },

  render(): ?ReactElement{
    return (
      <select ref="select" style={this.getStyle()} defaultValue={this.props.value} onChange={this.onChange} >
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

  getValue(): string{
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
    e.stopPropagation();
    e.preventDefault();
  }

});

module.exports = DropDownEditor;
