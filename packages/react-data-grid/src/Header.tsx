import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import HeaderRow from './HeaderRow';
import { resizeColumn } from './ColumnMetrics';
import getScrollbarSize from './getScrollbarSize';
import { HeaderRowType } from './common/enums';
import { CalculatedColumn, ColumnMetrics } from './common/types';
import { GridProps } from './Grid';

type SharedGridProps = Pick<GridProps,
'columnMetrics'
| 'onColumnResize'
| 'rowHeight'
| 'totalWidth'
| 'headerRows'
| 'sortColumn'
| 'sortDirection'
| 'draggableHeaderCell'
| 'onSort'
| 'onHeaderDrop'
| 'getValidFilterValues'
| 'cellMetaData'
>;

export type HeaderProps = SharedGridProps;

interface State {
  resizing: { column: CalculatedColumn; columnMetrics: ColumnMetrics } | null;
}

export default class Header extends React.Component<HeaderProps, State> {
  readonly state: Readonly<State> = { resizing: null };

  private readonly row = React.createRef<HeaderRow>();
  private readonly filterRow = React.createRef<HeaderRow>();

  componentWillReceiveProps(): void {
    this.setState({ resizing: null });
  }

  onColumnResize = (column: CalculatedColumn, width: number): void => {
    const pos = this.getColumnPosition(column);

    if (pos === null) return;

    const prevColumnMetrics = this.state.resizing ? this.state.resizing.columnMetrics : this.props.columnMetrics;
    const columnMetrics = resizeColumn({ ...prevColumnMetrics }, pos, width);

    // we don't want to influence scrollLeft while resizing
    if (columnMetrics.totalWidth < prevColumnMetrics.totalWidth) {
      columnMetrics.totalWidth = prevColumnMetrics.totalWidth;
    }

    this.setState({
      resizing: {
        column: columnMetrics.columns[pos],
        columnMetrics
      }
    });
  };

  onColumnResizeEnd = (column: CalculatedColumn, width: number): void => {
    const pos = this.getColumnPosition(column);
    if (pos === null) return;
    this.props.onColumnResize(pos, width || column.width);
  };

  getHeaderRows() {
    const columnMetrics = this.getColumnMetrics();

    return this.props.headerRows.map((row, index) => {
      // To allow header filters to be visible
      const isFilterRow = row.rowType === HeaderRowType.FILTER;
      const rowHeight = isFilterRow ? '500px' : 'auto';
      const scrollbarSize = getScrollbarSize() > 0 ? getScrollbarSize() : 0;
      const updatedWidth = typeof this.props.totalWidth === 'number'
        ? this.props.totalWidth - scrollbarSize
        : this.props.totalWidth;
      const headerRowStyle: React.CSSProperties = {
        top: this.getCombinedHeaderHeights(index),
        width: updatedWidth,
        minHeight: rowHeight
      };

      return (
        <HeaderRow
          key={row.rowType}
          ref={isFilterRow ? this.filterRow : this.row}
          rowType={row.rowType}
          style={headerRowStyle}
          onColumnResize={this.onColumnResize}
          onColumnResizeEnd={this.onColumnResizeEnd}
          width={columnMetrics.width}
          height={row.height || this.props.rowHeight}
          columns={columnMetrics.columns}
          draggableHeaderCell={this.props.draggableHeaderCell}
          filterable={row.filterable}
          onFilterChange={row.onFilterChange}
          onHeaderDrop={this.props.onHeaderDrop}
          sortColumn={this.props.sortColumn}
          sortDirection={this.props.sortDirection}
          onSort={this.props.onSort}
          getValidFilterValues={this.props.getValidFilterValues}
        />
      );
    });
  }

  getColumnMetrics(): ColumnMetrics {
    if (this.state.resizing) {
      return this.state.resizing.columnMetrics;
    }
    return this.props.columnMetrics;
  }

  getColumnPosition(column: CalculatedColumn): number | null {
    const { columns } = this.getColumnMetrics();
    const idx = columns.findIndex(c => c.key === column.key);
    return idx === -1 ? null : idx;
  }

  getCombinedHeaderHeights(until?: number): number {
    const stopAt = typeof until === 'number'
      ? until
      : this.props.headerRows.length;

    let height = 0;
    for (let index = 0; index < stopAt; index++) {
      height += this.props.headerRows[index].height || this.props.rowHeight;
    }
    return height;
  }

  setScrollLeft(scrollLeft: number): void {
    const node = ReactDOM.findDOMNode(this.row.current) as Element;
    node.scrollLeft = scrollLeft;
    this.row.current!.setScrollLeft(scrollLeft);
    if (this.filterRow.current) {
      const nodeFilters = ReactDOM.findDOMNode(this.filterRow.current) as Element;
      nodeFilters.scrollLeft = scrollLeft;
      this.filterRow.current.setScrollLeft(scrollLeft);
    }
  }

  // Set the cell selection to -1 x -1 when clicking on the header
  onHeaderClick = (): void => {
    this.props.cellMetaData.onCellClick({ rowIdx: -1, idx: -1 });
  };

  render() {
    const className = classNames('react-grid-Header', {
      'react-grid-Header--resizing': !!this.state.resizing
    });

    return (
      <div
        style={{ height: this.getCombinedHeaderHeights() }}
        className={className}
        onClick={this.onHeaderClick}
      >
        {this.getHeaderRows()}
      </div>
    );
  }
}
