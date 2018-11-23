import rowComparer from 'common/utils/RowComparer';
import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';
import Cell from './Cell';
import createObjectWithProperties from './createObjectWithProperties';
import {isFrozen} from './ColumnUtils';
require('../../../themes/react-data-grid-row.css');

// The list of the propTypes that we want to include in the Row div
const knownDivPropertyKeys = ['height'];

class Row extends React.Component {
  static displayName = 'Row';

  static propTypes = {
    /** The height of the row in pixels */
    height: PropTypes.number.isRequired,
    /** Array of columns to render */
    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    /** JS object represeting row data */
    row: PropTypes.object.isRequired,
    /** React component used to render cell content */
    cellRenderer: PropTypes.func,
    /** Object used to listen for cell events */
    cellMetaData: PropTypes.object,
    /** Determines whether row is selected or not */
    isSelected: PropTypes.bool,
    /** The index of the row in the grid */
    idx: PropTypes.number.isRequired,
    /** Array of all rows that have been expanded */
    expandedRows: PropTypes.arrayOf(PropTypes.object),
    /** Space separated list of extra css classes to apply to row */
    extraClasses: PropTypes.string,
    /** Will force an update to the row if true */
    forceUpdate: PropTypes.bool,
    /** */
    subRowDetails: PropTypes.object,
    /** Determines whether row is hovered or not */
    isRowHovered: PropTypes.bool,
    /** The index of the first visible column on the grid */
    colVisibleStartIdx: PropTypes.number.isRequired,
    /** The index of the last visible column on the grid */
    colVisibleEndIdx: PropTypes.number.isRequired,
    /** The index of the first overscan column on the grid */
    colOverscanStartIdx: PropTypes.number.isRequired,
    /** The index of the last overscan column on the grid */
    colOverscanEndIdx: PropTypes.number.isRequired,
    /** Flag to determine whether the grid is being scrolled */
    isScrolling: PropTypes.bool.isRequired,
    /** scrollLeft in pixels */
    scrollLeft: PropTypes.number,
    /** Index of last frozen column index */
    lastFrozenColumnIndex: PropTypes.number
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
    // Prevent default to allow drop
    e.preventDefault();
    const { idx, cellMetaData: { onDragEnter } } = this.props;
    onDragEnter({ overRowIdx: idx });
  };

  handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  handleDrop = (e) => {
    // The default in Firefox is to treat data in dataTransfer as a URL and perform navigation on it, even if the data type used is 'text'
    // To bypass this, we need to capture and prevent the drop event.
    e.preventDefault();
  };

  getCell = (column) => {
    const CellRenderer = this.props.cellRenderer;
    const { idx, cellMetaData, isScrolling, row, isSelected, scrollLeft, lastFrozenColumnIndex } = this.props;
    const { key, formatter } = column;
    const baseCellProps = { key: `${key}-${idx}`, idx: column.idx, rowIdx: idx, height: this.getRowHeight(), column, cellMetaData };

    const cellProps = {
      ref: (node) => {
        this[key] = node;
      },
      value: this.getCellValue(key || column.idx),
      rowData: row,
      isRowSelected: isSelected,
      expandableOptions: this.getExpandableOptions(key),
      formatter,
      isScrolling,
      scrollLeft,
      lastFrozenColumnIndex
    };

    return <CellRenderer {...baseCellProps} {...cellProps} />;
  };

  getCells = () => {
    const { colOverscanStartIdx, colOverscanEndIdx, columns } = this.props;
    const frozenColumns = columns.filter(c => isFrozen(c));
    const nonFrozenColumnsToRender = columns.slice(colOverscanStartIdx, colOverscanEndIdx + 1).filter(c => !isFrozen(c));
    return frozenColumns.concat(nonFrozenColumnsToRender)
      .map(column => this.getCell(column));
  };

  getRowTop = () => {
    if (this.row) {
      return this.row.offsetTop;
    }
  };

  getRowHeight = () => {
    const rows = this.props.expandedRows || null;
    if (rows && this.props.idx) {
      const row = rows[this.props.idx] || null;
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
    const subRowDetails = this.props.subRowDetails;
    if (subRowDetails) {
      return { canExpand: subRowDetails && subRowDetails.field === columnKey && ((subRowDetails.children && subRowDetails.children.length > 0) || subRowDetails.group === true), field: subRowDetails.field, expanded: subRowDetails && subRowDetails.expanded, children: subRowDetails && subRowDetails.children, treeDepth: subRowDetails ? subRowDetails.treeDepth : 0, subRowDetails: subRowDetails };
    }
    return {};
  };

  setScrollLeft = (scrollLeft) => {
    this.props.columns.forEach((column) => {
      if (isFrozen(column)) {
        if (!this[column.key]) return;
        this[column.key].setScrollLeft(scrollLeft);
      }
    });
  };

  setRowRef = el => {
    this.row = el;
  };

  getKnownDivProps = () => {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  };

  render() {
    const className = joinClasses(
      'react-grid-Row',
      `react-grid-Row--${this.props.idx % 2 === 0 ? 'even' : 'odd'}`,
      {
        'row-selected': this.props.isSelected
      },
      this.props.extraClasses,
      { 'rdg-scrolling': this.props.isScrolling }
    );

    const style = {
      height: this.getRowHeight(this.props),
      overflow: 'hidden'
    };

    const cells = this.getCells();
    return (
      <div
        {...this.getKnownDivProps()}
        ref={this.setRowRef}
        className={className}
        style={style}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        {
          this.getCells()
        }
      </div >
    );
  }
}

export default Row;
