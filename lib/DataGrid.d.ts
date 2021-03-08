import type { CalculatedColumn, Column, Filters, Position, RowRendererProps, RowsChangeData, FillEvent, PasteEvent } from './types';
import type { CellNavigationMode, SortDirection } from './enums';
declare type DefaultColumnOptions<R, SR> = Pick<Column<R, SR>, 'formatter' | 'minWidth' | 'resizable' | 'sortable'>;
export interface DataGridHandle {
    scrollToColumn: (colIdx: number) => void;
    scrollToRow: (rowIdx: number) => void;
    selectCell: (position: Position, openEditor?: boolean) => void;
}
declare type SharedDivProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'className' | 'style'>;
export interface DataGridProps<R, SR = unknown> extends SharedDivProps {
    /**
     * Grid and data Props
     */
    /** An array of objects representing each column on the grid */
    columns: readonly Column<R, SR>[];
    /** A function called for each rendered row that should return a plain key/value pair object */
    rows: readonly R[];
    /**
     * Rows to be pinned at the bottom of the rows view for summary, the vertical scroll bar will not scroll these rows.
     * Bottom horizontal scroll bar can move the row left / right. Or a customized row renderer can be used to disabled the scrolling support.
     */
    summaryRows?: readonly SR[];
    /** The getter should return a unique key for each row */
    rowKeyGetter?: (row: R) => React.Key;
    onRowsChange?: (rows: R[], data: RowsChangeData<R, SR>) => void;
    /**
     * Dimensions props
     */
    /** The height of each row in pixels */
    rowHeight?: number;
    /** The height of the header row in pixels */
    headerRowHeight?: number;
    /** The height of the header filter row in pixels */
    headerFiltersHeight?: number;
    /**
     * Feature props
     */
    /** Set of selected row keys */
    selectedRows?: ReadonlySet<React.Key>;
    /** Function called whenever row selection is changed */
    onSelectedRowsChange?: (selectedRows: Set<React.Key>) => void;
    /** The key of the column which is currently being sorted */
    sortColumn?: string;
    /** The direction to sort the sortColumn*/
    sortDirection?: SortDirection;
    /** Function called whenever grid is sorted*/
    onSort?: (columnKey: string, direction: SortDirection) => void;
    filters?: Filters;
    onFiltersChange?: (filters: Filters) => void;
    defaultColumnOptions?: DefaultColumnOptions<R, SR>;
    groupBy?: readonly string[];
    rowGrouper?: (rows: readonly R[], columnKey: string) => Record<string, readonly R[]>;
    expandedGroupIds?: ReadonlySet<unknown>;
    onExpandedGroupIdsChange?: (expandedGroupIds: Set<unknown>) => void;
    onFill?: (event: FillEvent<R>) => R[];
    onPaste?: (event: PasteEvent<R>) => R;
    /**
     * Custom renderers
     */
    rowRenderer?: React.ComponentType<RowRendererProps<R, SR>>;
    emptyRowsRenderer?: React.ComponentType;
    /**
     * Event props
     */
    /** Function called whenever a row is clicked */
    onRowClick?: (rowIdx: number, row: R, column: CalculatedColumn<R, SR>) => void;
    /** Called when the grid is scrolled */
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
    /** Called when a column is resized */
    onColumnResize?: (idx: number, width: number) => void;
    /** Function called whenever selected cell is changed */
    onSelectedCellChange?: (position: Position) => void;
    /**
     * Toggles and modes
     */
    /** Toggles whether filters row is displayed or not */
    enableFilterRow?: boolean;
    cellNavigationMode?: CellNavigationMode;
    /**
     * Miscellaneous
     */
    /** The node where the editor portal should mount. */
    editorPortalTarget?: Element;
    rowClass?: (row: R) => string | undefined;
}
declare const _default: <R, SR = unknown>(props: DataGridProps<R, SR> & import("react").RefAttributes<DataGridHandle>) => JSX.Element;
export default _default;
