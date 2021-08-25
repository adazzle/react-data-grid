import type { CSSProperties } from 'react';
import { memo } from 'react';
import clsx from 'clsx';
import { css } from '@linaria/core';

import { cell, cellFrozenLast, rowClassname } from './style';
import { SELECT_COLUMN_KEY } from './Columns';
import GroupCell from './GroupCell';
import type { CalculatedColumn, GroupRow, Omit } from './types';
import { RowSelectionProvider, useRovingRowRef } from './hooks';

export interface GroupRowRendererProps<R, SR>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  id: string;
  groupKey: unknown;
  viewportColumns: readonly CalculatedColumn<R, SR>[];
  childRows: readonly R[];
  rowIdx: number;
  row: GroupRow<R>;
  top: number;
  height: number;
  level: number;
  selectedCellIdx: number | undefined;
  isExpanded: boolean;
  isRowSelected: boolean;
  selectGroup: (rowIdx: number) => void;
  toggleGroup: (expandedGroupId: unknown) => void;
}

const groupRow = css`
  &:not([aria-selected='true']) {
    background-color: var(--header-background-color);
  }

  > .${cell}:not(:last-child):not(.${cellFrozenLast}) {
    border-right: none;
  }
`;

const groupRowClassname = `rdg-group-row ${groupRow}`;

function GroupedRow<R, SR>({
  id,
  groupKey,
  viewportColumns,
  childRows,
  rowIdx,
  row,
  top,
  height,
  level,
  isExpanded,
  selectedCellIdx,
  isRowSelected,
  selectGroup,
  toggleGroup,
  ...props
}: GroupRowRendererProps<R, SR>) {
  const { ref, tabIndex, className } = useRovingRowRef(selectedCellIdx);

  // Select is always the first column
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;

  function handleSelectGroup() {
    selectGroup(rowIdx);
  }

  return (
    <RowSelectionProvider value={isRowSelected}>
      <div
        role="row"
        aria-level={level}
        aria-expanded={isExpanded}
        ref={ref}
        tabIndex={tabIndex}
        className={clsx(
          rowClassname,
          groupRowClassname,
          `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
          className
        )}
        onClick={handleSelectGroup}
        style={
          {
            top,
            '--row-height': `${height}px`
          } as unknown as CSSProperties
        }
        {...props}
      >
        {viewportColumns.map((column) => (
          <GroupCell
            key={column.key}
            id={id}
            groupKey={groupKey}
            childRows={childRows}
            isExpanded={isExpanded}
            isCellSelected={selectedCellIdx === column.idx}
            column={column}
            row={row}
            groupColumnIndex={idx}
            toggleGroup={toggleGroup}
          />
        ))}
      </div>
    </RowSelectionProvider>
  );
}

export default memo(GroupedRow) as <R, SR>(props: GroupRowRendererProps<R, SR>) => JSX.Element;
