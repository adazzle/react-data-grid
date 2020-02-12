/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent } from 'react';
import { UpdateActions } from './enums';
import EventBus from '../EventBus';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<TRow, TSummaryRow = unknown> {
  /** The name of the column. By default it will be displayed in the header cell */
  name: string;
  /** A unique key to distinguish each column */
  key: string;
  /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns*/
  width?: number | string;
  cellClass?: string | ((row: TRow) => string);
  headerCellClass?: string;
  summaryCellClass?: string | ((row: TSummaryRow) => string);
  /** Formatter to be used to render the cell content */
  formatter?: React.ComponentType<FormatterProps<TRow, TSummaryRow>>;
  /** Formatter to be used to render the summary cell content */
  summaryFormatter?: React.ComponentType<SummaryFormatterProps<TSummaryRow, TRow>>;
  /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
  editable?: boolean | ((row: TRow) => boolean);
  /** Enable dragging of a column */
  draggable?: boolean;
  /** Determines whether column is frozen or not */
  frozen?: boolean;
  /** Enable resizing of a column */
  resizable?: boolean;
  /** Enable sorting of a column */
  sortable?: boolean;
  /** Sets the column sort order to be descending instead of ascending the first time the column is sorted */
  sortDescendingFirst?: boolean;
  /** Editor to be rendered when cell of column is being edited. If set, then the column is automatically set to be editable */
  editor?: React.ComponentType<EditorProps<TRow[keyof TRow], TRow, TSummaryRow>>;
  /** Header renderer for each header cell */
  // TODO: finalize API
  headerRenderer?: React.ComponentType<HeaderRendererProps<TRow, TSummaryRow>>;
  /** Component to be used to filter the data of the column */
  filterRenderer?: React.ComponentType<FilterRendererProps<TRow, any, TSummaryRow>>;
}

export interface CalculatedColumn<TRow, TSummaryRow = unknown> extends Column<TRow, TSummaryRow> {
  idx: number;
  width: number;
  left: number;
  formatter: React.ComponentType<FormatterProps<TRow, TSummaryRow>>;
}

export interface ColumnMetrics<TRow, TSummaryRow> {
  columns: readonly CalculatedColumn<TRow, TSummaryRow>[];
  lastFrozenColumnIndex: number;
  viewportWidth: number;
  totalColumnWidth: number;
}

export interface RowData {
  name?: string;
  __metaData?: RowGroupMetaData;
}

export interface Position {
  idx: number;
  rowIdx: number;
}

export interface Range {
  topLeft: Position;
  bottomRight: Position;
}

export interface SelectedRange extends Range {
  startCell: Position | null;
  cursorCell: Position | null;
  isDragging: boolean;
}

export interface Dimension {
  width: number;
  height: number;
  top: number;
  left: number;
  zIndex: number;
}

export interface Editor<TValue = never> {
  getInputNode(): Element | Text | undefined | null;
  getValue(): TValue;
  hasResults?(): boolean;
  isSelectOpen?(): boolean;
  validate?(value: unknown): boolean;
  readonly disableContainerStyles?: boolean;
}

export interface FormatterProps<TRow = any, TSummaryRow = any> {
  rowIdx: number;
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isRowSelected: boolean;
  onRowSelectionChange(checked: boolean, isShiftClick: boolean): void;
}

export interface SummaryFormatterProps<TSummaryRow, TRow = any> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TSummaryRow;
}

export interface EditorProps<TValue, TRow = any, TSummaryRow = any> {
  ref: React.Ref<Editor<{ [key: string]: TValue }>>;
  column: CalculatedColumn<TRow, TSummaryRow>;
  value: TValue;
  row: TRow;
  height: number;
  onCommit(): void;
  onCommitCancel(): void;
  onOverrideKeyDown(e: KeyboardEvent): void;
}

export interface HeaderRendererProps<TRow, TSummaryRow> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  allRowsSelected: boolean;
  onAllRowsSelectionChange(checked: boolean): void;
}

export interface CellRendererProps<TRow, TSummaryRow = unknown> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  idx: number;
  rowIdx: number;
  column: CalculatedColumn<TRow, TSummaryRow>;
  lastFrozenColumnIndex: number;
  row: TRow;
  scrollLeft: number | undefined;
  isRowSelected: boolean;
  eventBus: EventBus;
  enableCellRangeSelection?: boolean;
  onRowClick?(rowIdx: number, row: TRow, column: CalculatedColumn<TRow, TSummaryRow>): void;
}

export interface RowRendererProps<TRow, TSummaryRow = unknown> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  height: number;
  width: number;
  viewportColumns: readonly CalculatedColumn<TRow, TSummaryRow>[];
  row: TRow;
  cellRenderer?: React.ComponentType<CellRendererProps<TRow, TSummaryRow>>;
  rowIdx: number;
  scrollLeft: number | undefined;
  lastFrozenColumnIndex: number;
  isRowSelected: boolean;
  eventBus: EventBus;
  enableCellRangeSelection?: boolean;
  onRowClick?(rowIdx: number, row: TRow, column: CalculatedColumn<TRow, TSummaryRow>): void;
}

export interface FilterRendererProps<TRow, TFilterValue = unknown, TSummaryRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  value: TFilterValue;
  onChange(value: TFilterValue): void;
}

export interface ScrollPosition {
  scrollLeft: number;
  scrollTop: number;
}

export interface RowGroupMetaData {
  isGroup: boolean;
  treeDepth: number;
  isExpanded: boolean;
  columnGroupName: string;
  columnGroupDisplayName: string;
  getRowRenderer?(props: unknown, rowIdx: number): React.ReactElement;
}

export type Filters = Record<string, any>;

export interface CommitEvent<TUpdatedValue = never> {
  cellKey: string;
  rowIdx: number;
  updated: TUpdatedValue;
}

export interface RowExpandToggleEvent {
  rowIdx: number;
  shouldExpand: boolean;
  columnGroupName: string;
  name: string;
}

export interface RowsUpdateEvent<TUpdatedValue = never> {
  cellKey: string;
  fromRow: number;
  toRow: number;
  updated: TUpdatedValue;
  action: UpdateActions;
  fromCellKey?: string;
}

export interface CheckCellIsEditableEvent<TRow, TSummaryRow> extends Position {
  row: TRow;
  column: CalculatedColumn<TRow, TSummaryRow>;
}

export interface SelectRowEvent {
  rowIdx: number;
  checked: boolean;
  isShiftClick: boolean;
}
