import React, { memo } from 'react';
import clsx from 'clsx';

import Cell from './Cell';
import { RowRendererProps } from './common/types';
import { preventDefault, wrapEvent } from './utils';

function Row<R, SR = unknown>({
  cellRenderer: CellRenderer = Cell,
  className,
  eventBus,
  rowIdx,
  isRowSelected,
  lastFrozenColumnIndex,
  onRowClick,
  row,
  viewportColumns,
  onDragEnter,
  onDragOver,
  onDrop,
  ...props
}: RowRendererProps<R, SR>) {
  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    // Prevent default to allow drop
    event.preventDefault();
    eventBus.dispatch('DRAG_ENTER', rowIdx);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  className = clsx(
    'rdg-row',
    `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
    { 'rdg-row-selected': isRowSelected },
    className
  );

  // Regarding onDrop: the default in Firefox is to treat data in dataTransfer as a URL,
  // and perform navigation on it, even if the data type used is 'text'.
  // To bypass this, we need to capture and prevent the drop event.
  return (
    <div
      className={className}
      onDragEnter={wrapEvent(handleDragEnter, onDragEnter)}
      onDragOver={wrapEvent(handleDragOver, onDragOver)}
      onDrop={wrapEvent(preventDefault, onDrop)}
      {...props}
    >
      {viewportColumns.map(column => (
        <CellRenderer
          key={column.key}
          rowIdx={rowIdx}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          row={row}
          isRowSelected={isRowSelected}
          eventBus={eventBus}
          onRowClick={onRowClick}
        />
      ))}
    </div>
  );
}

export default memo(Row) as <R, SR>(props: RowRendererProps<R, SR>) => JSX.Element;
