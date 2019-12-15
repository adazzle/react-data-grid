import React, { createElement, cloneElement } from 'react';
import { isElement, isValidElementType } from 'react-is';

import CellExpand from './CellExpander';
import { SimpleCellFormatter } from '../formatters';
import ChildRowDeleteButton from '../ChildRowDeleteButton';
import { CellContentRendererProps } from '../common/types';

export default function CellContent<R>({
  idx,
  rowIdx,
  column,
  rowData,
  expandableOptions,
  isRowSelected,
  isSummaryRow,
  onRowSelectionChange,
  onDeleteSubRow,
  onCellExpand
}: CellContentRendererProps<R>): JSX.Element {
  const isExpandCell = expandableOptions ? expandableOptions.field === column.key : false;
  const treeDepth = expandableOptions ? expandableOptions.treeDepth : 0;
  const style = expandableOptions && isExpandCell ? { marginLeft: expandableOptions.treeDepth * 30 } : undefined;

  function getFormatterProps() {
    return {
      value: rowData[column.key],
      column,
      rowIdx,
      row: rowData,
      isRowSelected,
      onRowSelectionChange,
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
    onDeleteSubRow?.({
      idx,
      rowIdx,
      rowData,
      expandArgs: expandableOptions
    });
  }

  function handleCellExpand() {
    onCellExpand?.({ rowIdx, idx, rowData, expandArgs: expandableOptions });
  }

  return (
    <>
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
            isDeleteSubRowEnabled={!!onDeleteSubRow}
          />
        )}
        <div style={style}>
          {getFormattedValue(column.formatter)}
        </div>
      </div>
    </>
  );
}
