import React, { memo } from 'react';

import Row from './Row';
import { DataGridProps } from './DataGrid';
import { RowRendererProps } from './common/types';

type SharedDataGridProps<R, SR> = Pick<DataGridProps<R, never, SR>,
  | 'rowRenderer'
  | 'onRowClick'
>;

type IRowRendererProps<R, SR> = RowRendererProps<R, SR> & SharedDataGridProps<R, SR>;

function RowRenderer<R, SR>({
  viewportColumns,
  lastFrozenColumnIndex,
  eventBus,
  rowIdx,
  row,
  rowRenderer,
  isRowSelected,
  onRowClick
}: RowRendererProps<R, SR> & SharedDataGridProps<R, SR>) {
  const rendererProps: RowRendererProps<R, SR> = {
    rowIdx,
    row,
    viewportColumns,
    isRowSelected,
    lastFrozenColumnIndex,
    eventBus,
    onRowClick
  };

  return React.createElement<RowRendererProps<R, SR>>(rowRenderer || Row, rendererProps);
}

export default memo(RowRenderer) as <R, SR>(props: IRowRendererProps<R, SR>) => JSX.Element;
