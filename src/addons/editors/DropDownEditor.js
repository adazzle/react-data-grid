/* @flow */
/**
 * @jsx React.DOM
 */

const React = require('react');
const EditorBase = require('./EditorBase');

class DropDownEditor extends EditorBase {

  getInputNode(): HTMLInputElement {
    return React.findDOMNode(this);
  }

  onClick() {
    this.getInputNode().focus();
  }

  onDoubleClick() {
    this.getInputNode().focus();
  }

  render(): ?ReactElement {
    return (
      <select style={this.getStyle()} defaultValue={this.props.value} onBlur={this.props.onBlur} onChange={this.onChange} >
        {this.renderOptions()}
      </select>);
  }

  renderOptions(): Array<ReactElement> {
    let options = [];
    this.props.options.forEach(function(name) {
      options.push(<option key={name} value={name}  >{name}</option>);
    }, this);
    return options;
  }
}

DropDownEditor.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

module.exports = DropDownEditor;
