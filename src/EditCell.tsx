import { useEffect, useRef, type MutableRefObject, useCallback } from 'react';
import { css } from '@linaria/core';

import { useLatestFunc } from './hooks';
import { getCellStyle, getCellClassname, onEditorNavigation, createCellEvent } from './utils';
import type {
  CellKeyboardEvent,
  CellRendererProps,
  EditCellKeyDownArgs,
  EditorProps,
  Maybe,
  Omit
} from './types';

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
  rowIdx: number;
  skipCellFocusRef: MutableRefObject<boolean>;
  closeEditor: () => void;
  navigate: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onKeyDown: Maybe<(args: EditCellKeyDownArgs<R, SR>, event: CellKeyboardEvent) => void>;
}

export default function EditCell<R, SR>({
  column,
  colSpan,
  row,
  rowIdx,
  skipCellFocusRef,
  onRowChange,
  closeEditor,
  onKeyDown,
  navigate
}: EditCellProps<R, SR>) {
  const frameRequestRef = useRef<number | undefined>();
  const commitOnOutsideClick = column.editorOptions?.commitOnOutsideClick !== false;

  // We need to prevent the `useEffect` from cleaning up between re-renders,
  // as `onWindowCaptureMouseDown` might otherwise miss valid mousedown events.
  // To that end we instead access the latest props via useLatestFunc.
  const commitOnOutsideMouseDown = useLatestFunc(() => {
    onClose(true);
  });

  const cancelFrameRequest = useCallback(() => {
    skipCellFocusRef.current = false;
    if (commitOnOutsideClick) {
      cancelAnimationFrame(frameRequestRef.current!);
    }
  }, [commitOnOutsideClick, skipCellFocusRef]);

  useEffect(() => {
    function onWindowCaptureMouseDown() {
      skipCellFocusRef.current = true;
      if (commitOnOutsideClick) {
        frameRequestRef.current = requestAnimationFrame(commitOnOutsideMouseDown);
      }
    }

    addEventListener('mousedown', onWindowCaptureMouseDown, { capture: true });

    return () => {
      removeEventListener('mousedown', onWindowCaptureMouseDown, { capture: true });
      cancelFrameRequest();
    };
  }, [cancelFrameRequest, commitOnOutsideClick, commitOnOutsideMouseDown, skipCellFocusRef]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (onKeyDown) {
      const cellEvent = createCellEvent(event);
      onKeyDown(
        {
          mode: 'EDIT',
          row,
          column,
          rowIdx,
          navigate() {
            navigate(event);
          },
          onClose
        },
        cellEvent
      );
      if (cellEvent.isGridDefaultPrevented()) return;
    }

    if (event.key === 'Escape') {
      // Discard changes
      onClose();
    } else if (event.key === 'Enter') {
      onClose(true);
    } else if (onEditorNavigation(event)) {
      navigate(event);
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
      onKeyDown={handleKeyDown}
      onMouseDownCapture={cancelFrameRequest}
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
