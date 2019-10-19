import React, { memo } from 'react';
import classNames from 'classnames';

import { CellRendererProps, ColumnEventInfo } from './common/types';
import { isFrozen } from './utils/columnUtils';

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
  value = ''
}: CellProps<R>) {
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

  function getStyle(): React.CSSProperties {
    const style: React.CSSProperties = {
      width: column.width,
      left: column.left
    };

    if (scrollLeft !== undefined) {
      style.transform = `translateX(${scrollLeft}px)`;
    }

    return style;
  }

  function getCellClass() {
    const colIsFrozen = isFrozen(column);
    return classNames(
      column.cellClass,
      'rdg-cell',
      className, {
        'rdg-cell-frozen': colIsFrozen,
        'rdg-cell-frozen-last': colIsFrozen && column.idx === lastFrozenColumnIndex,
        'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
      }
    );
  }

  function getEvents() {
    if (isSummaryRow) return null;

    const columnEvents = column.events;
    const allEvents: { [key: string]: Function } = {
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

  // FIXME: is this property used?
  if (column.hidden) {
    return null;
  }

  return (
    <div
      className={getCellClass()}
      style={getStyle()}
      {...getEvents()}
    >
      {children || column.cellContentRenderer({
        idx,
        rowIdx,
        rowData,
        column,
        value,
        cellMetaData,
        expandableOptions,
        isRowSelected,
        onRowSelectionChange,
        isSummaryRow
      })}
    </div>
  );
}

export default memo(Cell) as <R>(props: CellProps<R>) => JSX.Element;
