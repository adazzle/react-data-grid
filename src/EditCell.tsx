import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useLatestFunc } from './hooks';
import { getCellStyle, getCellClassname } from './utils';
import type { CellRendererProps, EditorProps } from './types';
import { viewportCellClassname, editCellClassname } from './style';

/*
 * To check for outside `mousedown` events, we listen to all `mousedown` events at their birth,
 * i.e. on the window during the capture phase, and at their death, i.e. on the window during the bubble phase.
 *
 * We schedule a check at the birth of the event, cancel the check when the event reaches the "inside" container,
 * and trigger the "outside" callback when the event bubbles back up to the window.
 *
 * The event can be `stopPropagation()`ed halfway through, so they may not always bubble back up to the window,
 * so an alternative check must be used. The check must happen after the event can reach the "inside" container,
 * and not before it run to completion. `requestAnimationFrame` is the best way we know how to achieve this.
 * Usually we want click event handlers from parent components to access the latest commited values,
 * so `mousedown` is used instead of `click`.
 *
 * We must also rely on React's event capturing/bubbling to handle elements rendered in a portal.
 */

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'colSpan'>;

interface EditCellProps<R, SR> extends EditorProps<R, SR>, SharedCellRendererProps<R, SR> {
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, isEditorPortalEvent: boolean) => void;
}

export default function EditCell<R, SR>({
  column,
  colSpan,
  row,
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
    viewportCellClassname,
    'rdg-editor-container',
    !column.editorOptions?.createPortal && editCellClassname,
    typeof cellClass === 'function' ? cellClass(row) : cellClass
  );

  let content;
  if (column.editor != null) {
    content = (
      <column.editor
        column={column}
        row={row}
        onRowChange={onRowChange}
        onClose={onClose}
        editorPortalTarget={editorPortalTarget}
      />
    );

    if (column.editorOptions?.createPortal) {
      content = (
        <>
          {createPortal(content, editorPortalTarget)}
          <column.formatter column={column} row={row} isCellSelected onRowChange={onRowChange} />
        </>
      );
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown(event, true);
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-colspan={colSpan}
      aria-selected
      className={className}
      style={getCellStyle(column, colSpan)}
      onKeyDown={column.editorOptions?.createPortal ? handleKeyDown : undefined}
      onMouseDownCapture={cancelFrameRequest}
    >
      {content}
    </div>
  );
}
