import React, { createElement, cloneElement } from 'react';
import { isElement, isValidElementType } from 'react-is';

import CellActions from './CellActions';
import CellExpand from './CellExpander';
import { SimpleCellFormatter } from '../formatters';
import ChildRowDeleteButton from '../ChildRowDeleteButton';
import { CellContentRendererProps } from '../common/types';

export default function CellContent<R>({
  idx,
  rowIdx,
  column,
  rowData,
  value,
  cellMetaData,
  expandableOptions,
  isRowSelected,
  isSummaryRow,
  onRowSelectionChange
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
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      value: value as any, //FIXME: fix value type
      column,
      rowIdx,
      row: rowData,
      isRowSelected,
      onRowSelectionChange,
      dependentValues: getFormatterDependencies(rowData),
      isSummaryRow
    };
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

  const { formatter } = column;

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
      <div className="rdg-cell-value">
        {expandableOptions && treeDepth > 0 && isExpandCell && (
          <ChildRowDeleteButton
            treeDepth={treeDepth}
            onDeleteSubRow={handleDeleteSubRow}
            isDeleteSubRowEnabled={!!cellMetaData.onDeleteSubRow}
          />
        )}
        <div style={style}>
          {formatter === undefined
            ? <SimpleCellFormatter value={value as string} />
            : isValidElementType(formatter)
              ? createElement(formatter, getFormatterProps())
              : isElement(formatter)
                ? cloneElement(formatter, getFormatterProps())
                : null}
        </div>
      </div>
    </>
  );
}
