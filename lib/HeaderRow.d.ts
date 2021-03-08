import type { CalculatedColumn } from './types';
import type { DataGridProps } from './DataGrid';
declare type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, SR>, 'rows' | 'onSelectedRowsChange' | 'sortColumn' | 'sortDirection' | 'onSort' | 'rowKeyGetter'>;
export interface HeaderRowProps<R, SR> extends SharedDataGridProps<R, SR> {
    columns: readonly CalculatedColumn<R, SR>[];
    allRowsSelected: boolean;
    onColumnResize: (column: CalculatedColumn<R, SR>, width: number) => void;
}
declare const _default: <R, SR>(props: HeaderRowProps<R, SR>) => JSX.Element;
export default _default;
