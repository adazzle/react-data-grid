import React, { useState } from 'react';

import { EditorContainerWrapperProps } from './EditorContainerWrapper';

type SharedEditorContainerProps<R, SR> = Pick<EditorContainerWrapperProps<R, SR>,
  | 'rowIdx'
  | 'column'
  | 'row'
  | 'onCommit'
  | 'onCommitCancel'
>;

interface EditorContainer2Props<R, SR> extends SharedEditorContainerProps<R, SR> {
  style?: React.CSSProperties;
}

export default function EditorContainer2<R, SR>({
  column,
  row,
  rowIdx,
  onCommit,
  onCommitCancel,
  style
}: EditorContainer2Props<R, SR>) {
  const [value, setValue] = useState<unknown>();

  const Editor = column.editor2!;

  function commit(): void {
    onCommit({
      cellKey: column.key,
      rowIdx,
      updated: value as never
    });
  }

  return (
    <div className="rdg-editor-container" style={style}>
      <Editor
        column={column}
        row={row}
        value={value}
        onChange={setValue}
        onCommit={commit}
        onCommitCancel={onCommitCancel}
      />
    </div>
  );
}
