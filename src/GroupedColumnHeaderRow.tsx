import { memo } from 'react';
import clsx from 'clsx';

import type { CalculatedColumn } from './types';
import GroupedColumnHeaderCell from './GroupedColumnHeaderCell';
import { headerRowClassname } from './HeaderRow';
import { rowSelectedClassname } from './style/row';

export interface GroupedColumnHeaderRowProps<R, SR> {
  rowIdx: number;
  depth: number;
  columns: readonly CalculatedColumn<R, SR>[];
  selectCell: (columnIdx: number) => void;
  selectedCellIdx: number | undefined;
}

function GroupedColumnHeaderRow<R, SR>({
  rowIdx,
  depth,
  columns,
  selectedCellIdx,
  selectCell
}: GroupedColumnHeaderRowProps<R, SR>) {
  const cells = [];

  for (let index = 0; index < columns.length; index++) {
    let { parent } = columns[index];
    let currentDepth = 1;

    while (currentDepth < depth) {
      parent = parent?.parent;
      currentDepth++;
    }

    if (parent !== undefined) {
      const { idx } = parent;
      cells.push(
        <GroupedColumnHeaderCell<R, SR>
          key={idx}
          column={parent}
          rowIdx={rowIdx}
          isCellSelected={selectedCellIdx === idx}
          selectCell={selectCell}
        />
      );
      index += parent.children.length - 1;
    }
  }

  return (
    <div
      role="row"
      aria-rowindex={rowIdx} // aria-rowindex is 1 based
      className={clsx(headerRowClassname, {
        [rowSelectedClassname]: selectedCellIdx === -1
      })}
    >
      {cells}
    </div>
  );
}

export default memo(GroupedColumnHeaderRow) as <R, SR>(
  props: GroupedColumnHeaderRowProps<R, SR>
) => JSX.Element;
