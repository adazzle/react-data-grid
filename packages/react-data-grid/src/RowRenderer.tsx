import React, { memo } from 'react';
import { isElement } from 'react-is';

import Row from './Row';
import RowGroup from './RowGroup';
import { CanvasProps } from './Canvas';
import { IRowRendererProps, RowData } from './common/types';
import EventBus from './EventBus';

type SharedCanvasProps<R, K extends keyof R> = Pick<CanvasProps<R, K>,
| 'columnMetrics'
| 'getSubRowDetails'
| 'onRowSelectionChange'
| 'rowGroupRenderer'
| 'rowHeight'
| 'rowKey'
| 'rowRenderer'
| 'selectedRows'
| 'onRowClick'
| 'onRowDoubleClick'
| 'onCellExpand'
| 'onRowExpandToggle'
| 'onDeleteSubRow'
| 'onAddSubRow'
>;

export interface RowRendererProps<R, K extends keyof R> extends SharedCanvasProps<R, K> {
  idx: number;
  rowData: R;
  colOverscanStartIdx: number;
  colOverscanEndIdx: number;
  scrollLeft: number | undefined;
  setRowRef(row: Row<R> | null, idx: number): void;
  enableCellRangeSelection?: boolean;
  eventBus: EventBus;
}

function RowRenderer<R, K extends keyof R>({
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
  setRowRef,
  ...props
}: RowRendererProps<R, K>) {
  const { __metaData } = rowData as RowData;
  const rendererProps: IRowRendererProps<R> & { ref: React.Ref<Row<R>> } = {
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
    subRowDetails: getSubRowDetails?.(rowData),
    colOverscanStartIdx,
    colOverscanEndIdx,
    lastFrozenColumnIndex: columnMetrics.lastFrozenColumnIndex,
    scrollLeft,
    isSummaryRow: false,
    eventBus,
    onRowClick: props.onRowClick,
    onRowDoubleClick: props.onRowDoubleClick,
    onCellExpand: props.onCellExpand,
    onDeleteSubRow: props.onDeleteSubRow,
    onAddSubRow: props.onAddSubRow,
    enableCellRangeSelection: props.enableCellRangeSelection
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
      <RowGroup<R>
        {...rowGroupProps}
        {...__metaData!}
        columns={columns}
        name={(rowData as RowData).name!}
        eventBus={eventBus}
        renderer={rowGroupRenderer}
        onRowExpandToggle={props.onRowExpandToggle}
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
