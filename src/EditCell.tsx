import { useEffect, useRef } from 'react';
import { css } from '@linaria/core';

import { useLatestFunc } from './hooks';
import { getCellStyle, getCellClassname, onEditorNavigation } from './utils';
import type { CellRendererProps, EditorProps, Omit } from './types';

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

const cellEditing = css`
  @layer rdg.EditCell {
    padding: 0;
  }
`;

type SharedCellRendererProps<R, SR> = Pick<CellRendererProps<R, SR>, 'colSpan'>;

interface EditCellProps<R, SR>
  extends Omit<EditorProps<R, SR>, 'onClose'>,
    SharedCellRendererProps<R, SR> {
  closeEditor: () => void;
}

export default function EditCell<R, SR>({
  column,
  colSpan,
  row,
  onRowChange,
  closeEditor
}: EditCellProps<R, SR>) {
  const frameRequestRef = useRef<number | undefined>();
  const commitOnOutsideClick = column.editorOptions?.commitOnOutsideClick !== false;

  // We need to prevent the `useEffect` from cleaning up between re-renders,
  // as `onWindowCaptureMouseDown` might otherwise miss valid mousedown events.
  // To that end we instead access the latest props via useLatestFunc.
  const commitOnOutsideMouseDown = useLatestFunc(() => {
    onClose(true);
  });

  useEffect(() => {
    if (!commitOnOutsideClick) return;

    function onWindowCaptureMouseDown() {
      frameRequestRef.current = requestAnimationFrame(commitOnOutsideMouseDown);
    }

    addEventListener('mousedown', onWindowCaptureMouseDown, { capture: true });

    return () => {
      removeEventListener('mousedown', onWindowCaptureMouseDown, { capture: true });
      cancelFrameRequest();
    };
  }, [commitOnOutsideClick, commitOnOutsideMouseDown]);

  function cancelFrameRequest() {
    cancelAnimationFrame(frameRequestRef.current!);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      // Discard changes
      onClose();
    } else if (event.key === 'Enter') {
      event.stopPropagation();
      onClose(true);
    } else {
      const onNavigation = column.editorOptions?.onNavigation ?? onEditorNavigation;
      if (!onNavigation(event)) {
        event.stopPropagation();
      }
    }
  }

  function onClose(commitChanges?: boolean) {
    if (commitChanges) {
      onRowChange(row, true);
    } else {
      closeEditor();
    }
  }

  const { cellClass } = column;
  const className = getCellClassname(
    column,
    'rdg-editor-container',
    !column.editorOptions?.renderFormatter && cellEditing,
    typeof cellClass === 'function' ? cellClass(row) : cellClass
  );

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-colspan={colSpan}
      aria-selected
      className={className}
      style={getCellStyle(column, colSpan)}
      onKeyDown={onKeyDown}
      onMouseDownCapture={commitOnOutsideClick ? cancelFrameRequest : undefined}
    >
      {column.editor != null && (
        <>
          {column.editor({
            column,
            row,
            onRowChange,
            onClose
          })}
          {column.editorOptions?.renderFormatter &&
            column.formatter({ column, row, isCellSelected: true, onRowChange })}
        </>
      )}
    </div>
  );
}
