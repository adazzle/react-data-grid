import React, { memo } from 'react';

import Row from './Row';
import { RendererProps, RowRendererProps } from './RowRenderer';

const emptyFunc = () => {};

type SummaryRowRendererProps<R, K extends keyof R> = Pick<RowRendererProps<R, K>,
| 'idx'
| 'rowData'
| 'setRowRef'
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
  scrollLeft,
  setRowRef
}: SummaryRowRendererProps<R, K>) {
  const rendererProps: RendererProps<R, K> = {
    ref(row) {
      setRowRef(row, idx);
    },
    idx,
    row: rowData,
    height: rowHeight,
    columns: columnMetrics.columns,
    isRowSelected: false,
    onRowSelectionChange: emptyFunc,
    cellMetaData,
    colOverscanStartIdx,
    colOverscanEndIdx,
    lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
    scrollLeft,
    isSummaryRow: true
  };

  return <Row<R> {...rendererProps} />;
}

export default memo(RowRenderer) as <R, K extends keyof R>(props: SummaryRowRendererProps<R, K>) => JSX.Element;
