import { JSX as JSX_2 } from 'react/jsx-runtime';
import type { Key } from 'react';
import { Provider } from 'react';
import type { ReactElement } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';

declare interface BaseRenderRowProps<TRow, TSummaryRow = unknown> extends Omit_2<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'>, Pick<DataGridProps<TRow, TSummaryRow>, 'onCellClick' | 'onCellDoubleClick' | 'onCellContextMenu'> {
    viewportColumns: readonly CalculatedColumn<TRow, TSummaryRow>[];
    rowIdx: number;
    selectedCellIdx: number | undefined;
    isRowSelected: boolean;
    gridRowStart: number;
    selectCell: (position: Position, enableEditor?: Maybe<boolean>) => void;
}

export declare interface CalculatedColumn<TRow, TSummaryRow = unknown> extends Column<TRow, TSummaryRow> {
    readonly parent: CalculatedColumnParent<TRow, TSummaryRow> | undefined;
    readonly idx: number;
    readonly level: number;
    readonly width: number | string;
    readonly minWidth: number;
    readonly maxWidth: number | undefined;
    readonly resizable: boolean;
    readonly sortable: boolean;
    readonly draggable: boolean;
    readonly frozen: boolean;
    readonly renderCell: (props: RenderCellProps<TRow, TSummaryRow>) => ReactNode;
}

export declare type CalculatedColumnOrColumnGroup<R, SR> = CalculatedColumnParent<R, SR> | CalculatedColumn<R, SR>;

export declare interface CalculatedColumnParent<R, SR> {
    readonly name: string | ReactElement;
    readonly parent: CalculatedColumnParent<R, SR> | undefined;
    readonly idx: number;
    readonly colSpan: number;
    readonly level: number;
    readonly headerCellClass?: Maybe<string>;
}

export declare interface CellClickArgs<TRow, TSummaryRow = unknown> {
    row: TRow;
    column: CalculatedColumn<TRow, TSummaryRow>;
    selectCell: (enableEditor?: boolean) => void;
}

declare type CellEvent<E extends React.SyntheticEvent<HTMLDivElement>> = E & {
    preventGridDefault: () => void;
    isGridDefaultPrevented: () => boolean;
};

export declare type CellKeyboardEvent = CellEvent<React.KeyboardEvent<HTMLDivElement>>;

export declare type CellKeyDownArgs<TRow, TSummaryRow = unknown> = SelectCellKeyDownArgs<TRow, TSummaryRow> | EditCellKeyDownArgs<TRow, TSummaryRow>;

export declare type CellMouseEvent = CellEvent<React.MouseEvent<HTMLDivElement>>;

export declare interface CellRendererProps<TRow, TSummaryRow> extends Pick<RenderRowProps<TRow, TSummaryRow>, 'row' | 'rowIdx' | 'selectCell'>, Omit_2<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children' | 'onClick' | 'onDoubleClick' | 'onContextMenu' | 'onMouseDownCapture' | 'onMouseUpCapture' | 'onMouseEnter'> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    colSpan: number | undefined;
    isCopied: boolean;
    isDraggedOver: boolean;
    isCellSelected: boolean;
    onClick: RenderRowProps<TRow, TSummaryRow>['onCellClick'];
    onDoubleClick: RenderRowProps<TRow, TSummaryRow>['onCellDoubleClick'];
    onContextMenu: RenderRowProps<TRow, TSummaryRow>['onCellContextMenu'];
    onRowChange: (column: CalculatedColumn<TRow, TSummaryRow>, newRow: TRow) => void;
    rangeSelectionMode: boolean;
    onMouseDownCapture: RenderRowProps<TRow, TSummaryRow>['onCellMouseDown'];
    onMouseUpCapture: RenderRowProps<TRow, TSummaryRow>['onCellMouseUp'];
    onMouseEnter: RenderRowProps<TRow, TSummaryRow>['onCellMouseEnter'];
}

export declare interface CellSelectArgs<TRow, TSummaryRow = unknown> {
    rowIdx: number;
    row: TRow;
    column: CalculatedColumn<TRow, TSummaryRow>;
}

declare interface CellsRange {
    startRowIdx: number;
    startColumnIdx: number;
    endRowIdx: number;
    endColumnIdx: number;
}

export declare type ColSpanArgs<TRow, TSummaryRow> = {
    type: 'HEADER';
} | {
    type: 'ROW';
    row: TRow;
} | {
    type: 'SUMMARY';
    row: TSummaryRow;
};

