const React                   = require('react');
const EditorBase              = require('./EditorBase');


class SimpleTextEditor extends EditorBase {
  setInputRef = (input) => {
    this.input = input;
  };

  render() {
    return (<input ref={this.setInputRef} type="text" onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value} />);
  }
}

module.exports = SimpleTextEditor;
