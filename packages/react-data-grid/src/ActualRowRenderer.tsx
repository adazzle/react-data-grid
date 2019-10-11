import React, { memo } from 'react';
import { isElement } from 'react-is';
import shallowEqual from 'shallowequal';

import Row from './Row';
import RowGroup from './RowGroup';
import { CanvasProps } from './Canvas';
import { RowRenderer, RowRendererProps, CalculatedColumn, SubRowDetails, RowData } from './common/types';

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

interface ActualRowRendererProps<R> extends SharedCanvasProps<R> {
  idx: number;
  rowData: R;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  scrollLeft: number;
  rowRefs: Map<number, RowRenderer<R> & React.Component<RowRendererProps<R>>>;
}

type SharedActualRowRendererProps<R> = Pick<ActualRowRendererProps<R>,
| 'idx'
| 'cellMetaData'
| 'onRowSelectionChange'
| 'colOverscanStartIdx'
| 'colOverscanEndIdx'
| 'scrollLeft'
>;

interface RendererProps<R> extends SharedActualRowRendererProps<R> {
  ref(row: (RowRenderer<R> & React.Component<RowRendererProps<R>>) | null): void;
  row: R;
  columns: CalculatedColumn<R>[];
  lastFrozenColumnIndex: number;
  subRowDetails?: SubRowDetails;
  height: number;
  isRowSelected: boolean;
}

function ActualRowRenderer<R>({
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
  rowRefs,
  rowRenderer,
  scrollLeft,
  selectedRows
}: ActualRowRendererProps<R>) {
  const { __metaData } = rowData as RowData;
  const rendererProps: RendererProps<R> = {
    ref(row) {
      if (row) {
        rowRefs.set(idx, row);
      } else {
        rowRefs.delete(idx);
      }
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
    scrollLeft
  };

  function renderCustomRowRenderer() {
    const { ref, ...otherProps } = rendererProps;
    const CustomRowRenderer = rowRenderer!;
    const customRowRendererProps = { ...otherProps, renderBaseRow: (p: RowRendererProps<R>) => <Row ref={ref} {...p} /> };

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
        renderBaseRow={(p: RowRendererProps<R>) => <Row ref={ref} {...p} />}
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

function propsAreEqual<R>(prevProps: ActualRowRendererProps<R>, nextProps: ActualRowRendererProps<R>) {
  const { scrollLeft, ...rest } = prevProps;
  const { scrollLeft: nextScrollLeft, ...nextRest } = nextProps;

  return shallowEqual(rest, nextRest);
}

export default memo(ActualRowRenderer, propsAreEqual) as <R>(props: ActualRowRendererProps<R>) => JSX.Element;
