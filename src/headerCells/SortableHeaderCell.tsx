import type { HeaderCellProps } from '../HeaderCell';
import type { SortDirection } from '../enums';

type SharedHeaderCellProps<R, SR, FR> = Pick<HeaderCellProps<R, SR, FR>,
  | 'column'
  | 'sortColumn'
  | 'sortDirection'
  | 'onSort'
>;

interface Props<R, SR, FR> extends SharedHeaderCellProps<R, SR, FR> {
  children: React.ReactNode;
}

export default function SortableHeaderCell<R, SR, FR>({
  column,
  onSort,
  sortColumn,
  sortDirection,
  children
}: Props<R, SR, FR>) {
  sortDirection = sortColumn === column.key && sortDirection || 'NONE';
  let sortText = '';
  if (sortDirection === 'ASC') {
    sortText = '\u25B2';
  } else if (sortDirection === 'DESC') {
    sortText = '\u25BC';
  }

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
      <span>{sortText}</span>
    </span>
  );
}
