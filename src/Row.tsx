import { memo, forwardRef, type RefAttributes } from 'react';
import clsx from 'clsx';

import { RowSelectionProvider, useLatestFunc } from './hooks';
import { getColSpan, getRowStyle } from './utils';
import type { CalculatedColumn, RowRendererProps } from './types';
import { defaultCellRenderer } from './Cell';
import { rowClassname, rowSelectedClassname } from './style';
import { useDefaultRenderers } from './DataGridDefaultRenderersProvider';

function Row<R, SR>(
  {
    className,
    rowIdx,
    gridRowStart,
    height,
    selectedCellIdx,
    isRowSelected,
    copiedCellIdx,
    draggedOverCellIdx,
    lastFrozenColumnIndex,
    row,
    viewportColumns,
    selectedCellEditor,
    selectedCellDragHandle,
    skipCellFocusRef,
    onCellClick,
    onCellDoubleClick,
    onCellContextMenu,
    rowClass,
    setDraggedOverRowIdx,
    onMouseEnter,
    onRowChange,
    selectCell,
    ...props
  }: RowRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) {
  const defaultComponents = useDefaultRenderers<R, SR>();
  const cellRenderer = defaultComponents?.cellRenderer ?? defaultCellRenderer;

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

    const isCellSelected = selectedCellIdx === idx;

    if (isCellSelected && selectedCellEditor) {
      cells.push(selectedCellEditor);
    } else {
      cells.push(cellRenderer(column.key, {
        column,
        colSpan,
        row,
        rowIdx,
        isCopied: copiedCellIdx === idx,
        isDraggedOver: draggedOverCellIdx === idx,
        isCellSelected: isCellSelected,
        dragHandle: isCellSelected ? selectedCellDragHandle : undefined,
        onClick: onCellClick,
        onDoubleClick: onCellDoubleClick,
        onContextMenu: onCellContextMenu,
        onRowChange: handleRowChange,
        selectCell: selectCell,
        skipCellFocusRef: skipCellFocusRef
      }));
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

const RowComponent = memo(forwardRef(Row)) as <R, SR>(
  props: RowRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element;

export default RowComponent;

export function defaultRowRenderer<R, SR>(key: React.Key, props: RowRendererProps<R, SR>) {
  return <RowComponent key={key} {...props} />;
}
