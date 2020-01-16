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
  idx,
  isRowSelected,
  isSummaryRow,
  lastFrozenColumnIndex,
  onDragEnter,
  onDragOver,
  onDrop,
  row,
  scrollLeft,
  viewportColumns,
  width,
  ...props
}: RowRendererProps<R>) {
  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    // Prevent default to allow drop
    event.preventDefault();
    eventBus.dispatch('DRAG_ENTER', idx);
    onDragEnter?.(event);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    onDragOver?.(event);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    // The default in Firefox is to treat data in dataTransfer as a URL and perform navigation on it, even if the data type used is 'text'
    // To bypass this, we need to capture and prevent the drop event.
    event.preventDefault();
    onDrop?.(event);
  }

  function getCells() {
    return viewportColumns.map(column => {
      return (
        <CellRenderer
          key={column.key as string} // FIXME: fix key type
          idx={column.idx}
          rowIdx={idx}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          row={row}
          scrollLeft={column.frozen && typeof scrollLeft === 'number' ? scrollLeft : undefined}
          isRowSelected={isRowSelected}
          isSummaryRow={isSummaryRow}
          eventBus={eventBus}
          enableCellRangeSelection={enableCellRangeSelection}
        />
      );
    });
  }

  className = classNames(
    'rdg-row',
    `rdg-row-${idx % 2 === 0 ? 'even' : 'odd'}`,
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
