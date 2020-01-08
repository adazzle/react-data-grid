import React, { memo } from 'react';

import Row from './Row';
import RowGroup from './RowGroup';
import { CanvasProps } from './Canvas';
import { IRowRendererProps, RowData } from './common/types';
import EventBus from './EventBus';

type SharedCanvasProps<R, K extends keyof R> = Pick<CanvasProps<R, K>,
| 'columnMetrics'
| 'viewportColumns'
| 'rowGroupRenderer'
| 'rowHeight'
| 'rowKey'
| 'rowRenderer'
| 'onRowClick'
| 'onRowDoubleClick'
| 'onRowExpandToggle'
>;

export interface RowRendererProps<R, K extends keyof R> extends SharedCanvasProps<R, K> {
  idx: number;
  rowData: R;
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
  rowData,
  rowGroupRenderer,
  rowHeight,
  rowKey,
  rowRenderer,
  scrollLeft,
  ...props
}: RowRendererProps<R, K>) {
  const { __metaData } = rowData as RowData;
  const rendererProps: IRowRendererProps<R> = {
    idx,
    row: rowData,
    width: columnMetrics.totalColumnWidth,
    height: rowHeight,
    viewportColumns,
    isRowSelected: props.isRowSelected,
    lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
    scrollLeft,
    isSummaryRow: false,
    eventBus,
    onRowClick: props.onRowClick,
    onRowDoubleClick: props.onRowDoubleClick,
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
          name={(rowData as RowData).name!}
          eventBus={eventBus}
          renderer={rowGroupRenderer}
          onRowExpandToggle={props.onRowExpandToggle}
        />
      );
    }
  }

  return React.createElement<IRowRendererProps<R>>(rowRenderer || Row, rendererProps);
}

export default memo(RowRenderer) as <R, K extends keyof R>(props: RowRendererProps<R, K>) => JSX.Element;
