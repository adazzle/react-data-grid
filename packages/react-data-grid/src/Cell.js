import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isElement, isValidElementType } from 'react-is';

import { isFunction } from './common/utils';
import { SimpleCellFormatter } from './formatters';
import CellAction from './CellAction';
import CellExpand from './CellExpander';
import ChildRowDeleteButton from './ChildRowDeleteButton';
import { isFrozen } from './ColumnUtils';

const getSubRowOptions = ({ rowIdx, idx, rowData, expandableOptions: expandArgs }) => ({ rowIdx, idx, rowData, expandArgs });

export default class Cell extends React.PureComponent {
  static propTypes = {
    rowIdx: PropTypes.number.isRequired,
    idx: PropTypes.number.isRequired,
    isSelected: PropTypes.bool,
    wasPreviouslySelected: PropTypes.bool,
    selectedColumn: PropTypes.object,
    height: PropTypes.number,
    column: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.bool]),
    isExpanded: PropTypes.bool,
    isRowSelected: PropTypes.bool,
    cellMetaData: PropTypes.object.isRequired,
    handleDragStart: PropTypes.func,
    className: PropTypes.string,
    cellControls: PropTypes.any,
    rowData: PropTypes.object.isRequired,
    forceUpdate: PropTypes.bool,
    expandableOptions: PropTypes.object.isRequired,
    tooltip: PropTypes.string,
    isScrolling: PropTypes.bool,
    isCellValueChanging: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    scrollLeft: PropTypes.number.isRequired
  };

  static defaultProps = {
    isExpanded: false,
    value: '',
    isCellValueChanging: (value, nextValue) => value !== nextValue
  };

  cell = React.createRef();

  state = {
    isCellValueChanging: false,
    isLockChanging: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isCellValueChanging: this.props.isCellValueChanging(this.props.value, nextProps.value),
      isLockChanging: isFrozen(this.props.column) !== isFrozen(nextProps.column)
    });
  }

  componentDidMount() {
    this.checkScroll();
  }

  componentDidUpdate() {
    if (this.state.isLockChanging && !isFrozen(this.props.column)) {
      this.removeScroll();
    }
  }

  handleCellClick = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellClick)) {
      cellMetaData.onCellClick({ idx, rowIdx });
    }
  };

  handleCellMouseDown = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellMouseDown)) {
      cellMetaData.onCellMouseDown({ idx, rowIdx });
    }
  };

  handleCellMouseEnter = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellMouseEnter)) {
      cellMetaData.onCellMouseEnter({ idx, rowIdx });
    }
  };

  handleCellContextMenu = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellContextMenu)) {
      cellMetaData.onCellContextMenu({ idx, rowIdx });
    }
  };

  handleCellDoubleClick = (e) => {
    e.stopPropagation();
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellDoubleClick)) {
      cellMetaData.onCellDoubleClick({ idx, rowIdx });
    }
  };

  handleCellExpand = () => {
    const meta = this.props.cellMetaData;
    if (meta != null && isFunction(meta.onCellExpand)) {
      meta.onCellExpand(getSubRowOptions(this.props));
    }
  };

  handleDeleteSubRow = () => {
    const meta = this.props.cellMetaData;
    if (meta != null && isFunction(meta.onDeleteSubRow)) {
      meta.onDeleteSubRow(getSubRowOptions(this.props));
    }
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  getStyle() {
    return {
      position: 'absolute',
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left
    };
  }

  getRowData = (props = this.props) => {
    return props.rowData.toJSON ? props.rowData.toJSON() : props.rowData;
  };

  getFormatterDependencies() {
    // convention based method to get corresponding Id or Name of any Name or Id property
    const { getRowMetaData } = this.props.column;
    if (isFunction(getRowMetaData)) {
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
        'rdg-child-cell': expandableOptions && expandableOptions.subRowDetails && expandableOptions.treeDepth > 0,
        'last-column': column.isLastColumn
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

  setScrollLeft = (scrollLeft) => {
    const node = this.cell.current;
    if (node) {
      node.style.transform = `translateX(${scrollLeft}px)`;
    }
  };

  removeScroll = () => {
    const node = this.cell.current;
    if (node) {
      node.style.transform = null;
    }
  };

  createColumEventCallBack(onColumnEvent, info) {
    return (e) => {
      onColumnEvent(e, info);
    };
  }

  createCellEventCallBack(gridEvent, columnEvent) {
    return (e) => {
      gridEvent(e);
      columnEvent(e);
    };
  }

  createEventDTO(gridEvents, columnEvents, onColumnEvent) {
    const allEvents = { ...gridEvents };

    for (const eventKey in columnEvents) {
      if (columnEvents.hasOwnProperty(eventKey)) {
        const eventInfo = { idx: this.props.idx, rowIdx: this.props.rowIdx, rowId: this.props.rowData[this.props.cellMetaData.rowKey], name: eventKey };
        const eventCallback = this.createColumEventCallBack(onColumnEvent, eventInfo);

        if (allEvents.hasOwnProperty(eventKey)) {
          const currentEvent = allEvents[eventKey];
          allEvents[eventKey] = this.createCellEventCallBack(currentEvent, eventCallback);
        } else {
          allEvents[eventKey] = eventCallback;
        }
      }
    }

    return allEvents;
  }

  getEvents() {
    const { column, cellMetaData } = this.props;
    const columnEvents = column ? { ...column.events } : undefined;
    const onColumnEvent = cellMetaData ? cellMetaData.onColumnEvent : undefined;
    const gridEvents = {
      onClick: this.handleCellClick,
      onMouseDown: this.handleCellMouseDown,
      onMouseEnter: this.handleCellMouseEnter,
      onDoubleClick: this.handleCellDoubleClick,
      onContextMenu: this.handleCellContextMenu,
      onDragOver: this.handleDragOver
    };

    if (!columnEvents || !onColumnEvent) {
      return gridEvents;
    }

    return this.createEventDTO(gridEvents, columnEvents, onColumnEvent);
  }

  getCellActions() {
    const { cellMetaData, column, rowData } = this.props;
    if (isFunction(cellMetaData.getCellActions)) {
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
    const { value, column, height, tooltip, isScrolling, isExpanded, expandableOptions, cellMetaData } = this.props;
    const Formatter = column.formatter;
    const cellProps = {
      value,
      isScrolling,
      isExpanded,
      column,
      row: this.getRowData(),
      dependentValues: this.getFormatterDependencies()
    };

    if (isElement(Formatter)) {
      cellContent = React.cloneElement(Formatter, cellProps);
    } else if (isValidElementType(Formatter)) {
      cellContent = <Formatter {...cellProps} />;
    } else {
      cellContent = <SimpleCellFormatter value={value} />;
    }
    const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
    const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
    const marginLeft = expandableOptions && isExpandCell ? expandableOptions.treeDepth * 30 : 0;

    const isDeleteSubRowEnabled = !!cellMetaData.onDeleteSubRow;
    const cellDeleter = treeDepth > 0 && isExpandCell && (
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
    const { column, height, children, expandableOptions } = this.props;
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
        height={height}
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
