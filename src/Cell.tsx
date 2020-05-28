import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';

import { CellRendererProps } from './common/types';
import { preventDefault, wrapEvent } from './utils';

function Cell<R, SR>({
  className,
  column,
  isRowSelected,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  eventBus,
  onRowClick,
  onClick,
  onDoubleClick,
  onContextMenu,
  onDragOver,
  ...props
}: CellRendererProps<R, SR>, ref: React.Ref<HTMLDivElement>) {
  function selectCell(openEditor?: boolean) {
    eventBus.dispatch('SELECT_CELL', { idx: column.idx, rowIdx }, openEditor);
  }

  function handleCellClick() {
    selectCell();
    onRowClick?.(rowIdx, row, column);
  }

  function handleCellContextMenu() {
    selectCell();
  }

  function handleCellDoubleClick() {
    selectCell(true);
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    eventBus.dispatch('SELECT_ROW', { rowIdx, checked, isShiftClick });
  }

  const { cellClass } = column;
  className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: column.width,
        left: column.left
      }}
      onClick={wrapEvent(handleCellClick, onClick)}
      onDoubleClick={wrapEvent(handleCellDoubleClick, onDoubleClick)}
      onContextMenu={wrapEvent(handleCellContextMenu, onContextMenu)}
      onDragOver={wrapEvent(preventDefault, onDragOver)}
      {...props}
    >
      <column.formatter
        column={column}
        rowIdx={rowIdx}
        row={row}
        isRowSelected={isRowSelected}
        onRowSelectionChange={onRowSelectionChange}
      />
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R, SR = unknown>(props: CellRendererProps<R, SR>) => JSX.Element;
