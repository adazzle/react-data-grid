import { memo } from 'react';

import { getCellStyle, getCellClassname } from './utils';
import type { CalculatedColumn, GroupRow } from './types';
import { useRovingCellRef } from './hooks';
import { SELECT_COLUMN_KEY } from './Columns';

interface GroupCellProps<R, SR> {
  id: string;
  groupKey: unknown;
  childRows: readonly R[];
  toggleGroup: (expandedGroupId: unknown) => void;
  isExpanded: boolean;
  column: CalculatedColumn<R, SR>;
  row: GroupRow<R>;
  isCellSelected: boolean;
  groupColumnIndex: number;
}

function GroupCell<R, SR>({
  id,
  groupKey,
  childRows,
  isExpanded,
  isCellSelected,
  column,
  row,
  groupColumnIndex,
  toggleGroup: toggleGroupWrapper
}: GroupCellProps<R, SR>) {
  const { ref, tabIndex, onFocus } = useRovingCellRef(isCellSelected);

  function toggleGroup() {
    toggleGroupWrapper(id);
  }

  // Only make the cell clickable if the group level matches
  const isLevelMatching = groupColumnIndex === column.idx;

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1}
      aria-selected={isCellSelected}
      ref={ref}
      tabIndex={tabIndex}
      key={column.key}
      className={getCellClassname(column)}
      style={{
        ...getCellStyle(column),
        cursor: isLevelMatching ? 'pointer' : 'default'
      }}
      onClick={isLevelMatching ? toggleGroup : undefined}
      onFocus={onFocus}
    >
      {(isLevelMatching || column.key === SELECT_COLUMN_KEY) && column.groupFormatter && (
        <column.groupFormatter
          groupKey={groupKey}
          childRows={childRows}
          column={column}
          row={row}
          isExpanded={isExpanded}
          isCellSelected={isCellSelected}
          toggleGroup={toggleGroup}
        />
      )}
    </div>
  );
}

export default memo(GroupCell) as <R, SR>(props: GroupCellProps<R, SR>) => JSX.Element;
