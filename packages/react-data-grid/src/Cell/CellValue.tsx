import React from 'react';
import { isElement, isValidElementType } from 'react-is';

import { SimpleCellFormatter } from '../formatters';
import { CellContentProps } from './CellContent';

type CellValueProps<R> = Pick<CellContentProps<R>,
'rowIdx'
| 'rowData'
| 'column'
| 'value'
| 'isScrolling'
>;

export default function CellValue<R>({ rowIdx, rowData, column, value, isScrolling }: CellValueProps<R>) {
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
      value,
      column,
      rowIdx,
      isScrolling,
      row: rowData,
      dependentValues: getFormatterDependencies(rowData)
    };
  }

  const { formatter } = column;

  if (isElement(formatter)) {
    return React.cloneElement(formatter, getFormatterProps());
  }

  if (isValidElementType(formatter)) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    return React.createElement(formatter, { ...getFormatterProps(), value: value as any }); //FIXME: fix value type
  }

  return <SimpleCellFormatter value={value as string} />;
}
