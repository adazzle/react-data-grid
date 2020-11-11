import type { HeaderCellProps } from '../HeaderCell';
import type { SortDirection } from '../enums';

const SORT_TEXT = {
  ASC: '\u25B2',
  DESC: '\u25BC',
  NONE: ''
} as const;

type SharedHeaderCellProps<R, SR> = Pick<HeaderCellProps<R, SR>,
  | 'column'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
>;

interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR>({
  column,
  onSort,
  sortColumn,
  sortDirection,
  children
}: Props<R, SR>) {
  sortDirection = sortColumn === column.key && sortDirection || 'NONE';
  function onClick() {
    if (!onSort) return;
    const { sortDescendingFirst } = column;
    let direction: SortDirection;
    switch (sortDirection) {
      case 'ASC':
        direction = sortDescendingFirst ? 'NONE' : 'DESC';
        break;
      case 'DESC':
        direction = sortDescendingFirst ? 'ASC' : 'NONE';
        break;
      default:
        direction = sortDescendingFirst ? 'DESC' : 'ASC';
        break;
    }
    onSort(column.key, direction);
  }

  return (
    <span className="rdg-header-sort-cell" onClick={onClick}>
      <span className="rdg-header-sort-name">{children}</span>
      <span>{SORT_TEXT[sortDirection]}</span>
    </span>
  );
}
