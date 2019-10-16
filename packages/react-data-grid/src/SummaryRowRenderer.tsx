import React, { memo } from 'react';
import Row from './Row';
import { propsAreEqual, RendererProps, RowRendererProps } from './RowRenderer';

const emptyFunc = () => {};

type SummaryRowRendererProps<R> = Pick<RowRendererProps<R>,
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

function RowRenderer<R>({
  cellMetaData,
  colOverscanEndIdx,
  colOverscanStartIdx,
  columnMetrics,
  idx,
  rowData,
  rowHeight,
  scrollLeft,
  setRowRef
}: SummaryRowRendererProps<R>) {
  const rendererProps: RendererProps<R> = {
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

export default memo(RowRenderer, propsAreEqual) as <R>(props: SummaryRowRendererProps<R>) => JSX.Element;
