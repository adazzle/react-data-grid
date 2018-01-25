import OverflowCell from './OverflowCell';
import rowComparer from './RowComparer';
const React = require('react');
import PropTypes from 'prop-types';
const joinClasses = require('classnames');
const Cell = require('./Cell');
const columnUtils = require('./ColumnUtils');
const cellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');
const createObjectWithProperties = require('./createObjectWithProperties');
require('../../../themes/react-data-grid-row.css');

class CellExpander extends React.Component {
  render() {
    return (<Cell {...this.props} />);
  }
}

// The list of the propTypes that we want to include in the Row div
const knownDivPropertyKeys = ['height'];

class Row extends React.Component {
  static displayName = 'Row';

  static propTypes = {
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
    subRowDetails: PropTypes.object,
    isRowHovered: PropTypes.bool,
    colVisibleStart: PropTypes.number.isRequired,
    colVisibleEnd: PropTypes.number.isRequired,
    colDisplayStart: PropTypes.number.isRequired,
    colDisplayEnd: PropTypes.number.isRequired,
    isScrolling: PropTypes.bool.isRequired
  };

  static defaultProps = {
    cellRenderer: Cell,
    isSelected: false,
    height: 35
  };

  shouldComponentUpdate(nextProps) {
    return rowComparer(nextProps, this.props);
  }

  handleDragEnter = () => {
    let handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
    if (handleDragEnterRow) {
      handleDragEnterRow(this.props.idx);
    }
  };

  getSelectedColumn = () => {
    if (this.props.cellMetaData) {
      let selected = this.props.cellMetaData.selected;
      if (selected && selected.idx) {
        return columnUtils.getColumn(this.props.columns, selected.idx);
      }
    }
  };

  getCellRenderer = (columnKey) => {
    let CellRenderer = this.props.cellRenderer;
    if (this.props.subRowDetails && this.props.subRowDetails.field === columnKey) {
      return CellExpander;
    }
    return CellRenderer;
  };

  getCell = (column, i, selectedColumn) => {
    let CellRenderer = this.props.cellRenderer;
    const { colVisibleStart, colVisibleEnd, idx, cellMetaData } = this.props;
    const { key, formatter, locked } = column;
    const baseCellProps = { key: `${key}-${idx}`, idx: i, rowIdx: idx, height: this.getRowHeight(), column, cellMetaData };

    if ((i < colVisibleStart || i > colVisibleEnd) && !locked) {
      return <OverflowCell ref={(node) => this[key] = node} {...baseCellProps} />;
    }

    const { row, isSelected } = this.props;
    const cellProps = {
      ref: (node) => this[key] = node,
      value: this.getCellValue(key || i),
      rowData: row,
      isRowSelected: isSelected,
      expandableOptions: this.getExpandableOptions(key),
      selectedColumn,
      formatter,
      isScrolling: this.props.isScrolling
    };

    return <CellRenderer {...baseCellProps} {...cellProps} />;
  };

  getCells = () => {
    let cells = [];
    let lockedCells = [];
    let selectedColumn = this.getSelectedColumn();
    let lastColumnIdx = this.props.columns.size - 1;
    if (this.props.columns) {
      this.props.columns.forEach((column, i) => {
        if (i === lastColumnIdx) {
          column.isLastColumn = true;
        }
        let cell = this.getCell(column, i, selectedColumn);
        if (column.locked) {
          lockedCells.push(cell);
        } else {
          cells.push(cell);
        }
      });
    }

    return cells.concat(lockedCells);
  };

  getRowHeight = () => {
    let rows = this.props.expandedRows || null;
    if (rows && this.props.idx) {
      let row = rows[this.props.idx] || null;
      if (row) {
        return row.height;
      }
    }
    return this.props.height;
  };

  getCellValue = (key) => {
    let val;
    if (key === 'select-row') {
      return this.props.isSelected;
    } else if (typeof this.props.row.get === 'function') {
      val = this.props.row.get(key);
    } else {
      val = this.props.row[key];
    }
    return val;
  };

  isContextMenuDisplayed = () => {
    if (this.props.cellMetaData) {
      let selected = this.props.cellMetaData.selected;
      if (selected && selected.contextMenuDisplayed && selected.rowIdx === this.props.idx) {
        return true;
      }
    }
    return false;
  };

  getExpandableOptions = (columnKey) => {
    let subRowDetails = this.props.subRowDetails;
    if (subRowDetails) {
      return { canExpand: subRowDetails && subRowDetails.field === columnKey && ((subRowDetails.children && subRowDetails.children.length > 0) || subRowDetails.group === true), field: subRowDetails.field, expanded: subRowDetails && subRowDetails.expanded, children: subRowDetails && subRowDetails.children, treeDepth: subRowDetails ? subRowDetails.treeDepth : 0, subRowDetails: subRowDetails };
    }
    return {};
  };

  setScrollLeft = (scrollLeft) => {
    this.props.columns.forEach((column) => {
      if (column.locked) {
        if (!this[column.key]) return;
        this[column.key].setScrollLeft(scrollLeft);
      }
    });
  };

  getKnownDivProps = () => {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  };

  renderCell = (props) => {
    if (typeof this.props.cellRenderer === 'function') {
      this.props.cellRenderer.call(this, props);
    }
    if (React.isValidElement(this.props.cellRenderer)) {
      return React.cloneElement(this.props.cellRenderer, props);
    }

    return this.props.cellRenderer(props);
  };

  render() {
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
      overflow: 'hidden',
      contain: 'layout'
    };

    let cells = this.getCells();
    return (
      <div {...this.getKnownDivProps() } className={className} style={style} onDragEnter={this.handleDragEnter} >
        {
          React.isValidElement(this.props.row) ?
            this.props.row : cells
        }
      </div >
    );
  }
}

module.exports = Row;
