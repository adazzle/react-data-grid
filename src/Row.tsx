import React, { memo, forwardRef } from 'react';
import clsx from 'clsx';

import Cell from './Cell';
import EditCell from './EditCell';
import { RowRendererProps, SelectedCellProps } from './types';
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
}: RowRendererProps<R, SR>, ref: React.Ref<HTMLDivElement>) {
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
      ref={ref}
      className={className}
      onMouseEnter={wrapEvent(handleDragEnter, onMouseEnter)}
      style={{ top }}
      {...props}
    >
      {viewportColumns.map(column => {
        if (selectedCellProps?.mode === 'EDIT' && selectedCellProps.idx === column.idx) {
          return (
            <EditCell<R, SR>
              key={column.key}
              rowIdx={rowIdx}
              column={column}
              lastFrozenColumnIndex={lastFrozenColumnIndex}
              row={row}
              onKeyDown={selectedCellProps.onKeyDown}
              editorPortalTarget={selectedCellProps.editorPortalTarget}
              editorContainerProps={selectedCellProps.editorContainerProps}
              editor2Props={selectedCellProps.editor2Props}
            />
          );
        }

        return (
          <CellRenderer
            key={column.key}
            rowIdx={rowIdx}
            column={column}
            lastFrozenColumnIndex={lastFrozenColumnIndex}
            row={row}
            isSelected={selectedCellProps?.idx === column.idx}
            isCopied={copiedCellIdx === column.idx}
            isDraggedOver={draggedOverCellIdx === column.idx}
            isRowSelected={isRowSelected}
            eventBus={eventBus}
            dragHandleProps={(selectedCellProps as SelectedCellProps)?.dragHandleProps}
            onKeyDown={selectedCellProps?.onKeyDown}
            onRowClick={onRowClick}
          />
        );
      })}
    </div>
  );
}

export default memo(forwardRef(Row)) as <R, SR = unknown>(props: RowRendererProps<R, SR> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;
