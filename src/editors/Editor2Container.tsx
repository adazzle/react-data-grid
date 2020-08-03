import React from 'react';
import { createPortal } from 'react-dom';

import { Editor2Props } from '../types';
import { useClickOutside } from '../hooks';

export default function Editor2Container<R, SR>({
  row,
  column,
  onRowUpdate,
  editorPortalTarget,
  ...props
}: Editor2Props<R, SR>) {
  const onClickCapture = useClickOutside(() => onRowUpdate(row, true));
  if (column.editor2 === undefined) return null;

  const editor = (
    <div onClickCapture={onClickCapture}>
      <column.editor2
        row={row}
        column={column}
        onRowUpdate={onRowUpdate}
        editorPortalTarget={editorPortalTarget}
        {...props}
      />
    </div>
  );

  if (column.editorOptions?.createPortal) {
    return createPortal(editor, editorPortalTarget);
  }

  return editor;
}
