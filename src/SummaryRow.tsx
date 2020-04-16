import React, { memo } from 'react';

import SummaryCell from './SummaryCell';
import { RowRendererProps } from './common/types';

type SharedRowRendererProps<R, SR> = Pick<RowRendererProps<R, SR>,
  | 'viewportColumns'
  | 'rowIdx'
  | 'lastFrozenColumnIndex'
>;

interface SummaryRowProps<R, SR> extends SharedRowRendererProps<R, SR> {
  row: SR;
  bottom: number;
}

function SummaryRow<R, SR>({
  rowIdx,
  lastFrozenColumnIndex,
  row,
  viewportColumns,
  bottom
}: SummaryRowProps<R, SR>) {
  return (
    <div
      className={`rdg-row rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'} rdg-summary-row`}
      style={{ bottom }}
    >
      {viewportColumns.map(column => (
        <SummaryCell<R, SR>
          key={column.key}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          row={row}
        />
      ))}
    </div>
  );
}

export default memo(SummaryRow) as <R, SR>(props: SummaryRowProps<R, SR>) => JSX.Element;
