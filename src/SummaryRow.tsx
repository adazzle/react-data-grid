import classNames from 'classnames';
import React, { memo } from 'react';

import SummaryCell from './SummaryCell';
import { RowRendererProps } from './common/types';

type SharedRowRendererProps<TRow, TSummaryRow> = Pick<RowRendererProps<TRow, TSummaryRow>,
  | 'height'
  | 'width'
  | 'viewportColumns'
  | 'rowIdx'
  | 'lastFrozenColumnIndex'
  | 'scrollLeft'
>;

export interface SummaryRowProps<TRow, TSummaryRow> extends SharedRowRendererProps<TRow, TSummaryRow> {
  row: TSummaryRow;
}

export function SummaryRow<R, SR>({
  height,
  rowIdx,
  lastFrozenColumnIndex,
  row,
  scrollLeft,
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
          idx={column.idx}
          rowIdx={rowIdx}
          column={column}
          lastFrozenColumnIndex={lastFrozenColumnIndex}
          row={row}
          scrollLeft={column.frozen && typeof scrollLeft === 'number' ? scrollLeft : undefined}
        />
      ))}
    </div>
  );
}

export default memo(SummaryRow) as <R, SR>(props: SummaryRowProps<R, SR>) => JSX.Element;
