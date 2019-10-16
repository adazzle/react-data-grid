import React, { memo } from 'react';
import { isElement } from 'react-is';
import shallowEqual from 'shallowequal';

import Row from './Row';
import RowGroup from './RowGroup';
import { CanvasProps } from './Canvas';
import { IRowRendererProps, CalculatedColumn, SubRowDetails, RowData } from './common/types';

type SharedCanvasProps<R> = Pick<CanvasProps<R>,
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

export interface RowRendererPropsBase<R> {
  idx: number;
  rowData: R;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  scrollLeft: number;
  setRowRef(row: Row<R> | null, idx: number): void;
}

export type RowRendererProps<R> = SharedCanvasProps<R> & RowRendererPropsBase<R>;

type SharedActualRowRendererProps<R> = Pick<RowRendererProps<R>,
| 'idx'
| 'cellMetaData'
| 'onRowSelectionChange'
| 'colOverscanStartIdx'
| 'colOverscanEndIdx'
| 'scrollLeft'
>;

export interface RendererProps<R> extends SharedActualRowRendererProps<R> {
  ref: React.Ref<Row<R>>;
  row: R;
  columns: CalculatedColumn<R>[];
  lastFrozenColumnIndex: number;
  subRowDetails?: SubRowDetails;
  height: number;
  isRowSelected: boolean;
  isSummaryRow: boolean;
}

function RowRenderer<R>({
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
}: RowRendererProps<R>) {
  const { __metaData } = rowData as RowData;
  const rendererProps: RendererProps<R> = {
    ref(row) {
      setRowRef(row, idx);
    },
    idx,
    row: rowData,
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

export function propsAreEqual<R, T extends RowRendererPropsBase<R>>(prevProps: T, nextProps: T) {
  const { scrollLeft, ...rest } = prevProps;
  const { scrollLeft: nextScrollLeft, ...nextRest } = nextProps;

  return shallowEqual(rest, nextRest);
}

export default memo(RowRenderer, propsAreEqual) as <R>(props: RowRendererProps<R>) => JSX.Element;
