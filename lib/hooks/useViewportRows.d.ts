import type { GroupRow } from '../types';
interface ViewportRowsArgs<R> {
    rawRows: readonly R[];
    rowHeight: number;
    clientHeight: number;
    scrollTop: number;
    groupBy: readonly string[];
    rowGrouper?: (rows: readonly R[], columnKey: string) => Record<string, readonly R[]>;
    expandedGroupIds?: ReadonlySet<unknown>;
}
export declare function useViewportRows<R>({ rawRows, rowHeight, clientHeight, scrollTop, groupBy, rowGrouper, expandedGroupIds }: ViewportRowsArgs<R>): {
    rowOverscanStartIdx: number;
    rowOverscanEndIdx: number;
    rows: readonly R[] | (R | GroupRow<R>)[];
    rowsCount: number;
    isGroupRow: <R_1>(row: unknown) => row is GroupRow<R_1>;
};
export {};