export declare interface Column<TRow, TSummaryRow = unknown> {
    /** The name of the column. By default it will be displayed in the header cell */
    readonly name: string | ReactElement;
    /** A unique key to distinguish each column */
    readonly key: string;
    /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns */
    readonly width?: Maybe<number | string>;
    /** Minimum column width in px. */
    readonly minWidth?: Maybe<number>;
    /** Maximum column width in px. */
    readonly maxWidth?: Maybe<number>;
    readonly cellClass?: Maybe<string | ((row: TRow) => Maybe<string>)>;
    readonly headerCellClass?: Maybe<string>;
    readonly summaryCellClass?: Maybe<string | ((row: TSummaryRow) => Maybe<string>)>;
    /** Render function used to render the content of the column's header cell */
    readonly renderHeaderCell?: Maybe<(props: RenderHeaderCellProps<TRow, TSummaryRow>) => ReactNode>;
    /** Render function used to render the content of cells */
    readonly renderCell?: Maybe<(props: RenderCellProps<TRow, TSummaryRow>) => ReactNode>;
    /** Render function used to render the content of summary cells */
    readonly renderSummaryCell?: Maybe<(props: RenderSummaryCellProps<TSummaryRow, TRow>) => ReactNode>;
    /** Render function used to render the content of group cells */
    readonly renderGroupCell?: Maybe<(props: RenderGroupCellProps<TRow, TSummaryRow>) => ReactNode>;
    /** Render function used to render the content of edit cells. When set, the column is automatically set to be editable */
    readonly renderEditCell?: Maybe<(props: RenderEditCellProps<TRow, TSummaryRow>) => ReactNode>;
    /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
    readonly editable?: Maybe<boolean | ((row: TRow) => boolean)>;
    readonly colSpan?: Maybe<(args: ColSpanArgs<TRow, TSummaryRow>) => Maybe<number>>;
    /** Determines whether column is frozen or not */
    readonly frozen?: Maybe<boolean>;
    /** Enable resizing of a column */
    readonly resizable?: Maybe<boolean>;
    /** Enable sorting of a column */
    readonly sortable?: Maybe<boolean>;
    /** Enable dragging of a column */
    readonly draggable?: Maybe<boolean>;
    /** Sets the column sort order to be descending instead of ascending the first time the column is sorted */
    readonly sortDescendingFirst?: Maybe<boolean>;
    readonly editorOptions?: Maybe<{
        /**
         * Render the cell content in addition to the edit cell.
         * Enable this option when the editor is rendered outside the grid, like a modal for example.
         * By default, the cell content is not rendered when the edit cell is open.
         * @default false
         */
        readonly displayCellContent?: Maybe<boolean>;
        /** @default true */
        readonly commitOnOutsideClick?: Maybe<boolean>;
    }>;
}

export declare interface ColumnGroup<R, SR = unknown> {
    /** The name of the column group, it will be displayed in the header cell */
    readonly name: string | ReactElement;
    readonly headerCellClass?: Maybe<string>;
    readonly children: readonly ColumnOrColumnGroup<R, SR>[];
}

export declare type ColumnOrColumnGroup<R, SR = unknown> = Column<R, SR> | ColumnGroup<R, SR>;

export declare interface CopyEvent<TRow> {
    sourceColumnKey: string;
    sourceRow: TRow;
}

export declare const DataGridDefaultRenderersProvider: Provider<Maybe<Renderers<any, any>>>;

export declare interface DataGridHandle {
    element: HTMLDivElement | null;
    scrollToCell: (position: PartialPosition) => void;
    selectCell: (position: Position, enableEditor?: Maybe<boolean>) => void;
}

