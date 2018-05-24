import rowComparer from './RowComparer';
const React = require('react');
import PropTypes from 'prop-types';
const joinClasses = require('classnames');
import Cell from './Cell';
const cellMetaDataShape = require('./PropTypeShapes/CellMetaDataShape');
const createObjectWithProperties = require('./createObjectWithProperties');
require('../../../themes/react-data-grid-row.css');

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

  handleDragEnter = (e) => {
    e.dataTransfer.dropEffect = 'move';
    const { idx, cellMetaData: { onDragEnter } } = this.props;
    onDragEnter({ overRowIdx: idx });
  };

  handleDrop= (e) => {
    e.preventDefault();
  };

  getCell = (column, i) => {
    const CellRenderer = this.props.cellRenderer;
    const { idx, cellMetaData } = this.props;
    const { key, formatter } = column;
    const baseCellProps = { key: `${key}-${idx}`, idx: i, rowIdx: idx, height: this.getRowHeight(), column, cellMetaData };

    const { row, isSelected } = this.props;
    const cellProps = {
      ref: (node) => {
        this[key] = node;
      },
      value: this.getCellValue(key || i),
      rowData: row,
      isRowSelected: isSelected,
      expandableOptions: this.getExpandableOptions(key),
      formatter,
      isScrolling: this.props.isScrolling
    };

    return <CellRenderer {...baseCellProps} {...cellProps} />;
  };

  getCells = () => {
    let cells = [];
    let lockedCells = [];
    let lastColumnIdx = this.props.columns.size - 1;
    if (this.props.columns) {
      this.props.columns.forEach((column, i) => {
        if (i === lastColumnIdx) {
          column.isLastColumn = true;
        }
        let cell = this.getCell(column, i);
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

  render() {
    let className = joinClasses(
      'react-grid-Row',
      `react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}`,
      {
        'row-selected': this.props.isSelected
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
      <div
        {...this.getKnownDivProps() }
        className={className}
        style={style}
        onDragEnter={this.handleDragEnter}
        onDrop={this.handleDrop}
       >
        {
          React.isValidElement(this.props.row) ?
            this.props.row : cells
        }
      </div >
    );
  }
}

module.exports = Row;
