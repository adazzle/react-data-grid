import React from 'react';
import { isElement, isValidElementType } from 'react-is';

import { FormatterProps } from '../common/types';
import { SimpleCellFormatter } from '../formatters';
import { CellContentProps } from './CellContent';

type CellValueProps<R> = Pick<CellContentProps<R>,
'rowIdx'
| 'rowData'
| 'column'
| 'value'
| 'isScrolling'
>;

export default function CellValue<R extends {}>({ rowIdx, rowData, column, value, isScrolling }: CellValueProps<R>) {
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

  function getFormatterProps(): FormatterProps<unknown, unknown, R> {
    return {
      value,
      column,
      rowIdx,
      isScrolling,
      row: rowData,
      dependentValues: getFormatterDependencies(rowData)
    };
  }

  const Formatter = column.formatter;

  if (isElement(Formatter)) {
    return React.cloneElement(Formatter, getFormatterProps());
  }

  if (isValidElementType(Formatter)) {
    return <Formatter {...getFormatterProps()} />;
  }

  return <SimpleCellFormatter value={value as string} />;
}
