import React from 'react';
import classNames from 'classnames';

import HeaderRow from './HeaderRow';
import { resizeColumn } from './ColumnMetrics';
import { getScrollbarSize } from './utils';
import { CalculatedColumn, ColumnMetrics, HeaderRowData } from './common/types';
import { GridProps } from './Grid';

type SharedGridProps<R> = Pick<GridProps<R>,
'columnMetrics'
| 'onColumnResize'
| 'headerRows'
| 'rowOffsetHeight'
| 'sortColumn'
| 'sortDirection'
| 'draggableHeaderCell'
| 'onSort'
| 'onHeaderDrop'
| 'getValidFilterValues'
| 'cellMetaData'
>;

export type HeaderProps<R> = SharedGridProps<R>;

interface State<R> {
  resizing: { column: CalculatedColumn<R>; columnMetrics: ColumnMetrics<R> } | null;
}

export default class Header<R> extends React.Component<HeaderProps<R>, State<R>> {
  readonly state: Readonly<State<R>> = { resizing: null };

  private readonly row = React.createRef<HeaderRow<R>>();
  private readonly filterRow = React.createRef<HeaderRow<R>>();

  componentWillReceiveProps(): void {
    this.setState({ resizing: null });
  }

  onColumnResize = (column: CalculatedColumn<R>, width: number): void => {
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

  onColumnResizeEnd = (column: CalculatedColumn<R>, width: number): void => {
    const pos = this.getColumnPosition(column);
    if (pos === null) return;
    this.props.onColumnResize(pos, width || column.width);
  };

  getHeaderRow = (row: HeaderRowData<R>, ref: React.RefObject<HeaderRow<R>>) => {
    const columnMetrics = this.getColumnMetrics();

    return (
      <HeaderRow<R>
        key={row.rowType}
        ref={ref}
        rowType={row.rowType}
        onColumnResize={this.onColumnResize}
        onColumnResizeEnd={this.onColumnResizeEnd}
        height={row.height}
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
  };

  getHeaderRows() {
    const { headerRows } = this.props;
    const rows = [this.getHeaderRow(headerRows[0], this.row)];
    if (headerRows[1]) {
      rows.push(this.getHeaderRow(headerRows[1], this.filterRow));
    }

    return rows;
  }

  getColumnMetrics(): ColumnMetrics<R> {
    if (this.state.resizing) {
      return this.state.resizing.columnMetrics;
    }
    return this.props.columnMetrics;
  }

  getColumnPosition(column: CalculatedColumn<R>): number | null {
    const { columns } = this.getColumnMetrics();
    const idx = columns.findIndex(c => c.key === column.key);
    return idx === -1 ? null : idx;
  }

  setScrollLeft(scrollLeft: number): void {
    this.row.current!.setScrollLeft(scrollLeft);
    if (this.filterRow.current) {
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
        style={{
          height: this.props.rowOffsetHeight,
          paddingRight: getScrollbarSize()
        }}
        className={className}
        onClick={this.onHeaderClick}
      >
        {this.getHeaderRows()}
      </div>
    );
  }
}
