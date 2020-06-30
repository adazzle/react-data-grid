import React, { forwardRef, memo, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { CellRendererProps } from './common/types';
import { wrapEvent } from './utils';
import { useCombinedRefs } from './hooks';

function Cell<R, SR>({
  className,
  column,
  isSelected,
  isCopied,
  isDraggedOver,
  isRowSelected,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  eventBus,
  dragHandle,
  onRowClick,
  onClick,
  onDoubleClick,
  onContextMenu,
  ...props
}: CellRendererProps<R, SR>, ref: React.Ref<HTMLDivElement>) {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected) {
      cellRef.current?.focus();
    }
  }, [isSelected]);

  function selectCell(openEditor?: boolean) {
    eventBus.dispatch('CELL_SELECT', { idx: column.idx, rowIdx }, openEditor);
  }

  function handleClick() {
    selectCell();
    onRowClick?.(rowIdx, row, column);
  }

  function handleContextMenu() {
    selectCell();
  }

  function handleDoubleClick() {
    selectCell(true);
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    eventBus.dispatch('ROW_SELECT', { rowIdx, checked, isShiftClick });
  }

  const { cellClass } = column;
  className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex,
      'rdg-cell-selected': isSelected,
      'rdg-cell-copied': isCopied,
      'rdg-cell-dragged-over': isDraggedOver
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
      onClick={wrapEvent(handleClick, onClick)}
      onDoubleClick={wrapEvent(handleDoubleClick, onDoubleClick)}
      onContextMenu={wrapEvent(handleContextMenu, onContextMenu)}
      {...props}
    >
      <column.formatter
        column={column}
        rowIdx={rowIdx}
        row={row}
        isRowSelected={isRowSelected}
        onRowSelectionChange={onRowSelectionChange}
      />
      {dragHandle}
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R, SR = unknown>(props: CellRendererProps<R, SR>) => JSX.Element;
