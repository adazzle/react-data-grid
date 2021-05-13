import { memo, forwardRef } from 'react';
import type { RefAttributes, CSSProperties } from 'react';
import clsx from 'clsx';

import { groupRowSelectedClassname, rowClassname } from './style';
import { getColSpan } from './utils';
import Cell from './Cell';
import EditCell from './EditCell';
import type { RowRendererProps, SelectedCellProps } from './types';
import { RowSelectionProvider } from './hooks';

function Row<R, SR = unknown>(
  {
    cellRenderer: CellRenderer = Cell,
    className,
    rowIdx,
    isRowSelected,
    copiedCellIdx,
    draggedOverCellIdx,
    lastFrozenColumnIndex,
    row,
    viewportColumns,
    selectedCellProps,
    onRowClick,
    rowClass,
    setDraggedOverRowIdx,
    onMouseEnter,
    top,
    height,
    onRowChange,
    selectCell,
    ...props
  }: RowRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) {
  function handleDragEnter(event: React.MouseEvent<HTMLDivElement>) {
    setDraggedOverRowIdx?.(rowIdx);
    onMouseEnter?.(event);
  }

  className = clsx(
    rowClassname,
    `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
    {
      [groupRowSelectedClassname]: selectedCellProps?.idx === -1
    },
    rowClass?.(row),
    className
  );

  const cells = [];
  for (let index = 0; index < viewportColumns.length; index++) {
    const column = viewportColumns[index];
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'ROW', row });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    const isCellSelected = selectedCellProps?.idx === column.idx;
    if (selectedCellProps?.mode === 'EDIT' && isCellSelected) {
      cells.push(
        <EditCell<R, SR>
          key={column.key}
          rowIdx={rowIdx}
          column={column}
          colSpan={colSpan}
          row={row}
          onKeyDown={selectedCellProps.onKeyDown}
          editorProps={selectedCellProps.editorProps}
        />
      );
      continue;
    }

    cells.push(
      <CellRenderer
        key={column.key}
        rowIdx={rowIdx}
        column={column}
        colSpan={colSpan}
        row={row}
        isCopied={copiedCellIdx === column.idx}
        isDraggedOver={draggedOverCellIdx === column.idx}
        isCellSelected={isCellSelected}
        dragHandleProps={
          isCellSelected ? (selectedCellProps as SelectedCellProps).dragHandleProps : undefined
        }
        onFocus={isCellSelected ? (selectedCellProps as SelectedCellProps).onFocus : undefined}
        onKeyDown={isCellSelected ? selectedCellProps!.onKeyDown : undefined}
        onRowClick={onRowClick}
        onRowChange={onRowChange}
        selectCell={selectCell}
      />
    );
  }

  return (
    <RowSelectionProvider value={isRowSelected}>
      <div
        role="row"
        ref={ref}
        className={className}
        onMouseEnter={handleDragEnter}
        style={
          {
            top,
            '--row-height': `${height}px`
          } as unknown as CSSProperties
        }
        {...props}
      >
        {cells}
      </div>
    </RowSelectionProvider>
  );
}

export default memo(forwardRef(Row)) as <R, SR = unknown>(
  props: RowRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;
