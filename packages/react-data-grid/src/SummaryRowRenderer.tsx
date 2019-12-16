import React, { memo } from 'react';

import Row from './Row';
import { RowRendererProps } from './RowRenderer';
import { getScrollbarSize } from './utils';

const noop = () => { };

type SummaryRowRendererProps<R, K extends keyof R> = Pick<RowRendererProps<R, K>,
| 'idx'
| 'rowData'
| 'columnMetrics'
| 'viewportColumns'
| 'rowHeight'
| 'scrollLeft'
| 'eventBus'
>;

function RowRenderer<R, K extends keyof R>({
  columnMetrics,
  viewportColumns,
  idx,
  rowData,
  rowHeight,
  scrollLeft,
  eventBus
}: SummaryRowRendererProps<R, K>) {
  return (
    <Row<R>
      idx={idx}
      row={rowData}
      width={columnMetrics.totalColumnWidth + getScrollbarSize()}
      height={rowHeight}
      columns={columnMetrics.columns}
      viewportColumns={viewportColumns}
      isRowSelected={false}
      onRowSelectionChange={noop}
      lastFrozenColumnIndex={columnMetrics.lastFrozenColumnIndex}
      scrollLeft={scrollLeft}
      isSummaryRow
      eventBus={eventBus}
    />
  );
}

export default memo(RowRenderer) as <R, K extends keyof R>(props: SummaryRowRendererProps<R, K>) => JSX.Element;
