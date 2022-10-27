import type { Key } from 'react';
import { Provider } from 'react';
import type { ReactElement } from 'react';
import type { ReactNode } from 'react';
import type { RefAttributes } from 'react';
import { RefObject } from 'react';

export declare interface CalculatedColumn<TRow, TSummaryRow = unknown> extends Column<TRow, TSummaryRow> {
    readonly idx: number;
    readonly width: number | string;
    readonly minWidth: number;
    readonly maxWidth: number | undefined;
    readonly resizable: boolean;
    readonly sortable: boolean;
    readonly frozen: boolean;
    readonly isLastFrozenColumn: boolean;
    readonly rowGroup: boolean;
    readonly formatter: (props: FormatterProps<TRow, TSummaryRow>) => ReactNode;
}

export declare type CellNavigationMode = 'NONE' | 'CHANGE_ROW' | 'LOOP_OVER_ROW';

export declare interface CellRendererProps<TRow, TSummaryRow> extends Pick<RowRendererProps<TRow, TSummaryRow>, 'onRowClick' | 'onRowDoubleClick' | 'selectCell'>, Omit_2<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    colSpan: number | undefined;
    row: TRow;
    isCopied: boolean;
    isDraggedOver: boolean;
    isCellSelected: boolean;
    dragHandle: ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined;
    onRowChange: (column: CalculatedColumn<TRow, TSummaryRow>, newRow: TRow) => void;
}

export declare function checkboxFormatter({ onChange, ...props }: CheckboxFormatterProps, ref: React.RefObject<HTMLInputElement>): JSX.Element;

export declare interface CheckboxFormatterProps extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'aria-label' | 'aria-labelledby' | 'checked' | 'tabIndex' | 'disabled'> {
    onChange: (checked: boolean, shift: boolean) => void;
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
    /** Formatter to be used to render the cell content */
    readonly formatter?: Maybe<(props: FormatterProps<TRow, TSummaryRow>) => ReactNode>;
    /** Formatter to be used to render the summary cell content */
    readonly summaryFormatter?: Maybe<(props: SummaryFormatterProps<TSummaryRow, TRow>) => ReactNode>;
    /** Formatter to be used to render the group cell content */
    readonly groupFormatter?: Maybe<(props: GroupFormatterProps<TRow, TSummaryRow>) => ReactNode>;
    /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
    readonly editable?: Maybe<boolean | ((row: TRow) => boolean)>;
    readonly colSpan?: Maybe<(args: ColSpanArgs<TRow, TSummaryRow>) => Maybe<number>>;
    /** Determines whether column is frozen or not */
    readonly frozen?: Maybe<boolean>;
    /** Enable resizing of a column */
    readonly resizable?: Maybe<boolean>;
    /** Enable sorting of a column */
    readonly sortable?: Maybe<boolean>;
    /** Sets the column sort order to be descending instead of ascending the first time the column is sorted */
    readonly sortDescendingFirst?: Maybe<boolean>;
    /** Editor to be rendered when cell of column is being edited. If set, then the column is automatically set to be editable */
    readonly editor?: Maybe<(props: EditorProps<TRow, TSummaryRow>) => ReactNode>;
    readonly editorOptions?: Maybe<{
        /** @default false */
        readonly renderFormatter?: Maybe<boolean>;
        /** @default false */
        readonly editOnClick?: Maybe<boolean>;
        /** @default true */
        readonly commitOnOutsideClick?: Maybe<boolean>;
        /** Prevent default to cancel editing */
        readonly onCellKeyDown?: Maybe<(event: React.KeyboardEvent<HTMLDivElement>) => void>;
        /** Control the default cell navigation behavior while the editor is open */
        readonly onNavigation?: Maybe<(event: React.KeyboardEvent<HTMLDivElement>) => boolean>;
    }>;
    /** Header renderer for each header cell */
    readonly headerRenderer?: Maybe<(props: HeaderRendererProps<TRow, TSummaryRow>) => ReactNode>;
}

export declare interface CopyEvent<TRow> {
    sourceColumnKey: string;
    sourceRow: TRow;
}

export declare const DataGridDefaultComponentsProvider: Provider<Maybe<Renderers<any, any>>>;

export declare interface DataGridHandle {
    element: HTMLDivElement | null;
    scrollToColumn: (colIdx: number) => void;
    scrollToRow: (rowIdx: number) => void;
    selectCell: (position: Position, enableEditor?: Maybe<boolean>) => void;
}

