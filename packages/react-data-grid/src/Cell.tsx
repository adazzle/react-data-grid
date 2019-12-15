import React, { memo } from 'react';
import classNames from 'classnames';

import { CellRendererProps, ColumnEventInfo, Position } from './common/types';
import { EventTypes } from './common/enums';
import { isFrozen } from './utils/columnUtils';

export interface CellProps<R> extends CellRendererProps<R> {
  // TODO: Check if these props are required or not. These are most likely set by custom cell renderer
  children?: React.ReactNode;
  className?: string;
}

function Cell<R>({
  rowKey,
  children,
  className,
  column,
  expandableOptions,
  idx,
  isRowSelected,
  isSummaryRow,
  lastFrozenColumnIndex,
  onRowSelectionChange,
  rowData,
  rowIdx,
  scrollLeft,
  eventBus,
  onRowClick,
  onRowDoubleClick,
  onDeleteSubRow,
  onCellExpand,
  enableCellRangeSelection
}: CellProps<R>) {
  const position: Position = { idx, rowIdx };

  function selectCell(openEditor?: boolean) {
    eventBus.dispatch(EventTypes.SELECT_CELL, position, openEditor);
  }

  function handleCellClick() {
    selectCell();
    onRowClick?.(rowIdx, rowData, column);
  }

  function handleCellMouseDown() {
    eventBus.dispatch(EventTypes.SELECT_START, position);

    function handleWindowMouseUp() {
      eventBus.dispatch(EventTypes.SELECT_END);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    }

    window.addEventListener('mouseup', handleWindowMouseUp);
  }

  function handleCellMouseEnter() {
    eventBus.dispatch(EventTypes.SELECT_UPDATE, position);
  }

  function handleCellContextMenu() {
    selectCell();
  }

  function handleCellDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    onRowDoubleClick?.(rowIdx, rowData, column);
    selectCell(true);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function getEvents() {
    if (isSummaryRow) return null;

    const columnEvents = column.events;
    const allEvents: { [key: string]: Function } = {
      onClick: handleCellClick,
      onDoubleClick: handleCellDoubleClick,
      onContextMenu: handleCellContextMenu,
      onDragOver: handleDragOver
    };

    if (enableCellRangeSelection) {
      allEvents.onMouseDown = handleCellMouseDown;
      allEvents.onMouseEnter = handleCellMouseEnter;
    }

    if (!columnEvents) {
      return allEvents;
    }

    const eventInfo: ColumnEventInfo<R> = {
      idx,
      rowIdx,
      column,
      rowId: rowData[rowKey]
    };

    for (const event in columnEvents) {
      const columnEventHandler = columnEvents[event];
      if (columnEventHandler) {
        if (allEvents.hasOwnProperty(event)) {
          const existingEvent = allEvents[event];
          allEvents[event] = (e: Event) => {
            existingEvent(e);
            columnEventHandler(e, eventInfo);
          };
        } else {
          allEvents[event] = (e: Event) => {
            columnEventHandler(e, eventInfo);
          };
        }
      }
    }

    return allEvents;
  }

  const colIsFrozen = isFrozen(column);
  className = classNames(
    column.cellClass,
    'rdg-cell',
    className, {
      'rdg-cell-frozen': colIsFrozen,
      'rdg-cell-frozen-last': colIsFrozen && column.idx === lastFrozenColumnIndex,
      'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
    }
  );

  const style: React.CSSProperties = {
    width: column.width,
    left: column.left
  };

  if (scrollLeft !== undefined) {
    style.transform = `translateX(${scrollLeft}px)`;
  }

  return (
    <div
      className={className}
      style={style}
      {...getEvents()}
    >
      {children || column.cellContentRenderer({
        idx,
        rowIdx,
        rowData,
        column,
        expandableOptions,
        isRowSelected,
        onRowSelectionChange,
        isSummaryRow,
        onDeleteSubRow,
        onCellExpand
      })}
    </div>
  );
}

export default memo(Cell) as <R>(props: CellProps<R>) => JSX.Element;
