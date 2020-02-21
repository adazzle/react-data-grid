import React, { forwardRef, memo } from 'react';
import classNames from 'classnames';

import { CellRendererProps, ColumnEventInfo } from './common/types';
import { isFrozen, wrapEvent } from './utils';

export interface CellProps<R> extends CellRendererProps<R> {
  // TODO: Check if these props are required or not. These are most likely set by custom cell renderer
  children?: React.ReactNode;
  className?: string;
}

function Cell<R>({
  cellMetaData,
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
  ...props
}: CellProps<R>, ref: React.Ref<HTMLDivElement>) {
  function handleCellClick() {
    cellMetaData.onCellClick({ idx, rowIdx });
  }

  function handleCellMouseDown() {
    if (cellMetaData.onCellMouseDown) {
      cellMetaData.onCellMouseDown({ idx, rowIdx });
    }
  }

  function handleCellMouseEnter() {
    if (cellMetaData.onCellMouseEnter) {
      cellMetaData.onCellMouseEnter({ idx, rowIdx });
    }
  }

  function handleCellContextMenu() {
    cellMetaData.onCellContextMenu({ idx, rowIdx });
  }

  function handleCellDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    cellMetaData.onCellDoubleClick({ idx, rowIdx });
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function getEvents() {
    if (isSummaryRow) return null;

    const columnEvents = column.events;
    const allEvents: Record<string, Function> = {
      onClick: handleCellClick,
      onMouseDown: handleCellMouseDown,
      onMouseEnter: handleCellMouseEnter,
      onDoubleClick: handleCellDoubleClick,
      onContextMenu: handleCellContextMenu,
      onDragOver: handleDragOver
    };

    if (!columnEvents) {
      return allEvents;
    }

    const eventInfo: ColumnEventInfo<R> = {
      idx,
      rowIdx,
      column,
      rowId: rowData[cellMetaData.rowKey]
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

  function wrapEvents(events: Record<string, Function> | null) {
    for (const eventName in events) {
      events[eventName] = wrapEvent(
        events[eventName] as React.EventHandler<React.SyntheticEvent>,
        (props as Record<string, Function>)[eventName] as React.EventHandler<React.SyntheticEvent>
      );
    }
    return events;
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
      ref={ref}
      className={className}
      style={style}
      {...props}
      {...wrapEvents(getEvents())}
    >
      {children || column.cellContentRenderer({
        idx,
        rowIdx,
        rowData,
        column,
        cellMetaData,
        expandableOptions,
        isRowSelected,
        onRowSelectionChange,
        isSummaryRow
      })}
    </div>
  );
}

export default memo(forwardRef(Cell)) as <R>(props: CellProps<R>) => JSX.Element;
