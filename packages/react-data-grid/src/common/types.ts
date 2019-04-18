import { KeyboardEvent, ReactNode } from 'react';
import { List } from 'immutable';
import { HeaderRowType } from './enums';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<T = unknown> {
  name: string;
  key: string;
  //FIXME: width and left should be optional
  width: number;
  left: number;
  hidden?: boolean;
  cellClass?: string;
  events?: {
    [key: string]: undefined | ((e: Event, info: ColumnEventInfo) => void);
  };

  formatter?: React.ReactElement | React.ComponentType<FormatterProps>;
  editable?: boolean | ((rowData: RowData) => boolean);
  draggable?: boolean;
  filterable?: boolean;
  frozen?: boolean;
  resizable?: boolean;
  sortable?: boolean;
  sortDescendingFirst?: boolean;

  editor?: unknown;
  headerRenderer?: React.ReactElement | React.ComponentType<{ column: Column<T>; rowType: HeaderRowType }>;
  filterRenderer?: React.ComponentType;

  onCellChange?(rowIdx: number, key: string, dependentValues: T, event: React.ChangeEvent<HTMLInputElement>): void;
  getRowMetaData?(rowData: RowData, column: Column<T>): unknown;
}

export type ColumnList = Column[] | List<Column>;

export interface ColumnMetrics {
  columns: ColumnList;
  width: number;
  totalColumnWidth: number;
}

export interface RowData {
  [key: string]: unknown;
}

export interface CellMetaData {
  rowKey: string;
  onCellClick(position: Position): void;
  onCellContextMenu(position: Position): void;
  onCellDoubleClick(position: Position): void;
  onDragEnter(): void;
  onCellExpand(options: SubRowOptions): void;
  onRowExpandToggle(data: { rowIdx: number; shouldExpand: boolean; columnGroupName: string; name: string }): void;
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
  getValue(): unknown;
  hasResults?(): boolean;
  isSelectOpen?(): boolean;
  validate?(value: unknown): boolean;
  readonly disableContainerStyles?: boolean;
}

export interface FormatterProps {
  value: unknown;
  column: Column;
  row: RowData;
  isScrolling?: boolean;
  isExpanded?: boolean;
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

interface SubRowDetails {
  canExpand: boolean;
  field: string;
  expanded: boolean;
  children: unknown;
  treeDepth: number;
  siblingIndex: number;
  numberSiblings: number;
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
