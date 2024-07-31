import { forwardRef, memo, useMemo, type RefAttributes } from 'react';
import clsx from 'clsx';

import { RowSelectionProvider, useLatestFunc, type RowSelectionContextValue } from './hooks';
import { getColSpan, getRowStyle, isValueInBetween } from './utils';
import type { CalculatedColumn, RenderRowProps } from './types';
import { useDefaultRenderers } from './DataGridDefaultRenderersProvider';
import { rowClassname, rowSelectedClassname } from './style/row';

function Row<R, SR>(
  {
    className,
    rowIdx,
    gridRowStart,
    selectedCellIdx,
    isRowSelectionDisabled,
    selectedCellsRange,
    isRowSelected,
    copiedCellIdx,
    draggedOverCellIdx,
    lastFrozenColumnIndex,
    row,
    viewportColumns,
    selectedCellEditor,
    onCellClick,
    onCellDoubleClick,
    onCellContextMenu,
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
  }: RenderRowProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) {
  const renderCell = useDefaultRenderers<R, SR>()!.renderCell!;

  const handleRowChange = useLatestFunc((column: CalculatedColumn<R, SR>, newRow: R) => {
    onRowChange(column, rowIdx, newRow);
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
    rowClass?.(row, rowIdx),
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

    const isCellSelected =
      selectedCellIdx === idx ||
      (rangeSelectionMode &&
        isValueInBetween(idx, selectedCellsRange.startIdx, selectedCellsRange.endIdx));

    if (isCellSelected && selectedCellEditor) {
      cells.push(selectedCellEditor);
    } else {
      cells.push(
        renderCell(column.key, {
          column,
          colSpan,
          row,
          rowIdx,
          isCopied: copiedCellIdx === idx,
          isDraggedOver: draggedOverCellIdx === idx,
          isCellSelected,
          onClick: onCellClick,
          onDoubleClick: onCellDoubleClick,
          onContextMenu: onCellContextMenu,
          onRowChange: handleRowChange,
          selectCell,
          onMouseDownCapture: onCellMouseDown,
          onMouseUpCapture: onCellMouseUp,
          onMouseEnter: onCellMouseEnter,
          rangeSelectionMode
        })
      );
    }
  }

  const selectionValue = useMemo(
    (): RowSelectionContextValue => ({ isRowSelected, isRowSelectionDisabled }),
    [isRowSelectionDisabled, isRowSelected]
  );

  return (
    <RowSelectionProvider value={selectionValue}>
      <div
        role="row"
        ref={ref}
        className={className}
        onMouseEnter={handleDragEnter}
        style={getRowStyle(gridRowStart)}
        {...props}
      >
        {cells}
      </div>
    </RowSelectionProvider>
  );
}

const RowComponent = memo(forwardRef(Row)) as <R, SR>(
  props: RenderRowProps<R, SR> & RefAttributes<HTMLDivElement>
) => React.JSX.Element;

export default RowComponent;

export function defaultRenderRow<R, SR>(key: React.Key, props: RenderRowProps<R, SR>) {
  return <RowComponent key={key} {...props} />;
}