export declare interface DataGridProps<R, SR = unknown, K extends Key = Key> extends SharedDivProps {
    /**
     * Grid and data Props
     */
    /** An array of objects representing each column on the grid */
    columns: readonly ColumnOrColumnGroup<NoInfer<R>, NoInfer<SR>>[];
    /** A function called for each rendered row that should return a plain key/value pair object */
    rows: readonly R[];
    /**
     * Rows to be pinned at the top of the rows view for summary, the vertical scroll bar will not scroll these rows.
     */
    topSummaryRows?: Maybe<readonly SR[]>;
    /**
     * Rows to be pinned at the bottom of the rows view for summary, the vertical scroll bar will not scroll these rows.
     */
    bottomSummaryRows?: Maybe<readonly SR[]>;
    /** The getter should return a unique key for each row */
    rowKeyGetter?: Maybe<(row: NoInfer<R>) => K>;
    onRowsChange?: Maybe<(rows: NoInfer<R>[], data: RowsChangeData<NoInfer<R>, NoInfer<SR>>) => void>;
    /**
     * Dimensions props
     */
    /**
     * The height of each row in pixels
     * @default 35
     */
    rowHeight?: Maybe<number | ((row: NoInfer<R>) => number)>;
    /**
     * The height of the header row in pixels
     * @default 35
     */
    headerRowHeight?: Maybe<number>;
    /**
     * The height of each summary row in pixels
     * @default 35
     */
    summaryRowHeight?: Maybe<number>;
    /**
     * Feature props
     */
    /** Set of selected row keys */
    selectedRows?: Maybe<ReadonlySet<K>>;
    /** Function called whenever row selection is changed */
    onSelectedRowsChange?: Maybe<(selectedRows: Set<NoInfer<K>>) => void>;
    /** Used for multi column sorting */
    sortColumns?: Maybe<readonly SortColumn[]>;
    onSortColumnsChange?: Maybe<(sortColumns: SortColumn[]) => void>;
    defaultColumnOptions?: Maybe<DefaultColumnOptions<NoInfer<R>, NoInfer<SR>>>;
    onFill?: Maybe<(event: FillEvent<NoInfer<R>>) => NoInfer<R>>;
    onCopy?: Maybe<(event: CopyEvent<NoInfer<R>>) => void>;
    onPaste?: Maybe<(event: PasteEvent<NoInfer<R>>) => NoInfer<R>>;
    onMultiPaste?: Maybe<(event: MultiPasteEvent) => void>;
    onMultiCopy?: Maybe<(event: MultiCopyEvent<NoInfer<R>>) => void>;
    rangeLeftBoundaryColIdx?: Maybe<number>;
    onSelectedRangeChange?: Maybe<(selectedRange: CellsRange) => void>;
    /**
     * Event props
     */
    /** Function called whenever a cell is clicked */
    onCellClick?: Maybe<(args: CellClickArgs<NoInfer<R>, NoInfer<SR>>, event: CellMouseEvent) => void>;
    /** Function called whenever a cell is double clicked */
    onCellDoubleClick?: Maybe<(args: CellClickArgs<NoInfer<R>, NoInfer<SR>>, event: CellMouseEvent) => void>;
    /** Function called whenever a cell is right clicked */
    onCellContextMenu?: Maybe<(args: CellClickArgs<NoInfer<R>, NoInfer<SR>>, event: CellMouseEvent) => void>;
    onCellKeyDown?: Maybe<(args: CellKeyDownArgs<NoInfer<R>, NoInfer<SR>>, event: CellKeyboardEvent) => void>;
    /** Function called whenever cell selection is changed */
    onSelectedCellChange?: Maybe<(args: CellSelectArgs<NoInfer<R>, NoInfer<SR>>) => void>;
    /** Called when the grid is scrolled */
    onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>;
    /** Called when a column is resized */
    onColumnResize?: Maybe<(idx: number, width: number) => void>;
    /** Called when a column is reordered */
    onColumnsReorder?: Maybe<(sourceColumnKey: string, targetColumnKey: string) => void>;
    /**
     * Toggles and modes
     */
    /** @default true */
    enableVirtualization?: Maybe<boolean>;
    /** @default false, set true to enable range selection with copy and paste through clipboard */
    enableRangeSelection?: Maybe<boolean>;
    /**
     * Miscellaneous
     */
    renderers?: Maybe<Renderers<NoInfer<R>, NoInfer<SR>>>;
    rowClass?: Maybe<(row: NoInfer<R>, rowIdx: number) => Maybe<string>>;
    /** @default 'ltr' */
    direction?: Maybe<Direction>;
    'data-testid'?: Maybe<string>;
}

declare const _default: <R, SR = unknown, K extends Key = Key>(props: DataGridProps<R, SR, K> & RefAttributes<DataGridHandle>) => React.JSX.Element;
export default _default;

declare type DefaultColumnOptions<R, SR> = Pick<Column<R, SR>, 'renderCell' | 'width' | 'minWidth' | 'maxWidth' | 'resizable' | 'sortable' | 'draggable'>;

