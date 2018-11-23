import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';
import {isFunction} from 'common/utils';
import SimpleCellFormatter from './formatters/SimpleCellFormatter';
import createObjectWithProperties from './createObjectWithProperties';
import CellAction from './CellAction';
import CellExpand from './CellExpander';
import ChildRowDeleteButton from './ChildRowDeleteButton';
import {isFrozen} from './ColumnUtils';
require('../../../themes/react-data-grid-cell.css');

// The list of the propTypes that we want to include in the Cell div
const knownDivPropertyKeys = ['height', 'value'];

class Cell extends React.PureComponent {
  static propTypes = {
    rowIdx: PropTypes.number.isRequired,
    idx: PropTypes.number.isRequired,
    isSelected: PropTypes.bool,
    wasPreviouslySelected: PropTypes.bool,
    isEditorEnabled: PropTypes.bool,
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

  onCellClick = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellClick)) {
      cellMetaData.onCellClick({ idx, rowIdx });
    }
  };

  onCellMouseDown = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellMouseDown)) {
      cellMetaData.onCellMouseDown({ idx, rowIdx });
    }
  };

  onCellMouseEnter = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellMouseEnter)) {
      cellMetaData.onCellMouseEnter({ idx, rowIdx });
    }
  };

  onCellContextMenu = () => {
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellContextMenu)) {
      cellMetaData.onCellContextMenu({ idx, rowIdx });
    }
  };

  onCellDoubleClick = (e) => {
    e.stopPropagation();
    const { idx, rowIdx, cellMetaData } = this.props;
    if (isFunction(cellMetaData.onCellDoubleClick)) {
      cellMetaData.onCellDoubleClick({ idx, rowIdx });
    }
  };

  onCellExpand = (e) => {
    e.stopPropagation();
    const meta = this.props.cellMetaData;
    if (meta != null && meta.onCellExpand != null) {
      meta.onCellExpand({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.props.rowData, expandArgs: this.props.expandableOptions });
    }
  };

  onCellKeyDown = (e) => {
    if (this.canExpand() && e.key === 'Enter') {
      this.onCellExpand(e);
    }
  };

  onDeleteSubRow = () => {
    const meta = this.props.cellMetaData;
    if (meta != null && meta.onDeleteSubRow != null) {
      meta.onDeleteSubRow({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.props.rowData, expandArgs: this.props.expandableOptions });
    }
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  getStyle = () => {
    const style = {
      position: 'absolute',
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left
    };
    return style;
  };

  getFormatter = () => {
    return this.props.column.formatter;
  };

  getRowData = (props = this.props) => {
    return props.rowData.toJSON ? props.rowData.toJSON() : props.rowData;
  };

  getFormatterDependencies = () => {
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (typeof this.props.column.getRowMetaData === 'function') {
      if (process.env.NODE_ENV === 'development') {
        console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of ReactDataGrid. Instead access row prop of formatter');
      }
      return this.props.column.getRowMetaData(this.getRowData(), this.props.column);
    }
  };

  getCellClass = () => {
    const {idx, lastFrozenColumnIndex} = this.props;
    const className = joinClasses(
      this.props.column.cellClass,
      'react-grid-Cell',
      this.props.className,
      isFrozen(this.props.column) ? 'react-grid-Cell--frozen' : null,
      lastFrozenColumnIndex === idx ? 'rdg-last--frozen' : null
    );
    const extraClasses = joinClasses({
      'row-selected': this.props.isRowSelected,
      editing: this.isEditorEnabled(),
      'cell-tooltip': this.props.tooltip ? true : false,
      'rdg-child-cell': this.props.expandableOptions && this.props.expandableOptions.subRowDetails && this.props.expandableOptions.treeDepth > 0,
      'last-column': this.props.column.isLastColumn
    });
    return joinClasses(className, extraClasses);
  };

  getUpdateCellClass = () => {
    return this.props.column.getUpdateCellClass
      ? this.props.column.getUpdateCellClass(this.props.selectedColumn, this.props.column, this.state.isCellValueChanging)
      : '';
  };

  isEditorEnabled = () => {
    return this.props.isEditorEnabled === true;
  };

  checkScroll() {
    const {scrollLeft, column} = this.props;
    const node = this.node;
    if (isFrozen(column) && node && node.style.transform != null) {
      this.setScrollLeft(scrollLeft);
    }
  }

  setScrollLeft = (scrollLeft) => {
    const node = this.node;
    if (node) {
      const transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  };


  removeScroll = () => {
    const node = this.node;
    if (node) {
      node.style.webkitTransform = null;
      node.style.transform = null;
    }
  };

  canExpand = () => {
    return this.props.expandableOptions && this.props.expandableOptions.canExpand;
  };

  createColumEventCallBack = (onColumnEvent, info) => {
    return (e) => {
      onColumnEvent(e, info);
    };
  };

  createCellEventCallBack = (gridEvent, columnEvent) => {
    return (e) => {
      gridEvent(e);
      columnEvent(e);
    };
  };

  createEventDTO = (gridEvents, columnEvents, onColumnEvent) => {
    const allEvents = Object.assign({}, gridEvents);

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
  };

  getEvents = () => {
    const columnEvents = this.props.column ? Object.assign({}, this.props.column.events) : undefined;
    const onColumnEvent = this.props.cellMetaData ? this.props.cellMetaData.onColumnEvent : undefined;
    const gridEvents = {
      onClick: this.onCellClick,
      onMouseDown: this.onCellMouseDown,
      onMouseEnter: this.onCellMouseEnter,
      onDoubleClick: this.onCellDoubleClick,
      onContextMenu: this.onCellContextMenu,
      onDragOver: this.onDragOver
    };

    if (!columnEvents || !onColumnEvent) {
      return gridEvents;
    }

    return this.createEventDTO(gridEvents, columnEvents, onColumnEvent);
  };

  getKnownDivProps = () => {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  };

  getCellActions() {
    const {cellMetaData, column, rowData} = this.props;
    if (cellMetaData && cellMetaData.getCellActions) {
      const cellActionButtons = cellMetaData.getCellActions(column, rowData);
      if (cellActionButtons && cellActionButtons.length) {
        return cellActionButtons.map((action, index) => {
          return <CellAction key={index} action={action} isFirst={index === 0} />;
        });
      }
      return null;
    }
    return null;
  }

  setCellRef = (node) => {
    this.node = node;
  };


  renderCellContent = (props) => {
    let CellContent;
    const Formatter = this.getFormatter();
    if (React.isValidElement(Formatter)) {
      CellContent = React.cloneElement(Formatter, {...props, dependentValues: this.getFormatterDependencies(), row: this.getRowData()});
    } else if (isFunction(Formatter)) {
      CellContent = <Formatter value={this.props.value} dependentValues={this.getFormatterDependencies()} isScrolling={this.props.isScrolling} row={this.getRowData()}/>;
    } else {
      CellContent = <SimpleCellFormatter value={this.props.value} />;
    }
    const isExpandCell = this.props.expandableOptions ? this.props.expandableOptions.field === this.props.column.key : false;
    const treeDepth = this.props.expandableOptions ? this.props.expandableOptions.treeDepth : 0;
    const marginLeft = this.props.expandableOptions && isExpandCell ? (this.props.expandableOptions.treeDepth * 30) : 0;

    let cellDeleter;

    const isDeleteSubRowEnabled = this.props.cellMetaData.onDeleteSubRow ? true : false;

    if (treeDepth > 0 && isExpandCell) {
      cellDeleter = <ChildRowDeleteButton treeDepth={treeDepth} cellHeight={this.props.height} siblingIndex={this.props.expandableOptions.subRowDetails.siblingIndex} numberSiblings={this.props.expandableOptions.subRowDetails.numberSiblings} onDeleteSubRow={this.onDeleteSubRow} isDeleteSubRowEnabled={isDeleteSubRowEnabled} />;
    }
    return (
      <div className="react-grid-Cell__value">
        {cellDeleter}
        <div style={{ marginLeft, position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
          <span>{CellContent}</span>
          {this.props.cellControls}
        </div>
      </div>
    );
  };

  render() {
    if (this.props.column.hidden) {
      return null;
    }

    const style = this.getStyle();

    const className = this.getCellClass();

    const cellActionButtons = this.getCellActions();
    const {value, column, rowIdx, isExpanded, isScrolling} = this.props;
    const cellContent = this.props.children || this.renderCellContent({
      value,
      column,
      rowIdx,
      isExpanded,
      isScrolling
    });

    const events = this.getEvents();
    const tooltip = this.props.tooltip ? (<span className="cell-tooltip-text">{this.props.tooltip}</span>) : null;

    const cellExpander =  this.canExpand() && (
      <CellExpand expandableOptions={this.props.expandableOptions} onCellExpand={this.onCellExpand} />
    );

    return (
      <div
        {...this.getKnownDivProps()}
        className={className}
        style={style}
        {...events}
        ref={this.setCellRef}
      >
        {cellActionButtons}
        {cellExpander}
        {cellContent}
        {tooltip}
      </div>
    );
  }
}

export default Cell;
