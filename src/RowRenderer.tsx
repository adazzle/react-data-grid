import React, { memo } from 'react';

import Row from './Row';
import RowGroup from './RowGroup';
import { CanvasProps } from './Canvas';
import { RowRendererProps, RowData } from './common/types';
import EventBus from './EventBus';

type SharedCanvasProps<R> = Pick<CanvasProps<R, never>,
| 'columnMetrics'
| 'viewportColumns'
| 'rowGroupRenderer'
| 'rowHeight'
| 'rowRenderer'
| 'onRowClick'
| 'onRowExpandToggle'
>;

interface IRowRendererProps<R> extends SharedCanvasProps<R> {
  rowIdx: number;
  row: R;
  scrollLeft: number | undefined;
  enableCellRangeSelection?: boolean;
  eventBus: EventBus;
  isRowSelected: boolean;
}

function RowRenderer<R>({
  columnMetrics,
  viewportColumns,
  eventBus,
  rowIdx,
  row,
  rowGroupRenderer,
  rowHeight,
  rowRenderer,
  scrollLeft,
  ...props
}: IRowRendererProps<R>) {
  const { __metaData } = row as RowData;
  const rendererProps: RowRendererProps<R> = {
    rowIdx,
    row,
    width: columnMetrics.totalColumnWidth,
    height: rowHeight,
    viewportColumns,
    isRowSelected: props.isRowSelected,
    lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
    scrollLeft,
    isSummaryRow: false,
    eventBus,
    onRowClick: props.onRowClick,
    enableCellRangeSelection: props.enableCellRangeSelection
  };

  if (__metaData) {
    if (__metaData.getRowRenderer) {
      return __metaData.getRowRenderer(rendererProps, rowIdx);
    }
    if (__metaData.isGroup) {
      return (
        <RowGroup<R>
          {...rendererProps}
          {...__metaData!}
          name={(row as RowData).name!}
          eventBus={eventBus}
          renderer={rowGroupRenderer}
          onRowExpandToggle={props.onRowExpandToggle}
        />
      );
    }
  }

  return React.createElement<RowRendererProps<R>>(rowRenderer || Row, rendererProps);
}

export default memo(RowRenderer) as <R>(props: IRowRendererProps<R>) => JSX.Element;
