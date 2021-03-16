import HeaderCell from './HeaderCell';
import type { SortDirection } from './types';
import { headerRowClassname } from './style';
import { useColumns } from './hooks';

export interface HeaderRowProps {
  /** The height of the header row in pixels */
  height?: number;
  /** The key of the column which is currently being sorted */
  sortColumn?: string;
  /** The direction to sort the sortColumn*/
  sortDirection?: SortDirection;
  /** Function called whenever grid is sorted*/
  onSort?: (columnKey: string, direction: SortDirection) => void;
  /** Called when a column is resized */
  onColumnResize?: (idx: number, width: number) => void;
}

export default function HeaderRow<R, SR>({
  sortColumn,
  sortDirection,
  onSort,
  onColumnResize
}: HeaderRowProps) {
  const columns = useColumns<R, SR>();

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      className={headerRowClassname}
    >
      {columns.map(column => {
        return (
          <HeaderCell<R, SR>
            key={column.key}
            column={column}
            onSort={onSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onColumnResize={onColumnResize}
          />
        );
      })}
    </div>
  );
}
