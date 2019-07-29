import React from 'react';
import { isElement, isValidElementType } from 'react-is';

import { FormatterProps, RowData } from '../common/types';
import { SimpleCellFormatter } from '../formatters';
import { CellContentProps } from './CellContent';

type CellValueProps<R> = Pick<CellContentProps<R>,
'rowIdx'
| 'rowData'
| 'column'
| 'value'
| 'isScrolling'
>;

export default function CellValue<R extends RowData>({ rowIdx, rowData, column, value, isScrolling }: CellValueProps<R>) {
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

  function getFormatterProps(): FormatterProps<R, unknown> {
    const row = typeof rowData.toJSON === 'function' ? rowData.toJSON() : rowData;

    return {
      value,
      column,
      rowIdx,
      isScrolling,
      row,
      dependentValues: getFormatterDependencies(row)
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
