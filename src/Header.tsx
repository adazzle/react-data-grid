import React, { forwardRef, useRef, useImperativeHandle } from 'react';

import HeaderRow from './HeaderRow';
import { getScrollbarSize, isPositionStickySupported } from './utils';
import { CalculatedColumn, HeaderRowData, ColumnMetrics, CellMetaData } from './common/types';
import { DEFINE_SORT } from './common/enums';
import { DataGridProps } from './DataGrid';

type SharedDataGridProps<R, K extends keyof R> = Pick<DataGridProps<R, K>,
| 'draggableHeaderCell'
| 'getValidFilterValues'
| 'rowGetter'
| 'rowsCount'
| 'onHeaderDrop'
| 'onSelectedRowsChange'
| 'sortColumn'
| 'sortDirection'
> & Required<Pick<DataGridProps<R, K>,
| 'rowKey'
>>;

export interface HeaderProps<R, K extends keyof R> extends SharedDataGridProps<R, K> {
  allRowsSelected: boolean;
  columnMetrics: ColumnMetrics<R>;
  headerRows: [HeaderRowData<R>, HeaderRowData<R> | undefined];
  cellMetaData: CellMetaData<R>;
  onSort?(columnKey: keyof R, direction: DEFINE_SORT): void;
  onColumnResize(column: CalculatedColumn<R>, width: number): void;
}

export interface HeaderHandle {
  setScrollLeft(scrollLeft: number): void;
}

export default forwardRef(function Header<R, K extends keyof R>(props: HeaderProps<R, K>, ref: React.Ref<HeaderHandle>) {
  const headerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HeaderRow<R, K>>(null);
  const filterRowRef = useRef<HeaderRow<R, K>>(null);

  useImperativeHandle(ref, () => ({
    setScrollLeft(scrollLeft: number): void {
      headerRef.current!.scrollLeft = scrollLeft;
      if (isPositionStickySupported()) return;
      rowRef.current!.setScrollLeft(scrollLeft);
      if (filterRowRef.current) {
        filterRowRef.current.setScrollLeft(scrollLeft);
      }
    }
  }), []);

  function handleAllRowsSelectionChange(checked: boolean) {
    if (!props.onSelectedRowsChange) return;

    const newSelectedRows = new Set<R[K]>();
    if (checked) {
      for (let i = 0; i < props.rowsCount; i++) {
        newSelectedRows.add(props.rowGetter(i)[props.rowKey]);
      }
    }

    props.onSelectedRowsChange(newSelectedRows);
  }

  function getHeaderRow(row: HeaderRowData<R>, ref?: React.RefObject<HeaderRow<R, K>>) {
    return (
      <HeaderRow<R, K>
        key={row.rowType}
        ref={ref}
        rowType={row.rowType}
        onColumnResize={props.onColumnResize}
        width={props.columnMetrics.totalColumnWidth + getScrollbarSize()}
        height={row.height}
        columns={props.columnMetrics.columns}
        lastFrozenColumnIndex={props.columnMetrics.lastFrozenColumnIndex}
        draggableHeaderCell={props.draggableHeaderCell}
        filterable={row.filterable}
        onFilterChange={row.onFilterChange}
        onHeaderDrop={props.onHeaderDrop}
        allRowsSelected={props.allRowsSelected}
        onAllRowsSelectionChange={handleAllRowsSelectionChange}
        sortColumn={props.sortColumn}
        sortDirection={props.sortDirection}
        onSort={props.onSort}
        getValidFilterValues={props.getValidFilterValues}
      />
    );
  }

  function getHeaderRows() {
    const setRef = !isPositionStickySupported();
    const { headerRows } = props;
    const rows = [getHeaderRow(headerRows[0], setRef ? rowRef : undefined)];
    if (headerRows[1]) {
      rows.push(getHeaderRow(headerRows[1], setRef ? filterRowRef : undefined));
    }

    return rows;
  }

  // Set the cell selection to -1 x -1 when clicking on the header
  function onHeaderClick(): void {
    props.cellMetaData.onCellClick({ rowIdx: -1, idx: -1 });
  }

  return (
    <div
      ref={headerRef}
      className="rdg-header"
      onClick={onHeaderClick}
    >
      {getHeaderRows()}
    </div>
  );
} as React.RefForwardingComponent<HeaderHandle, HeaderProps<{ [key: string]: unknown }, string>>) as <R, K extends keyof R>(props: HeaderProps<R, K> & { ref?: React.Ref<HeaderHandle> }) => JSX.Element;
