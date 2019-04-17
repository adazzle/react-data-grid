import { KeyboardEvent } from 'react';
import { List } from 'immutable';
import { HeaderRowType } from './enums';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<T = unknown> {
  name: string;
  key: string;
  //FIXME: width and left should be optional
  width: number;
  left: number;
  cellClass?: string;

  editable?: boolean | ((rowData: unknown) => boolean);
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
  getRowMetaData?(rowData: unknown, column: Column<T>): unknown;
}

export type ColumnList = Column[] | List<Column>;

export interface ColumnMetrics {
  columns: ColumnList;
  width: number;
  totalColumnWidth: number;
}

export interface CellMetaData {
  rowKey: string;
  onCellClick(): void;
  onCellMouseDown(): void;
  onCellMouseEnter(): void;
  onCellContextMenu(): void;
  onCellDoubleClick(): void;
  onDragEnter(): void;
  onRowExpandToggle(data: { rowIdx: number; shouldExpand: boolean; columnGroupName: string; name: string }): void;
  onDeleteSubRow?(): void;
  onAddSubRow?(): void;
  onColumnEvent(): void;
  onCellExpand(): void;
  getCellActions?(): void;
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

export type RowGetter = (rowIdx: number) => unknown;

export interface Editor {
  getInputNode(): Element | Text | undefined | null;
  getValue(): unknown;
  hasResults?(): boolean;
  isSelectOpen?(): boolean;
  validate?(value: unknown): boolean;
  readonly disableContainerStyles?: boolean;
}

export interface EditorProps<V = unknown, C = unknown, R = unknown> {
  column: Column<C>;
  value: V;
  rowMetaData: unknown;
  rowData: R;
  height: number;
  onCommit(args?: { key?: string }): void;
  onCommitCancel(): void;
  onBlur(): void;
  onOverrideKeyDown(e: KeyboardEvent): void;
}
