/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent, ReactNode } from 'react';
import { HeaderRowType, UpdateActions } from './enums';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface ColumnValue<TRow, TDependentValue = unknown, TField extends keyof TRow = keyof TRow> {
  /** The name of the column. By default it will be displayed in the header cell */
  name: string;
  /** A unique key to distinguish each column */
  key: TField;
  /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns*/
  width?: number | string;
  cellClass?: string;
  /** By adding an event object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid and will run only for the specified column */
  events?: {
    [key: string]: undefined | ((e: Event, info: ColumnEventInfo<TRow>) => void);
  };
  cellContentRenderer?: CellContentRenderer<TRow>;
  /** Formatter to be used to render the cell content */
  formatter?: React.ReactElement | React.ComponentType<FormatterProps<TRow[TField], TDependentValue, TRow>>;
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
  editor?: React.ReactElement | React.ComponentType<EditorProps<TRow[TField], TDependentValue, TRow>>;
  /** Header renderer for each header cell */
  // TODO: finalize API
  headerRenderer?: React.ReactElement | React.ComponentType<HeaderRowProps<TRow>>;
  /** Component to be used to filter the data of the column */
  filterRenderer?: React.ComponentType<FilterRendererProps<TRow, TDependentValue>>;

  getRowMetaData?(rowData: TRow, column: CalculatedColumn<TRow, TDependentValue>): TDependentValue;
}

export type Column<TRow, TDependentValue = unknown, TField extends keyof TRow = keyof TRow> =
  TField extends keyof TRow ? ColumnValue<TRow, TDependentValue, TField> : never;

export type CalculatedColumn<TRow, TDependentValue = unknown, TField extends keyof TRow = keyof TRow> =
  Column<TRow, TDependentValue, TField> & {
    idx: number;
    width: number;
    left: number;
    cellContentRenderer: CellContentRenderer<TRow>;
  };

export interface ColumnMetrics<TRow> {
  columns: CalculatedColumn<TRow>[];
  lastFrozenColumnIndex: number;
  viewportWidth: number;
  totalColumnWidth: number;
}

export interface RowData {
  name?: string;
  __metaData?: RowGroupMetaData;
}

export interface CellMetaData<TRow> {
  rowKey: keyof TRow;
  onCellClick(position: Position): void;
  onCellContextMenu(position: Position): void;
  onCellDoubleClick(position: Position): void;
  onDragEnter(overRowIdx: number): void;
  onCellExpand?(options: SubRowOptions<TRow>): void;
  onRowExpandToggle?(e: RowExpandToggleEvent): void;
  onCellMouseDown?(position: Position): void;
  onCellMouseEnter?(position: Position): void;
  onAddSubRow?(): void;
  onDeleteSubRow?(options: SubRowOptions<TRow>): void;
  getCellActions?(column: CalculatedColumn<TRow>, rowData: TRow): CellActionButton[] | undefined;
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

export type RowGetter<TRow> = (rowIdx: number) => TRow;

export interface Editor<TValue = never> extends React.Component {
  getInputNode(): Element | Text | undefined | null;
  getValue(): TValue;
  hasResults?(): boolean;
  isSelectOpen?(): boolean;
  validate?(value: unknown): boolean;
  readonly disableContainerStyles?: boolean;
}

export interface FormatterProps<TValue, TDependentValue = unknown, TRow = any> {
  rowIdx: number;
  value: TValue;
  column: CalculatedColumn<TRow, TDependentValue>;
  row: TRow;
  isRowSelected: boolean;
  onRowSelectionChange(rowIdx: number, row: TRow, checked: boolean, isShiftClick: boolean): void;
  dependentValues?: TDependentValue;
  isSummaryRow: boolean;
}

export interface EditorProps<TValue, TDependentValue = unknown, TRow = any> {
  column: CalculatedColumn<TRow, TDependentValue>;
  value: TValue;
  rowMetaData?: TDependentValue;
  rowData: TRow;
  height: number;
  onCommit(args?: { key?: string }): void;
  onCommitCancel(): void;
  onBlur(): void;
  onOverrideKeyDown(e: KeyboardEvent): void;
}

export interface HeaderRowProps<TRow> {
  column: CalculatedColumn<TRow>;
  rowType: HeaderRowType;
  allRowsSelected: boolean;
  onAllRowsSelectionChange(checked: boolean): void;
}

export interface CellRendererProps<TRow> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  idx: number;
  rowIdx: number;
  column: CalculatedColumn<TRow>;
  lastFrozenColumnIndex: number;
  rowData: TRow;
  cellMetaData: CellMetaData<TRow>;
  scrollLeft: number | undefined;
  expandableOptions?: ExpandableOptions;
  isSummaryRow: boolean;
  isRowSelected: boolean;
  onRowSelectionChange(rowIdx: number, row: TRow, checked: boolean, isShiftClick: boolean): void;
}

export type CellContentRenderer<TRow> = (props: CellContentRendererProps<TRow>) => React.ReactNode;

