import React from 'react';

import HeaderCell from './HeaderCell';
import SortableHeaderCell from './common/cells/headerCells/SortableHeaderCell';
import FilterableHeaderCell from './common/cells/headerCells/FilterableHeaderCell';
import { isFrozen } from './utils/columnUtils';
import { isPositionStickySupported } from './utils';
import { HeaderRowType, HeaderCellType, DEFINE_SORT } from './common/enums';
import { CalculatedColumn, AddFilterEvent } from './common/types';
import { HeaderProps } from './Header';

type SharedHeaderProps<R, K extends keyof R> = Pick<HeaderProps<R, K>,
| 'draggableHeaderCell'
| 'onHeaderDrop'
| 'allRowsSelected'
| 'sortColumn'
| 'sortDirection'
| 'onSort'
| 'getValidFilterValues'
>;

export interface HeaderRowProps<R, K extends keyof R> extends SharedHeaderProps<R, K> {
  width: number;
  height: number;
  columns: CalculatedColumn<R>[];
  lastFrozenColumnIndex: number;
  onColumnResize(column: CalculatedColumn<R>, width: number): void;
  onAllRowsSelectionChange(checked: boolean): void;
  filterable?: boolean;
  onFilterChange?(args: AddFilterEvent<R>): void;
  rowType: HeaderRowType;
}

export default class HeaderRow<R, K extends keyof R> extends React.Component<HeaderRowProps<R, K>> {
  static displayName = 'HeaderRow';

  private readonly cells = new Map<keyof R, HeaderCell<R>>();

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
        allRowsSelected={this.props.allRowsSelected}
        onAllRowsSelectionChange={this.props.onAllRowsSelectionChange}
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
    const cellElements = [];
    const { columns, lastFrozenColumnIndex, rowType } = this.props;
    const setRef = !isPositionStickySupported();

    for (const column of columns) {
      const { key } = column;
      const renderer = key === 'select-row' && rowType === HeaderRowType.FILTER ? <div /> : this.getHeaderRenderer(column);

      cellElements.push(
        <HeaderCell<R>
          key={key as string}
          ref={setRef
            ? node => node ? this.cells.set(key, node) : this.cells.delete(key)
            : undefined}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          rowType={rowType}
          height={this.props.height}
          renderer={renderer}
          onResize={this.props.onColumnResize}
          onHeaderDrop={this.props.onHeaderDrop}
          allRowsSelected={this.props.allRowsSelected}
          onAllRowsSelectionChange={this.props.onAllRowsSelectionChange}
          draggableHeaderCell={this.props.draggableHeaderCell}
        />
      );
    }

    return cellElements;
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
    return (
      <div
        className="rdg-header-row"
        style={{ width: this.props.width, height: this.props.height, lineHeight: `${this.props.height}px` }}
      >
        {this.getCells()}
      </div>
    );
  }
}
