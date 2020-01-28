import classNames from 'classnames';
import React from 'react';

import Cell from './Cell';
import { RowRendererProps } from './common/types';

export default function Row<R>({
  cellRenderer: CellRenderer = Cell,
  className,
  enableCellRangeSelection,
  eventBus,
  height,
  rowIdx,
  isRowSelected,
  isSummaryRow,
  lastFrozenColumnIndex,
  onRowClick,
  row,
  scrollLeft,
  viewportColumns,
  width,
  onDragEnter,
  onDragOver,
  onDrop,
  ...props
}: RowRendererProps<R>) {
  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    // Prevent default to allow drop
    e.preventDefault();
    eventBus.dispatch('DRAG_ENTER', rowIdx);
    onDragEnter?.(e);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    onDragOver?.(e);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    // The default in Firefox is to treat data in dataTransfer as a URL and perform navigation on it, even if the data type used is 'text'
    // To bypass this, we need to capture and prevent the drop event.
    e.preventDefault();
    onDrop?.(e);
  }

  function getCells() {
    return viewportColumns.map(column => {
      return (
        <CellRenderer
          key={column.key as string} // FIXME: fix key type
          idx={column.idx}
          rowIdx={rowIdx}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          row={row}
          scrollLeft={column.frozen && typeof scrollLeft === 'number' ? scrollLeft : undefined}
          isRowSelected={isRowSelected}
          isSummaryRow={isSummaryRow}
          eventBus={eventBus}
          onRowClick={onRowClick}
          enableCellRangeSelection={enableCellRangeSelection}
        />
      );
    });
  }

  className = classNames(
    'rdg-row',
    `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
    { 'rdg-row-selected': isRowSelected },
    className
  );

  return (
    <div
      className={className}
      style={{ width, height }}
      onDragEnter={isSummaryRow ? onDragEnter : handleDragEnter}
      onDragOver={isSummaryRow ? onDragOver : handleDragOver}
      onDrop={isSummaryRow ? onDrop : handleDrop}
      {...props}
    >
      {getCells()}
    </div>
  );
}
