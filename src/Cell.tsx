import React, { memo, createElement } from 'react';
import classNames from 'classnames';

import { CellRendererProps } from './common/types';

export interface CellProps<R> extends CellRendererProps<R> {
  // TODO: Check if these props are required or not. These are most likely set by custom cell renderer
  children?: React.ReactNode;
  className?: string;
}

function Cell<R>({
  children,
  className,
  column,
  idx,
  isRowSelected,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  scrollLeft,
  eventBus,
  onRowClick,
  enableCellRangeSelection
}: CellProps<R>) {
  function selectCell(openEditor?: boolean) {
    eventBus.dispatch('SELECT_CELL', { idx, rowIdx }, openEditor);
  }

  function handleCellClick() {
    selectCell();
    onRowClick?.(rowIdx, row, column);
  }

  function handleCellMouseDown() {
    eventBus.dispatch('SELECT_START', { idx, rowIdx });

    function handleWindowMouseUp() {
      eventBus.dispatch('SELECT_END');
      window.removeEventListener('mouseup', handleWindowMouseUp);
    }

    window.addEventListener('mouseup', handleWindowMouseUp);
  }

  function handleCellMouseEnter() {
    eventBus.dispatch('SELECT_UPDATE', { idx, rowIdx });
  }

  function handleCellContextMenu() {
    selectCell();
  }

  function handleCellDoubleClick() {
    selectCell(true);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    eventBus.dispatch('SELECT_ROW', { rowIdx, checked, isShiftClick });
  }

  const { cellClass } = column;
  className = classNames(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
    },
    className,
    typeof cellClass === 'function' ? cellClass(row) : cellClass
  );

  const style: React.CSSProperties = {
    width: column.width,
    left: column.left
  };

  if (scrollLeft !== undefined) {
    style.transform = `translateX(${scrollLeft}px)`;
  }

  if (!children) {
    children = createElement(column.formatter, {
      column,
      rowIdx,
      row,
      isRowSelected,
      onRowSelectionChange
    });
  }

  return (
    <div
      className={className}
      style={style}
      onClick={handleCellClick}
      onDoubleClick={handleCellDoubleClick}
      onContextMenu={handleCellContextMenu}
      onDragOver={handleDragOver}
      onMouseDown={!enableCellRangeSelection ? undefined : handleCellMouseDown}
      onMouseEnter={!enableCellRangeSelection ? undefined : handleCellMouseEnter}
    >
      {children}
    </div>
  );
}

export default memo(Cell) as <R>(props: CellProps<R>) => JSX.Element;
