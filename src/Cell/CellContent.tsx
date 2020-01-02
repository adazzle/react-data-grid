import React, { createElement, cloneElement } from 'react';
import { isElement, isValidElementType } from 'react-is';

import { SimpleCellFormatter } from '../formatters';
import { CellContentRendererProps } from '../common/types';

export default function CellContent<R>({
  rowIdx,
  column,
  rowData,
  isRowSelected,
  isSummaryRow,
  onRowSelectionChange
}: CellContentRendererProps<R>) {
  const { formatter } = column;

  if (formatter === undefined) {
    return <SimpleCellFormatter value={rowData[column.key] as unknown as string} />;
  }

  const formatterProps = {
    value: rowData[column.key],
    column,
    rowIdx,
    row: rowData,
    isRowSelected,
    onRowSelectionChange,
    isSummaryRow
  };

  if (isValidElementType(formatter)) {
    return createElement<typeof formatterProps>(formatter, formatterProps);
  }

  if (isElement(formatter)) {
    return cloneElement(formatter, formatterProps);
  }

  return null;
}
