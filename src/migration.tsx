import React, { useRef } from 'react';
import { EditorProps, OldEditorProps, Editor } from './types';

/** @deprecated */
export function wrapOldEditor<TRow, TSummaryRow = unknown>(
  EditorComponent: React.ComponentType<OldEditorProps<TRow[keyof TRow], TRow, TSummaryRow>>
): React.ComponentType<EditorProps<TRow, TSummaryRow>> {
  return ({
    column,
    row,
    // rowIdx,
    rowHeight,
    // top,
    // left,
    // editorPortalTarget,
    onRowChange,
    onClose
  }) => {
    // @ts-expect-error
    const value = props.row[props.column.key];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<Editor<any>>(null);

    function onCommit() {
      onRowChange(editorRef.current!.getValue()[column.key], true);
    }

    function onCommitCancel() {
      onClose(false);
    }

    function onOverrideKeyDown() {
      // TODO? leave it as noop?
    }

    return (
      <EditorComponent
        ref={editorRef}
        column={column}
        row={row}
        height={rowHeight}
        value={value}
        onCommit={onCommit}
        onCommitCancel={onCommitCancel}
        onOverrideKeyDown={onOverrideKeyDown}
      />
    );
  };
}
