import { css } from '@linaria/core';

import type { CalculatedColumn, FillEvent, Position } from './types';
import type { DataGridProps, SelectCellState } from './DataGrid';

const cellDragHandle = css`
  cursor: move;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 8px;
  height: 8px;
  background-color: var(--selection-color);

  &:hover {
    width: 16px;
    height: 16px;
    border: 2px solid var(--selection-color);
    background-color: var(--background-color);
  }
`;

const cellDragHandleClassname = `rdg-cell-drag-handle ${cellDragHandle}`;

interface Props<R, SR> extends Pick<DataGridProps<R, SR>, 'rows' | 'onRowsChange'> {
  columns: readonly CalculatedColumn<R, SR>[];
  selectedPosition: SelectCellState;
  isCellEditable: (position: Position) => boolean;
  onFill: (event: FillEvent<R>) => R;
  setDragging: (isDragging: boolean) => void;
  setDraggedOverRowIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function DragHandle<R, SR>({
  rows,
  columns,
  selectedPosition,
  isCellEditable,
  onRowsChange,
  onFill,
  setDragging,
  setDraggedOverRowIdx
}: Props<R, SR>) {
  function handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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
    setDraggedOverRowIdx((overRowIdx) => {
      if (overRowIdx === undefined) return undefined;

      const { rowIdx } = selectedPosition;
      const startRowIndex = rowIdx < overRowIdx ? rowIdx + 1 : overRowIdx;
      const endRowIndex = rowIdx < overRowIdx ? overRowIdx + 1 : rowIdx;
      updateRows(startRowIndex, endRowIndex);
      return undefined;
    });
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    updateRows(selectedPosition.rowIdx + 1, rows.length);
  }

  function updateRows(startRowIdx: number, endRowIdx: number) {
    const { idx, rowIdx } = selectedPosition;
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
      className={cellDragHandleClassname}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    />
  );
}
