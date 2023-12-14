import { css } from '@linaria/core';
import clsx from 'clsx';

import { getCellStyle } from './utils';
import type { CalculatedColumn, FillEvent, Position } from './types';
import type { DataGridProps, SelectCellState } from './DataGrid';

const cellDragHandle = css`
  @layer rdg.DragHandle {
    --rdg-drag-handle-size: 8px;
    z-index: 0;
    cursor: move;
    inline-size: var(--rdg-drag-handle-size);
    block-size: var(--rdg-drag-handle-size);
    background-color: var(--rdg-selection-color);
    place-self: end;

    &:hover {
      --rdg-drag-handle-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
`;

const cellDragHandleFrozenClassname = css`
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
`;

const cellDragHandleClassname = `rdg-cell-drag-handle ${cellDragHandle}`;

interface Props<R, SR> extends Pick<DataGridProps<R, SR>, 'rows' | 'onRowsChange'> {
  gridRowStart: number;
  column: CalculatedColumn<R, SR>;
  columnWidth: number | string;
  maxColIdx: number;
  isLastRow: boolean;
  selectedPosition: SelectCellState;
  latestDraggedOverRowIdx: React.MutableRefObject<number | undefined>;
  isCellEditable: (position: Position) => boolean;
  onClick: () => void;
  onFill: (event: FillEvent<R>) => R;
  setDragging: (isDragging: boolean) => void;
  setDraggedOverRowIdx: (overRowIdx: number | undefined) => void;
}

export default function DragHandle<R, SR>({
  gridRowStart,
  rows,
  column,
  columnWidth,
  maxColIdx,
  isLastRow,
  selectedPosition,
  latestDraggedOverRowIdx,
  isCellEditable,
  onRowsChange,
  onFill,
  onClick,
  setDragging,
  setDraggedOverRowIdx
}: Props<R, SR>) {
  const { idx, rowIdx } = selectedPosition;

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    // keep the focus on the cell
    event.preventDefault();
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

  function getStyle(): React.CSSProperties {
    const colSpan = column.colSpan?.({ type: 'ROW', row: rows[rowIdx] }) ?? 1;
    const { insetInlineStart, ...style } = getCellStyle(column, colSpan);
    const marginEnd = 'calc(var(--rdg-drag-handle-size) * -0.5 + 1px)';
    const isLastColumn = column.idx + colSpan - 1 === maxColIdx;

    return {
      ...style,
      gridRowStart,
      marginInlineEnd: isLastColumn ? undefined : marginEnd,
      marginBlockEnd: isLastRow ? undefined : marginEnd,
      insetInlineStart: insetInlineStart
        ? `calc(${insetInlineStart} + ${columnWidth}px + var(--rdg-drag-handle-size) * -0.5 - 1px)`
        : undefined
    };
  }

  return (
    <div
      style={getStyle()}
      className={clsx(cellDragHandleClassname, column.frozen && cellDragHandleFrozenClassname)}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    />
  );
}
