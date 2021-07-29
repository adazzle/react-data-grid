import { css } from '@linaria/core';

import type { CalculatedColumn, FillEvent } from './types';
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
  onFill: (event: FillEvent<R>) => R[];
  setDragging: (isDragging: boolean) => void;
  setDraggedOverRowIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function DragHandle<R, SR>({
  rows,
  columns,
  selectedPosition,
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

      const { idx, rowIdx } = selectedPosition;
      const sourceRow = rows[rowIdx];
      const startRowIndex = rowIdx < overRowIdx ? rowIdx + 1 : overRowIdx;
      const endRowIndex = rowIdx < overRowIdx ? overRowIdx + 1 : rowIdx;
      const targetRows = rows.slice(startRowIndex, endRowIndex);
      const column = columns[idx];
      const updatedTargetRows = onFill({ columnKey: column.key, sourceRow, targetRows });
      const updatedRows = [...rows];
      const indexes: number[] = [];

      for (let i = startRowIndex; i < endRowIndex; i++) {
        const targetRowIdx = i - startRowIndex;
        if (updatedRows[i] !== updatedTargetRows[targetRowIdx]) {
          updatedRows[i] = updatedTargetRows[targetRowIdx];
          indexes.push(i);
        }
      }

      if (indexes.length > 0) {
        onRowsChange?.(updatedRows, { indexes, column });
      }

      return undefined;
    });
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    const { idx, rowIdx } = selectedPosition;
    const sourceRow = rows[rowIdx];
    const targetRows = rows.slice(rowIdx + 1);
    const column = columns[idx];
    const updatedTargetRows = onFill({ columnKey: column.key, sourceRow, targetRows });
    const updatedRows = [...rows];
    const indexes: number[] = [];

    for (let i = rowIdx + 1; i < updatedRows.length; i++) {
      const targetRowIdx = i - rowIdx - 1;
      if (updatedRows[i] !== updatedTargetRows[targetRowIdx]) {
        updatedRows[i] = updatedTargetRows[targetRowIdx];
        indexes.push(i);
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
