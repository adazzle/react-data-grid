import React, { memo, createElement } from 'react';
import classNames from 'classnames';

import { CellRendererProps } from './common/types';

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

  function handleCellClick(event: React.MouseEvent<HTMLDivElement>) {
    selectCell();
    onRowClick?.(rowIdx, row, column);
    onClick?.(event);
  }

  function handleCellMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    eventBus.dispatch('SELECT_START', { idx, rowIdx });

    function handleWindowMouseUp() {
      eventBus.dispatch('SELECT_END');
      window.removeEventListener('mouseup', handleWindowMouseUp);
    }

    window.addEventListener('mouseup', handleWindowMouseUp);

    onMouseDown?.(event);
  }

  function handleCellMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
    eventBus.dispatch('SELECT_UPDATE', { idx, rowIdx });
    onMouseEnter?.(event);
  }

  function handleCellContextMenu(event: React.MouseEvent<HTMLDivElement>) {
    selectCell();
    onContextMenu?.(event);
  }

  function handleCellDoubleClick(event: React.MouseEvent<HTMLDivElement>) {
    selectCell(true);
    onDoubleClick?.(event);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    onDragOver?.(event);
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
      onClick={isSummaryRow ? onClick : handleCellClick}
      onDoubleClick={isSummaryRow ? onDoubleClick : handleCellDoubleClick}
      onContextMenu={isSummaryRow ? onContextMenu : handleCellContextMenu}
      onDragOver={isSummaryRow ? onDragOver : handleDragOver}
      onMouseDown={isSummaryRow || !enableCellRangeSelection ? onMouseDown : handleCellMouseDown}
      onMouseEnter={isSummaryRow || !enableCellRangeSelection ? onMouseEnter : handleCellMouseEnter}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(Cell) as <R>(props: CellRendererProps<R>) => JSX.Element;
