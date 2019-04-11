export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<T = unknown> {
  /** The name of the column. By default it will be displayed in the header cell */
  name: string;
  /** A unique key to distinguish each column */
  key: string;
  /** Column width. If not specified, it will be determined automatically based on grid width and specified widths of other columns */
  width?: number;
  /** TODO */
  left: number;
  /** TODO */
  cellClass?: string;
  /** Enable filtering of a column */
  filterable?: boolean;
  /** Component to be used to filter the data of the column */
  filterRenderer?: React.ReactChild;
  /** Enable resizing of a column */
  resizable?: boolean;
  /** Enable sorting of a column */
  sortable?: boolean;
  /** Sets the column sort order to be descending instead of ascending the first time the column is sorted */
  sortDescendingFirst?: boolean;
  /** Enable dragging of a column */
  draggable?: boolean;
  /** Enables cell editing. If set and no editor property specified, then a textinput will be used as the cell editor */
  editable?: React.ReactChild;
  /** Editor to be rendered when cell of column is being edited. If set, then the column is automatically set to be editable */
  editor?: React.ReactChild;
  /** Formatter to be used to render the cell content */
  formatter?: React.ReactChild;
  /** Header renderer for each header cell */
  headerRenderer?: React.ReactChild;
  /** Determines whether column is frozen or not */
  frozen?: boolean;
  /** By adding an event object with callbacks for the native react events you can bind events to a specific column. That will not break the default behaviour of the grid and will run only for the specified column */
  events?: unknown;
  /** TODO */
  onCellChange?(rowIdx: number, key: string, dependentValues: T, event: React.ChangeEvent<HTMLInputElement>): void;
}

export interface ColumnMetrics {
  columns: Column[];
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
