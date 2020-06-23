import React, { forwardRef, memo, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { CellRendererProps } from './common/types';
import { preventDefault, wrapEvent } from './utils';
import { useCombinedRefs } from './hooks';

function Cell<R, SR>({
  className,
  column,
  isSelected,
  isCopied,
  isRowSelected,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  eventBus,
  onRowClick,
  onClick,
  onDoubleClick,
  onKeyDown,
  onContextMenu,
  onDragOver,
  ...props
}: CellRendererProps<R, SR>, ref: React.Ref<HTMLDivElement>) {
  const cellRef = useRef<HTMLDivElement>(null);
  function selectCell(openEditor?: boolean) {
    eventBus.dispatch('SELECT_CELL', { idx: column.idx, rowIdx }, openEditor);
  }

  function handleCellClick() {
    selectCell();
    onRowClick?.(rowIdx, row, column);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    eventBus.dispatch('CELL_KEYDOWN', event);
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

  useEffect(() => {
    if (isSelected) {
      cellRef.current?.focus();
    }
  }, [isSelected]);

  const { cellClass } = column;
  className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex,
      'rdg-cell-selected': isSelected,
      'rdg-cell-copied': isCopied
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  return (
    <div
      ref={useCombinedRefs(cellRef, ref)}
      className={className}
      tabIndex={isSelected ? 0 : undefined}
      style={{
        width: column.width,
        left: column.left
      }}
      onClick={wrapEvent(handleCellClick, onClick)}
      onDoubleClick={wrapEvent(handleCellDoubleClick, onDoubleClick)}
      onContextMenu={wrapEvent(handleCellContextMenu, onContextMenu)}
      onDragOver={wrapEvent(preventDefault, onDragOver)}
      onKeyDown={wrapEvent(handleKeyDown, onKeyDown)}
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
