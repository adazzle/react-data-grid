import { useRovingTabIndex } from './hooks';
import type { CalculatedColumnParent } from './types';
import { type GroupedColumnHeaderRowProps } from './GroupedColumnHeaderRow';
import { cellClassname } from './style/cell';

type SharedHeaderRowProps<R, SR> = Pick<GroupedColumnHeaderRowProps<R, SR>, 'selectCell'>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumnParent<R, SR>;
  isCellSelected: boolean;
}

export default function GroupedColumnHeaderCell<R, SR>({
  column,
  isCellSelected,
  selectCell
}: HeaderCellProps<R, SR>) {
  const { tabIndex, onFocus } = useRovingTabIndex(isCellSelected);
  const colSpan = column.children.length;

  function onClick() {
    selectCell(column.idx);
  }

  return (
    <div
      role="columnheader"
      aria-colindex={column.idx + 1}
      aria-selected={isCellSelected}
      aria-colspan={colSpan}
      tabIndex={tabIndex}
      className={cellClassname}
      style={{
        gridColumnStart: column.idx + 1,
        gridColumnEnd: column.idx + 1 + colSpan
      }}
      onFocus={onFocus}
      onClick={onClick}
    >
      {column.name}
    </div>
  );
}
