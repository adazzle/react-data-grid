import React from 'react';
import shallowEqual from 'shallowequal';
import BaseHeaderCell from './HeaderCell';
import getScrollbarSize from './getScrollbarSize';
import {getColumn, getSize, isFrozen} from './ColumnUtils';
import SortableHeaderCell from 'common/cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from 'common/cells/headerCells/FilterableHeaderCell';
import HeaderCellType from './HeaderCellType';
import createObjectWithProperties from './createObjectWithProperties';
import { HeaderRowType } from 'common/constants';
import '../../../themes/react-data-grid-header.css';

import PropTypes from 'prop-types';

const HeaderRowStyle = {
  overflow: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  position: PropTypes.string
};

// The list of the propTypes that we want to include in the HeaderRow div
const knownDivPropertyKeys = ['width', 'height', 'style', 'onScroll'];

class HeaderRow extends React.Component {
  static displayName = 'HeaderRow';

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number.isRequired,
    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onColumnResize: PropTypes.func,
    onSort: PropTypes.func.isRequired,
    onColumnResizeEnd: PropTypes.func,
    style: PropTypes.shape(HeaderRowStyle),
    sortColumn: PropTypes.string,
    sortDirection: PropTypes.oneOf(Object.keys(SortableHeaderCell.DEFINE_SORT)),
    cellRenderer: PropTypes.func,
    headerCellRenderer: PropTypes.func,
    filterable: PropTypes.bool,
    onFilterChange: PropTypes.func,
    resizing: PropTypes.object,
    onScroll: PropTypes.func,
    rowType: PropTypes.string,
    draggableHeaderCell: PropTypes.func,
    onHeaderDrop: PropTypes.func
  };

  cells = [];

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
      || !shallowEqual(nextProps.style, this.props.style)
      || this.props.sortColumn !== nextProps.sortColumn
      || this.props.sortDirection !== nextProps.sortDirection
    );
  }

  getHeaderCellType = (column) => {
    if (column.filterable) {
      if (this.props.filterable) return HeaderCellType.FILTERABLE;
    }

    if (column.sortable && column.rowType !== HeaderRowType.FILTER) return HeaderCellType.SORTABLE;

    return HeaderCellType.NONE;
  };

  getFilterableHeaderCell = (column) => {
    let FilterRenderer = FilterableHeaderCell;
    if (column.filterRenderer !== undefined) {
      FilterRenderer = column.filterRenderer;
    }
    return <FilterRenderer {...this.props} onChange={this.props.onFilterChange} />;
  };

  getSortableHeaderCell = (column) => {
    const sortDirection = (this.props.sortColumn === column.key) ? this.props.sortDirection : SortableHeaderCell.DEFINE_SORT.NONE;
    const sortDescendingFirst = (column.sortDescendingFirst === undefined) ? false : column.sortDescendingFirst;
    return <SortableHeaderCell columnKey={column.key} onSort={this.props.onSort} sortDirection={sortDirection} sortDescendingFirst={sortDescendingFirst} headerRenderer={column.headerRenderer} />;
  };

  getHeaderRenderer = (column) => {
    if (column.headerRenderer && !column.sortable && !this.props.filterable) {
      return column.headerRenderer;
    }
    const headerCellType = this.getHeaderCellType(column);
    switch (headerCellType) {
    case HeaderCellType.SORTABLE:
      return this.getSortableHeaderCell(column);
    case HeaderCellType.FILTERABLE:
      return this.getFilterableHeaderCell(column);
    default:
      return undefined;
    }
  };

  getStyle = () => {
    return {
      overflow: 'hidden',
      width: '100%',
      height: this.props.height,
      position: 'absolute'
    };
  };

  getCells = () => {
    const cells = [];
    const frozenCells = [];
    const { columns, rowType } = this.props;

    for (let i = 0, len = getSize(columns); i < len; i++) {
      const column = { rowType, ...getColumn(columns, i) };
      const _renderer = column.key === 'select-row' && rowType === HeaderRowType.FILTER ? <div></div> : this.getHeaderRenderer(column);

      const cell = (
        <BaseHeaderCell
          key={column.key}
          ref={(node) => this.cells[i] = node}
          column={column}
          rowType={rowType}
          height={this.props.height}
          renderer={_renderer}
          resizing={this.props.resizing === column}
          onResize={this.props.onColumnResize}
          onResizeEnd={this.props.onColumnResizeEnd}
          onHeaderDrop={this.props.onHeaderDrop}
          draggableHeaderCell={this.props.draggableHeaderCell}
        />
      );

      if (isFrozen(column)) {
        frozenCells.push(cell);
      } else {
        cells.push(cell);
      }
    }

    return cells.concat(frozenCells);
  };

  setScrollLeft = (scrollLeft) => {
    this.props.columns.forEach((column, i) => {
      if (isFrozen(column)) {
        this.cells[i].setScrollLeft(scrollLeft);
      } else {
        if (this.cells[i] && this.cells[i].removeScroll) {
          this.cells[i].removeScroll();
        }
      }
    });
  };

  getKnownDivProps = () => {
    return createObjectWithProperties(this.props, knownDivPropertyKeys);
  };

  render() {
    const cellsStyle = {
      width: this.props.width ? (this.props.width + getScrollbarSize()) : '100%',
      height: this.props.height,
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      overflowY: 'hidden'
    };

    const cells = this.getCells();
    return (
      <div {...this.getKnownDivProps()} className="react-grid-HeaderRow">
        <div style={cellsStyle}>
          {cells}
        </div>
      </div>
    );
  }
}

module.exports = HeaderRow;
