import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@linaria/core';

import { useLatestFunc } from './hooks';
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
  const frameRequestRef = useRef<number | undefined>();

  // We need to prevent the `useEffect` from cleaning up between re-renders,
  // as `onWindowCaptureMouseDown` might otherwise miss valid mousedown events.
  // To that end we instead access the latest props via useLatestFunc.
  const commitOnOutsideMouseDown = useLatestFunc(() => {
    onRowChange(row, true);
  });

  function cancelFrameRequest() {
    cancelAnimationFrame(frameRequestRef.current!);
  }

  useEffect(() => {
    function onWindowCaptureMouseDown() {
      frameRequestRef.current = requestAnimationFrame(commitOnOutsideMouseDown);
    }

    addEventListener('mousedown', onWindowCaptureMouseDown, { capture: true });

    return () => {
      removeEventListener('mousedown', onWindowCaptureMouseDown, { capture: true });
      cancelFrameRequest();
    };
  }, [commitOnOutsideMouseDown]);

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
      onMouseDownCapture={cancelFrameRequest}
    >
      {content}
    </div>
  );
}
