const React                   = require('react');
const EditorBase              = require('./EditorBase');


class SimpleTextEditor extends EditorBase {

  render(): ?ReactElement {
    return (<input ref={(node) => this.input = node} type="text" onBlur={this.props.onBlur} className="form-control" defaultValue={this.props.value} />);
  }
}

module.exports = SimpleTextEditor;
