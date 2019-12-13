import React from 'react';
import shallowEqual from 'shallowequal';

import HeaderCell from './HeaderCell';
import SortableHeaderCell from './common/cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from './common/cells/headerCells/FilterableHeaderCell';
import getScrollbarSize from './getScrollbarSize';
import { isFrozen } from './ColumnUtils';
import { HeaderRowType, HeaderCellType, DEFINE_SORT } from './common/enums';
import { CalculatedColumn, AddFilterEvent } from './common/types';
import { HeaderProps } from './Header';

type SharedHeaderProps<R> = Pick<HeaderProps<R>,
'draggableHeaderCell'
| 'onHeaderDrop'
| 'sortColumn'
| 'sortDirection'
| 'onSort'
| 'getValidFilterValues'
>;

export interface HeaderRowProps<R> extends SharedHeaderProps<R> {
  width?: number;
  height: number;
  columns: CalculatedColumn<R>[];
  onColumnResize(column: CalculatedColumn<R>, width: number): void;
  onColumnResizeEnd(column: CalculatedColumn<R>, width: number): void;
  style?: React.CSSProperties;
  filterable?: boolean;
  onFilterChange?(args: AddFilterEvent<R>): void;
  rowType: HeaderRowType;
}

export default class HeaderRow<R> extends React.Component<HeaderRowProps<R>> {
  static displayName = 'HeaderRow';

  private readonly cells = new Map<keyof R, HeaderCell<R>>();

  shouldComponentUpdate(nextProps: HeaderRowProps<R>) {
    return (
      nextProps.width !== this.props.width
      || nextProps.height !== this.props.height
      || nextProps.columns !== this.props.columns
      || !shallowEqual(nextProps.style, this.props.style)
      || this.props.sortColumn !== nextProps.sortColumn
      || this.props.sortDirection !== nextProps.sortDirection
    );
  }

  getHeaderCellType(column: CalculatedColumn<R>): HeaderCellType {
    if (column.filterable && this.props.filterable) {
      return HeaderCellType.FILTERABLE;
    }

    if (column.sortable && this.props.rowType !== HeaderRowType.FILTER) {
      return HeaderCellType.SORTABLE;
    }

    return HeaderCellType.NONE;
  }

  getFilterableHeaderCell(column: CalculatedColumn<R>) {
    const FilterRenderer = column.filterRenderer || FilterableHeaderCell;
    return (
      <FilterRenderer<R>
        column={column}
        onChange={this.props.onFilterChange}
        getValidFilterValues={this.props.getValidFilterValues}
      />
    );
  }

  getSortableHeaderCell(column: CalculatedColumn<R>) {
    const sortDirection = this.props.sortColumn === column.key && this.props.sortDirection || DEFINE_SORT.NONE;
    const sortDescendingFirst = column.sortDescendingFirst || false;
    return (
      <SortableHeaderCell<R>
        column={column}
        rowType={this.props.rowType}
        onSort={this.props.onSort}
        sortDirection={sortDirection}
        sortDescendingFirst={sortDescendingFirst}
      />
    );
  }

  getHeaderRenderer(column: CalculatedColumn<R>) {
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

    for (const column of columns) {
      const { key } = column;
      const renderer = key === 'select-row' && rowType === HeaderRowType.FILTER ? <div /> : this.getHeaderRenderer(column);

      const cell = (
        <HeaderCell<R>
          key={key as string}
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
    this.props.columns.forEach(column => {
      const { key } = column;
      if (!this.cells.has(key)) return;
      const cell = this.cells.get(key)!;
      if (isFrozen(column)) {
        cell.setScrollLeft(scrollLeft);
      } else {
        cell.removeScroll();
      }
    });
  }

  render() {
    const cellsStyle: React.CSSProperties = {
      width: this.props.width ? this.props.width + getScrollbarSize() : '100%',
      height: this.props.height
    };

    // FIXME: do we need 2 wrapping divs?
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
