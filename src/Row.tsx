import { memo, forwardRef } from 'react';
import clsx from 'clsx';

import Cell from './Cell';
import EditCell from './EditCell';
import type { RowRendererProps, SelectedCellProps } from './types';
import { wrapEvent } from './utils';

function Row<R, SR = unknown>({
  cellRenderer: CellRenderer = Cell,
  className,
  rowIdx,
  isRowSelected,
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
  onRowChange,
  selectCell,
  selectRow,
  'aria-rowindex': ariaRowIndex,
  'aria-selected': ariaSelected,
  ...props
}: RowRendererProps<R, SR>, ref: React.Ref<HTMLDivElement>) {
  function handleDragEnter() {
    setDraggedOverRowIdx?.(rowIdx);
  }

  className = clsx(
    'rdg-row',
    `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`, {
      'rdg-row-selected': isRowSelected,
      'rdg-group-row-selected': selectedCellProps?.idx === -1
    },
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
        const isCellSelected = selectedCellProps?.idx === column.idx;
        if (selectedCellProps?.mode === 'EDIT' && isCellSelected) {
          return (
            <EditCell<R, SR>
              key={column.key}
              rowIdx={rowIdx}
              column={column}
              row={row}
              onKeyDown={selectedCellProps.onKeyDown}
              editorProps={selectedCellProps.editorProps}
            />
          );
        }

        return (
          <CellRenderer
            key={column.key}
            rowIdx={rowIdx}
            column={column}
            row={row}
            isCopied={copiedCellIdx === column.idx}
            isDraggedOver={draggedOverCellIdx === column.idx}
            isCellSelected={isCellSelected}
            isRowSelected={isRowSelected}
            dragHandleProps={isCellSelected ? (selectedCellProps as SelectedCellProps).dragHandleProps : undefined}
            onFocus={isCellSelected ? (selectedCellProps as SelectedCellProps).onFocus : undefined}
            onKeyDown={isCellSelected ? selectedCellProps!.onKeyDown : undefined}
            onRowClick={onRowClick}
            onRowChange={onRowChange}
            selectCell={selectCell}
            selectRow={selectRow}
          />
        );
      })}
    </div>
  );
}

export default memo(forwardRef(Row)) as <R, SR = unknown>(props: RowRendererProps<R, SR> & React.RefAttributes<HTMLDivElement>) => JSX.Element;
