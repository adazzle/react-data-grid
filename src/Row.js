const React           = require('react');
const joinClasses      = require('classnames');
const Cell            = require('./Cell');
const ColumnMetrics   = require('./ColumnMetrics');
const ColumnUtilsMixin  = require('./ColumnUtils');
const cellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');
const PropTypes = React.PropTypes;

const CellExpander = React.createClass({
  render() {
    return (<Cell {...this.props}/>);
  }
});

const Row = React.createClass({

  propTypes: {
    height: PropTypes.number.isRequired,
    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    row: PropTypes.any.isRequired,
    cellRenderer: PropTypes.func,
    cellMetaData: PropTypes.shape(cellMetaDataShape),
    isSelected: PropTypes.bool,
    idx: PropTypes.number.isRequired,
    expandedRows: PropTypes.arrayOf(PropTypes.object),
    extraClasses: PropTypes.string,
    forceUpdate: PropTypes.bool,
    subRowDetails: PropTypes.object
  },

  mixins: [ColumnUtilsMixin],

  getDefaultProps() {
    return {
      cellRenderer: Cell,
      isSelected: false,
      height: 35
    };
  },

  shouldComponentUpdate(nextProps: any): boolean {
    return !(ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, ColumnMetrics.sameColumn)) ||
           this.doesRowContainSelectedCell(this.props)                                                   ||
           this.doesRowContainSelectedCell(nextProps)                                                    ||
           this.willRowBeDraggedOver(nextProps)                                                          ||
           nextProps.row !== this.props.row                                                              ||
           this.hasRowBeenCopied()                                                                       ||
           this.props.isSelected !== nextProps.isSelected                                                ||
           nextProps.height !== this.props.height                                                        ||
           this.props.forceUpdate === true;
  },

  handleDragEnter() {
    let handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
    if (handleDragEnterRow) {
      handleDragEnterRow(this.props.idx);
    }
  },

  getSelectedColumn() {
    if (this.props.cellMetaData) {
      let selected = this.props.cellMetaData.selected;
      if (selected && selected.idx) {
        return this.getColumn(this.props.columns, selected.idx);
      }
    }
  },

  getCellRenderer(columnKey) {
    let CellRenderer = this.props.cellRenderer;
    if (this.props.subRowDetails && this.props.subRowDetails.field === columnKey) {
      return CellExpander;
    }
    return CellRenderer;
  },

  getCells(): Array<ReactElement> {
    let cells = [];
    let lockedCells = [];
    let selectedColumn = this.getSelectedColumn();

    if (this.props.columns) {
      this.props.columns.forEach((column, i) => {
        let CellRenderer = this.props.cellRenderer;
        let cell = (<CellRenderer
                      ref={i}
                      key={`${column.key}-${i}`}
                      idx={i}
                      rowIdx={this.props.idx}
                      value={this.getCellValue(column.key || i)}
                      column={column}
                      height={this.getRowHeight()}
                      formatter={column.formatter}
                      cellMetaData={this.props.cellMetaData}
                      rowData={this.props.row}
                      selectedColumn={selectedColumn}
                      isRowSelected={this.props.isSelected}
                      expandableOptions={this.getExpandableOptions(column.key)} />);
        if (column.locked) {
          lockedCells.push(cell);
        } else {
          cells.push(cell);
        }
      });
    }

    return cells.concat(lockedCells);
  },

  getRowHeight(): number {
    let rows = this.props.expandedRows || null;
    if (rows && this.props.idx) {
      let row = rows[this.props.idx] || null;
      if (row) {
        return row.height;
      }
    }
    return this.props.height;
  },

  getCellValue(key: number | string): any {
    let val;
    if (key === 'select-row') {
      return this.props.isSelected;
    } else if (typeof this.props.row.get === 'function') {
      val = this.props.row.get(key);
    } else {
      val = this.props.row[key];
    }
    return val;
  },

  setScrollLeft(scrollLeft: number) {
    this.props.columns.forEach( (column, i) => {
      if (column.locked) {
        if (!this.refs[i]) return;
        this.refs[i].setScrollLeft(scrollLeft);
      }
    });
  },

  doesRowContainSelectedCell(props: any): boolean {
    let selected = props.cellMetaData.selected;
    if (selected && selected.rowIdx === props.idx) {
      return true;
    }

    return false;
  },

  isContextMenuDisplayed() {
    if (this.props.cellMetaData) {
      let selected = this.props.cellMetaData.selected;
      if (selected && selected.contextMenuDisplayed && selected.rowIdx === this.props.idx) {
        return true;
      }
    }
    return false;
  },

  willRowBeDraggedOver(props: any): boolean {
    let dragged = props.cellMetaData.dragged;
    return  dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);
  },

  hasRowBeenCopied(): boolean {
    let copied = this.props.cellMetaData.copied;
    return copied != null && copied.rowIdx === this.props.idx;
  },

  getExpandableOptions(columnKey) {
    return {canExpand: this.props.subRowDetails && this.props.subRowDetails.field === columnKey, expanded: this.props.subRowDetails && this.props.subRowDetails.expanded, children: this.props.subRowDetails && this.props.subRowDetails.children, treeDepth: this.props.subRowDetails ? this.props.subRowDetails.treeDepth : 0 };
  },

  renderCell(props: any): ReactElement {
    if (typeof this.props.cellRenderer === 'function') {
      this.props.cellRenderer.call(this, props);
    }
    if (React.isValidElement(this.props.cellRenderer)) {
      return React.cloneElement(this.props.cellRenderer, props);
    }

    return this.props.cellRenderer(props);
  },

  render(): ?ReactElement {
    let className = joinClasses(
      'react-grid-Row',
      `react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}`,
      {
        'row-selected': this.props.isSelected,
        'row-context-menu': this.isContextMenuDisplayed()
      },
      this.props.extraClasses
    );

    let style = {
      height: this.getRowHeight(this.props),
      overflow: 'hidden'
    };

    let cells = this.getCells();
    return (
      <div {...this.props} className={className} style={style} onDragEnter={this.handleDragEnter}>
        {React.isValidElement(this.props.row) ?
          this.props.row : cells}
      </div>
    );
  }
});

module.exports = Row;
