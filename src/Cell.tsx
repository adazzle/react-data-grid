import React, { forwardRef, memo, useRef } from 'react';
import clsx from 'clsx';

import { CellRendererProps } from './types';
import { wrapEvent } from './utils';
import { useCombinedRefs } from './hooks';

function Cell<R, SR>({
  className,
  column,
  isCellSelected,
  isCopied,
  isDraggedOver,
  isRowSelected,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  eventBus,
  dragHandleProps,
  onRowClick,
  onKeyDown,
  onClick,
  onDoubleClick,
  onContextMenu,
  ...props
}: CellRendererProps<R, SR>, ref: React.Ref<HTMLDivElement>) {
  const cellRef = useRef<HTMLDivElement>(null);

  const { cellClass } = column;
  className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex,
      'rdg-cell-selected': isCellSelected,
      'rdg-cell-copied': isCopied,
      'rdg-cell-dragged-over': isDraggedOver
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  function selectCell(openEditor?: boolean) {
    eventBus.dispatch('SELECT_CELL', { idx: column.idx, rowIdx }, openEditor);
  }

  function handleClick() {
    selectCell(column.editorOptions?.editOnClick);
    onRowClick?.(rowIdx, row, column);
  }

  function handleContextMenu() {
    selectCell();
  }

  function handleDoubleClick() {
    selectCell(true);
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    eventBus.dispatch('SELECT_ROW', { rowIdx, checked, isShiftClick });
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      ref={useCombinedRefs(cellRef, ref)}
      className={className}
      style={{
        width: column.width,
        left: column.left
      }}
      onKeyDown={onKeyDown}
      onClick={wrapEvent(handleClick, onClick)}
      onDoubleClick={wrapEvent(handleDoubleClick, onDoubleClick)}
      onContextMenu={wrapEvent(handleContextMenu, onContextMenu)}
      {...props}
    >
      <column.formatter
        column={column}
        rowIdx={rowIdx}
        row={row}
        isCellSelected={isCellSelected}
        isRowSelected={isRowSelected}
        onRowSelectionChange={onRowSelectionChange}
      />
      {dragHandleProps && (
        <div className="rdg-cell-drag-handle" {...dragHandleProps} />
      )}
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R, SR = unknown>(props: CellRendererProps<R, SR> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;
