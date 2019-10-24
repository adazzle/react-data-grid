import React, { memo } from 'react';
import { isElement } from 'react-is';

import Row from './Row';
import RowGroup from './RowGroup';
import { CanvasProps } from './Canvas';
import { IRowRendererProps, CalculatedColumn, SubRowDetails, RowData } from './common/types';

type SharedCanvasProps<R, K extends keyof R> = Pick<CanvasProps<R, K>,
| 'cellMetaData'
| 'columnMetrics'
| 'eventBus'
| 'getSubRowDetails'
| 'onRowSelectionChange'
| 'rowGroupRenderer'
| 'rowHeight'
| 'rowKey'
| 'rowRenderer'
| 'selectedRows'
>;

export interface RowRendererProps<R, K extends keyof R> extends SharedCanvasProps<R, K> {
  idx: number;
  rowData: R;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  scrollLeft: number | undefined;
  setRowRef(row: Row<R> | null, idx: number): void;
}

type SharedActualRowRendererProps<R, K extends keyof R> = Pick<RowRendererProps<R, K>,
| 'idx'
| 'cellMetaData'
| 'onRowSelectionChange'
| 'colOverscanStartIdx'
| 'colOverscanEndIdx'
| 'scrollLeft'
>;

interface RendererProps<R, K extends keyof R> extends SharedActualRowRendererProps<R, K> {
  ref: React.Ref<Row<R>>;
  row: R;
  columns: CalculatedColumn<R>[];
  lastFrozenColumnIndex: number;
  subRowDetails?: SubRowDetails;
  width: number;
  height: number;
  isRowSelected: boolean;
  isSummaryRow: boolean;
}

function RowRenderer<R, K extends keyof R>({
  cellMetaData,
  colOverscanEndIdx,
  colOverscanStartIdx,
  columnMetrics,
  eventBus,
  getSubRowDetails,
  idx,
  onRowSelectionChange,
  rowData,
  rowGroupRenderer,
  rowHeight,
  rowKey,
  rowRenderer,
  scrollLeft,
  selectedRows,
  setRowRef
}: RowRendererProps<R, K>) {
  const { __metaData } = rowData as RowData;
  const rendererProps: RendererProps<R, K> = {
    ref(row) {
      setRowRef(row, idx);
    },
    idx,
    row: rowData,
    width: columnMetrics.totalColumnWidth,
    height: rowHeight,
    columns: columnMetrics.columns,
    isRowSelected: selectedRows !== undefined && selectedRows.has(rowData[rowKey]),
    onRowSelectionChange,
    cellMetaData,
    subRowDetails: getSubRowDetails ? getSubRowDetails(rowData) : undefined,
    colOverscanStartIdx,
    colOverscanEndIdx,
    lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
    scrollLeft,
    isSummaryRow: false
  };

  function renderCustomRowRenderer() {
    const { ref, ...otherProps } = rendererProps;
    const CustomRowRenderer = rowRenderer!;
    const customRowRendererProps = { ...otherProps, renderBaseRow: (p: IRowRendererProps<R>) => <Row ref={ref} {...p} /> };

    if (isElement(CustomRowRenderer)) {
      if (CustomRowRenderer.type === Row) {
        // In the case where Row is specified as the custom render, ensure the correct ref is passed
        return <Row<R> {...rendererProps} />;
      }
      return React.cloneElement(CustomRowRenderer, customRowRendererProps);
    }

    return <CustomRowRenderer {...customRowRendererProps} />;
  }

  function renderGroupRow() {
    const { ref, columns, ...rowGroupProps } = rendererProps;

    return (
      <RowGroup
        {...rowGroupProps}
        {...__metaData!}
        columns={columns as CalculatedColumn<unknown>[]}
        name={(rowData as RowData).name!}
        eventBus={eventBus}
        renderer={rowGroupRenderer}
        renderBaseRow={(p: IRowRendererProps<R>) => <Row ref={ref} {...p} />}
      />
    );
  }

  if (__metaData) {
    if (__metaData.getRowRenderer) {
      return __metaData.getRowRenderer(rendererProps, idx);
    }
    if (__metaData.isGroup) {
      return renderGroupRow();
    }
  }

  if (rowRenderer) {
    return renderCustomRowRenderer();
  }

  return <Row<R> {...rendererProps} />;
}

export default memo(RowRenderer) as <R, K extends keyof R>(props: RowRendererProps<R, K>) => JSX.Element;
