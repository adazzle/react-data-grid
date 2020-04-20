import React, { memo } from 'react';

import Row from './Row';
import RowGroup from './RowGroup';
import { DataGridProps } from './DataGrid';
import { RowRendererProps, RowData, CalculatedColumn } from './common/types';
import EventBus from './EventBus';

type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, never, SR>,
  | 'rowGroupRenderer'
  | 'rowRenderer'
  | 'onRowClick'
  | 'onRowExpandToggle'
>;

interface IRowRendererProps<R, SR> extends SharedDataGridProps<R, SR> {
  viewportColumns: readonly CalculatedColumn<R, SR>[];
  lastFrozenColumnIndex: number;
  rowIdx: number;
  row: R;
  eventBus: EventBus;
  isRowSelected: boolean;
}

function RowRenderer<R, SR>({
  viewportColumns,
  lastFrozenColumnIndex,
  eventBus,
  rowIdx,
  row,
  rowGroupRenderer,
  rowRenderer,
  isRowSelected,
  onRowClick,
  onRowExpandToggle
}: IRowRendererProps<R, SR>) {
  const { __metaData } = row as RowData;
  const rendererProps: RowRendererProps<R, SR> = {
    rowIdx,
    row,
    viewportColumns,
    isRowSelected,
    lastFrozenColumnIndex,
    eventBus,
    onRowClick
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
          onRowExpandToggle={onRowExpandToggle}
        />
      );
    }
  }

  return React.createElement<RowRendererProps<R, SR>>(rowRenderer || Row, rendererProps);
}

export default memo(RowRenderer) as <R, SR>(props: IRowRendererProps<R, SR>) => JSX.Element;
