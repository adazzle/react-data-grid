import { createPortal } from 'react-dom';
import { css } from '@linaria/core';

import { useMouseDownOutside } from './hooks';
import { getCellStyle, getCellClassname } from './utils';
import type { CellRendererProps, EditorProps } from './types';

const cellEditing = css`
  padding: 0;
`;

const cellEditingClassname = `rdg-editor-container ${cellEditing}`;

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'colSpan'>;

interface EditCellProps<R, SR> extends EditorProps<R, SR>, SharedCellRendererProps<R, SR> {
  onKeyDown: Required<React.HTMLAttributes<HTMLDivElement>>['onKeyDown'];
}

export default function EditCell<R, SR>({
  column,
  colSpan,
  row,
  rowIdx,
  onRowChange,
  onClose,
  onKeyDown,
  editorPortalTarget
}: EditCellProps<R, SR>) {
  const onMouseDownCapture = useMouseDownOutside(() => onRowChange(row, true));

  const { cellClass } = column;
  const className = getCellClassname(
    column,
    cellEditingClassname,
    typeof cellClass === 'function' ? cellClass(row) : cellClass
  );

  let content;
  if (column.editor != null) {
    content = (
      <column.editor
        column={column}
        row={row}
        rowIdx={rowIdx}
        onRowChange={onRowChange}
        onClose={onClose}
        editorPortalTarget={editorPortalTarget}
      />
    );

    if (column.editorOptions?.createPortal) {
      content = createPortal(content, editorPortalTarget);
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
