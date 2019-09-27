import React, { forwardRef, useRef, useState, useMemo, useImperativeHandle } from 'react';
import classNames from 'classnames';

import HeaderRow from './HeaderRow';
import { getColumnMetrics } from './ColumnMetrics';
import { getScrollbarSize } from './utils';
import { CalculatedColumn, HeaderRowData } from './common/types';
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

export interface HeaderHandle {
  setScrollLeft(scrollLeft: number): void;
}

export default forwardRef(function Header<R>(props: HeaderProps<R>, ref: React.Ref<HeaderHandle>) {
  const rowRef = useRef<HeaderRow<R>>(null);
  const filterRowRef = useRef<HeaderRow<R>>(null);

  const [resizing, setResizing] = useState<null | { column: CalculatedColumn<R>; width: number }>(null);

  const columnMetrics = useMemo(() => {
    if (resizing === null) return props.columnMetrics;

    return getColumnMetrics({
      ...props.columnMetrics,
      columnWidths: new Map([
        ...props.columnMetrics.columnWidths,
        [resizing.column.key as string, resizing.width]
      ])
    });
  }, [props.columnMetrics, resizing]);

  useImperativeHandle(ref, () => ({
    setScrollLeft(scrollLeft: number): void {
      rowRef.current!.setScrollLeft(scrollLeft);
      if (filterRowRef.current) {
        filterRowRef.current.setScrollLeft(scrollLeft);
      }
    }
  }), []);

  function onColumnResize(column: CalculatedColumn<R>, width: number): void {
    setResizing({ column, width: Math.max(width, columnMetrics.minColumnWidth) });
  }

  function onColumnResizeEnd(column: CalculatedColumn<R>, width: number): void {
    const pos = getColumnPosition(column);
    if (pos === null) return;
    setResizing(null);
    props.onColumnResize(pos, Math.max(width || column.width, columnMetrics.minColumnWidth));
  }

  function getHeaderRow(row: HeaderRowData<R>, ref: React.RefObject<HeaderRow<R>>) {
    return (
      <HeaderRow<R>
        key={row.rowType}
        ref={ref}
        rowType={row.rowType}
        onColumnResize={onColumnResize}
        onColumnResizeEnd={onColumnResizeEnd}
        height={row.height}
        columns={columnMetrics.columns}
        draggableHeaderCell={props.draggableHeaderCell}
        filterable={row.filterable}
        onFilterChange={row.onFilterChange}
        onHeaderDrop={props.onHeaderDrop}
        sortColumn={props.sortColumn}
        sortDirection={props.sortDirection}
        onSort={props.onSort}
        getValidFilterValues={props.getValidFilterValues}
      />
    );
  }

  function getHeaderRows() {
    const { headerRows } = props;
    const rows = [getHeaderRow(headerRows[0], rowRef)];
    if (headerRows[1]) {
      rows.push(getHeaderRow(headerRows[1], filterRowRef));
    }

    return rows;
  }

  function getColumnPosition(column: CalculatedColumn<R>): number | null {
    const idx = columnMetrics.columns.findIndex(c => c.key === column.key);
    return idx === -1 ? null : idx;
  }

  // Set the cell selection to -1 x -1 when clicking on the header
  function onHeaderClick(): void {
    props.cellMetaData.onCellClick({ rowIdx: -1, idx: -1 });
  }

  const className = classNames('react-grid-Header', {
    'react-grid-Header--resizing': resizing !== null
  });

  return (
    <div
      style={{
        height: props.rowOffsetHeight,
        paddingRight: getScrollbarSize()
      }}
      className={className}
      onClick={onHeaderClick}
    >
      {getHeaderRows()}
    </div>
  );
});
