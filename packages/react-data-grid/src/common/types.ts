import { KeyboardEvent, ReactNode } from 'react';
import { List } from 'immutable';
import { HeaderRowType, UpdateActions } from './enums';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<T = unknown> {
  idx?: number; // Set by column metrics
  /** The name of the column. By default it will be displayed in the header cell */
  name: string;
  /** A unique key to distinguish each column */
  key: string;
  //FIXME: width and left should be optional
  /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns*/
  width: number;
  left: number;
  hidden?: boolean;
  cellClass?: string;
  /** By adding an event object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid and will run only for the specified column */
  events?: {
    [key: string]: undefined | ((e: Event, info: ColumnEventInfo) => void);
  };
  /** Formatter to be used to render the cell content */
  formatter?: React.ReactElement | React.ComponentType<FormatterProps>;
  /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
  editable?: boolean | ((rowData: RowData) => boolean);
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
  editor?: unknown;
  /** Header renderer for each header cell */
  headerRenderer?: React.ReactElement | React.ComponentType<{ column: Column<T>; rowType: HeaderRowType }>;
  /** Component to be used to filter the data of the column */
  filterRenderer?: React.ComponentType;

  // TODO: these props are only used by checkbox editor and we should remove them
  onCellChange?(rowIdx: number, key: string, dependentValues: T, event: React.ChangeEvent<HTMLInputElement>): void;
  getRowMetaData?(rowData: RowData, column: Column<T>): unknown;
}

export type ColumnList = Column[] | List<Column>;

export interface ColumnMetrics {
  columns: ColumnList;
  width: number;
  totalColumnWidth: number;
  totalWidth: number;
  minColumnWidth: number;
}

export interface RowData {
  get?(key: string): unknown;
  __metaData?: RowGroupMetaData;
  [key: string]: unknown;
}

export interface CellMetaData {
  rowKey: string;
  onCellClick(position: Position): void;
  onCellContextMenu(position: Position): void;
  onCellDoubleClick(position: Position): void;
  onDragEnter(overRowIdx: number): void;
  onCellExpand?(options: SubRowOptions): void;
  onRowExpandToggle?(data: { rowIdx: number; shouldExpand: boolean; columnGroupName: string; name: string }): void;
  onCellMouseDown?(position: Position): void;
  onCellMouseEnter?(position: Position): void;
  onAddSubRow?(): void;
  onDeleteSubRow?(options: SubRowOptions): void;
  getCellActions?(column: Column, rowData: RowData): CellActionButton[] | undefined;
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

export type RowGetter = (rowIdx: number) => RowData;

export interface Editor {
  getInputNode(): Element | Text | undefined | null;
  getValue(): { [key: string]: unknown };
  hasResults?(): boolean;
  isSelectOpen?(): boolean;
  validate?(value: unknown): boolean;
  readonly disableContainerStyles?: boolean;
}

export interface FormatterProps {
  rowIdx: number;
  value: unknown;
  column: Column;
  row: RowData;
  isScrolling: boolean;
  dependentValues?: unknown;
}

export interface EditorProps<V = unknown, C = unknown> {
  column: Column<C>;
  value: V;
  rowMetaData: unknown;
  rowData: RowData;
  height: number;
  onCommit(args?: { key?: string }): void;
  onCommitCancel(): void;
  onBlur(): void;
  onOverrideKeyDown(e: KeyboardEvent): void;
}

export interface CellRendererProps {
  idx: number;
  rowIdx: number;
  height: number;
  value: unknown;
  column: Column;
  rowData: RowData;
  cellMetaData: CellMetaData;
  isScrolling: boolean;
  scrollLeft: number;
  isRowSelected?: boolean;
  expandableOptions?: ExpandableOptions;
  lastFrozenColumnIndex?: number;
}

export interface RowRendererProps {
  height: number;
  columns: ColumnList;
  row: RowData;
  cellRenderer: React.ComponentType<CellRendererProps>;
  cellMetaData: CellMetaData;
  isSelected?: boolean;
  idx: number;
  extraClasses?: string;
  subRowDetails?: SubRowDetails;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  isScrolling: boolean;
  scrollLeft: number;
  lastFrozenColumnIndex?: number;
}

export interface SubRowDetails {
  canExpand: boolean;
  field: string;
  expanded: boolean;
  children: unknown[];
  treeDepth: number;
  siblingIndex: number;
  numberSiblings: number;
  group?: boolean;
}

export interface SubRowOptions {
  rowIdx: number;
  idx: number;
  rowData: RowData;
  expandArgs?: ExpandableOptions;
}

export interface ExpandableOptions {
  canExpand: boolean;
  field: string;
  expanded: boolean;
  children: unknown;
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

export interface ColumnEventInfo extends Position {
  rowId: unknown;
  column: Column;
}

export interface CellRenderer {
  setScrollLeft(scrollLeft: number): void;
}

export interface RowRenderer {
  setScrollLeft(scrollLeft: number): void;
  getRowTop?(): number;
  getRowHeight?(): number;
  getDecoratedComponentInstance?(idx: number): { row: RowRenderer & React.Component<RowRendererProps> } | undefined;
}

export interface ScrollPosition {
  scrollLeft: number;
  scrollTop: number;
}

export interface InteractionMasksMetaData {
  onCheckCellIsEditable?(arg: { row: unknown; column: Column } & Position): boolean;
  onCellCopyPaste?(arg: {
    cellKey: string;
    rowIdx: number;
    fromRow: number;
    toRow: number;
    value: unknown;
  }): void;
  onGridRowsUpdated(
    cellKey: string,
    toRow1: number,
    toRow2: number,
    data: { [key: string]: unknown },
    updateAction: UpdateActions,
    fromRow?: number
  ): void;
  onDragHandleDoubleClick(data: Position & { rowData: RowData }): void;
  onCellSelected?(position: Position): void;
  onCellDeSelected?(position: Position): void;
  onCellRangeSelectionStarted?(selectedRange: SelectedRange): void;
  onCellRangeSelectionUpdated?(selectedRange: SelectedRange): void;
  onCellRangeSelectionCompleted?(selectedRange: SelectedRange): void;
  onCommit(args: CommitArgs): void;
}

export interface RowGroupMetaData {
  isGroup: boolean;
  treeDepth: number;
  isExpanded: boolean;
  columnGroupName: string;
  columnGroupDisplayName: string;
  getRowRenderer?(props: unknown, rowIdx: number): React.ReactElement;
}

export type RowSelection = { indexes?: number[] } | { isSelectedKey?: string } | { keys?: { values: unknown[]; rowKey: string } };

export interface HeaderRowData {
  rowType: HeaderRowType;
  height: number;
  filterable?: boolean;
  onFilterChange?(args: FilterArgs): void;
}

export interface FilterArgs {
  filterTerm: string;
  column: Column;
}

export interface CommitArgs {
  cellKey: string;
  rowIdx: number;
  updated: { [key: string]: unknown };
  key?: string;
}
