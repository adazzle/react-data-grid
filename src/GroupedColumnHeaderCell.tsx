import clsx from 'clsx';

import { useRovingTabIndex } from './hooks';
import { getHeaderCellRowSpan, getHeaderCellStyle } from './utils';
import type { CalculatedColumnParent } from './types';
import { type GroupedColumnHeaderRowProps } from './GroupedColumnHeaderRow';
import { cellClassname } from './style/cell';

type SharedGroupedColumnHeaderRowProps<R, SR> = Pick<
  GroupedColumnHeaderRowProps<R, SR>,
  'rowIdx' | 'selectCell'
>;

interface GroupedColumnHeaderCellProps<R, SR> extends SharedGroupedColumnHeaderRowProps<R, SR> {
  column: CalculatedColumnParent<R, SR>;
  isCellSelected: boolean;
}

export default function GroupedColumnHeaderCell<R, SR>({
  column,
  rowIdx,
  isCellSelected,
  selectCell
}: GroupedColumnHeaderCellProps<R, SR>) {
  const { tabIndex, onFocus } = useRovingTabIndex(isCellSelected);
  const { colSpan } = column;
  const rowSpan = getHeaderCellRowSpan(column, rowIdx);
  const index = column.idx + 1;

  function onClick() {
    selectCell({ idx: column.idx, rowIdx });
  }

  return (
    <div
      role="columnheader"
      aria-colindex={index}
      aria-colspan={colSpan}
      aria-rowspan={rowSpan}
      aria-selected={isCellSelected}
      tabIndex={tabIndex}
      className={clsx(cellClassname, column.headerCellClass)}
      style={{
        ...getHeaderCellStyle(column, rowIdx, rowSpan),
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
