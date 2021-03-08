import type { CalculatedColumn, Column, ColumnMetric } from '../types';
import type { DataGridProps } from '../DataGrid';
interface ViewportColumnsArgs<R, SR> extends Pick<DataGridProps<R, SR>, 'defaultColumnOptions'> {
    rawColumns: readonly Column<R, SR>[];
    rawGroupBy?: readonly string[];
    viewportWidth: number;
    scrollLeft: number;
    columnWidths: ReadonlyMap<string, number>;
}
export declare function useViewportColumns<R, SR>({ rawColumns, columnWidths, viewportWidth, scrollLeft, defaultColumnOptions, rawGroupBy }: ViewportColumnsArgs<R, SR>): {
    columns: CalculatedColumn<R, SR>[];
    viewportColumns: readonly CalculatedColumn<R, SR>[];
    layoutCssVars: Record<string, string>;
    columnMetrics: Map<CalculatedColumn<R, SR>, ColumnMetric>;
    totalColumnWidth: number;
    lastFrozenColumnIndex: number;
    totalFrozenColumnWidth: number;
    groupBy: string[];
};
export {};
