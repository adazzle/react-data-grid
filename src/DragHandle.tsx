import { css } from '@linaria/core';
import clsx from 'clsx';

import { getCellStyle } from './utils';
import type { CalculatedColumn, FillEvent, Position } from './types';
import type { DataGridProps, SelectCellState } from './DataGrid';

const cellDragHandleContainerClassname = css`
  @layer rdg.DragHandle {
    position: relative;
    pointer-events: none;
  }
`;

const cellDragHandleContainerFrozenClassname = css`
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
`;

const cellDragHandle = css`
  @layer rdg.DragHandle {
    pointer-events: auto;
    z-index: 0;
    position: absolute;
    inset-inline-end: 0;
    inset-block-end: 0;
    cursor: move;
    inline-size: 8px;
    block-size: 8px;
    background-color: var(--rdg-selection-color);

    &:hover {
      inline-size: 16px;
      block-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
`;

const cellDragHandleClassname = `rdg-cell-drag-handle ${cellDragHandle}`;

interface Props<R, SR> extends Pick<DataGridProps<R, SR>, 'rows' | 'onRowsChange'> {
  gridRowStart: number;
  columns: readonly CalculatedColumn<R, SR>[];
  selectedPosition: SelectCellState;
  latestDraggedOverRowIdx: React.MutableRefObject<number | undefined>;
  isCellEditable: (position: Position) => boolean;
  onFill: (event: FillEvent<R>) => R;
  setDragging: (isDragging: boolean) => void;
  setDraggedOverRowIdx: (overRowIdx: number | undefined) => void;
}

export default function DragHandle<R, SR>({
  gridRowStart,
  rows,
  columns,
  selectedPosition,
  latestDraggedOverRowIdx,
  isCellEditable,
  onRowsChange,
  onFill,
  setDragging,
  setDraggedOverRowIdx
}: Props<R, SR>) {
  const { idx, rowIdx } = selectedPosition;
  const column = columns[idx];

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (event.buttons !== 1) return;
    setDragging(true);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseup', onMouseUp);

    function onMouseOver(event: MouseEvent) {
      // Trigger onMouseup in edge cases where we release the mouse button but `mouseup` isn't triggered,
      // for example when releasing the mouse button outside the iframe the grid is rendered in.
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
      if (event.buttons !== 1) onMouseUp();
    }

    function onMouseUp() {
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseup', onMouseUp);
      setDragging(false);
      handleDragEnd();
    }
  }

  function handleDragEnd() {
    const overRowIdx = latestDraggedOverRowIdx.current;
    if (overRowIdx === undefined) return;

    const startRowIndex = rowIdx < overRowIdx ? rowIdx + 1 : overRowIdx;
    const endRowIndex = rowIdx < overRowIdx ? overRowIdx + 1 : rowIdx;
    updateRows(startRowIndex, endRowIndex);
    setDraggedOverRowIdx(undefined);
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    updateRows(rowIdx + 1, rows.length);
  }

  function updateRows(startRowIdx: number, endRowIdx: number) {
    const column = columns[idx];
    const sourceRow = rows[rowIdx];
    const updatedRows = [...rows];
    const indexes: number[] = [];
    for (let i = startRowIdx; i < endRowIdx; i++) {
      if (isCellEditable({ rowIdx: i, idx })) {
        const updatedRow = onFill({ columnKey: column.key, sourceRow, targetRow: rows[i] });
        if (updatedRow !== rows[i]) {
          updatedRows[i] = updatedRow;
          indexes.push(i);
        }
      }
    }

    if (indexes.length > 0) {
      onRowsChange?.(updatedRows, { indexes, column });
    }
  }

  return (
    <div
      className={clsx(
        cellDragHandleContainerClassname,
        column.frozen && cellDragHandleContainerFrozenClassname
      )}
      style={{ gridRowStart, ...getCellStyle(column) }}
    >
      <div
        className={cellDragHandleClassname}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      />
    </div>
  );
}
