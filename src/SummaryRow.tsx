import classNames from 'classnames';
import React from 'react';

import SummaryCell from './SummaryCell';
import { SummaryRendererProps } from './common/types';

export default function SummaryRow<R>({
  extraClasses,
  height,
  rowIdx,
  lastFrozenColumnIndex,
  row,
  scrollLeft,
  viewportColumns,
  width
}: SummaryRendererProps<R>) {
  return (
    <div
      className={classNames(
        'rdg-row',
        `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
        extraClasses
      )}
      style={{ width, height }}
    >
      {viewportColumns.map(column => (
        <SummaryCell<R>
          key={column.key as string} // FIXME: fix key type
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
