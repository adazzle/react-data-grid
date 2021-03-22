/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SortDirection } from "./enums";
import React, { } from type;
{ ReactElement } from "react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<TRow, TSummaryRow = unknown> {
  /** The name of the column. By default it will be displayed in the header cell */
  name: string | ReactElement;
  /** A unique key to distinguish each column */
  key: string;
  /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns */
  width?: number | string;
  /** Minimum column width in px. */
  minWidth?: number;
  /** Maximum column width in px. */
  maxWidth?: number;
  cellClass?: string | ((row: TRow) => string | undefined);
  headerCellClass?: string;
  summaryCellClass?: string | ((row: TSummaryRow) => string);
  /** Formatter to be used to render the cell content */
  formatter?: React.ComponentType<FormatterProps<TRow, TSummaryRow>>;
  /** Formatter to be used to render the summary cell content */
  summaryFormatter?: React.ComponentType<
    SummaryFormatterProps<TSummaryRow, TRow>
  >;
  /** Formatter to be used to render the group cell content */
  groupFormatter?: React.ComponentType<GroupFormatterProps<TRow, TSummaryRow>>;
  /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
  editable?: boolean | ((row: TRow) => boolean);
  /** Determines whether column is frozen or not */
  frozen?: boolean;
  /** Enable resizing of a column */
  resizable?: boolean;
  /** Enable sorting of a column */
  sortable?: boolean;
  /** Sets the column sort order to be descending instead of ascending the first time the column is sorted */
  sortDescendingFirst?: boolean;
  /** Editor to be rendered when cell of column is being edited. If set, then the column is automatically set to be editable */
  editor?: React.ComponentType<EditorProps<TRow, TSummaryRow>>;
  editorOptions?: {
    /** @default false */
    createPortal?: boolean;
    /** @default false */
    editOnClick?: boolean;
    /** Prevent default to cancel editing */
    onCellKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    /** Control the default cell navigation behavior while the editor is open */
    onNavigation?: (event: React.KeyboardEvent<HTMLDivElement>) => boolean;
    // TODO: Do we need these options
    // editOnDoubleClick?: boolean;
    /** @default false */
    // commitOnScroll?: boolean;
  };
  /** Header renderer for each header cell */
  headerRenderer?: React.ComponentType<HeaderRendererProps<TRow, TSummaryRow>>;
  /** Component to be used to filter the data of the column */
  filterRenderer?: React.ComponentType<
    FilterRendererProps<TRow, any, TSummaryRow>
  >;
}

export interface CalculatedColumn<TRow, TSummaryRow = unknown>
  extends Column<TRow, TSummaryRow> {
  idx: number;
  resizable: boolean;
  sortable: boolean;
  frozen: boolean;
  isLastFrozenColumn: boolean;
  rowGroup?: boolean;
  formatter: React.ComponentType<FormatterProps<TRow, TSummaryRow>>;
}

export interface ColumnMetric {
  width: number;
  left: number;
}

export interface Position {
  idx: number;
  rowIdx: number;
}

export interface FormatterProps<TRow = any, TSummaryRow = any> {
  rowIdx: number;
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isCellSelected: boolean;
  isRowSelected: boolean;
  onRowSelectionChange: (checked: boolean, isShiftClick: boolean) => void;
  onRowChange: (row: Readonly<TRow>) => void;
}

export interface SummaryFormatterProps<TSummaryRow, TRow = any> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TSummaryRow;
}

export interface GroupFormatterProps<TRow, TSummaryRow = unknown> {
  groupKey: unknown;
  column: CalculatedColumn<TRow, TSummaryRow>;
  childRows: readonly TRow[];
  isExpanded: boolean;
  isCellSelected: boolean;
  isRowSelected: boolean;
  onRowSelectionChange: (checked: boolean) => void;
  toggleGroup: () => void;
}

export interface SharedEditorProps<TRow> {
  row: Readonly<TRow>;
  rowHeight: number;
  editorPortalTarget: Element;
  onRowChange: (row: Readonly<TRow>, commitChanges?: boolean) => void;
  onClose: (commitChanges?: boolean) => void;
}

