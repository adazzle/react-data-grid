import classNames from 'classnames';
import React from 'react';

import CellActions from './Cell/CellActions';
import CellContent from './Cell/CellContent';
import CellExpand from './Cell/CellExpander';
import { CellRendererProps, ColumnEventInfo, SubRowOptions } from './common/types';
import { isFrozen } from './utils/columnUtils';

function getSubRowOptions<R>({ rowIdx, idx, rowData, expandableOptions: expandArgs }: CellProps<R>): SubRowOptions<R> {
  return { rowIdx, idx, rowData, expandArgs };
}

export interface CellProps<R> extends CellRendererProps<R> {
  // TODO: Check if these props are required or not. These are most likely set by custom cell renderer
  className?: string;
  tooltip?: string | null;
  cellControls?: unknown;
}

export default class Cell<R> extends React.PureComponent<CellProps<R>> {
  static defaultProps = {
    value: ''
  };

  handleCellClick = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    cellMetaData.onCellClick({ idx, rowIdx });
  };

  handleCellMouseDown = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (cellMetaData.onCellMouseDown) {
      cellMetaData.onCellMouseDown({ idx, rowIdx });
    }
  };

  handleCellMouseEnter = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (cellMetaData.onCellMouseEnter) {
      cellMetaData.onCellMouseEnter({ idx, rowIdx });
    }
  };

  handleCellContextMenu = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    cellMetaData.onCellContextMenu({ idx, rowIdx });
  };

  handleCellDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { idx, rowIdx, cellMetaData } = this.props;
    cellMetaData.onCellDoubleClick({ idx, rowIdx });
  };

  handleCellExpand = () => {
    const { onCellExpand } = this.props.cellMetaData;
    if (onCellExpand) {
      onCellExpand(getSubRowOptions(this.props));
    }
  };

  handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  getStyle(): React.CSSProperties {
    const { column, scrollLeft } = this.props;

    const style: React.CSSProperties = {
      width: column.width,
      left: column.left
    };

    if (scrollLeft !== undefined) {
      style.transform = `translateX(${scrollLeft}px)`;
    }

    return style;
  }

  getCellClass() {
    const { column, tooltip, expandableOptions } = this.props;
    const colIsFrozen = isFrozen(column);
    return classNames(
      column.cellClass,
      'rdg-cell',
      this.props.className, {
        'rdg-cell-frozen': colIsFrozen,
        'rdg-cell-frozen-last': colIsFrozen && column.idx === this.props.lastFrozenColumnIndex,
        'has-tooltip': !!tooltip,
        'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
      }
    );
  }

  getEvents() {
    const { column, cellMetaData, idx, rowIdx, rowData } = this.props;
    const columnEvents = column.events;
    const allEvents: { [key: string]: Function } = {
      onClick: this.handleCellClick,
      onMouseDown: this.handleCellMouseDown,
      onMouseEnter: this.handleCellMouseEnter,
      onDoubleClick: this.handleCellDoubleClick,
      onContextMenu: this.handleCellContextMenu,
      onDragOver: this.handleDragOver
    };

    if (!columnEvents) {
      return allEvents;
    }

    for (const event in columnEvents) {
      const columnEventHandler = columnEvents[event];
      if (columnEventHandler) {
        const eventInfo: ColumnEventInfo<R> = {
          idx,
          rowIdx,
          column,
          rowId: rowData[cellMetaData.rowKey]
        };
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

  render() {
    const { idx, rowIdx, column, value, tooltip, children, cellControls, expandableOptions, cellMetaData, rowData, isSummaryRow } = this.props;
    if (column.hidden) {
      return null;
    }

    const style = this.getStyle();
    const className = this.getCellClass();

    if (isSummaryRow) {
      return (
        <div className={className} style={style}>
          <CellContent<R>
            idx={idx}
            rowIdx={rowIdx}
            column={column}
            rowData={rowData}
            value={value}
            expandableOptions={expandableOptions}
            isRowSelected={false}
            onRowSelectionChange={this.props.onRowSelectionChange}
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
        isRowSelected={this.props.isRowSelected}
        onRowSelectionChange={this.props.onRowSelectionChange}
        isSummaryRow={isSummaryRow}
      />
    );
    const events = this.getEvents();
    const cellExpander = expandableOptions && expandableOptions.canExpand && (
      <CellExpand
        expanded={expandableOptions.expanded}
        onCellExpand={this.handleCellExpand}
      />
    );

    return (
      <div
        className={className}
        style={style}
        {...events}
      >
        <CellActions<R>
          column={column}
          rowData={rowData}
          getCellActions={cellMetaData.getCellActions}
        />
        {cellExpander}
        {cellContent}
      </div>
    );
  }
}
