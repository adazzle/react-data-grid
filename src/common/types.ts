/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent } from 'react';
import { UpdateActions } from './enums';
import EventBus from '../EventBus';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface ColumnValue<TRow, TField extends keyof TRow = keyof TRow> {
  /** The name of the column. By default it will be displayed in the header cell */
  name: string;
  /** A unique key to distinguish each column */
  key: TField;
  /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns*/
  width?: number | string;
  cellClass?: string | ((rowData: TRow) => string);
  /** Formatter to be used to render the cell content */
  formatter?: React.ComponentType<FormatterProps<TRow>>;
  /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
  editable?: boolean | ((rowData: TRow) => boolean);
  /** Enable dragging of a column */
  draggable?: boolean;
  /** Enable filtering of a column */
  filterable?: boolean;
  /** Determines whether column is frozen or not */
  frozen?: boolean;
  /** Enable resizing of a column */
  resizable?: boolean;
  /** Enable sorting of a column */
  sortable?: boolean;
  /** Sets the column sort order to be descending instead of ascending the first time the column is sorted */
  sortDescendingFirst?: boolean;
  /** Editor to be rendered when cell of column is being edited. If set, then the column is automatically set to be editable */
  editor?: React.ComponentType<EditorProps<TRow[TField], TRow>>;
  /** Header renderer for each header cell */
  // TODO: finalize API
  headerRenderer?: React.ComponentType<HeaderRendererProps<TRow>>;
  /** Component to be used to filter the data of the column */
  filterRenderer?: React.ComponentType<FilterRendererProps<TRow, any>>;
}

export type Column<TRow, TField extends keyof TRow = keyof TRow> =
  TField extends keyof TRow ? ColumnValue<TRow, TField> : never;

export type CalculatedColumn<TRow, TField extends keyof TRow = keyof TRow> =
  Column<TRow, TField> & {
    idx: number;
    width: number;
    left: number;
    formatter: React.ComponentType<FormatterProps<TRow>>;
  };

export interface ColumnMetrics<TRow> {
  columns: readonly CalculatedColumn<TRow>[];
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

export interface FormatterProps<TRow = any> {
  rowIdx: number;
  column: CalculatedColumn<TRow>;
  row: TRow;
  isRowSelected: boolean;
  onRowSelectionChange(checked: boolean, isShiftClick: boolean): void;
  isSummaryRow: boolean;
}

export interface EditorProps<TValue, TRow = any> {
  ref: React.Ref<Editor<{ [key: string]: TValue }>>;
  column: CalculatedColumn<TRow>;
  value: TValue;
  rowData: TRow;
  height: number;
  onCommit(): void;
  onCommitCancel(): void;
  onOverrideKeyDown(e: KeyboardEvent): void;
}

export interface HeaderRendererProps<TRow> {
  column: CalculatedColumn<TRow>;
  allRowsSelected: boolean;
  onAllRowsSelectionChange(checked: boolean): void;
}

export interface CellRendererProps<TRow> {
  idx: number;
  rowIdx: number;
  column: CalculatedColumn<TRow>;
  lastFrozenColumnIndex: number;
  rowData: TRow;
  scrollLeft: number | undefined;
  isSummaryRow: boolean;
  isRowSelected: boolean;
  eventBus: EventBus;
  enableCellRangeSelection?: boolean;
  onRowClick?(rowIdx: number, rowData: TRow, column: CalculatedColumn<TRow>): void;
  onRowDoubleClick?(rowIdx: number, rowData: TRow, column: CalculatedColumn<TRow>): void;
}

export interface RowsContainerProps {
  id: string;
  children: React.ReactElement;
}

export interface RowRendererProps<TRow> {
  height: number;
  width: number;
  viewportColumns: readonly CalculatedColumn<TRow>[];
  row: TRow;
  cellRenderer?: React.ComponentType<CellRendererProps<TRow>>;
  idx: number;
  extraClasses?: string;
  scrollLeft: number | undefined;
  lastFrozenColumnIndex: number;
  isSummaryRow: boolean;
  isRowSelected: boolean;
  eventBus: EventBus;
  enableCellRangeSelection?: boolean;
  onRowClick?(rowIdx: number, rowData: TRow, column: CalculatedColumn<TRow>): void;
  onRowDoubleClick?(rowIdx: number, rowData: TRow, column: CalculatedColumn<TRow>): void;
}

export interface FilterRendererProps<TRow, TFilterValue = unknown> {
  column: CalculatedColumn<TRow>;
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

export type Filters<TRow> = { [key in keyof TRow]?: any };

export interface CommitEvent<TRow, TUpdatedValue = never> {
  cellKey: keyof TRow;
  rowIdx: number;
  updated: TUpdatedValue;
}

export interface RowExpandToggleEvent {
  rowIdx: number;
  shouldExpand: boolean;
  columnGroupName: string;
  name: string;
}

export interface RowsUpdateEvent<TRow, TUpdatedValue = never> {
  cellKey: keyof TRow;
  fromRow: number;
  toRow: number;
  updated: TUpdatedValue;
  action: UpdateActions;
  fromCellKey?: keyof TRow;
}

export interface CheckCellIsEditableEvent<TRow> extends Position {
  row: TRow;
  column: CalculatedColumn<TRow>;
}

export interface SelectRowEvent {
  rowIdx: number;
  checked: boolean;
  isShiftClick: boolean;
}