export declare interface DataGridProps<R, SR = unknown, K extends Key = Key> extends SharedDivProps {
    /**
     * Grid and data Props
     */
    /** An array of objects representing each column on the grid */
    columns: readonly Column<R, SR>[];
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
    rowKeyGetter?: Maybe<(row: R) => K>;
    onRowsChange?: Maybe<(rows: R[], data: RowsChangeData<R, SR>) => void>;
    /**
     * Dimensions props
     */
    /**
     * The height of each row in pixels
     * @default 35
     */
    rowHeight?: Maybe<number | ((args: RowHeightArgs<R>) => number)>;
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
    onSelectedRowsChange?: Maybe<(selectedRows: Set<K>) => void>;
    /** Used for multi column sorting */
    sortColumns?: Maybe<readonly SortColumn[]>;
    onSortColumnsChange?: Maybe<(sortColumns: SortColumn[]) => void>;
    defaultColumnOptions?: Maybe<DefaultColumnOptions<R, SR>>;
    groupBy?: Maybe<readonly string[]>;
    rowGrouper?: Maybe<(rows: readonly R[], columnKey: string) => Record<string, readonly R[]>>;
    expandedGroupIds?: Maybe<ReadonlySet<unknown>>;
    onExpandedGroupIdsChange?: Maybe<(expandedGroupIds: Set<unknown>) => void>;
    onFill?: Maybe<(event: FillEvent<R>) => R>;
    onCopy?: Maybe<(event: CopyEvent<R>) => void>;
    onPaste?: Maybe<(event: PasteEvent<R>) => R>;
    /**
     * Event props
     */
    /** Function called whenever a row is clicked */
    onRowClick?: Maybe<(row: R, column: CalculatedColumn<R, SR>) => void>;
    /** Function called whenever a row is double clicked */
    onRowDoubleClick?: Maybe<(row: R, column: CalculatedColumn<R, SR>) => void>;
    /** Called when the grid is scrolled */
    onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>;
    /** Called when a column is resized */
    onColumnResize?: Maybe<(idx: number, width: number) => void>;
    /** Function called whenever selected cell is changed */
    onSelectedCellChange?: Maybe<(position: Position) => void>;
    /**
     * Toggles and modes
     */
    /** @default 'NONE' */
    cellNavigationMode?: Maybe<CellNavigationMode>;
    /** @default true */
    enableVirtualization?: Maybe<boolean>;
    /**
     * Miscellaneous
     */
    shouldCloseEditor?: Maybe<(column: CalculatedColumn<R, SR>, currentlyEditedRow: R, incomingRow: R) => boolean>;
    renderers?: Maybe<Renderers<R, SR>>;
    rowClass?: Maybe<(row: R) => Maybe<string>>;
    /** @default 'ltr' */
    direction?: Maybe<Direction>;
    'data-testid'?: Maybe<string>;
}

declare const _default: <R, SR = unknown, K extends Key = Key>(props: DataGridProps<R, SR, K> & RefAttributes<DataGridHandle>) => JSX.Element;
export default _default;

declare type DefaultColumnOptions<R, SR> = Pick<Column<R, SR>, 'formatter' | 'width' | 'minWidth' | 'maxWidth' | 'resizable' | 'sortable'>;

declare type Direction = 'ltr' | 'rtl';

export declare interface EditorProps<TRow, TSummaryRow = unknown> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    row: TRow;
    onRowChange: (row: TRow, commitChanges?: boolean) => void;
    onClose: (commitChanges?: boolean) => void;
}

export declare interface FillEvent<TRow> {
    columnKey: string;
    sourceRow: TRow;
    targetRow: TRow;
}

export declare interface FormatterProps<TRow, TSummaryRow = unknown> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    row: TRow;
    isCellSelected: boolean;
    onRowChange: (row: TRow) => void;
}

export declare interface GroupFormatterProps<TRow, TSummaryRow = unknown> {
    groupKey: unknown;
    column: CalculatedColumn<TRow, TSummaryRow>;
    row: GroupRow<TRow>;
    childRows: readonly TRow[];
    isExpanded: boolean;
    isCellSelected: boolean;
    toggleGroup: () => void;
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

export declare function headerRenderer<R, SR>({ column, sortDirection, priority, onSort, isCellSelected }: HeaderRendererProps<R, SR>): JSX.Element;

export declare interface HeaderRendererProps<TRow, TSummaryRow = unknown> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    sortDirection: SortDirection | undefined;
    priority: number | undefined;
    onSort: (ctrlClick: boolean) => void;
    allRowsSelected: boolean;
    onAllRowsSelectionChange: (checked: boolean) => void;
    isCellSelected: boolean;
}

declare type Maybe<T> = T | undefined | null;

declare type Omit_2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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

