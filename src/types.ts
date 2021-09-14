import type { ReactElement } from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Maybe<T> = T | undefined | null;

export interface Column<TRow, TSummaryRow = unknown> {
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
  readonly formatter?: Maybe<React.ComponentType<FormatterProps<TRow, TSummaryRow>>>;
  /** Formatter to be used to render the summary cell content */
  readonly summaryFormatter?: Maybe<React.ComponentType<SummaryFormatterProps<TSummaryRow, TRow>>>;
  /** Formatter to be used to render the group cell content */
  readonly groupFormatter?: Maybe<React.ComponentType<GroupFormatterProps<TRow, TSummaryRow>>>;
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
  readonly editor?: Maybe<React.ComponentType<EditorProps<TRow, TSummaryRow>>>;
  readonly editorOptions?: Maybe<{
    /** @default false */
    readonly renderFormatter?: Maybe<boolean>;
    /** @default false */
    readonly editOnClick?: Maybe<boolean>;
    /** Prevent default to cancel editing */
    readonly onCellKeyDown?: Maybe<(event: React.KeyboardEvent<HTMLDivElement>) => void>;
    /** Control the default cell navigation behavior while the editor is open */
    readonly onNavigation?: Maybe<(event: React.KeyboardEvent<HTMLDivElement>) => boolean>;
  }>;
  /** Header renderer for each header cell */
  readonly headerRenderer?: Maybe<React.ComponentType<HeaderRendererProps<TRow, TSummaryRow>>>;
}

export interface CalculatedColumn<TRow, TSummaryRow = unknown> extends Column<TRow, TSummaryRow> {
  readonly idx: number;
  readonly resizable: boolean;
  readonly sortable: boolean;
  readonly frozen: boolean;
  readonly isLastFrozenColumn: boolean;
  readonly rowGroup: boolean;
  readonly formatter: React.ComponentType<FormatterProps<TRow, TSummaryRow>>;
}

export interface Position {
  readonly idx: number;
  readonly rowIdx: number;
}

export interface FormatterProps<TRow, TSummaryRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isCellSelected: boolean;
  onRowChange: (row: TRow) => void;
}

export interface SummaryFormatterProps<TSummaryRow, TRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TSummaryRow;
  isCellSelected: boolean;
}

export interface GroupFormatterProps<TRow, TSummaryRow = unknown> {
  groupKey: unknown;
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: GroupRow<TRow>;
  childRows: readonly TRow[];
  isExpanded: boolean;
  isCellSelected: boolean;
  toggleGroup: () => void;
}

export interface EditorProps<TRow, TSummaryRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  onRowChange: (row: TRow, commitChanges?: boolean) => void;
  onClose: (commitChanges?: boolean) => void;
}

export interface HeaderRendererProps<TRow, TSummaryRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  sortDirection: SortDirection | undefined;
  priority: number | undefined;
  onSort: (ctrlClick: boolean) => void;
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
  isCellSelected: boolean;
}

export interface CellRendererProps<TRow, TSummaryRow>
  extends Pick<
      RowRendererProps<TRow, TSummaryRow>,
      'onRowClick' | 'onRowDoubleClick' | 'selectCell'
    >,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  colSpan: number | undefined;
  row: TRow;
  isCopied: boolean;
  isDraggedOver: boolean;
  isCellSelected: boolean;
  dragHandle: ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined;
  onRowChange: (newRow: TRow) => void;
}

export interface RowRendererProps<TRow, TSummaryRow = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  viewportColumns: readonly CalculatedColumn<TRow, TSummaryRow>[];
  row: TRow;
  rowIdx: number;
  selectedCellIdx: number | undefined;
  copiedCellIdx: number | undefined;
  draggedOverCellIdx: number | undefined;
  lastFrozenColumnIndex: number;
  isRowSelected: boolean;
  top: number;
  height: number;
  selectedCellEditor: ReactElement<EditorProps<TRow>> | undefined;
  selectedCellDragHandle: ReactElement<React.HTMLAttributes<HTMLDivElement>> | undefined;
  onRowChange: (rowIdx: number, newRow: TRow) => void;
  onRowClick: Maybe<(row: TRow, column: CalculatedColumn<TRow, TSummaryRow>) => void>;
  onRowDoubleClick: Maybe<(row: TRow, column: CalculatedColumn<TRow, TSummaryRow>) => void>;
  rowClass: Maybe<(row: TRow) => Maybe<string>>;
  setDraggedOverRowIdx: ((overRowIdx: number) => void) | undefined;
  selectCell: (
    row: TRow,
    column: CalculatedColumn<TRow, TSummaryRow>,
    enableEditor?: Maybe<boolean>
  ) => void;
}

export interface RowsChangeData<R, SR = unknown> {
  indexes: number[];
  column: CalculatedColumn<R, SR>;
}

export interface SelectRowEvent<TRow> {
  row: TRow;
  checked: boolean;
  isShiftClick: boolean;
}

export interface FillEvent<TRow> {
  columnKey: string;
  sourceRow: TRow;
  targetRow: TRow;
}

export interface PasteEvent<TRow> {
  sourceColumnKey: string;
  sourceRow: TRow;
  targetColumnKey: string;
  targetRow: TRow;
}

export interface GroupRow<TRow> {
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

export interface SortColumn {
  readonly columnKey: string;
  readonly direction: SortDirection;
}

export type CellNavigationMode = 'NONE' | 'CHANGE_ROW' | 'LOOP_OVER_ROW';
export type SortDirection = 'ASC' | 'DESC';

export type ColSpanArgs<R, SR> =
  | { type: 'HEADER' }
  | { type: 'ROW'; row: R }
  | { type: 'SUMMARY'; row: SR };

export type RowHeightArgs<R> = { type: 'ROW'; row: R } | { type: 'GROUP'; row: GroupRow<R> };
