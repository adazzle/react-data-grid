import _ from 'underscore';
const React = require('react');
import PropTypes from 'prop-types';
const joinClasses = require('classnames');
const EditorContainer = require('./editors/EditorContainer');
const ExcelColumn = require('./PropTypeShapes/ExcelColumn');
const isFunction = require('./utils/isFunction');
const CellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');
const SimpleCellFormatter = require('./formatters/SimpleCellFormatter');
const ColumnUtils = require('./ColumnUtils');
const createObjectWithProperties = require('./createObjectWithProperties');
import CellAction from './CellAction';
import CellExpand from './CellExpand';
import ChildRowDeleteButton from './ChildRowDeleteButton';
require('../../../themes/react-data-grid-cell.css');

// The list of the propTypes that we want to include in the Cell div
const knownDivPropertyKeys = ['height', 'tabIndex', 'value'];

class Cell extends React.Component {
  static propTypes = {
    rowIdx: PropTypes.number.isRequired,
    idx: PropTypes.number.isRequired,
    selected: PropTypes.shape({
      idx: PropTypes.number.isRequired
    }),
    selectedColumn: PropTypes.object,
    height: PropTypes.number,
    tabIndex: PropTypes.number,
    column: PropTypes.shape(ExcelColumn).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.bool]),
    isExpanded: PropTypes.bool,
    isRowSelected: PropTypes.bool,
    cellMetaData: PropTypes.shape(CellMetaDataShape).isRequired,
    handleDragStart: PropTypes.func,
    className: PropTypes.string,
    cellControls: PropTypes.any,
    rowData: PropTypes.object.isRequired,
    forceUpdate: PropTypes.bool,
    expandableOptions: PropTypes.object.isRequired,
    isScrolling: PropTypes.bool.isRequired,
    tooltip: PropTypes.string,
    isCellValueChanging: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  static defaultProps = {
    tabIndex: 0,
    isExpanded: false,
    value: '',
    isCellValueChanging: (value, nextValue) => value !== nextValue
  };

  state = {
    isCellValueChanging: false,
    isLockChanging: false
  };

  componentDidMount() {
    this.checkFocus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isCellValueChanging: this.props.isCellValueChanging(this.props.value, nextProps.value),
      isLockChanging: this.props.column.locked !== nextProps.column.locked
    });
  }

  componentDidUpdate() {
    this.checkFocus();
    let dragged = this.props.cellMetaData.dragged;
    if (dragged && dragged.complete === true) {
      this.props.cellMetaData.handleTerminateDrag();
    }
    if (this.state.isCellValueChanging && this.props.selectedColumn != null) {
      this.applyUpdateClass();
    }
    if (this.state.isLockChanging && !this.props.column.locked) {
      this.removeScroll();
    }
  }

  shouldComponentUpdate(nextProps: any): boolean {
    let shouldUpdate = this.props.column.width !== nextProps.column.width
      || this.props.column.left !== nextProps.column.left
      || this.props.column.cellClass !== nextProps.column.cellClass
      || this.props.height !== nextProps.height
      || this.props.rowIdx !== nextProps.rowIdx
      || this.isCellSelectionChanging(nextProps)
      || this.isDraggedCellChanging(nextProps)
      || this.isCopyCellChanging(nextProps)
      || this.props.isRowSelected !== nextProps.isRowSelected
      || this.isSelected()
      || this.props.isCellValueChanging(this.props.value, nextProps.value)
      || this.props.forceUpdate === true
      || this.props.className !== nextProps.className
      || this.props.expandableOptions !== nextProps.expandableOptions
      || this.hasChangedDependentValues(nextProps)
      || this.props.column.locked !== nextProps.column.locked;
    return shouldUpdate;
  }

  onCellClick = (e) => {
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellClick && typeof (meta.onCellClick) === 'function') {
      meta.onCellClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
    }
  };

  onCellFocus = () => {
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellFocus && typeof (meta.onCellFocus) === 'function') {
      meta.onCellFocus({ rowIdx: this.props.rowIdx, idx: this.props.idx });
    }
  };

  onCellContextMenu = () => {
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellContextMenu && typeof (meta.onCellContextMenu) === 'function') {
      meta.onCellContextMenu({ rowIdx: this.props.rowIdx, idx: this.props.idx });
    }
  };

  onCellDoubleClick = (e) => {
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellDoubleClick && typeof (meta.onCellDoubleClick) === 'function') {
      meta.onCellDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
    }
  };

  onCellExpand = (e) => {
    e.stopPropagation();
    let meta = this.props.cellMetaData;
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
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onDeleteSubRow != null) {
      meta.onDeleteSubRow({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.props.rowData, expandArgs: this.props.expandableOptions });
    }
  };

  onDragHandleDoubleClick = (e) => {
    e.stopPropagation();
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onDragHandleDoubleClick && typeof (meta.onDragHandleDoubleClick) === 'function') {
      meta.onDragHandleDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.getRowData(), e });
    }
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  getStyle = () => {
    let style = {
      position: 'absolute',
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left,
      contain: 'layout'
    };
    return style;
  };

  getFormatter = () => {
    let col = this.props.column;
    if (this.isActive()) {
      return <EditorContainer rowData={this.getRowData()} rowIdx={this.props.rowIdx} value={this.props.value} idx={this.props.idx} cellMetaData={this.props.cellMetaData} column={col} height={this.props.height} />;
    }

    return this.props.column.formatter;
  };

  getRowData = (props = this.props) => {
    return props.rowData.toJSON ? props.rowData.toJSON() : props.rowData;
  };

  getFormatterDependencies = () => {
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (typeof this.props.column.getRowMetaData === 'function') {
      return this.props.column.getRowMetaData(this.getRowData(), this.props.column);
    }
  };

  getCellClass = () => {
    let className = joinClasses(
      this.props.column.cellClass,
      'react-grid-Cell',
      this.props.className,
      this.props.column.locked ? 'react-grid-Cell--locked' : null
    );
    let extraClasses = joinClasses({
      'row-selected': this.props.isRowSelected,
      editing: this.isActive(),
      copied: this.isCopied() || this.wasDraggedOver() || this.isDraggedOverUpwards() || this.isDraggedOverDownwards(),
      'is-dragged-over-up': this.isDraggedOverUpwards(),
      'is-dragged-over-down': this.isDraggedOverDownwards(),
      'was-dragged-over': this.wasDraggedOver(),
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

  isColumnSelected = () => {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }

    return (
      meta.selected
      && meta.selected.idx === this.props.idx
    );
  };

  isSelected = () => {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }

    return (
      meta.selected
      && meta.selected.rowIdx === this.props.rowIdx
      && meta.selected.idx === this.props.idx
    );
  };

  isActive = () => {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }
    return this.isSelected() && meta.selected.active === true;
  };

  isCellSelectionChanging = (nextProps: { idx: number; cellMetaData: { selected: { idx: number } } }): boolean => {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }
    let nextSelected = nextProps.cellMetaData.selected;
    if (meta.selected && nextSelected) {
      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
    }

    return true;
  };

  isCellSelectEnabled = () => {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }
    return meta.enableCellSelect;
  };

  hasChangedDependentValues = (nextProps) => {
    let currentColumn = this.props.column;
    let hasChangedDependentValues = false;

    if (currentColumn.getRowMetaData) {
      let currentRowMetaData = currentColumn.getRowMetaData(this.getRowData(), currentColumn);
      let nextColumn = nextProps.column;
      let nextRowMetaData = nextColumn.getRowMetaData(this.getRowData(nextProps), nextColumn);

      hasChangedDependentValues = !_.isEqual(currentRowMetaData, nextRowMetaData);
    }

    return hasChangedDependentValues;
  };

  applyUpdateClass = () => {
    let updateCellClass = this.getUpdateCellClass();
    // -> removing the class
    if (updateCellClass != null && updateCellClass !== '') {
      let cellDOMNode = this.node;
      if (cellDOMNode.classList) {
        cellDOMNode.classList.remove(updateCellClass);
        // -> and re-adding the class
        cellDOMNode.classList.add(updateCellClass);
      } else if (cellDOMNode.className.indexOf(updateCellClass) === -1) {
        // IE9 doesn't support classList, nor (I think) altering element.className
        // without replacing it wholesale.
        cellDOMNode.className = cellDOMNode.className + ' ' + updateCellClass;
      }
    }
  };

  setScrollLeft = (scrollLeft: number) => {
    let node = this.node;
    if (node) {
      let transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  };

  removeScroll = () => {
    let node = this.node;
    if (node) {
      node.style.webkitTransform = null;
      node.style.transform = null;
    }
  };

  isCopied = (): boolean => {
    let copied = this.props.cellMetaData.copied;
    return (
      copied
      && copied.rowIdx === this.props.rowIdx
      && copied.idx === this.props.idx
    );
  };

  isDraggedOver = (): boolean => {
    let dragged = this.props.cellMetaData.dragged;
    return (
      dragged &&
      dragged.overRowIdx === this.props.rowIdx
      && dragged.idx === this.props.idx
    );
  };

  wasDraggedOver = (): boolean => {
    let dragged = this.props.cellMetaData.dragged;
    return (
      dragged
      && ((dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx)
        || (dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx))
      && dragged.idx === this.props.idx
    );
  };

  isDraggedCellChanging = (nextProps: any): boolean => {
    let isChanging;
    let dragged = this.props.cellMetaData.dragged;
    let nextDragged = nextProps.cellMetaData.dragged;
    if (dragged) {
      isChanging = (nextDragged && this.props.idx === nextDragged.idx)
        || (dragged && this.props.idx === dragged.idx);
      return isChanging;
    }

    return false;
  };

  isCopyCellChanging = (nextProps: any): boolean => {
    let isChanging;
    let copied = this.props.cellMetaData.copied;
    let nextCopied = nextProps.cellMetaData.copied;
    if (copied) {
      isChanging = (nextCopied && this.props.idx === nextCopied.idx)
        || (copied && this.props.idx === copied.idx);
      return isChanging;
    }
    return false;
  };

  isDraggedOverUpwards = (): boolean => {
    let dragged = this.props.cellMetaData.dragged;
    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;
  };

  isDraggedOverDownwards = (): boolean => {
    let dragged = this.props.cellMetaData.dragged;
    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;
  };

  isFocusedOnBody = () => {
    return document.activeElement == null || (document.activeElement.nodeName && typeof document.activeElement.nodeName === 'string' && document.activeElement.nodeName.toLowerCase() === 'body');
  };

  isFocusedOnCell = () => {
    return document.activeElement && document.activeElement.className.indexOf('react-grid-Cell') !== -1;
  };

  checkFocus = () => {
    if (this.isSelected() && !this.isActive()) {
      if (this.props.isScrolling && !this.props.cellMetaData.isScrollingVerticallyWithKeyboard && !this.props.cellMetaData.isScrollingHorizontallyWithKeyboard) {
        return;
      }
      // If the enableCellAutoFocus is set in the ReactDataGrid props, it will allow the cell to take focus when the browser is focused on the body.
      // Otherwise, only focus to the current cell if the currently active node in the document is within the data grid.
      // Meaning focus should not be stolen from elements that the grid doesnt control.
      const cellAutoFocusEnabled = this.props.cellMetaData && this.props.cellMetaData.enableCellAutoFocus;
      let dataGridDOMNode = this.props.cellMetaData && this.props.cellMetaData.getDataGridDOMNode ? this.props.cellMetaData.getDataGridDOMNode() : null;
      if (this.isFocusedOnCell() || (cellAutoFocusEnabled && this.isFocusedOnBody()) || (dataGridDOMNode && dataGridDOMNode.contains(document.activeElement))) {
        let cellDOMNode = this.node;
        if (cellDOMNode) {
          cellDOMNode.focus();
        }
      }
    }
  };

  canEdit = () => {
    return (this.props.column.editor != null) || this.props.column.editable;
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
    let allEvents = Object.assign({}, gridEvents);

    for (let eventKey in columnEvents) {
      if (columnEvents.hasOwnProperty(eventKey)) {
        let event = columnEvents[event];
        let eventInfo = { idx: this.props.idx, rowIdx: this.props.rowIdx, rowId: this.props.rowData[this.props.cellMetaData.rowKey], name: eventKey };
        let eventCallback = this.createColumEventCallBack(onColumnEvent, eventInfo);

        if (allEvents.hasOwnProperty(eventKey)) {
          let currentEvent = allEvents[eventKey];
          allEvents[eventKey] = this.createCellEventCallBack(currentEvent, eventCallback);
        } else {
          allEvents[eventKey] = eventCallback;
        }
      }
    }

    return allEvents;
  };

  getEvents = () => {
    let columnEvents = this.props.column ? Object.assign({}, this.props.column.events) : undefined;
    let onColumnEvent = this.props.cellMetaData ? this.props.cellMetaData.onColumnEvent : undefined;
    let gridEvents = {
      onClick: this.onCellClick,
      onFocus: this.onCellFocus,
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
      const cellActions = cellMetaData.getCellActions(column, rowData);
      if (cellActions && cellActions.length) {
        return cellActions.map((action, index) => {
          return <CellAction key={index} action={action} isFirst={index === 0} />;
        });
      }
      return null;
    }
    return null;
  }

  renderCellContent = (props) => {
    let CellContent;
    let Formatter = this.getFormatter();
    if (React.isValidElement(Formatter)) {
      props.dependentValues = this.getFormatterDependencies();
      CellContent = React.cloneElement(Formatter, props);
    } else if (isFunction(Formatter)) {
      CellContent = <Formatter value={this.props.value} dependentValues={this.getFormatterDependencies()} />;
    } else {
      CellContent = <SimpleCellFormatter value={this.props.value} />;
    }
    let isExpandCell = this.props.expandableOptions ? this.props.expandableOptions.field === this.props.column.key : false;
    let treeDepth = this.props.expandableOptions ? this.props.expandableOptions.treeDepth : 0;
    let marginLeft = this.props.expandableOptions && isExpandCell ? (this.props.expandableOptions.treeDepth * 30) : 0;
    let cellExpander;
    let cellDeleter;
    if (this.canExpand()) {
      cellExpander = <CellExpand expandableOptions={this.props.expandableOptions} onCellExpand={this.onCellExpand} />;
    }

    let isDeleteSubRowEnabled = this.props.cellMetaData.onDeleteSubRow ? true : false;

    if (treeDepth > 0 && isExpandCell) {
      cellDeleter = <ChildRowDeleteButton treeDepth={treeDepth} cellHeight={this.props.height} siblingIndex={this.props.expandableOptions.subRowDetails.siblingIndex} numberSiblings={this.props.expandableOptions.subRowDetails.numberSiblings} onDeleteSubRow={this.onDeleteSubRow} isDeleteSubRowEnabled={isDeleteSubRowEnabled} />;
    }
    return (<div className="react-grid-Cell__value">{cellDeleter}<div style={{ marginLeft: marginLeft }}><span>{CellContent}</span> {this.props.cellControls} {cellExpander}</div></div>);
  };

  render() {
    if (this.props.column.hidden) {
      return null;
    }

    let style = this.getStyle();

    let className = this.getCellClass();

    const cellActions = this.getCellActions();

    const cellContent = this.props.children || this.renderCellContent({
      value: this.props.value,
      column: this.props.column,
      rowIdx: this.props.rowIdx,
      isExpanded: this.props.isExpanded
    });

    let dragHandle = (!this.isActive() && ColumnUtils.canEdit(this.props.column, this.props.rowData, this.props.cellMetaData.enableCellSelect)) ? <div className="drag-handle" draggable="true" onDoubleClick={this.onDragHandleDoubleClick}><span style={{ display: 'none' }}></span></div> : null;
    let events = this.getEvents();
    const tooltip = this.props.tooltip ? (<span className="cell-tooltip-text">{this.props.tooltip}</span>) : null;


    return (
      <div {...this.getKnownDivProps() } className={className} style={style} {...events} ref={(node) => { this.node = node; }}>
        {cellActions}
        {cellContent}
        {dragHandle}
        {tooltip}
      </div>
    );
  }
}

module.exports = Cell;
