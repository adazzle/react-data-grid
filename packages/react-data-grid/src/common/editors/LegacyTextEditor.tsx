import React from 'react';
import { Editor, EditorProps } from '../types';

type LegacyTextEditorProps = Pick<EditorProps<string>, 'value' | 'column' | 'onCommit'>;

export default class LegacyTextEditor extends React.Component<LegacyTextEditorProps> implements Editor<{ [key: string]: string }> {
  private readonly input = React.createRef<HTMLInputElement>();

  getInputNode() {
    return this.input.current;
  }

  getValue(): { [key: string]: string } {
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
        onBlur={() => this.props.onCommit()}
      />
    );
  }
}
