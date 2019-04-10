export interface Column<T = unknown> {
  name: string;
  key: string;
  width: number;
  filterable: boolean;
  onCellChange(rowIdx: number, key: string, dependentValues: T, event: React.ChangeEvent<HTMLInputElement>): void;
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
