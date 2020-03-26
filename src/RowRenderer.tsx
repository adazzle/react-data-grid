import React, { memo } from 'react';

import Row from './Row';
import RowGroup from './RowGroup';
import { CanvasProps } from './Canvas';
import { RowRendererProps, RowData } from './common/types';
import EventBus from './EventBus';

type SharedCanvasProps<R, SR> = Pick<CanvasProps<R, never, SR>,
  | 'columnMetrics'
  | 'viewportColumns'
  | 'rowGroupRenderer'
  | 'rowHeight'
  | 'rowRenderer'
  | 'onRowClick'
  | 'onRowExpandToggle'
>;

interface IRowRendererProps<R, SR> extends SharedCanvasProps<R, SR> {
  rowIdx: number;
  row: R;
  scrollLeft: number | undefined;
  enableCellRangeSelection?: boolean;
  eventBus: EventBus;
  isRowSelected: boolean;
}

function RowRenderer<R, SR>({
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
}: IRowRendererProps<R, SR>) {
  const { __metaData } = row as RowData;
  const rendererProps: RowRendererProps<R, SR> = {
    rowIdx,
    row,
    width: columnMetrics.totalColumnWidth,
    height: rowHeight,
    viewportColumns,
    isRowSelected: props.isRowSelected,
    lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
    scrollLeft,
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
        <RowGroup<R, SR>
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

  return React.createElement<RowRendererProps<R, SR>>(rowRenderer || Row, rendererProps);
}

export default memo(RowRenderer) as <R, SR>(props: IRowRendererProps<R, SR>) => JSX.Element;
