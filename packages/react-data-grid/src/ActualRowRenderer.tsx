import React from 'react';
import { isElement } from 'react-is';

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
  key: number;
  row: R;
  columns: CalculatedColumn<R>[];
  lastFrozenColumnIndex: number;
  subRowDetails?: SubRowDetails;
  height: number;
  isRowSelected: boolean;
}

export default function ActualRowRenderer<R>({
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
  function renderCustomRowRenderer(rowProps: RendererProps<R>) {
    const { ref, ...otherProps } = rowProps;
    const CustomRowRenderer = rowRenderer!;
    const customRowRendererProps = { ...otherProps, renderBaseRow: (p: RowRendererProps<R>) => <Row ref={ref} {...p} /> };

    if (isElement(CustomRowRenderer)) {
      if (CustomRowRenderer.type === Row) {
        // In the case where Row is specified as the custom render, ensure the correct ref is passed
        return <Row<R> {...rowProps} />;
      }
      return React.cloneElement(CustomRowRenderer, customRowRendererProps);
    }

    return <CustomRowRenderer {...customRowRendererProps} />;
  }

  function renderGroupRow(groupRowProps: RendererProps<R>) {
    const { ref, columns, ...rowGroupProps } = groupRowProps;
    const row = groupRowProps.row as RowData;

    return (
      <RowGroup
        {...rowGroupProps}
        {...row.__metaData!}
        columns={columns as CalculatedColumn<unknown>[]}
        name={row.name!}
        eventBus={eventBus}
        renderer={rowGroupRenderer}
        renderBaseRow={(p: RowRendererProps<R>) => <Row ref={ref} {...p} />}
      />
    );
  }


  const rendererProps: RendererProps<R> = {
    key: idx,
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
  const { __metaData } = rowData as RowData;

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

  return <Row<R> {...rendererProps} />;
}
