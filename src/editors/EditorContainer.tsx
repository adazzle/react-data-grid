import { createPortal } from 'react-dom';
import { css } from '@linaria/core';

import type { EditorProps } from '../types';
import { useMouseDownOutside } from '../hooks';

const editorContainer = css`
  display: contents;
`;

const editorContainerClassname = `rdg-editor-container ${editorContainer}`;

export default function EditorContainer<R, SR>({
  row,
  column,
  onRowChange,
  ...props
}: EditorProps<R, SR>) {
  const onMouseDownCapture = useMouseDownOutside(() => onRowChange(row, true));
  if (column.editor == null) return null;

  const editor = (
    <div className={editorContainerClassname} onMouseDownCapture={onMouseDownCapture}>
      <column.editor row={row} column={column} onRowChange={onRowChange} {...props} />
    </div>
  );

  if (column.editorOptions?.createPortal) {
    return createPortal(editor, props.editorPortalTarget);
  }

  return editor;
}
