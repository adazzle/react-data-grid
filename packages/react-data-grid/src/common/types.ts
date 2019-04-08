export interface Column<T = void> {
  name: string;
  key: string;
  width: number;
  filterable: boolean;
  onCellChange(rowIdx: number, key: string, dependentValues: T, event: React.ChangeEvent<HTMLInputElement>): void;
}
