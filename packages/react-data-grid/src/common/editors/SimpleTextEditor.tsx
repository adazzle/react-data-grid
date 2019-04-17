import React from 'react';
import { Column, Editor } from '../types';

interface Props {
  value: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  column: Column;
}

export default class SimpleTextEditor extends React.Component<Props> implements Editor {
  input = React.createRef<HTMLInputElement>();

  getInputNode() {
    return this.input.current;
  }

  getValue() {
    return {
      [this.props.column.key]: this.input.current!.value
    };
  }

  render() {
    return (
      <input
        className="form-control"
        ref={this.input}
        onBlur={this.props.onBlur}
        defaultValue={this.props.value}
      />
    );
  }
}
