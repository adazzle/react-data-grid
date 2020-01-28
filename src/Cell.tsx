import React, { memo, createElement } from 'react';
import classNames from 'classnames';

import { CellRendererProps } from './common/types';
import { preventDefault, wrapEvent } from './utils';

function Cell<R>({
  children,
  className,
  column,
  idx,
  isRowSelected,
  isSummaryRow,
  lastFrozenColumnIndex,
  row,
  rowIdx,
  scrollLeft,
  eventBus,
  onRowClick,
  enableCellRangeSelection,
  onClick,
  onDoubleClick,
  onContextMenu,
  onDragOver,
  onMouseDown,
  onMouseEnter,
  ...props
}: CellRendererProps<R>) {
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
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    className
  );

  const style: React.CSSProperties = {
    width: column.width,
    left: column.left
  };

  if (scrollLeft !== undefined) {
    style.transform = `translateX(${scrollLeft}px)`;
  }

  // TODO: Check if the children prop is required or not. These are most likely set by custom cell renderer
  if (!children) {
    children = createElement(column.formatter, {
      column,
      rowIdx,
      row,
      isRowSelected,
      onRowSelectionChange,
      isSummaryRow
    });
  }

  return (
    <div
      className={className}
      style={style}
      onClick={isSummaryRow ? onClick : wrapEvent(handleCellClick, onClick)}
      onDoubleClick={isSummaryRow ? onDoubleClick : wrapEvent(handleCellDoubleClick, onDoubleClick)}
      onContextMenu={isSummaryRow ? onContextMenu : wrapEvent(handleCellContextMenu, onContextMenu)}
      onDragOver={isSummaryRow ? onDragOver : wrapEvent(preventDefault, onDragOver)}
      onMouseDown={isSummaryRow || !enableCellRangeSelection ? onMouseDown : wrapEvent(handleCellMouseDown, onMouseDown)}
      onMouseEnter={isSummaryRow || !enableCellRangeSelection ? onMouseEnter : wrapEvent(handleCellMouseEnter, onMouseEnter)}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(Cell) as <R>(props: CellRendererProps<R>) => JSX.Element;
