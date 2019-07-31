import { KeyboardEvent, ReactNode } from 'react';
import { List } from 'immutable';
import { HeaderRowType, UpdateActions } from './enums';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type SelectedRow<R> = R & { isSelected: boolean };

export interface Column<R, V = unknown, DV = unknown> {
  /** The name of the column. By default it will be displayed in the header cell */
  name: string;
  /** A unique key to distinguish each column */
  key: keyof R;
  /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns*/
  width?: number;
  hidden?: boolean;
  cellClass?: string;
  /** By adding an event object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid and will run only for the specified column */
  events?: {
    [key: string]: undefined | ((e: Event, info: ColumnEventInfo<R>) => void);
  };
  /** Formatter to be used to render the cell content */
  formatter?: React.ReactElement | React.ComponentType<FormatterProps<R, V, DV>>;
  /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
  editable?: boolean | ((rowData: R) => boolean);
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
  editor?: React.ReactElement | React.ComponentType<EditorProps<R, V, DV>>;
  /** Header renderer for each header cell */
  headerRenderer?: React.ReactElement | React.ComponentType<HeaderRowProps<R, V, DV>>;
  /** Component to be used to filter the data of the column */
  filterRenderer?: React.ComponentType<FilterRendererProps<R, V, DV>>;

  // TODO: these props are only used by checkbox editor and we should remove them
  onCellChange?(rowIdx: number, key: keyof R, dependentValues: DV, event: React.SyntheticEvent): void;
  getRowMetaData?(rowData: R, column: CalculatedColumn<R, V, DV>): DV;
}

export interface CalculatedColumn<R, V = unknown, DV = unknown> extends Column<R, V, DV> {
  idx: number;
  width: number;
  left: number;
}

export type ColumnList<R> = Column<R>[] | List<Column<R>>;

export interface ColumnMetrics<R> {
  columns: CalculatedColumn<R>[];
  width: number;
  totalColumnWidth: number;
  totalWidth: number;
  minColumnWidth: number;
}

export interface RowData {
  name?: string;
  get?(key: string | number | symbol): unknown;
  __metaData?: RowGroupMetaData;
}

