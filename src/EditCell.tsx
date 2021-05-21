import { createPortal } from 'react-dom';
import { css } from '@linaria/core';

import { useMouseDownOutside } from './hooks';
import { getCellStyle, getCellClassname } from './utils';
import type { CellRendererProps, SharedEditorProps } from './types';

const cellEditing = css`
  padding: 0;
`;

// TODO: remove 1 of the two classes
const cellEditingClassname = `rdg-cell-editing rdg-editor-container ${cellEditing}`;

type SharedCellRendererProps<R, SR> = Pick<
  CellRendererProps<R, SR>,
  'rowIdx' | 'row' | 'column' | 'colSpan'
>;

interface EditCellProps<R, SR> extends SharedCellRendererProps<R, SR> {
  editorProps: SharedEditorProps<R>;
  onKeyDown: Required<React.HTMLAttributes<HTMLDivElement>>['onKeyDown'];
}

export default function EditCell<R, SR>({
  column,
  colSpan,
  row,
  rowIdx,
  onKeyDown,
  editorProps
}: EditCellProps<R, SR>) {
  const onMouseDownCapture = useMouseDownOutside(() => editorProps.onRowChange(row, true));

  const { cellClass } = column;
  const className = getCellClassname(
    column,
    cellEditingClassname,
    typeof cellClass === 'function' ? cellClass(row) : cellClass
  );

  let content;
  if (column.editor != null) {
    content = <column.editor {...editorProps} rowIdx={rowIdx} column={column} />;

    if (column.editorOptions?.createPortal) {
      content = createPortal(content, editorProps.editorPortalTarget);
    }
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected
      className={className}
      style={getCellStyle(column, colSpan)}
      onKeyDown={onKeyDown}
      onMouseDownCapture={onMouseDownCapture}
    >
      {content}
    </div>
  );
}
