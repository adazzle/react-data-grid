import React, { forwardRef, memo, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { CellRendererProps } from './common/types';
import { preventDefault, wrapEvent, canEdit } from './utils';
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
  enableCellDragAndDrop,
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
    eventBus.dispatch('CELL_SELECT', { idx: column.idx, rowIdx }, openEditor);
  }

  function handleClick() {
    selectCell();
    onRowClick?.(rowIdx, row, column);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    eventBus.dispatch('CELL_KEYDOWN', event);
  }

  function handleContextMenu() {
    selectCell();
  }

  function handleDoubleClick() {
    selectCell(true);
  }

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.effectAllowed = 'copy';
    // Setting data is required to make an element draggable in FF
    const transferData = JSON.stringify({});
    try {
      event.dataTransfer.setData('text/plain', transferData);
    } catch (ex) {
      // IE only supports 'text' and 'URL' for the 'type' argument
      event.dataTransfer.setData('text', transferData);
    }
    eventBus.dispatch('CELL_DRAG_START');
  }

  function handleDragEnd() {
    eventBus.dispatch('CELL_DRAG_END');
  }

  function handleDragHandleDoubleClick() {
    eventBus.dispatch('CELL_DRAG_HANDLE_DOUBLE_CLICK');
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    eventBus.dispatch('ROW_SELECT', { rowIdx, checked, isShiftClick });
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
      {enableCellDragAndDrop && isSelected && canEdit(column, row) && (
        <div
          className="rdg-cell-drag-handle"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDoubleClick={handleDragHandleDoubleClick}
        />
      )}
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R, SR = unknown>(props: CellRendererProps<R, SR>) => JSX.Element;