export interface EditorProps<TRow, TSummaryRow = unknown>
  extends SharedEditorProps<TRow> {
  rowIdx: number;
  column: Readonly<CalculatedColumn<TRow, TSummaryRow>>;
  top: number;
  left: number;
}

export interface HeaderRendererProps<TRow, TSummaryRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (columnKey: string, direction: SortDirection) => void;
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
}

interface SelectedCellPropsBase {
  idx: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface EditCellProps<TRow> extends SelectedCellPropsBase {
  mode: "EDIT";
  editorProps: SharedEditorProps<TRow>;
}

export interface SelectedCellProps extends SelectedCellPropsBase {
  mode: "SELECT";
  onFocus: () => void;
  dragHandleProps?: Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "onMouseDown" | "onDoubleClick"
  >;
}

export interface CellRendererProps<TRow, TSummaryRow = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "children"> {
  rowIdx: number;
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isCopied: boolean;
  isDraggedOver: boolean;
  isCellSelected: boolean;
  isRowSelected: boolean;
  dragHandleProps?: Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "onMouseDown" | "onDoubleClick"
  >;
  onRowChange: (rowIdx: number, newRow: TRow) => void;
  onRowClick?: (
    rowIdx: number,
    row: TRow,
    column: CalculatedColumn<TRow, TSummaryRow>,
    event?: React.MouseEvent
  ) => void;
  selectCell: (position: Position, enableEditor?: boolean) => void;
  selectRow: (selectRowEvent: SelectRowEvent) => void;
}

export interface RowRendererProps<TRow, TSummaryRow = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "children"> {
  viewportColumns: readonly CalculatedColumn<TRow, TSummaryRow>[];
  row: TRow;
  cellRenderer?: React.ComponentType<CellRendererProps<TRow, TSummaryRow>>;
  rowIdx: number;
  copiedCellIdx?: number;
  draggedOverCellIdx?: number;
  isRowSelected: boolean;
  top: number;
  selectedCellProps?: EditCellProps<TRow> | SelectedCellProps;
  onRowChange: (rowIdx: number, row: TRow) => void;
  onRowClick?: (
    rowIdx: number,
    row: TRow,
    column: CalculatedColumn<TRow, TSummaryRow>,
    event?: React.MouseEvent
  ) => void;
  rowClass?: (row: TRow) => string | undefined;
  setDraggedOverRowIdx?: (overRowIdx: number) => void;
  selectCell: (
    position: Position,
    enableEditor?: boolean,
    shiftKey?: boolean
  ) => void;
  selectRow: (selectRowEvent: SelectRowEvent) => void;
}

export interface FilterRendererProps<
  TRow,
  TFilterValue = unknown,
  TSummaryRow = unknown
> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  value: TFilterValue;
  onChange: (value: TFilterValue) => void;
}

export type Filters = Record<string, any>;

export interface RowsChangeData<R, SR = unknown> {
  indexes: number[];
  column: CalculatedColumn<R, SR>;
}

export interface SelectRowEvent {
  rowIdx: number;
  checked: boolean;
  isShiftClick: boolean;
}

export interface FillEvent<TRow> {
  columnKey: string;
  sourceRow: TRow;
  targetRows: TRow[];
}

export interface PasteEvent<TRow> {
  sourceColumnKey: string;
  sourceRow: TRow;
  targetColumnKey: string;
  targetRow: TRow;
}

export type GroupByDictionary<TRow> = Record<
  string,
  {
    childRows: readonly TRow[];
    childGroups: readonly TRow[] | GroupByDictionary<TRow>;
    startRowIndex: number;
  }
>;

export interface GroupRow<TRow> {
  childRows: readonly TRow[];
  id: string;
  parentId: unknown;
  groupKey: unknown;
  isExpanded: boolean;
  level: number;
  posInSet: number;
  setSize: number;
  startRowIndex: number;
}
