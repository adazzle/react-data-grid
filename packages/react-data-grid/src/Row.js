import rowComparer from 'common/utils/RowComparer';
import React from 'react';
import PropTypes from 'prop-types';
import joinClasses from 'classnames';
import Cell from './Cell';
import cellMetaDataShape from 'common/prop-shapes/CellMetaDataShape';
import createObjectWithProperties from './createObjectWithProperties';
import columnUtils from './ColumnUtils';
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
    colVisibleStartIdx: PropTypes.number.isRequired,
    colVisibleEndIdx: PropTypes.number.isRequired,
    colOverscanStartIdx: PropTypes.number.isRequired,
    colOverscanEndIdx: PropTypes.number.isRequired,
    isScrolling: PropTypes.bool.isRequired,
    scrollLeft: PropTypes.number,
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
    const frozenColumns = columns.filter(c => columnUtils.isFrozen(c));
    const nonFrozenColumnsToRender = columns.slice(colOverscanStartIdx, colOverscanEndIdx + 1).filter(c => !columnUtils.isFrozen(c));
    return frozenColumns.concat(nonFrozenColumnsToRender)
      .map(column => this.getCell(column));
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
      if (columnUtils.isFrozen(column)) {
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
      this.props.extraClasses,
      { 'rdg-scrolling': this.props.isScrolling }
    );

    let style = {
      height: this.getRowHeight(this.props),
      overflow: 'hidden'
    };

    let cells = this.getCells();
    return (
      <div
        {...this.getKnownDivProps()}
        className={className}
        style={style}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
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
