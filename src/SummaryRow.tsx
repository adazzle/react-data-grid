import classNames from 'classnames';
import React, { memo } from 'react';

import SummaryCell from './SummaryCell';
import { RowRendererProps } from './common/types';

type SharedRowRendererProps<R, SR> = Pick<RowRendererProps<R, SR>,
  | 'height'
  | 'width'
  | 'viewportColumns'
  | 'rowIdx'
  | 'lastFrozenColumnIndex'
>;

interface SummaryRowProps<R, SR> extends SharedRowRendererProps<R, SR> {
  row: SR;
}

function SummaryRow<R, SR>({
  height,
  rowIdx,
  lastFrozenColumnIndex,
  row,
  viewportColumns,
  width
}: SummaryRowProps<R, SR>) {
  return (
    <div
      className={classNames(
        'rdg-row',
        `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
        'rdg-summary-row'
      )}
      style={{ width, height }}
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