export type CellContentRendererProps<TRow> = Pick<CellRendererProps<TRow>,
| 'idx'
| 'rowIdx'
| 'rowData'
| 'column'
| 'cellMetaData'
| 'expandableOptions'
| 'isRowSelected'
| 'onRowSelectionChange'
| 'isSummaryRow'
>;

export interface RowsContainerProps {
  id: string;
  children: React.ReactElement;
}

export interface IRowRendererProps<TRow> {
  height: number;
  width: number;
  columns: CalculatedColumn<TRow>[];
  row: TRow;
  cellRenderer?: React.ComponentType<CellRendererProps<TRow>>;
  cellMetaData: CellMetaData<TRow>;
  idx: number;
  extraClasses?: string;
  subRowDetails?: SubRowDetails;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  scrollLeft: number | undefined;
  lastFrozenColumnIndex: number;
  isSummaryRow: boolean;
  isRowSelected: boolean;
  onRowSelectionChange(rowIdx: number, row: TRow, checked: boolean, isShiftClick: boolean): void;
}

export interface FilterRendererProps<TRow, TFilterValue = unknown> {
  column: CalculatedColumn<TRow>;
  onChange?(event: AddFilterEvent<TRow>): void;
  /** TODO: remove */
  getValidFilterValues?(columnKey: keyof TRow): TFilterValue;
}

export interface SubRowDetails<TChildRow = unknown> {
  canExpand: boolean;
  field: string;
  expanded: boolean;
  children: TChildRow[];
  treeDepth: number;
  siblingIndex: number;
  numberSiblings: number;
  group?: boolean;
}

export interface SubRowOptions<TRow, TChildRow = unknown> {
  rowIdx: number;
  idx: number;
  rowData: TRow;
  expandArgs?: ExpandableOptions<TChildRow>;
}

export interface ExpandableOptions<TChildRow = unknown> {
  canExpand: boolean;
  field: string;
  expanded: boolean;
  children: TChildRow[];
  treeDepth: number;
  subRowDetails: SubRowDetails;
}

interface Action {
  text: ReactNode;
  callback(): void;
}

export interface CellActionButton {
  icon: ReactNode;
  actions?: Action[];
  callback?(): void;
}

export interface ColumnEventInfo<TRow> extends Position {
  rowId: unknown;
  column: CalculatedColumn<TRow>;
}

export interface ScrollPosition {
  scrollLeft: number;
  scrollTop: number;
}

export interface InteractionMasksMetaData<TRow> {
  onCheckCellIsEditable?(e: CheckCellIsEditableEvent<TRow>): boolean;
  onCellCopyPaste?(e: CellCopyPasteEvent<TRow>): void;
  onGridRowsUpdated(
    cellKey: keyof TRow,
    toRow1: number,
    toRow2: number,
    data: { [key: string]: unknown }, // FIX ME: Use Pick<R, K>
    updateAction: UpdateActions,
    fromRow?: number
  ): void;
  onDragHandleDoubleClick(data: Position & { rowData: TRow }): void;
  onCellSelected?(position: Position): void;
  onCellDeSelected?(position: Position): void;
  onCellRangeSelectionStarted?(selectedRange: SelectedRange): void;
  onCellRangeSelectionUpdated?(selectedRange: SelectedRange): void;
  onCellRangeSelectionCompleted?(selectedRange: SelectedRange): void;
  onCommit(e: CommitEvent<TRow>): void;
}

export interface RowGroupMetaData {
  isGroup: boolean;
  treeDepth: number;
  isExpanded: boolean;
  columnGroupName: string;
  columnGroupDisplayName: string;
  getRowRenderer?(props: unknown, rowIdx: number): React.ReactElement;
}

export interface HeaderRowData<TRow> {
  rowType: HeaderRowType;
  height: number;
  filterable?: boolean;
  onFilterChange?(args: AddFilterEvent<TRow>): void;
}

export interface AddFilterEvent<TRow> {
  filterTerm: string;
  column: Column<TRow>;
}

export interface CommitEvent<TRow, TUpdatedValue = never> {
  cellKey: keyof TRow;
  rowIdx: number;
  updated: TUpdatedValue;
  key?: string;
}

export interface RowExpandToggleEvent {
  rowIdx: number;
  shouldExpand: boolean;
  columnGroupName: string;
  name: string;
}

export interface GridRowsUpdatedEvent<TRow, TUpdatedValue = never> {
  cellKey: keyof TRow;
  fromRow: number;
  toRow: number;
  fromRowId: unknown;
  toRowId: unknown;
  rowIds: unknown[];
  updated: TUpdatedValue;
  action: UpdateActions;
  fromRowData: TRow;
}

export interface CellCopyPasteEvent<TRow> {
  cellKey: keyof TRow;
  rowIdx: number;
  fromRow: number;
  toRow: number;
  value: unknown;
}

export interface CheckCellIsEditableEvent<TRow> extends Position {
  row: TRow;
  column: CalculatedColumn<TRow>;
}
