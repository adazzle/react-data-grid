import { memo } from 'react';
import clsx from 'clsx';

import { getCellStyle } from './utils';
import type { CalculatedColumn } from './types';
import type { GroupRowRendererProps } from './GroupRow';

type SharedGroupRowRendererProps<R, SR, FR> = Pick<GroupRowRendererProps<R, SR, FR>,
  | 'id'
  | 'rowIdx'
  | 'groupKey'
  | 'childRows'
  | 'isExpanded'
  | 'isRowSelected'
  | 'selectRow'
  | 'toggleGroup'
>;

interface GroupCellProps<R, SR, FR> extends SharedGroupRowRendererProps<R, SR, FR> {
  column: CalculatedColumn<R, SR, FR>;
  isCellSelected: boolean;
  groupColumnIndex: number;
}

function GroupCell<R, SR, FR>({
  id,
  rowIdx,
  groupKey,
  childRows,
  isExpanded,
  isCellSelected,
  isRowSelected,
  column,
  groupColumnIndex,
  selectRow,
  toggleGroup: toggleGroupWrapper
}: GroupCellProps<R, SR, FR>) {
  function toggleGroup() {
    toggleGroupWrapper(id);
  }

  function onRowSelectionChange(checked: boolean) {
    selectRow({ rowIdx, checked, isShiftClick: false });
  }

  // Only make the cell clickable if the group level matches
  const isLevelMatching = column.rowGroup && groupColumnIndex === column.idx;

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1}
      key={column.key}
      className={clsx('rdg-cell', {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-frozen-last': column.isLastFrozenColumn,
        'rdg-cell-selected': isCellSelected
      })}
      style={{
        ...getCellStyle(column),
        cursor: isLevelMatching ? 'pointer' : 'default'
      }}
      onClick={isLevelMatching ? toggleGroup : undefined}
    >
      {(!column.rowGroup || groupColumnIndex === column.idx) && (
        <column.groupFormatter
          groupKey={groupKey}
          childRows={childRows}
          column={column}
          isExpanded={isExpanded}
          isCellSelected={isCellSelected}
          isRowSelected={isRowSelected}
          onRowSelectionChange={onRowSelectionChange}
          toggleGroup={toggleGroup}
        />
      )}
    </div>
  );
}

export default memo(GroupCell) as <R, SR, FR>(props: GroupCellProps<R, SR, FR>) => JSX.Element;
