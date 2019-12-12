import React, { memo } from 'react';

import Row from './Row';
import { RowRendererProps } from './RowRenderer';
import { getScrollbarSize } from './utils';

const noop = () => {};

type SummaryRowRendererProps<R, K extends keyof R> = Pick<RowRendererProps<R, K>,
| 'idx'
| 'rowData'
| 'columnMetrics'
| 'cellMetaData'
| 'colOverscanEndIdx'
| 'colOverscanStartIdx'
| 'rowHeight'
| 'scrollLeft'
>;

function RowRenderer<R, K extends keyof R>({
  cellMetaData,
  colOverscanEndIdx,
  colOverscanStartIdx,
  columnMetrics,
  idx,
  rowData,
  rowHeight,
  scrollLeft
}: SummaryRowRendererProps<R, K>) {
  return (
    <Row<R>
      idx={idx}
      row={rowData}
      width={columnMetrics.totalColumnWidth + getScrollbarSize()}
      height={rowHeight}
      columns={columnMetrics.columns}
      isRowSelected={false}
      onRowSelectionChange={noop}
      cellMetaData={cellMetaData}
      colOverscanStartIdx={colOverscanStartIdx}
      colOverscanEndIdx={colOverscanEndIdx}
      lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
      scrollLeft={scrollLeft}
      isSummaryRow
    />
  );
}

export default memo(RowRenderer) as <R, K extends keyof R>(props: SummaryRowRendererProps<R, K>) => JSX.Element;
