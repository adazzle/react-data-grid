import React, { memo } from 'react';
import clsx from 'clsx';

import Cell from './Cell';
import { RowRendererProps } from './types';
import { wrapEvent } from './utils';

function Row<R, SR = unknown>({
  cellRenderer: CellRenderer = Cell,
  className,
  eventBus,
  rowIdx,
  isRowSelected,
  lastFrozenColumnIndex,
  copiedCellIdx,
  draggedOverCellIdx,
  row,
  viewportColumns,
  selectedCellProps,
  onRowClick,
  rowClass,
  setDraggedOverRowIdx,
  onMouseEnter,
  top,
  'aria-rowindex': ariaRowIndex,
  'aria-selected': ariaSelected,
  ...props
}: RowRendererProps<R, SR>) {
  function handleDragEnter() {
    setDraggedOverRowIdx?.(rowIdx);
  }

  className = clsx(
    'rdg-row',
    `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
    { 'rdg-row-selected': isRowSelected },
    rowClass?.(row),
    className
  );

  return (
    <div
      role="row"
      aria-rowindex={ariaRowIndex}
      aria-selected={ariaSelected}
      className={className}
      onMouseEnter={wrapEvent(handleDragEnter, onMouseEnter)}
      style={{ top }}
      {...props}
    >
      {viewportColumns.map(column => (
        <CellRenderer
          key={column.key}
          rowIdx={rowIdx}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          row={row}
          isCopied={copiedCellIdx === column.idx}
          isDraggedOver={draggedOverCellIdx === column.idx}
          isRowSelected={isRowSelected}
          eventBus={eventBus}
          selectedCellProps={selectedCellProps?.idx === column.idx ? selectedCellProps : undefined}
          onRowClick={onRowClick}
        />
      ))}
    </div>
  );
}

export default memo(Row) as <R, SR>(props: RowRendererProps<R, SR>) => JSX.Element;
