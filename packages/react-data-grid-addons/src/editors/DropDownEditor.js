const React = require('react');
import PropTypes from 'prop-types';
import { EditorBase } from 'common/editors';
import ReactDOM from 'react-dom';

class DropDownEditor extends EditorBase {

  getInputNode() {
    return ReactDOM.findDOMNode(this);
  }

  onClick() {
    this.getInputNode().focus();
  }

  onDoubleClick() {
    this.getInputNode().focus();
  }

  render() {
    return (
      <select style={this.getStyle()} defaultValue={this.props.value} onBlur={this.props.onBlur} onChange={this.onChange} >
        {this.renderOptions()}
      </select>);
  }

  renderOptions() {
    let options = [];
    this.props.options.forEach(function(name) {
      if (typeof(name) === 'string') {
        options.push(<option key={name} value={name}>{name}</option>);
      } else {
        options.push(<option key={name.id} value={name.value} title={name.title}  >{name.text || name.value}</option>);
      }
    }, this);
    return options;
  }
}

DropDownEditor.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.string,
      text: PropTypes.string
    })
  ])).isRequired
};

module.exports = DropDownEditor;
