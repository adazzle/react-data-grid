/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent } from 'react';
import { UpdateActions } from './enums';
import EventBus from './EventBus';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<TRow, TSummaryRow = unknown> {
  /** The name of the column. By default it will be displayed in the header cell */
  name: string;
  /** A unique key to distinguish each column */
  key: string;
  /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns */
  width?: number | string;
  /** Minimum column width in px. */
  minWidth?: number;
  /** Maximum column width in px. */
  maxWidth?: number;
  cellClass?: string | ((row: TRow) => string);
  headerCellClass?: string;
  summaryCellClass?: string | ((row: TSummaryRow) => string);
  /** Formatter to be used to render the cell content */
  formatter?: React.ComponentType<FormatterProps<TRow, TSummaryRow>>;
  /** Formatter to be used to render the summary cell content */
  summaryFormatter?: React.ComponentType<SummaryFormatterProps<TSummaryRow, TRow>>;
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
  editor?: React.ComponentType<EditorProps<TRow[keyof TRow], TRow, TSummaryRow>>;
  editor2?: React.ComponentType<Editor2Props<TRow, TSummaryRow>>;
  editorOptions?: {
    /** Default: true for editor1 and false for editor2 */
    createPortal?: boolean;
    /** Default: false */
    editOnClick?: boolean;
    /** Prevent default to cancel editing */
    onCellKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    // TODO: Do we need these options
    // editOnDoubleClick?: boolean;
    /** Default: true for editor1 and false for editor2 */
    // commitOnScroll?: boolean;
  };
  /** Header renderer for each header cell */
  headerRenderer?: React.ComponentType<HeaderRendererProps<TRow, TSummaryRow>>;
  /** Component to be used to filter the data of the column */
  filterRenderer?: React.ComponentType<FilterRendererProps<TRow, any, TSummaryRow>>;
}

export interface CalculatedColumn<TRow, TSummaryRow = unknown> extends Column<TRow, TSummaryRow> {
  idx: number;
  width: number;
  left: number;
  resizable: boolean;
  sortable: boolean;
  isLastFrozenColumn?: boolean;
  rowGroup?: boolean;
  formatter: React.ComponentType<FormatterProps<TRow, TSummaryRow>>;
}

export interface Position {
  idx: number;
  rowIdx: number;
}

export interface Editor<TValue = never> {
  getInputNode: () => Element | Text | undefined | null;
  getValue: () => TValue;
  hasResults?: () => boolean;
  isSelectOpen?: () => boolean;
  validate?: (value: unknown) => boolean;
  readonly disableContainerStyles?: boolean;
}

export interface FormatterProps<TRow = any, TSummaryRow = any> {
  rowIdx: number;
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isCellSelected: boolean;
  isRowSelected: boolean;
  onRowSelectionChange: (checked: boolean, isShiftClick: boolean) => void;
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

export interface EditorProps<TValue, TRow = any, TSummaryRow = any> {
  ref: React.Ref<Editor<{ [key: string]: TValue }>>;
  column: CalculatedColumn<TRow, TSummaryRow>;
  value: TValue;
  row: TRow;
  height: number;
  onCommit: () => void;
  onCommitCancel: () => void;
  onOverrideKeyDown: (e: KeyboardEvent) => void;
}

export interface SharedEditor2Props<TRow> {
  row: Readonly<TRow>;
  rowHeight: number;
  onRowChange: (row: Readonly<TRow>, commitChanges?: boolean) => void;
  onClose: (commitChanges?: boolean) => void;
}

export interface Editor2Props<TRow, TSummaryRow = unknown> extends SharedEditor2Props<TRow> {
  rowIdx: number;
  column: Readonly<CalculatedColumn<TRow, TSummaryRow>>;
  top: number;
  left: number;
  editorPortalTarget: Element;
}

export interface HeaderRendererProps<TRow, TSummaryRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
}

export interface SharedEditorContainerProps {
  firstEditorKeyPress: string | null;
  scrollLeft: number;
  scrollTop: number;
  rowHeight: number;
  onCommit: (e: CommitEvent) => void;
  onCommitCancel: () => void;
}

interface SelectedCellPropsBase {
  idx: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface EditCellProps<TRow> extends SelectedCellPropsBase {
  mode: 'EDIT';
  editorPortalTarget: Element;
  editorContainerProps: SharedEditorContainerProps;
  editor2Props: SharedEditor2Props<TRow>;
}

export interface SelectedCellProps extends SelectedCellPropsBase {
  mode: 'SELECT';
  onFocus: () => void;
  dragHandleProps?: Pick<React.HTMLAttributes<HTMLDivElement>, 'onMouseDown' | 'onDoubleClick'>;
}

export interface CellRendererProps<TRow, TSummaryRow = unknown> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  rowIdx: number;
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isCopied: boolean;
  isDraggedOver: boolean;
  isCellSelected: boolean;
  isRowSelected: boolean;
  eventBus: EventBus;
  dragHandleProps?: Pick<React.HTMLAttributes<HTMLDivElement>, 'onMouseDown' | 'onDoubleClick'>;
  onRowClick?: (rowIdx: number, row: TRow, column: CalculatedColumn<TRow, TSummaryRow>) => void;
}

export interface RowRendererProps<TRow, TSummaryRow = unknown> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  viewportColumns: readonly CalculatedColumn<TRow, TSummaryRow>[];
  row: TRow;
  cellRenderer?: React.ComponentType<CellRendererProps<TRow, TSummaryRow>>;
  rowIdx: number;
  copiedCellIdx?: number;
  draggedOverCellIdx?: number;
  isRowSelected: boolean;
  eventBus: EventBus;
  top: number;
  selectedCellProps?: EditCellProps<TRow> | SelectedCellProps;
  onRowClick?: (rowIdx: number, row: TRow, column: CalculatedColumn<TRow, TSummaryRow>) => void;
  rowClass?: (row: TRow) => string | undefined;
  setDraggedOverRowIdx?: (overRowIdx: number) => void;
}

export interface GroupRowRendererProps<TRow, TSummaryRow = unknown> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  id: string;
  groupKey: unknown;
  viewportColumns: readonly CalculatedColumn<TRow, TSummaryRow>[];
  childRows: readonly TRow[];
  rowIdx: number;
  top: number;
  level: number;
  selectedCellIdx?: number;
  isExpanded: boolean;
  isRowSelected: boolean;
  eventBus: EventBus;
}

export interface FilterRendererProps<TRow, TFilterValue = unknown, TSummaryRow = unknown> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  value: TFilterValue;
  onChange: (value: TFilterValue) => void;
}

export type Filters = Record<string, any>;

export interface CommitEvent<TUpdatedValue = never> {
  cellKey: string;
  rowIdx: number;
  updated: TUpdatedValue;
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

export type Dictionary<T> = Record<string, T>;

export type GroupByDictionary<TRow> = Dictionary<{
  childRows: readonly TRow[];
  childGroups: readonly TRow[] | GroupByDictionary<TRow>;
  startRowIndex: number;
}>;

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