declare type Direction = 'ltr' | 'rtl';

declare interface EditCellKeyDownArgs<TRow, TSummaryRow = unknown> {
    mode: 'EDIT';
    row: TRow;
    column: CalculatedColumn<TRow, TSummaryRow>;
    rowIdx: number;
    navigate: () => void;
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
}

export declare interface FillEvent<TRow> {
    columnKey: string;
    sourceRow: TRow;
    targetRow: TRow;
}

declare interface GroupRow<TRow> {
    readonly childRows: readonly TRow[];
    readonly id: string;
    readonly parentId: unknown;
    readonly groupKey: unknown;
    readonly isExpanded: boolean;
    readonly level: number;
    readonly posInSet: number;
    readonly setSize: number;
    readonly startRowIndex: number;
}

declare type Maybe<T> = T | undefined | null;

declare interface MultiCopyEvent<TRow> {
    cellsRange: CellsRange;
    sourceColumnKeys: string[];
    sourceRows: TRow[];
}

declare interface MultiPasteEvent {
    copiedRange: CellsRange;
    targetRange: CellsRange;
}

declare type Omit_2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare interface PartialPosition {
    readonly idx?: number | undefined;
    readonly rowIdx?: number | undefined;
}

export declare interface PasteEvent<TRow> {
    sourceColumnKey: string;
    sourceRow: TRow;
    targetColumnKey: string;
    targetRow: TRow;
}

declare interface Position {
    readonly idx: number;
    readonly rowIdx: number;
}

export declare interface RenderCellProps<TRow, TSummaryRow = unknown> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    row: TRow;
    rowIdx: number;
    isCellEditable: boolean;
    tabIndex: number;
    onRowChange: (row: TRow) => void;
}

export declare function renderCheckbox({ onChange, ...props }: RenderCheckboxProps): JSX_2.Element;

export declare interface RenderCheckboxProps extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'aria-label' | 'aria-labelledby' | 'checked' | 'tabIndex' | 'disabled'> {
    onChange: (checked: boolean, shift: boolean) => void;
}

export declare interface RenderEditCellProps<TRow, TSummaryRow = unknown> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    row: TRow;
    rowIdx: number;
    onRowChange: (row: TRow, commitChanges?: boolean) => void;
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
}

export declare interface Renderers<TRow, TSummaryRow> {
    renderCheckbox?: Maybe<(props: RenderCheckboxProps) => ReactNode>;
    renderRow?: Maybe<(key: Key, props: RenderRowProps<TRow, TSummaryRow>) => ReactNode>;
    renderSortStatus?: Maybe<(props: RenderSortStatusProps) => ReactNode>;
    noRowsFallback?: Maybe<ReactNode>;
}

export declare interface RenderGroupCellProps<TRow, TSummaryRow = unknown> {
    groupKey: unknown;
    column: CalculatedColumn<TRow, TSummaryRow>;
    row: GroupRow<TRow>;
    childRows: readonly TRow[];
    isExpanded: boolean;
    tabIndex: number;
    toggleGroup: () => void;
}

export declare function renderHeaderCell<R, SR>({ column, sortDirection, priority }: RenderHeaderCellProps<R, SR>): string | JSX_2.Element;

export declare interface RenderHeaderCellProps<TRow, TSummaryRow = unknown> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    sortDirection: SortDirection | undefined;
    priority: number | undefined;
    tabIndex: number;
}

export declare interface RenderRowProps<TRow, TSummaryRow = unknown> extends BaseRenderRowProps<TRow, TSummaryRow> {
    row: TRow;
    lastFrozenColumnIndex: number;
    copiedCellIdx: number | undefined;
    draggedOverCellIdx: number | undefined;
    selectedCellEditor: ReactElement<RenderEditCellProps<TRow>> | undefined;
    onRowChange: (column: CalculatedColumn<TRow, TSummaryRow>, rowIdx: number, newRow: TRow) => void;
    rowClass: Maybe<(row: TRow, rowIdx: number) => Maybe<string>>;
    setDraggedOverRowIdx: ((overRowIdx: number) => void) | undefined;
    selectedCellsRange: {
        startIdx: number;
        endIdx: number;
    };
    rangeSelectionMode: boolean;
    onCellMouseDown: Maybe<(args: CellClickArgs<NoInfer<TRow>, NoInfer<TSummaryRow>>, event: CellMouseEvent) => void>;
    onCellMouseUp: Maybe<(args: CellClickArgs<NoInfer<TRow>, NoInfer<TSummaryRow>>, event: CellMouseEvent) => void>;
    onCellMouseEnter: Maybe<(args: CellClickArgs<NoInfer<TRow>, NoInfer<TSummaryRow>>, event: CellMouseEvent) => void>;
}

