import classNames from 'classnames';
import React from 'react';

import Cell from './Cell';
import { RowRendererProps } from './common/types';

export default function Row<R>({
  cellRenderer: CellRenderer = Cell,
  enableCellRangeSelection,
  eventBus,
  extraClasses,
  height,
  rowIdx,
  isRowSelected,
  isSummaryRow,
  lastFrozenColumnIndex,
  onRowClick,
  row,
  scrollLeft,
  viewportColumns,
  width
}: RowRendererProps<R>) {
  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    // Prevent default to allow drop
    e.preventDefault();
    eventBus.dispatch('DRAG_ENTER', rowIdx);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    // The default in Firefox is to treat data in dataTransfer as a URL and perform navigation on it, even if the data type used is 'text'
    // To bypass this, we need to capture and prevent the drop event.
    e.preventDefault();
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

  const className = classNames(
    'rdg-row',
    `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
    { 'rdg-row-selected': isRowSelected },
    extraClasses
  );

  return (
    <div
      className={className}
      style={{ width, height }}
      onDragEnter={isSummaryRow ? undefined : handleDragEnter}
      onDragOver={isSummaryRow ? undefined : handleDragOver}
      onDrop={isSummaryRow ? undefined : handleDrop}
    >
      {getCells()}
    </div>
  );
}
