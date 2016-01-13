/* @flow */
'use strict';

var React                   = require('react');
var EditorBase              = require('./EditorBase');


class SimpleTextEditor extends EditorBase {

  render(): ?ReactElement {
    return (
      <input
        ref="input"
        type="text"
        className="form-control"
        onBlur={this.props.onCommit}
        defaultValue={this.props.value}
      />
    );
  }

}

module.exports = SimpleTextEditor;
