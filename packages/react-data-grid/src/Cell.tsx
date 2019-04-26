import React from 'react';
import classNames from 'classnames';
import { isElement, isValidElementType } from 'react-is';

import { SubRowOptions, FormatterProps, ColumnEventInfo, CellRenderer, CellRendererProps } from './common/types';
import { SimpleCellFormatter } from './formatters';
import CellAction from './CellAction';
import CellExpand from './CellExpander';
import ChildRowDeleteButton from './ChildRowDeleteButton';
import { isFrozen } from './ColumnUtils';

const getSubRowOptions = ({ rowIdx, idx, rowData, expandableOptions: expandArgs }: Props): SubRowOptions => ({ rowIdx, idx, rowData, expandArgs });

interface Props extends CellRendererProps {
  // TODO: Check if these props are required or not. These are most likely set by custom cell renderer
  className?: string;
  tooltip?: string;
  cellControls?: unknown;
}

export default class Cell extends React.PureComponent<Props> implements CellRenderer {
  static defaultProps = {
    value: ''
  };

  private readonly cell = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.checkScroll();
  }

  componentDidUpdate(prevProps: Props) {
    const { column } = this.props;
    if (isFrozen(prevProps.column) && !isFrozen(column)) {
      this.removeScroll();
    }
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
    const meta = this.props.cellMetaData;
    meta.onCellExpand(getSubRowOptions(this.props));
  };

  handleDeleteSubRow = () => {
    const meta = this.props.cellMetaData;
    if (meta.onDeleteSubRow) {
      meta.onDeleteSubRow(getSubRowOptions(this.props));
    }
  };

  handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  getStyle(): React.CSSProperties {
    return {
      position: 'absolute',
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left
    };
  }

  getRowData() {
    const { rowData } = this.props;
    return typeof rowData.toJSON === 'function' ? rowData.toJSON() : rowData;
  }

  getFormatterDependencies() {
    // convention based method to get corresponding Id or Name of any Name or Id property
    const { getRowMetaData } = this.props.column;
    if (getRowMetaData) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of ReactDataGrid. Instead access row prop of formatter');
      }
      return getRowMetaData(this.getRowData(), this.props.column);
    }
  }

  getCellClass() {
    const { idx, column, lastFrozenColumnIndex, isRowSelected, tooltip, expandableOptions } = this.props;
    return classNames(
      column.cellClass,
      'react-grid-Cell',
      this.props.className, {
        'react-grid-Cell--frozen': isFrozen(column),
        'rdg-last--frozen': lastFrozenColumnIndex === idx,
        'row-selected': isRowSelected,
        'has-tooltip': !!tooltip,
        'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0
      }
    );
  }

  checkScroll() {
    const { scrollLeft, column } = this.props;
    const node = this.cell.current;
    if (isFrozen(column) && node && node.style.transform != null) {
      this.setScrollLeft(scrollLeft);
    }
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
      node.style.transform = null;
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
        const eventInfo: ColumnEventInfo = {
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

  getCellActions() {
    const { cellMetaData, column, rowData } = this.props;
    if (cellMetaData.getCellActions) {
      const cellActionButtons = cellMetaData.getCellActions(column, rowData);
      if (cellActionButtons && cellActionButtons.length > 0) {
        return cellActionButtons.map((action, index) => {
          return <CellAction key={index} isFirst={index === 0} {...action} />;
        });
      }
    }
    return null;
  }

  renderCellContent() {
    let cellContent;
    const { value, column, height, tooltip, isScrolling, expandableOptions, cellMetaData, rowIdx } = this.props;
    const Formatter = column.formatter;
    const cellProps: FormatterProps = {
      rowIdx,
      value,
      isScrolling,
      column,
      row: this.getRowData(),
      dependentValues: this.getFormatterDependencies()
    };

    if (isElement(Formatter)) {
      cellContent = React.cloneElement(Formatter, cellProps);
    } else if (isValidElementType(Formatter)) {
      cellContent = <Formatter {...cellProps} />;
    } else {
      cellContent = <SimpleCellFormatter value={value as string} />;
    }
    const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
    const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
    const marginLeft = expandableOptions && isExpandCell ? expandableOptions.treeDepth * 30 : 0;

    const isDeleteSubRowEnabled = !!cellMetaData.onDeleteSubRow;
    const cellDeleter = expandableOptions && treeDepth > 0 && isExpandCell && (
      <ChildRowDeleteButton
        treeDepth={treeDepth}
        cellHeight={height}
        siblingIndex={expandableOptions.subRowDetails.siblingIndex}
        numberSiblings={expandableOptions.subRowDetails.numberSiblings}
        onDeleteSubRow={this.handleDeleteSubRow}
        isDeleteSubRowEnabled={isDeleteSubRowEnabled}
      />
    );

    const cellTooltip = tooltip && <span className="cell-tooltip-text">{tooltip}</span>;
    const classes = classNames('react-grid-Cell__value',
      { 'cell-tooltip': !!tooltip }
    );

    return (
      <div className={classes}>
        {cellDeleter}
        <div style={{ marginLeft, position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
          <span>{cellContent}</span>
          {this.props.cellControls}
        </div>
        {cellTooltip}
      </div>
    );
  }

  render() {
    const { column, children, expandableOptions } = this.props;
    if (column.hidden) {
      return null;
    }

    const style = this.getStyle();
    const className = this.getCellClass();
    const cellActionButtons = this.getCellActions();
    const cellContent = children || this.renderCellContent();
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
        {cellActionButtons}
        {cellExpander}
        {cellContent}
      </div>
    );
  }
}
