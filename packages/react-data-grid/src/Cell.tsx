import React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

import { SubRowOptions, ColumnEventInfo, CellRenderer, CellRendererProps } from './common/types';
import CellActions from './Cell/CellActions';
import CellExpand from './Cell/CellExpander';
import CellContent from './Cell/CellContent';
import { isFrozen } from './utils/columnUtils';
import { isPositionStickySupported } from './utils';

function getSubRowOptions<R>({ rowIdx, idx, rowData, expandableOptions: expandArgs }: CellProps<R>): SubRowOptions<R> {
  return { rowIdx, idx, rowData, expandArgs };
}

export interface CellProps<R> extends CellRendererProps<R> {
  // TODO: Check if these props are required or not. These are most likely set by custom cell renderer
  className?: string;
  tooltip?: string | null;
  cellControls?: unknown;
}

export default class Cell<R> extends React.Component<CellProps<R>> implements CellRenderer {
  static defaultProps = {
    value: ''
  };

  private readonly cell = React.createRef<HTMLDivElement>();

  shouldComponentUpdate(nextProps: CellProps<R>) {
    // TODO: optimize cellMetatData as it is recreated whenever `ReactDataGrid` renders
    // On the modern browsers we are using position sticky so scrollLeft/setScrollLeft is not required
    // On the legacy browsers scrollLeft sets the initial position so it can be safely ignored in the subsequent renders. Scrolling is handled by the setScrollLeft method
    const { scrollLeft, ...rest } = this.props;
    const { scrollLeft: nextScrollLeft, ...nextRest } = nextProps;

    return !shallowEqual(rest, nextRest);
  }

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
    const { column, height, scrollLeft } = this.props;

    return {
      height,
      width: column.width,
      left: column.left,
      transform: !isPositionStickySupported() && isFrozen(column) ? `translateX(${scrollLeft}px)` : 'none'
    };
  }

  getCellClass() {
    const { idx, column, lastFrozenColumnIndex, tooltip, expandableOptions } = this.props;
    return classNames(
      column.cellClass,
      'react-grid-Cell',
      this.props.className, {
        'react-grid-Cell--frozen': isFrozen(column),
        'rdg-last--frozen': lastFrozenColumnIndex === idx,
        'has-tooltip': !!tooltip,
        'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
      }
    );
  }

  setScrollLeft(scrollLeft: number) {
    const node = this.cell.current;
    if (node) {
      node.style.transform = `translateX(${scrollLeft}px)`;
    }
  }

  removeScroll() {
    const node = this.cell.current;
    if (node) {
      node.style.transform = 'none';
    }
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
    const { idx, rowIdx, column, value, tooltip, children, height, cellControls, expandableOptions, cellMetaData, rowData } = this.props;
    if (column.hidden) {
      return null;
    }

    const style = this.getStyle();
    const className = this.getCellClass();
    const cellContent = children || (
      <CellContent<R>
        idx={idx}
        rowIdx={rowIdx}
        column={column}
        rowData={rowData}
        value={value}
        tooltip={tooltip}
        expandableOptions={expandableOptions}
        height={height}
        onDeleteSubRow={cellMetaData.onDeleteSubRow}
        cellControls={cellControls}
        isRowSelected={this.props.isRowSelected}
        onRowSelectionChange={this.props.onRowSelectionChange}
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
        ref={this.cell}
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
