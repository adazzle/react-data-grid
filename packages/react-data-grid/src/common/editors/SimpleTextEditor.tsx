import React from 'react';
import { Editor, EditorProps } from '../types';

type Props<R> = Pick<EditorProps<R, string>, 'value' | 'column' | 'onBlur'>;

export default class SimpleTextEditor<R> extends React.Component<Props<R>> implements Editor<{ [key: string]: string }> {
  private readonly input = React.createRef<HTMLInputElement>();

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
        defaultValue={this.props.value}
        onBlur={this.props.onBlur}
      />
    );
  }
}
