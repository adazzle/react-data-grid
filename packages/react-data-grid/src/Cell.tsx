import React, { memo } from 'react';
import classNames from 'classnames';

import CellActions from './Cell/CellActions';
import CellContent from './Cell/CellContent';
import CellExpand from './Cell/CellExpander';
import { CellRendererProps, ColumnEventInfo } from './common/types';
import { isFrozen } from './utils/columnUtils';

export interface CellProps<R> extends CellRendererProps<R> {
  children?: React.ReactNode;
  // TODO: Check if these props are required or not. These are most likely set by custom cell renderer
  className?: string;
  tooltip?: string | null;
  cellControls?: unknown;
}

function Cell<R>({
  cellControls,
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
  tooltip,
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

  function handleCellExpand() {
    if (cellMetaData.onCellExpand) {
      cellMetaData.onCellExpand({ rowIdx, idx, rowData, expandArgs: expandableOptions });
    }
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
        'has-tooltip': !!tooltip,
        'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
      }
    );
  }

  function getEvents() {
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

  if (column.hidden) {
    return null;
  }

  if (isSummaryRow) {
    return (
      <div
        className={getCellClass()}
        style={getStyle()}
      >
        <CellContent<R>
          idx={idx}
          rowIdx={rowIdx}
          column={column}
          rowData={rowData}
          value={value}
          expandableOptions={expandableOptions}
          isRowSelected={false}
          onRowSelectionChange={onRowSelectionChange}
          isSummaryRow
        />
      </div>
    );
  }

  const cellContent = children || (
    <CellContent<R>
      idx={idx}
      rowIdx={rowIdx}
      column={column}
      rowData={rowData}
      value={value}
      tooltip={tooltip}
      expandableOptions={expandableOptions}
      onDeleteSubRow={cellMetaData.onDeleteSubRow}
      cellControls={cellControls}
      isRowSelected={isRowSelected}
      onRowSelectionChange={onRowSelectionChange}
      isSummaryRow={isSummaryRow}
    />
  );

  const cellExpander = expandableOptions && expandableOptions.canExpand && (
    <CellExpand
      expanded={expandableOptions.expanded}
      onCellExpand={handleCellExpand}
    />
  );

  return (
    <div
      className={getCellClass()}
      style={getStyle()}
      {...getEvents()}
    >
      {cellMetaData.getCellActions && (
        <CellActions<R>
          column={column}
          rowData={rowData}
          getCellActions={cellMetaData.getCellActions}
        />
      )}
      {cellExpander}
      {cellContent}
    </div>
  );
}

export default memo(Cell) as <R>(props: CellProps<R>) => JSX.Element;
