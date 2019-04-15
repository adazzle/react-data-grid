import { List } from 'immutable';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<T = unknown> {
  name: string;
  key: string;
  width: number;
  left: number;
  cellClass?: string;

  editable?: boolean | ((rowData: unknown) => boolean);
  draggable?: boolean;
  filterable?: boolean;
  frozen?: boolean;
  locked?: boolean;
  resizable?: boolean;

  editor?: unknown;

  onCellChange?(rowIdx: number, key: string, dependentValues: T, event: React.ChangeEvent<HTMLInputElement>): void;
}

export interface ColumnMetrics {
  columns: Column[] | List<Column>;
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
