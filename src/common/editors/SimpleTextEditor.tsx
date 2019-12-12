import React from 'react';
import { Editor, EditorProps } from '../types';

type Props = Pick<EditorProps<string>, 'value' | 'column' | 'onBlur'>;

export default class SimpleTextEditor extends React.Component<Props> implements Editor<{ [key: string]: string }> {
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
        className="rdg-text-editor"
        ref={this.input}
        defaultValue={this.props.value}
        onBlur={this.props.onBlur}
      />
    );
  }
}
