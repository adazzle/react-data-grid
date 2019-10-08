import React, { useState, useMemo } from 'react';
import classNames from 'classnames';

import HeaderRow from './HeaderRow';
import { getColumnMetrics } from './utils/columnUtils';
import { getScrollbarSize } from './utils';
import { CalculatedColumn, HeaderRowData } from './common/types';
import { CanvasProps } from './Canvas';

type SharedGridProps<R> = Pick<CanvasProps<R>,
| 'rowKey'
| 'rowsCount'
| 'rowGetter'
| 'columnMetrics'
| 'onColumnResize'
| 'headerRows'
| 'rowOffsetHeight'
| 'sortColumn'
| 'sortDirection'
| 'draggableHeaderCell'
| 'onSelectedRowsChange'
| 'onGridSort'
| 'onHeaderDrop'
| 'getValidFilterValues'
| 'cellMetaData'
>;

export interface HeaderProps<R> extends SharedGridProps<R> {
  allRowsSelected: boolean;
}

export default function Header<R>(props: HeaderProps<R>) {
  const [resizing, setResizing] = useState<null | { column: CalculatedColumn<R>; width: number }>(null);

  const columnMetrics = useMemo(() => {
    if (resizing === null) return props.columnMetrics;

    return getColumnMetrics({
      ...props.columnMetrics,
      columnWidths: new Map([
        ...props.columnMetrics.columnWidths,
        [resizing.column.key, resizing.width]
      ])
    });
  }, [props.columnMetrics, resizing]);

  function onColumnResize(column: CalculatedColumn<R>, width: number): void {
    setResizing({ column, width: Math.max(width, columnMetrics.minColumnWidth) });
  }

  function onColumnResizeEnd(): void {
    if (resizing === null) return;
    props.onColumnResize(resizing.column.idx, resizing.width);
    setResizing(null);
  }

  function handleAllRowsSelectionChange(checked: boolean) {
    if (!props.onSelectedRowsChange) return;

    const newSelectedRows = new Set<R[keyof R]>();
    if (checked) {
      for (let i = 0; i < props.rowsCount; i++) {
        newSelectedRows.add(props.rowGetter(i)[props.rowKey]);
      }
    }

    props.onSelectedRowsChange(newSelectedRows);
  }

  function getHeaderRow(row: HeaderRowData<R>) {
    return (
      <HeaderRow<R>
        key={row.rowType}
        rowType={row.rowType}
        onColumnResize={onColumnResize}
        onColumnResizeEnd={onColumnResizeEnd}
        height={row.height}
        columns={columnMetrics.columns}
        draggableHeaderCell={props.draggableHeaderCell}
        filterable={row.filterable}
        onFilterChange={row.onFilterChange}
        onHeaderDrop={props.onHeaderDrop}
        allRowsSelected={props.allRowsSelected}
        onAllRowsSelectionChange={handleAllRowsSelectionChange}
        sortColumn={props.sortColumn}
        sortDirection={props.sortDirection}
        onGridSort={props.onGridSort}
        getValidFilterValues={props.getValidFilterValues}
      />
    );
  }

  function getHeaderRows() {
    const { headerRows } = props;
    const rows = [getHeaderRow(headerRows[0])];
    if (headerRows[1]) {
      rows.push(getHeaderRow(headerRows[1]));
    }

    return rows;
  }

  // Set the cell selection to -1 x -1 when clicking on the header
  // function onHeaderClick(): void {
  //   props.cellMetaData.onCellClick({ rowIdx: -1, idx: -1 });
  // }

  // const className = classNames('react-grid-Header', {
  //   'react-grid-Header--resizing': resizing !== null
  // });

  // return (
  //   <div
  //     style={{
  //       height: props.rowOffsetHeight,
  //       paddingRight: getScrollbarSize()
  //     }}
  //     className={className}
  //     onClick={onHeaderClick}
  //   >
  //     {getHeaderRows()}
  //   </div>
  // );

  return <>{getHeaderRows()}</>;
}
