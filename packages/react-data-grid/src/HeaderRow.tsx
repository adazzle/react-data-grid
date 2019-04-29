import React from 'react';
import shallowEqual from 'shallowequal';

import HeaderCell from './HeaderCell';
import getScrollbarSize from './getScrollbarSize';
import { getColumn, getSize, isFrozen } from './ColumnUtils';
import SortableHeaderCell from './common/cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from './common/cells/headerCells/FilterableHeaderCell';
import { HeaderRowType, HeaderCellType, DEFINE_SORT } from './common/enums';
import { Column, ColumnList } from './common/types';

export interface HeaderRowProps {
  width?: number;
  height: number;
  columns: ColumnList;
  onSort(columnKey: string, direction: DEFINE_SORT): void;
  onColumnResize(column: Column, width: number): void;
  onColumnResizeEnd(column: Column, width: number): void;
  style?: React.CSSProperties;
  sortColumn?: string;
  sortDirection?: DEFINE_SORT;
  filterable?: boolean;
  onFilterChange(): void;
  rowType: HeaderRowType;
  draggableHeaderCell?: React.ComponentType<{ column: Column; onHeaderDrop(): void }>;
  onHeaderDrop?(): void;
  getValidFilterValues?(): void;
}

export default class HeaderRow extends React.Component<HeaderRowProps> {
  static displayName = 'HeaderRow';

  private readonly cells = new Map<string, HeaderCell>();

  shouldComponentUpdate(nextProps: HeaderRowProps) {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
      || !shallowEqual(nextProps.style, this.props.style)
      || this.props.sortColumn !== nextProps.sortColumn
      || this.props.sortDirection !== nextProps.sortDirection
    );
  }

  getHeaderCellType(column: Column): HeaderCellType {
    if (column.filterable && this.props.filterable) {
      return HeaderCellType.FILTERABLE;
    }

    if (column.sortable && this.props.rowType !== HeaderRowType.FILTER) {
      return HeaderCellType.SORTABLE;
    }

    return HeaderCellType.NONE;
  }

  getFilterableHeaderCell(column: Column) {
    const FilterRenderer = column.filterRenderer || FilterableHeaderCell;
    return (
      <FilterRenderer
        column={column}
        onChange={this.props.onFilterChange}
        getValidFilterValues={this.props.getValidFilterValues}
      />
    );
  }

  getSortableHeaderCell(column: Column) {
    const sortDirection = this.props.sortColumn === column.key && this.props.sortDirection || DEFINE_SORT.NONE;
    const sortDescendingFirst = column.sortDescendingFirst || false;
    return (
      <SortableHeaderCell
        column={column}
        rowType={this.props.rowType}
        onSort={this.props.onSort}
        sortDirection={sortDirection}
        sortDescendingFirst={sortDescendingFirst}
      />
    );
  }

  getHeaderRenderer(column: Column) {
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
  }

  getCells() {
    const cells = [];
    const frozenCells = [];
    const { columns, rowType } = this.props;

    for (let i = 0, len = getSize(columns); i < len; i++) {
      const column = getColumn(columns, i);
      const { key } = column;
      const renderer = key === 'select-row' && rowType === HeaderRowType.FILTER ? <div /> : this.getHeaderRenderer(column);

      const cell = (
        <HeaderCell
          key={key}
          ref={node => node ? this.cells.set(key, node) : this.cells.delete(key)}
          column={column}
          rowType={rowType}
          height={this.props.height}
          renderer={renderer}
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
  }

  setScrollLeft(scrollLeft: number): void {
    this.props.columns.forEach((column?: Column) => {
      const { key } = column!;
      if (!this.cells.has(key)) return;
      const cell = this.cells.get(key)!;
      if (isFrozen(column!)) {
        cell.setScrollLeft(scrollLeft);
      } else {
        cell.removeScroll();
      }
    });
  }

  render() {
    const cellsStyle: React.CSSProperties = {
      width: this.props.width ? this.props.width + getScrollbarSize() : '100%',
      height: this.props.height,
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    };

    return (
      <div
        style={this.props.style}
        className="react-grid-HeaderRow"
      >
        <div style={cellsStyle}>
          {this.getCells()}
        </div>
      </div>
    );
  }
}
