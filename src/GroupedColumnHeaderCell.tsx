import { useRovingTabIndex } from './hooks';
import { getHeaderCellStyle } from './utils';
import type { CalculatedColumnParent } from './types';
import { type GroupedColumnHeaderRowProps } from './GroupedColumnHeaderRow';
import { cellClassname } from './style/cell';

type SharedHeaderRowProps<R, SR> = Pick<GroupedColumnHeaderRowProps<R, SR>, 'selectCell'>;

export interface HeaderCellProps<R, SR> extends SharedHeaderRowProps<R, SR> {
  column: CalculatedColumnParent<R, SR>;
  rowIdx: number;
  isCellSelected: boolean;
}

export default function GroupedColumnHeaderCell<R, SR>({
  column,
  rowIdx,
  isCellSelected,
  selectCell
}: HeaderCellProps<R, SR>) {
  const { tabIndex, onFocus } = useRovingTabIndex(isCellSelected);
  const colSpan = column.children.length;
  const index = column.idx + 1;

  function onClick() {
    selectCell(column.idx);
  }

  return (
    <div
      role="columnheader"
      aria-colindex={index}
      aria-selected={isCellSelected}
      aria-colspan={colSpan}
      tabIndex={tabIndex}
      className={cellClassname}
      style={{
        ...getHeaderCellStyle(column, rowIdx),
        gridColumnStart: index,
        gridColumnEnd: index + colSpan
      }}
      onFocus={onFocus}
      onClick={onClick}
    >
      {column.name}
    </div>
  );
}
