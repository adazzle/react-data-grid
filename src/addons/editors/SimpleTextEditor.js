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
        onBlur={this.props.onBlur}
        className="form-control"
        defaultValue={this.props.value}
      />
    );
  }

}

module.exports = SimpleTextEditor;
