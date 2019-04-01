import React from 'react';
import PropTypes from 'prop-types';

import Column from '../prop-shapes/Column';

export default class SimpleTextEditor extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onBlur: PropTypes.func.isRequired,
    column: PropTypes.shape(Column).isRequired
  };

  getInputNode() {
    return this.input;
  }

  getValue() {
    return {
      [this.props.column.key]: this.input.value
    };
  }

  setInputRef = (input) => {
    this.input = input;
  };

  render() {
    return (
      <input
        ref={this.setInputRef}
        type="text"
        onBlur={this.props.onBlur}
        className="form-control"
        defaultValue={this.props.value}
      />
    );
  }
}
