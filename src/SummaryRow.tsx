import classNames from 'classnames';
import React, { memo } from 'react';

import SummaryCell from './SummaryCell';
import { RowRendererProps } from './common/types';

export interface SummaryRendererProps<TRow> extends Pick<RowRendererProps<TRow>, 'extraClasses' | 'height' | 'rowIdx' |'lastFrozenColumnIndex' | 'scrollLeft' | 'viewportColumns' | 'width'> {
  row: unknown;
}

export function SummaryRow<R>({
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

export default memo(SummaryRow) as <R>(props: SummaryRendererProps<R>) => JSX.Element;
