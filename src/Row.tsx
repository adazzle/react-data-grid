import { memo, forwardRef } from 'react';
import type { RefAttributes } from 'react';
import clsx from 'clsx';

import Cell from './Cell';
import { RowSelectionProvider, useLatestFunc } from './hooks';
import { getColSpan, getRowStyle } from './utils';
import { rowClassname, rowSelectedClassname } from './style';
import type { RowRendererProps } from './types';
import {isValueInBetween} from "./utils/Helpers";

function Row<R, SR>(
  {
    className,
    rowIdx,
    gridRowStart,
    height,
    selectedCellIdx,
    selectedCellsRange,
    isRowSelected,
    copiedCellIdx,
    draggedOverCellIdx,
    lastFrozenColumnIndex,
    row,
    viewportColumns,
    selectedCellEditor,
    selectedCellDragHandle,
    onRowClick,
    onRowDoubleClick,
    rowClass,
    setDraggedOverRowIdx,
    onMouseEnter,
    onRowChange,
    onCellMouseDown,
    onCellMouseUp,
    onCellMouseEnter,
    selectCell,
    rangeSelectionMode,
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
        [rowSelectedClassname]: selectedCellIdx === -1
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

    const isCellSelected = selectedCellIdx === idx || (rangeSelectionMode && isValueInBetween(idx, selectedCellsRange?.startIdx, selectedCellsRange?.endIdx));

    if (isCellSelected && selectedCellEditor) {
      cells.push(selectedCellEditor);
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
              dragHandle={isCellSelected ? selectedCellDragHandle : undefined}
              onRowClick={onRowClick}
              onRowDoubleClick={onRowDoubleClick}
              onRowChange={handleRowChange}
              selectCell={selectCell}
              onMouseDownCapture={() => onCellMouseDown?.(row, column)}
              onMouseUpCapture={() => onCellMouseUp?.(row, column)}
              onMouseEnter={() => onCellMouseEnter?.(column.idx)}
              rangeSelectionMode={rangeSelectionMode}
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
            style={getRowStyle(gridRowStart, height)}
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
