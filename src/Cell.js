import isEqual from 'lodash/isEqual';
const React             = require('react');
const ReactDOM = require('react-dom');
const joinClasses       = require('classnames');
const EditorContainer   = require('./addons/editors/EditorContainer');
const ExcelColumn       = require('./PropTypeShapes/ExcelColumn');
const isFunction        = require('./addons/utils/isFunction');
const CellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');
const SimpleCellFormatter = require('./addons/formatters/SimpleCellFormatter');
const ColumnUtils = require('./ColumnUtils');

const Cell = React.createClass({

  propTypes: {
    rowIdx: React.PropTypes.number.isRequired,
    idx: React.PropTypes.number.isRequired,
    selected: React.PropTypes.shape({
      idx: React.PropTypes.number.isRequired
    }),
    selectedColumn: React.PropTypes.object,
    height: React.PropTypes.number,
    tabIndex: React.PropTypes.number,
    ref: React.PropTypes.string,
    column: React.PropTypes.shape(ExcelColumn).isRequired,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
    isExpanded: React.PropTypes.bool,
    isRowSelected: React.PropTypes.bool,
    cellMetaData: React.PropTypes.shape(CellMetaDataShape).isRequired,
    handleDragStart: React.PropTypes.func,
    className: React.PropTypes.string,
    cellControls: React.PropTypes.any,
    rowData: React.PropTypes.object.isRequired,
    forceUpdate: React.PropTypes.bool,
    expandableOptions: React.PropTypes.object.isRequired
  },

  getDefaultProps: function(): {tabIndex: number; ref: string; isExpanded: boolean } {
    return {
      tabIndex: -1,
      ref: 'cell',
      isExpanded: false
    };
  },

  getInitialState() {
    return {
      isCellValueChanging: false
    };
  },

  componentDidMount: function() {
    this.checkFocus();
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      isCellValueChanging: this.props.value !== nextProps.value
    });
  },

  componentDidUpdate: function() {
    this.checkFocus();
    let dragged = this.props.cellMetaData.dragged;
    if (dragged && dragged.complete === true) {
      this.props.cellMetaData.handleTerminateDrag();
    }
    if (this.state.isCellValueChanging && this.props.selectedColumn != null) {
      this.applyUpdateClass();
    }
  },

  shouldComponentUpdate(nextProps: any): boolean {
    return this.props.column.width !== nextProps.column.width
    || this.props.column.left !== nextProps.column.left
    || this.props.height !== nextProps.height
    || this.props.rowIdx !== nextProps.rowIdx
    || this.isCellSelectionChanging(nextProps)
    || this.isDraggedCellChanging(nextProps)
    || this.isCopyCellChanging(nextProps)
    || this.props.isRowSelected !== nextProps.isRowSelected
    || this.isSelected()
    || this.props.value !== nextProps.value
    || this.props.forceUpdate === true
    || this.props.className !== nextProps.className
    || this.hasChangedDependentValues(nextProps);
  },

  onCellClick(e) {
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellClick && typeof(meta.onCellClick) === 'function') {
      meta.onCellClick({rowIdx: this.props.rowIdx, idx: this.props.idx}, e);
    }
  },

  onCellContextMenu() {
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellContextMenu && typeof(meta.onCellContextMenu) === 'function') {
      meta.onCellContextMenu({rowIdx: this.props.rowIdx, idx: this.props.idx});
    }
  },

  onCellDoubleClick(e) {
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellDoubleClick && typeof(meta.onCellDoubleClick) === 'function') {
      meta.onCellDoubleClick({rowIdx: this.props.rowIdx, idx: this.props.idx}, e);
    }
  },

  onCellExpand(e) {
    e.stopPropagation();
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onCellExpand != null) {
      meta.onCellExpand({rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.props.rowData, expandArgs: this.props.expandableOptions});
    }
  },

  onCellKeyDown(e) {
    if (this.canExpand() && e.key === 'Enter') {
      this.onCellExpand(e);
    }
  },

  onDragHandleDoubleClick(e) {
    e.stopPropagation();
    let meta = this.props.cellMetaData;
    if (meta != null && meta.onDragHandleDoubleClick && typeof(meta.onDragHandleDoubleClick) === 'function') {
      meta.onDragHandleDoubleClick({rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.getRowData(), e});
    }
  },

  onDragOver: function(e) {
    e.preventDefault();
  },

  getStyle(): {position:string; width: number; height: number; left: number} {
    let style = {
      position: 'absolute',
      width: this.props.column.width,
      height: this.props.height,
      left: this.props.column.left
    };
    return style;
  },

  getFormatter() {
    let col = this.props.column;
    if (this.isActive()) {
      return <EditorContainer rowData={this.getRowData()} rowIdx={this.props.rowIdx} idx={this.props.idx} cellMetaData={this.props.cellMetaData} column={col} height={this.props.height}/>;
    }

    return this.props.column.formatter;
  },

  getRowData(props = this.props) {
    return props.rowData.toJSON ? props.rowData.toJSON() : props.rowData;
  },

  getFormatterDependencies() {
    // convention based method to get corresponding Id or Name of any Name or Id property
    if (typeof this.props.column.getRowMetaData === 'function') {
      return this.props.column.getRowMetaData(this.getRowData(), this.props.column);
    }
  },

  getCellClass: function(): string {
    let className = joinClasses(
      this.props.column.cellClass,
      'react-grid-Cell',
      this.props.className,
      this.props.column.locked ? 'react-grid-Cell--locked' : null
    );
    let extraClasses = joinClasses({
      'row-selected': this.props.isRowSelected,
      selected: this.isSelected() && !this.isActive() && this.isCellSelectEnabled(),
      editing: this.isActive(),
      copied: this.isCopied() || this.wasDraggedOver() || this.isDraggedOverUpwards() || this.isDraggedOverDownwards(),
      'active-drag-cell': this.isSelected() || this.isDraggedOver(),
      'is-dragged-over-up': this.isDraggedOverUpwards(),
      'is-dragged-over-down': this.isDraggedOverDownwards(),
      'was-dragged-over': this.wasDraggedOver()
    });
    return joinClasses(className, extraClasses);
  },

  getUpdateCellClass() {
    return this.props.column.getUpdateCellClass
      ? this.props.column.getUpdateCellClass(this.props.selectedColumn, this.props.column, this.state.isCellValueChanging)
      : '';
  },

  isColumnSelected() {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }

    return (
      meta.selected
      && meta.selected.idx === this.props.idx
    );
  },

  isSelected: function(): boolean {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }

    return (
      meta.selected
      && meta.selected.rowIdx === this.props.rowIdx
      && meta.selected.idx === this.props.idx
    );
  },

  isActive(): boolean {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }
    return this.isSelected() && meta.selected.active === true;
  },

  isCellSelectionChanging(nextProps: {idx: number; cellMetaData: {selected: {idx: number}}}): boolean {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }
    let nextSelected = nextProps.cellMetaData.selected;
    if (meta.selected && nextSelected) {
      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
    }

    return true;
  },

  isCellSelectEnabled() {
    let meta = this.props.cellMetaData;
    if (meta == null) { return false; }
    return meta.enableCellSelect;
  },

  hasChangedDependentValues(nextProps) {
    let currentColumn = this.props.column;
    let hasChangedDependentValues = false;

    if (currentColumn.getRowMetaData) {
      let currentRowMetaData = currentColumn.getRowMetaData(this.getRowData(), currentColumn);
      let nextColumn = nextProps.column;
      let nextRowMetaData = nextColumn.getRowMetaData(this.getRowData(nextProps), nextColumn);

      hasChangedDependentValues = !isEqual(currentRowMetaData, nextRowMetaData);
    }

    return hasChangedDependentValues;
  },

  applyUpdateClass() {
    let updateCellClass = this.getUpdateCellClass();
    // -> removing the class
    if (updateCellClass != null && updateCellClass !== '') {
      let cellDOMNode = ReactDOM.findDOMNode(this);
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
  },

  setScrollLeft(scrollLeft: number) {
    let ctrl: any = this; // flow on windows has an outdated react declaration, once that gets updated, we can remove this
    if (ctrl.isMounted()) {
      let node = ReactDOM.findDOMNode(this);
      let transform = `translate3d(${scrollLeft}px, 0px, 0px)`;
      node.style.webkitTransform = transform;
      node.style.transform = transform;
    }
  },

  isCopied(): boolean {
    let copied = this.props.cellMetaData.copied;
    return (
      copied
      && copied.rowIdx === this.props.rowIdx
      && copied.idx === this.props.idx
    );
  },

  isDraggedOver(): boolean {
    let dragged = this.props.cellMetaData.dragged;
    return (
      dragged &&
      dragged.overRowIdx === this.props.rowIdx
      && dragged.idx === this.props.idx
    );
  },

  wasDraggedOver(): boolean {
    let dragged = this.props.cellMetaData.dragged;
    return (
      dragged
      && ((dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx)
      ||  (dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx))
      && dragged.idx === this.props.idx
    );
  },

  isDraggedCellChanging(nextProps: any): boolean {
    let isChanging;
    let dragged = this.props.cellMetaData.dragged;
    let nextDragged = nextProps.cellMetaData.dragged;
    if (dragged) {
      isChanging = (nextDragged && this.props.idx === nextDragged.idx)
      || (dragged && this.props.idx === dragged.idx);
      return isChanging;
    }

    return false;
  },

  isCopyCellChanging(nextProps: any): boolean {
    let isChanging;
    let copied = this.props.cellMetaData.copied;
    let nextCopied = nextProps.cellMetaData.copied;
    if (copied) {
      isChanging = ( nextCopied && this.props.idx ===  nextCopied.idx)
      || (copied && this.props.idx === copied.idx);
      return isChanging;
    }
    return false;
  },

  isDraggedOverUpwards(): boolean {
    let dragged = this.props.cellMetaData.dragged;
    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;
  },

  isDraggedOverDownwards(): boolean {
    let dragged = this.props.cellMetaData.dragged;
    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;
  },

  checkFocus: function() {
    if (this.isSelected() && !this.isActive()) {
      // determine the parent viewport element of this cell
      let parentViewport = ReactDOM.findDOMNode(this);
      while (parentViewport != null && parentViewport.className.indexOf('react-grid-Viewport') === -1) {
        parentViewport = parentViewport.parentElement;
      }
      let focusInGrid = false;
      // if the focus is on the body of the document, the user won't mind if we focus them on a cell
      if ((document.activeElement == null) || (document.activeElement.nodeName && typeof document.activeElement.nodeName === 'string' && document.activeElement.nodeName.toLowerCase() === 'body')) {
        focusInGrid = true;
        // otherwise
      } else {
        // only pull focus if the currently focused element is contained within the viewport
        if (parentViewport) {
          let focusedParent = document.activeElement;
          while (focusedParent != null) {
            if (focusedParent === parentViewport) {
              focusInGrid = true;
              break;
            }
            focusedParent = focusedParent.parentElement;
          }
        }
      }
      if (focusInGrid) {
        ReactDOM.findDOMNode(this).focus();
      }
    }
  },

  canEdit() {
    return (this.props.column.editor != null) || this.props.column.editable;
  },

  canExpand() {
    return this.props.expandableOptions && this.props.expandableOptions.canExpand;
  },

  createColumEventCallBack(onColumnEvent, info) {
    return (e) => {
      onColumnEvent(e, info);
    };
  },

  createCellEventCallBack(gridEvent, columnEvent) {
    return (e) => {
      gridEvent(e);
      columnEvent(e);
    };
  },

  createEventDTO(gridEvents, columnEvents, onColumnEvent) {
    let allEvents = Object.assign({}, gridEvents);

    for (let eventKey in columnEvents) {
      if (columnEvents.hasOwnProperty(eventKey)) {
        let event = columnEvents[event];
        let eventInfo = {rowIdx: this.props.rowIdx, idx: this.props.idx, name: eventKey};
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
  },

  getEvents() {
    let columnEvents = this.props.column ? Object.assign({}, this.props.column.events) : undefined;
    let onColumnEvent = this.props.cellMetaData ? this.props.cellMetaData.onColumnEvent : undefined;
    let gridEvents = {
      onClick: this.onCellClick,
      onDoubleClick: this.onCellDoubleClick,
      onDragOver: this.onDragOver
    };

    if (!columnEvents || !onColumnEvent) {
      return gridEvents;
    }

    return this.createEventDTO(gridEvents, columnEvents, onColumnEvent);
  },

  renderCellContent(props) {
    let CellContent;
    let Formatter = this.getFormatter();
    if (React.isValidElement(Formatter)) {
      props.dependentValues = this.getFormatterDependencies();
      CellContent = React.cloneElement(Formatter, props);
    } else if (isFunction(Formatter)) {
      CellContent = <Formatter value={this.props.value} dependentValues={this.getFormatterDependencies()}/>;
    } else {
      CellContent = <SimpleCellFormatter value={this.props.value}/>;
    }
    let cellExpander;
    let marginLeft = this.props.expandableOptions ? (this.props.expandableOptions.treeDepth * 30) : 0;
    let marginLeftCell = this.props.expandableOptions ? (this.props.expandableOptions.treeDepth * 10) : 0;
    if (this.canExpand()) {
      cellExpander = (<span style={{float: 'left', marginLeft: marginLeft}} onClick={this.onCellExpand} >{this.props.expandableOptions.expanded ? String.fromCharCode('9660') : String.fromCharCode('9658')}</span>);
    }
    return (<div  ref="cell"
      className="react-grid-Cell__value">{cellExpander}<span style={{float: 'left', marginLeft: marginLeftCell}}>{CellContent}</span> {this.props.cellControls} </div>);
  },

  render() {
    let style = this.getStyle();

    let className = this.getCellClass();

    let cellContent = this.renderCellContent({
      value: this.props.value,
      column: this.props.column,
      rowIdx: this.props.rowIdx,
      isExpanded: this.props.isExpanded
    });

    let dragHandle = (!this.isActive() && ColumnUtils.canEdit(this.props.column, this.props.rowData, this.props.cellMetaData.enableCellSelect)) ? <div className="drag-handle" draggable="true" onDoubleClick={this.onDragHandleDoubleClick}><span style={{display: 'none'}}></span></div> : null;
    let events = this.getEvents();
    return (
      <div {...this.props} className={className} style={style} onClick={this.onCellClick} onDoubleClick={this.onCellDoubleClick} onContextMenu={this.onCellContextMenu} onDragOver={this.onDragOver} {...events}>
      {cellContent}
      {dragHandle}
      </div>
    );
  }
});

module.exports = Cell;
