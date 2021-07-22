import { memo, forwardRef } from 'react';
import type { RefAttributes, CSSProperties } from 'react';
import clsx from 'clsx';

import Cell from './Cell';
import EditCell from './EditCell';
import { RowSelectionProvider, useLatestFunc } from './hooks';
import { getColSpan } from './utils';
import { groupRowSelectedClassname, rowClassname } from './style';
import type { EditCellProps, RowRendererProps } from './types';

function Row<R, SR>(
  {
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
    onRowDoubleClick,
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
  const handleRowChange = useLatestFunc((newRow: R) => {
    onRowChange(rowIdx, newRow);
  });

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
    const { idx } = column;
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'ROW', row });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    let isCellSelected = false;
    let dragHandleProps;
    let onFocus;
    let onKeyDown;

    if (selectedCellProps !== undefined) {
      isCellSelected = selectedCellProps.idx === idx;
      if (isCellSelected && selectedCellProps.mode === 'SELECT') {
        ({ dragHandleProps, onFocus, onKeyDown } = selectedCellProps);
      }
    }

    if (isCellSelected && selectedCellProps!.mode === 'EDIT') {
      cells.push(
        <EditCell
          key={column.key}
          column={column}
          colSpan={colSpan}
          onKeyDown={(selectedCellProps as EditCellProps<R>).onKeyDown}
          {...(selectedCellProps as EditCellProps<R>).editorProps}
        />
      );
    } else {
      cells.push(
        <Cell
          key={column.key}
          column={column}
          colSpan={colSpan}
          row={row}
          isCopied={copiedCellIdx === idx}
          isDraggedOver={draggedOverCellIdx === idx}
          isCellSelected={isCellSelected}
          dragHandleProps={dragHandleProps}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          onRowChange={handleRowChange}
          selectCell={selectCell}
        />
      );
    }
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

export default memo(forwardRef(Row)) as <R, SR>(
  props: RowRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;