export interface CellMetaData<R> {
  rowKey: keyof R;
  onCellClick(position: Position): void;
  onCellContextMenu(position: Position): void;
  onCellDoubleClick(position: Position): void;
  onDragEnter(overRowIdx: number): void;
  onCellExpand?(options: SubRowOptions<R>): void;
  onRowExpandToggle?(e: RowExpandToggleEvent): void;
  onCellMouseDown?(position: Position): void;
  onCellMouseEnter?(position: Position): void;
  onAddSubRow?(): void;
  onDeleteSubRow?(options: SubRowOptions<R>): void;
  getCellActions?(column: CalculatedColumn<R>, rowData: R): CellActionButton[] | undefined;
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

export type RowGetter<R> = (rowIdx: number) => R;

export interface Editor<V = never> extends React.Component {
  getInputNode(): Element | Text | undefined | null;
  getValue(): V;
  hasResults?(): boolean;
  isSelectOpen?(): boolean;
  validate?(value: unknown): boolean;
  readonly disableContainerStyles?: boolean;
}

export interface FormatterProps<R, V = unknown, DV = unknown> {
  rowIdx: number;
  value: V;
  column: CalculatedColumn<R, V, DV>;
  row: R;
  isScrolling: boolean;
  dependentValues?: DV;
}

export interface EditorProps<R, V = unknown, DV = unknown> {
  column: CalculatedColumn<R, V, DV>;
  value: V;
  rowMetaData?: DV;
  rowData: R;
  height: number;
  onCommit(args?: { key?: string }): void;
  onCommitCancel(): void;
  onBlur(): void;
  onOverrideKeyDown(e: KeyboardEvent): void;
}

export interface HeaderRowProps<R, V, DV> {
  column: CalculatedColumn<R, V, DV>;
  rowType: HeaderRowType;
}

export interface CellRendererProps<R, V = unknown, DV = unknown> {
  idx: number;
  rowIdx: number;
  height: number;
  value: V;
  column: CalculatedColumn<R, V, DV>;
  rowData: R;
  cellMetaData: CellMetaData<R>;
  isScrolling: boolean;
  scrollLeft: number;
  isRowSelected?: boolean;
  expandableOptions?: ExpandableOptions;
  lastFrozenColumnIndex?: number;
}

export interface RowRendererProps<R, V = unknown, DV = unknown> {
  height: number;
  columns: CalculatedColumn<R, V, DV>[];
  row: R;
  cellRenderer: React.ComponentType<CellRendererProps<R, V, DV>>;
  cellMetaData: CellMetaData<R>;
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

export interface FilterRendererProps<R, V = unknown, DV = unknown> {
  column: CalculatedColumn<R, V, DV>;
  onChange?(event: AddFilterEvent<R>): void;
  /** TODO: remove */
  getValidFilterValues?(columnKey: keyof R): unknown;
}

export interface SubRowDetails<C = unknown> {
  canExpand: boolean;
  field: string;
  expanded: boolean;
  children: C[];
  treeDepth: number;
  siblingIndex: number;
  numberSiblings: number;
  group?: boolean;
}

export interface SubRowOptions<R, C = unknown> {
  rowIdx: number;
  idx: number;
  rowData: R;
  expandArgs?: ExpandableOptions<C>;
}

export interface ExpandableOptions<C = unknown> {
  canExpand: boolean;
  field: string;
  expanded: boolean;
  children: C[];
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

export interface ColumnEventInfo<R> extends Position {
  rowId: unknown;
  column: CalculatedColumn<R>;
}

export interface CellRenderer {
  setScrollLeft(scrollLeft: number): void;
}

export interface RowRenderer<R> {
  setScrollLeft(scrollLeft: number): void;
  getRowTop?(): number;
  getRowHeight?(): number;
  getDecoratedComponentInstance?(idx: number): { row: RowRenderer<R> & React.Component<RowRendererProps<R>> } | undefined;
}

export interface ScrollPosition {
  scrollLeft: number;
  scrollTop: number;
}

export interface InteractionMasksMetaData<R> {
  onCheckCellIsEditable?(e: CheckCellIsEditableEvent<R>): boolean;
  onCellCopyPaste?(e: CellCopyPasteEvent<R>): void;
  onGridRowsUpdated(
    cellKey: keyof R,
    toRow1: number,
    toRow2: number,
    data: { [key: string]: unknown }, // FIX ME: Use Pick<R, K>
    updateAction: UpdateActions,
    fromRow?: number
  ): void;
  onDragHandleDoubleClick(data: Position & { rowData: R }): void;
  onCellSelected?(position: Position): void;
  onCellDeSelected?(position: Position): void;
  onCellRangeSelectionStarted?(selectedRange: SelectedRange): void;
  onCellRangeSelectionUpdated?(selectedRange: SelectedRange): void;
  onCellRangeSelectionCompleted?(selectedRange: SelectedRange): void;
  onCommit(e: CommitEvent<R>): void;
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

export interface HeaderRowData<R> {
  rowType: HeaderRowType;
  height: number;
  filterable?: boolean;
  onFilterChange?(args: AddFilterEvent<R>): void;
}

export interface AddFilterEvent<R> {
  filterTerm: string;
  column: Column<R>;
}

export interface CommitEvent<R, V = never> {
  cellKey: keyof R;
  rowIdx: number;
  updated: V;
  key?: string;
}

export interface RowExpandToggleEvent {
  rowIdx: number;
  shouldExpand: boolean;
  columnGroupName: string;
  name: string;
}

export interface GridRowsUpdatedEvent<R, V = never> {
  cellKey: keyof R;
  fromRow: number;
  toRow: number;
  fromRowId: unknown;
  toRowId: unknown;
  rowIds: unknown[];
  updated: V;
  action: UpdateActions;
  fromRowData: R;
}

export interface CellCopyPasteEvent<R> {
  cellKey: keyof R;
  rowIdx: number;
  fromRow: number;
  toRow: number;
  value: unknown;
}

export interface CheckCellIsEditableEvent<R> extends Position {
  row: R;
  column: Column<R>;
}

export interface RowSelectionParams<R> {
  rowIdx: number;
  row: R;
}
