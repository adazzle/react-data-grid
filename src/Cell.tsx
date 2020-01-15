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
  isSummaryRow,
  lastFrozenColumnIndex,
  rowData,
  rowIdx,
  scrollLeft,
  eventBus,
  onRowClick,
  onRowDoubleClick,
  enableCellRangeSelection
}: CellProps<R>) {
  function selectCell(openEditor?: boolean) {
    eventBus.dispatch('SELECT_CELL', { idx, rowIdx }, openEditor);
  }

  function handleCellClick() {
    selectCell();
    onRowClick?.(rowIdx, rowData, column);
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

  function handleCellDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    selectCell(true);
    onRowDoubleClick?.(rowIdx, rowData, column);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onRowSelectionChange(checked: boolean, isShiftClick: boolean) {
    eventBus.dispatch('SELECT_ROW', { rowIdx, checked, isShiftClick });
  }

  className = classNames(
    column.cellClass,
    'rdg-cell',
    className, {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
    }
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
      row: rowData,
      isRowSelected,
      onRowSelectionChange,
      isSummaryRow
    });
  }

  return (
    <div
      className={className}
      style={style}
      onClick={isSummaryRow ? undefined : handleCellClick}
      onDoubleClick={isSummaryRow ? undefined : handleCellDoubleClick}
      onContextMenu={isSummaryRow ? undefined : handleCellContextMenu}
      onDragOver={isSummaryRow ? undefined : handleDragOver}
      onMouseDown={isSummaryRow || !enableCellRangeSelection ? undefined : handleCellMouseDown}
      onMouseEnter={isSummaryRow || !enableCellRangeSelection ? undefined : handleCellMouseEnter}
    >
      {children}
    </div>
  );
}

export default memo(Cell) as <R>(props: CellProps<R>) => JSX.Element;
