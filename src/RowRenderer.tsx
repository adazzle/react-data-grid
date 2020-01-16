import React, { memo } from 'react';

import Row from './Row';
import RowGroup from './RowGroup';
import { CanvasProps } from './Canvas';
import { RowRendererProps, RowData } from './common/types';
import EventBus from './EventBus';

type SharedCanvasProps<R, K extends keyof R> = Pick<CanvasProps<R, K>,
| 'columnMetrics'
| 'viewportColumns'
| 'rowGroupRenderer'
| 'rowHeight'
| 'rowKey'
| 'rowRenderer'
| 'onRowClick'
| 'onRowExpandToggle'
>;

interface IRowRendererProps<R, K extends keyof R> extends SharedCanvasProps<R, K> {
  idx: number;
  row: R;
  scrollLeft: number | undefined;
  enableCellRangeSelection?: boolean;
  eventBus: EventBus;
  isRowSelected: boolean;
}

function RowRenderer<R, K extends keyof R>({
  columnMetrics,
  viewportColumns,
  eventBus,
  idx,
  row,
  rowGroupRenderer,
  rowHeight,
  rowKey,
  rowRenderer,
  scrollLeft,
  ...props
}: IRowRendererProps<R, K>) {
  const { __metaData } = row as RowData;
  const rendererProps: RowRendererProps<R> = {
    idx,
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
      return __metaData.getRowRenderer(rendererProps, idx);
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

export default memo(RowRenderer) as <R, K extends keyof R>(props: IRowRendererProps<R, K>) => JSX.Element;
