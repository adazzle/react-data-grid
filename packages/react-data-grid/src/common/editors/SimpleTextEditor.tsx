import React from 'react';
import { Column } from '../types';

interface Props {
  value: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  column: Column;
}

export default class SimpleTextEditor extends React.Component<Props> {
  input: HTMLInputElement | null = null;

  getInputNode() {
    return this.input!;
  }

  getValue() {
    return {
      [this.props.column.key]: this.input!.value
    };
  }

  setInputRef = (input: HTMLInputElement) => {
    this.input = input;
  };

  render() {
    return (
      <input
        ref={this.setInputRef}
        onBlur={this.props.onBlur}
        className="form-control"
        defaultValue={this.props.value}
      />
    );
  }
}
