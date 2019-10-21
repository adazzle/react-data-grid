import React from 'react';
import CellContent from './CellContent';
import { CellContentRendererProps } from '../common/types';

export function legacyCellContentRenderer<R>(props: CellContentRendererProps<R>) {
  return React.createElement<CellContentRendererProps<R>>(CellContent, props);
}

export function valueCellContentRenderer<R>(props: CellContentRendererProps<R>) {
  return props.rowData[props.column.key];
}
