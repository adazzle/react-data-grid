import React, { createElement, cloneElement, forwardRef } from 'react';
import { isElement, isValidElementType } from 'react-is';

import CellActions from './CellActions';
import CellExpand from './CellExpander';
import { SimpleCellFormatter } from '../formatters';
import ChildRowDeleteButton from '../ChildRowDeleteButton';
import { CellContentRendererProps } from '../common/types';

function CellContent<R>({
  idx,
  rowIdx,
  column,
  rowData,
  cellMetaData,
  expandableOptions,
  isRowSelected,
  isSummaryRow,
  onRowSelectionChange,
  ref
}: CellContentRendererProps<R>) {
  const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
  const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
  const style = expandableOptions && isExpandCell ? { marginLeft: expandableOptions.treeDepth * 30 } : undefined;

  function getFormatterDependencies(row: R) {
    // convention based method to get corresponding Id or Name of any Name or Id property
    const { getRowMetaData } = column;
    if (getRowMetaData) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of react-data-grid. Instead access row prop of formatter');
      }
      return getRowMetaData(row, column);
    }
  }

  function getFormatterProps() {
    return {
      value: rowData[column.key],
      column,
      rowIdx,
      row: rowData,
      isRowSelected,
      onRowSelectionChange,
      dependentValues: getFormatterDependencies(rowData),
      isSummaryRow
    };
  }

  function getFormattedValue(formatter: typeof column['formatter']) {
    if (formatter === undefined) {
      return <SimpleCellFormatter value={rowData[column.key] as unknown as string} />;
    }

    if (isValidElementType(formatter)) {
      return createElement<ReturnType<typeof getFormatterProps>>(formatter, getFormatterProps());
    }

    if (isElement(formatter)) {
      return cloneElement(formatter, getFormatterProps());
    }

    return null;
  }

  function handleDeleteSubRow() {
    if (cellMetaData.onDeleteSubRow) {
      cellMetaData.onDeleteSubRow({
        idx,
        rowIdx,
        rowData,
        expandArgs: expandableOptions
      });
    }
  }

  function handleCellExpand() {
    if (cellMetaData.onCellExpand) {
      cellMetaData.onCellExpand({ rowIdx, idx, rowData, expandArgs: expandableOptions });
    }
  }

  return (
    <>
      {cellMetaData.getCellActions && (
        <CellActions<R>
          column={column}
          rowData={rowData}
          getCellActions={cellMetaData.getCellActions}
        />
      )}
      {expandableOptions && expandableOptions.canExpand && (
        <CellExpand
          expanded={expandableOptions.expanded}
          onCellExpand={handleCellExpand}
        />
      )}
      <div ref={ref} className="rdg-cell-value">
        {expandableOptions && treeDepth > 0 && isExpandCell && (
          <ChildRowDeleteButton
            treeDepth={treeDepth}
            onDeleteSubRow={handleDeleteSubRow}
            isDeleteSubRowEnabled={!!cellMetaData.onDeleteSubRow}
          />
        )}
        <div style={style}>
          {getFormattedValue(column.formatter)}
        </div>
      </div>
    </>
  );
}

export default forwardRef(
  CellContent as React.RefForwardingComponent<HTMLDivElement, CellContentRendererProps<{ [key: string]: unknown }>>
) as <R, K extends keyof R>(props: CellContentRendererProps<R>) => JSX.Element;
