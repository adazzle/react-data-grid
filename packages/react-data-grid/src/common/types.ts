export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Column<T = unknown> {
  name: string;
  key: string;
  width: number;
  left: number;
  cellClass?: string;

  draggable?: boolean;
  filterable?: boolean;
  resizable?: boolean;

  onCellChange(rowIdx: number, key: string, dependentValues: T, event: React.ChangeEvent<HTMLInputElement>): void;
}
