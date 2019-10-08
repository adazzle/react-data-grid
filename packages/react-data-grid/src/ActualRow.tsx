import React, { cloneElement, memo } from 'react';
import { isElement } from 'react-is';

import { CanvasProps } from './Canvas';
import Row from './Row';
import RowGroup from './RowGroup';
import { RowData, RowRendererProps, CalculatedColumn, SubRowDetails } from './common/types';

type SharedCanvasProps<R> = Pick<CanvasProps<R>,
| 'cellMetaData'
| 'columnMetrics'
| 'eventBus'
| 'getSubRowDetails'
| 'onRowSelectionChange'
| 'rowGetter'
| 'rowGroupRenderer'
| 'rowHeight'
| 'rowKey'
| 'rowOffsetHeight'
| 'rowRenderer'
| 'selectedRows'
>;

interface ActualRowProps<R> extends SharedCanvasProps<R> {
  idx: number;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  isScrolling: boolean;
}

type SharedActualRowProps<R> = Pick<ActualRowProps<R>,
| 'idx'
| 'cellMetaData'
| 'rowOffsetHeight'
| 'onRowSelectionChange'
| 'isScrolling'
| 'colOverscanStartIdx'
| 'colOverscanEndIdx'
>;

interface RendererProps<R> extends SharedActualRowProps<R> {
  key: number;
  columns: CalculatedColumn<R>[];
  lastFrozenColumnIndex: number;
  row: R;
  subRowDetails?: SubRowDetails;
  height: number;
  isRowSelected: boolean;
}

export default memo(function ActualRow<R>({
  cellMetaData,
  colOverscanEndIdx,
  colOverscanStartIdx,
  columnMetrics,
  eventBus,
  getSubRowDetails,
  idx,
  isScrolling,
  onRowSelectionChange,
  rowGetter,
  rowGroupRenderer,
  rowHeight,
  rowKey,
  rowOffsetHeight,
  rowRenderer,
  selectedRows
}: ActualRowProps<R>) {
  const row = rowGetter(idx);
  const rendererProps: RendererProps<R> = {
    key: idx,
    idx,
    row,
    height: rowHeight,
    rowOffsetHeight,
    columns: columnMetrics.columns,
    isRowSelected: selectedRows !== undefined && selectedRows.has(row[rowKey]),
    onRowSelectionChange,
    cellMetaData,
    subRowDetails: getSubRowDetails ? getSubRowDetails(row) : undefined,
    colOverscanStartIdx,
    colOverscanEndIdx,
    lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
    isScrolling
  };
  const { __metaData } = row as RowData;

  function renderCustomRowRenderer(rowProps: RendererProps<R>) {
    const CustomRowRenderer = rowRenderer!;
    const customRowRendererProps = { ...rowProps, renderBaseRow: (p: RowRendererProps<R>) => <Row {...p} /> };

    if (isElement(CustomRowRenderer)) {
      if (CustomRowRenderer.type === Row) {
        // TODO: remove scrollLeft?
        return <Row<R> scrollLeft={0} {...rowProps} />;
      }
      return cloneElement(CustomRowRenderer, customRowRendererProps);
    }

    // TODO: remove scrollLeft?
    return <CustomRowRenderer scrollLeft={0} {...customRowRendererProps} />;
  }

  function renderGroupRow(groupRowProps: RendererProps<R>) {
    const { columns, ...rowGroupProps } = groupRowProps;
    const row = groupRowProps.row as RowData;

    return (
      <RowGroup
        {...rowGroupProps}
        {...row.__metaData!}
        columns={columns as CalculatedColumn<unknown>[]}
        name={row.name!}
        eventBus={eventBus}
        renderer={rowGroupRenderer}
        renderBaseRow={(p: RowRendererProps<R>) => <Row {...p} />}
      />
    );
  }

  if (__metaData) {
    if (__metaData.getRowRenderer) {
      return __metaData.getRowRenderer(rendererProps, idx);
    }
    if (__metaData.isGroup) {
      return renderGroupRow(rendererProps);
    }
  }

  if (rowRenderer) {
    return renderCustomRowRenderer(rendererProps);
  }

  // TODO: remove scrollLeft?
  return <Row<R> scrollLeft={0} {...rendererProps} />;
}) as <R>(props: ActualRowProps<R>) => JSX.Element;