export declare interface Renderers<TRow, TSummaryRow> {
    sortStatus?: Maybe<(props: SortStatusProps) => ReactNode>;
    checkboxFormatter?: Maybe<(props: CheckboxFormatterProps, ref: RefObject<HTMLInputElement>) => ReactNode>;
    rowRenderer?: Maybe<(key: Key, props: RowRendererProps<TRow, TSummaryRow>) => ReactNode>;
    noRowsFallback?: Maybe<ReactNode>;
}

export declare const Row: <R, SR>(props: RowRendererProps<R, SR> & RefAttributes<HTMLDivElement>) => JSX.Element;

export declare type RowHeightArgs<TRow> = {
    type: 'ROW';
    row: TRow;
} | {
    type: 'GROUP';
    row: GroupRow<TRow>;
};

export declare interface RowRendererProps<TRow, TSummaryRow = unknown> extends Omit_2<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
    viewportColumns: readonly CalculatedColumn<TRow, TSummaryRow>[];
    row: TRow;
    rowIdx: number;
    selectedCellIdx: number | undefined;
    copiedCellIdx: number | undefined;
    draggedOverCellIdx: number | undefined;
    lastFrozenColumnIndex: number;
    isRowSelected: boolean;
    gridRowStart: number;
    height: number;
    selectedCellEditor: ReactElement<EditorProps<TRow>> | undefined;
    selectedCellDragHandle: ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined;
    onRowChange: (column: CalculatedColumn<TRow, TSummaryRow>, rowIdx: number, newRow: TRow) => void;
    onRowClick: Maybe<(row: TRow, column: CalculatedColumn<TRow, TSummaryRow>) => void>;
    onRowDoubleClick: Maybe<(row: TRow, column: CalculatedColumn<TRow, TSummaryRow>) => void>;
    rowClass: Maybe<(row: TRow) => Maybe<string>>;
    setDraggedOverRowIdx: ((overRowIdx: number) => void) | undefined;
    selectCell: (row: TRow, column: CalculatedColumn<TRow, TSummaryRow>, enableEditor?: Maybe<boolean>) => void;
}

export declare interface RowsChangeData<R, SR = unknown> {
    indexes: number[];
    column: CalculatedColumn<R, SR>;
}

export declare const SELECT_COLUMN_KEY = "select-row";

export declare function SelectCellFormatter({ value, isCellSelected, disabled, onChange, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy }: SelectCellFormatterProps): JSX.Element;

declare interface SelectCellFormatterProps extends SharedInputProps {
    isCellSelected: boolean;
    value: boolean;
    onChange: (value: boolean, isShiftClick: boolean) => void;
}

export declare const SelectColumn: Column<any, any>;

export declare interface SelectRowEvent<TRow> {
    row: TRow;
    checked: boolean;
    isShiftClick: boolean;
}

declare type SharedDivProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'className' | 'style'>;

declare type SharedInputProps = Pick<CheckboxFormatterProps, 'disabled' | 'aria-label' | 'aria-labelledby'>;

export declare interface SortColumn {
    readonly columnKey: string;
    readonly direction: SortDirection;
}

export declare type SortDirection = 'ASC' | 'DESC';

export declare function sortIcon({ sortDirection }: SortIconProps): JSX.Element | null;

export declare interface SortIconProps {
    sortDirection: SortDirection | undefined;
}

export declare function sortPriority({ priority }: SortPriorityProps): number | undefined;

export declare interface SortPriorityProps {
    priority: number | undefined;
}

export declare interface SortStatusProps extends SortIconProps, SortPriorityProps {
}

export declare interface SummaryFormatterProps<TSummaryRow, TRow = unknown> {
    column: CalculatedColumn<TRow, TSummaryRow>;
    row: TSummaryRow;
    isCellSelected: boolean;
}

export declare function textEditor<TRow, TSummaryRow>({ row, column, onRowChange, onClose }: EditorProps<TRow, TSummaryRow>): JSX.Element;

export declare function ToggleGroup<R, SR>({ groupKey, isExpanded, isCellSelected, toggleGroup }: GroupFormatterProps<R, SR>): JSX.Element;

export declare function toggleGroupFormatter<R, SR>(props: GroupFormatterProps<R, SR>): JSX.Element;

export declare function useFocusRef<T extends HTMLOrSVGElement>(isSelected: boolean): {
    ref: RefObject<T>;
    tabIndex: number;
};

export declare function useRowSelection<R>(): [boolean, (selectRowEvent: SelectRowEvent<R>) => void];

export declare function valueFormatter<R, SR>(props: FormatterProps<R, SR>): JSX.Element | null;

export { }