export declare function renderSortIcon({ sortDirection }: RenderSortIconProps): JSX_2.Element | null;

export declare interface RenderSortIconProps {
    sortDirection: SortDirection | undefined;
}

export declare function renderSortPriority({ priority }: RenderSortPriorityProps): number | undefined;

export declare interface RenderSortPriorityProps {
    priority: number | undefined;
}

export declare interface RenderSortStatusProps extends RenderSortIconProps, RenderSortPriorityProps {
}

export declare interface RenderSummaryCellProps<TSummaryRow, TRow = unknown> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    row: TSummaryRow;
    tabIndex: number;
}

export declare function renderToggleGroup<R, SR>(props: RenderGroupCellProps<R, SR>): JSX_2.Element;

export declare function renderValue<R, SR>(props: RenderCellProps<R, SR>): ReactNode;

export declare const Row: <R, SR>(props: RenderRowProps<R, SR> & RefAttributes<HTMLDivElement>) => React.JSX.Element;

export declare type RowHeightArgs<TRow> = {
    type: 'ROW';
    row: TRow;
} | {
    type: 'GROUP';
    row: GroupRow<TRow>;
};

export declare interface RowsChangeData<R, SR = unknown> {
    indexes: number[];
    column: CalculatedColumn<R, SR>;
}

export declare const SELECT_COLUMN_KEY = "select-row";

export declare function SelectCellFormatter({ value, tabIndex, disabled, onChange, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy }: SelectCellFormatterProps): ReactNode;

declare interface SelectCellFormatterProps extends SharedInputProps {
    value: boolean;
    onChange: (value: boolean, isShiftClick: boolean) => void;
}

declare interface SelectCellKeyDownArgs<TRow, TSummaryRow = unknown> {
    mode: 'SELECT';
    row: TRow;
    column: CalculatedColumn<TRow, TSummaryRow>;
    rowIdx: number;
    selectCell: (position: Position, enableEditor?: Maybe<boolean>) => void;
}

export declare const SelectColumn: Column<any, any>;

export declare type SelectRowEvent<TRow> = {
    type: 'HEADER';
    checked: boolean;
} | {
    type: 'ROW';
    row: TRow;
    checked: boolean;
    isShiftClick: boolean;
};

declare type SharedDivProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'role' | 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-rowcount' | 'className' | 'style'>;

declare type SharedInputProps = Pick<RenderCheckboxProps, 'disabled' | 'tabIndex' | 'aria-label' | 'aria-labelledby'>;

export declare interface SortColumn {
    readonly columnKey: string;
    readonly direction: SortDirection;
}

export declare type SortDirection = 'ASC' | 'DESC';

export declare function textEditor<TRow, TSummaryRow>({ row, column, onRowChange, onClose }: RenderEditCellProps<TRow, TSummaryRow>): JSX_2.Element;

export declare function ToggleGroup<R, SR>({ groupKey, isExpanded, tabIndex, toggleGroup }: RenderGroupCellProps<R, SR>): JSX_2.Element;

export declare const TreeDataGrid: <R, SR = unknown, K extends Key = Key>(props: TreeDataGridProps<R, SR, K> & RefAttributes<DataGridHandle>) => React.JSX.Element;

export declare interface TreeDataGridProps<R, SR = unknown, K extends Key = Key> extends Omit_2<DataGridProps<R, SR, K>, 'columns' | 'role' | 'aria-rowcount' | 'rowHeight' | 'onFill'> {
    columns: readonly Column<NoInfer<R>, NoInfer<SR>>[];
    rowHeight?: Maybe<number | ((args: RowHeightArgs<NoInfer<R>>) => number)>;
    groupBy: readonly string[];
    rowGrouper: (rows: readonly NoInfer<R>[], columnKey: string) => Record<string, readonly NoInfer<R>[]>;
    expandedGroupIds: ReadonlySet<unknown>;
    onExpandedGroupIdsChange: (expandedGroupIds: Set<unknown>) => void;
}

export declare function useRowSelection<R>(): [boolean, (selectRowEvent: SelectRowEvent<R>) => void];

export { }
