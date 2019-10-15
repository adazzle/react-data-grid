import React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

import { SubRowOptions, ColumnEventInfo, CellRenderer, CellRendererProps } from './common/types';
import CellActions from './Cell/CellActions';
import CellExpand from './Cell/CellExpander';
import { isFrozen } from './utils/columnUtils';
import { isPositionStickySupported } from './utils';
import CellValue from './Cell/CellValue';
import ChildRowDeleteButton from './ChildRowDeleteButton';

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
    const { column } = this.props;

    const style: React.CSSProperties = {
      width: column.width,
      left: column.left
    };

    if (!isPositionStickySupported() && isFrozen(column)) {
      style.transform = `translateX(${this.props.scrollLeft}px)`;
    }

    return style;
  }

  getCellClass() {
    const { column, tooltip, expandableOptions } = this.props;
    return classNames(
      column.cellClass,
      'rdg-cell',
      this.props.className, {
        'rdg-cell-frozen': isFrozen(column),
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

  handleDeleteSubRow = (): void => {
    const { cellMetaData: { onDeleteSubRow } } = this.props;

    if (onDeleteSubRow) {
      const { idx, rowIdx, expandableOptions, rowData } = this.props;
      onDeleteSubRow({
        idx,
        rowIdx,
        rowData,
        expandArgs: expandableOptions
      });
    }
  };

  render() {
    const { rowIdx, column, value, tooltip, rowData, isSummaryRow } = this.props;

    if (column.hidden) {
      return null;
    }

    const style = this.getStyle();
    const cellClassName = this.getCellClass();
    const cellValueClassName = classNames('react-grid-Cell__value', { 'cell-tooltip': !!tooltip });

    const cellValue = (
      <CellValue<R>
        rowIdx={rowIdx}
        rowData={rowData}
        column={column}
        value={value}
        isRowSelected={this.props.isRowSelected}
        onRowSelectionChange={this.props.onRowSelectionChange}
        isSummaryRow={isSummaryRow}
      />
    );

    if (isSummaryRow) {
      return (
        <div
          ref={this.cell}
          className={cellClassName}
          style={style}
        >
          <div className={cellValueClassName}>
            <div className="react-grid-Cell__container">
              {cellValue}
            </div>
          </div>
        </div>
      );
    }

    const { children, height, cellControls, expandableOptions, cellMetaData } = this.props;
    const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
    const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
    const marginLeft = expandableOptions && isExpandCell ? expandableOptions.treeDepth * 30 : 0;
    const { onDeleteSubRow, getCellActions } = cellMetaData;

    const cellActions = (
      <CellActions<R>
        column={column}
        rowData={rowData}
        getCellActions={getCellActions}
      />
    );

    const cellExpander = expandableOptions && expandableOptions.canExpand && (
      <CellExpand
        expanded={expandableOptions.expanded}
        onCellExpand={this.handleCellExpand}
      />
    );

    const cellContent = children || (
      <div className={cellValueClassName}>
        {expandableOptions && treeDepth > 0 && isExpandCell && (
          <ChildRowDeleteButton
            treeDepth={treeDepth}
            cellHeight={height}
            onDeleteSubRow={this.handleDeleteSubRow}
            isDeleteSubRowEnabled={!!onDeleteSubRow}
          />
        )}
        <div className="react-grid-Cell__container" style={{ marginLeft }}>
          <span>{cellValue}</span>
          {cellControls}
        </div>
        {tooltip && <span className="cell-tooltip-text">{tooltip}</span>}
      </div>
    );

    const events = this.getEvents();

    return (
      <div
        ref={this.cell}
        className={cellClassName}
        style={style}
        {...events}
      >
        {cellActions}
        {cellExpander}
        {cellContent}
      </div>
    );
  }
}
