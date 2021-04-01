import { memo } from 'react';

import type { CalculatedParentColumn } from './types';
import { headerRowClassname } from './style';
import ParentHeaderCell from './ParentHeaderCell';

export interface ParentHeaderRowProps<R, SR> {
  columns: readonly CalculatedParentColumn<R, SR>[];
}

function ParentHeaderRow<R, SR>({
  columns
}: ParentHeaderRowProps<R, SR>) {
  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      className={headerRowClassname}
    >
      {columns.map(column => {
        return (
          <ParentHeaderCell<R, SR>
            key={column.key}
            column={column}
          />
        );
      })}
    </div>
  );
}

export default memo(ParentHeaderRow) as <R, SR>(props: ParentHeaderRowProps<R, SR>) => JSX.Element;
