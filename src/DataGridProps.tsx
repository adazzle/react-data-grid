import {Key, MouseEventHandler} from "react";
import {
    FillEvent,
    PasteEvent,
    Position,
    RowRendererProps,
    RowsChangeData,
    SortColumn
} from "./types";
import type {
    CalculatedColumn,
    Column,
    CellNavigationMode,
    RowHeightArgs,
    Maybe
} from './types';


type DefaultColumnOptions<R, SR> = Pick<Column<R, SR>,
    'formatter' | 'minWidth' | 'resizable' | 'sortable'>;
type SharedDivProps = Pick<React.HTMLAttributes<HTMLDivElement>,
    'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'className' | 'style'
    | 'onKeyDown'>;

export interface DataGridProps<R, SR = unknown, K extends Key = Key> extends SharedDivProps {
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
    summaryRows?: Maybe<readonly SR[]>;
    /** The getter should return a unique key for each row */
    rowKeyGetter?: Maybe<(row: R) => K>;
    onRowsChange?: Maybe<(rows: R[], data: RowsChangeData<R, SR>) => void>;
    onCurrentRowChanged?: Maybe<(position: Position) => void>;

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
    rowRenderer?: Maybe<React.ComponentType<RowRendererProps<R, SR>>>;
    noRowsFallback?: React.ReactNode;
    rowClass?: Maybe<(row: R) => Maybe<string>>;
    'data-testid'?: Maybe<string>;

    //Slick.Grid migration

    /** When returns 'false' then cell editing request discarded. (imported from Slick.Grid) */
    onBeforeEditCell?: Maybe<(row: R, column: CalculatedColumn<R, SR>, position: Position) => boolean>;
    onBeforeCellEditorDestroy?: Maybe<(row: R, column: CalculatedColumn<R, SR>, position: Position) => boolean>;
    onContextMenu?: MouseEventHandler<HTMLDivElement> | undefined;
    onHeaderContextMenu?: MouseEventHandler<HTMLDivElement> | undefined;
}