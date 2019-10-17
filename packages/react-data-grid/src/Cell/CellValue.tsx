import React, { cloneElement, createElement } from 'react';
import { isElement, isValidElementType } from 'react-is';

import { CellProps } from '../Cell';
import { SimpleCellFormatter } from '../formatters';

type CellValueProps<R> = Pick<CellProps<R>,
| 'rowIdx'
| 'rowData'
| 'column'
| 'value'
| 'isRowSelected'
| 'onRowSelectionChange'
| 'isSummaryRow'
>;

export default function CellValue<R>({ rowIdx, rowData, column, value, isRowSelected, onRowSelectionChange, isSummaryRow }: CellValueProps<R>) {
  function getFormatterDependencies(row: R) {
    // convention based method to get corresponding Id or Name of any Name or Id property
    const { getRowMetaData } = column;
    if (getRowMetaData) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of ReactDataGrid. Instead access row prop of formatter');
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

  const { formatter } = column;

  if (isElement(formatter)) {
    return cloneElement(formatter, getFormatterProps());
  }

  if (isValidElementType(formatter)) {
    return createElement(formatter, getFormatterProps());
  }

  return <SimpleCellFormatter value={value as string} />;
}
