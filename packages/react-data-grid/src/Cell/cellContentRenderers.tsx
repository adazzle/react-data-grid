import React from 'react';
import CellContent from './CellContent';
import { CellContentRendererProps } from '../common/types';

export function legacyCellContentRenderer<R>(props: CellContentRendererProps<R>) {
  return props.isSummaryRow
    ? <CellContent<R> {...props} isRowSelected={false} />
    : <CellContent<R> {...props} />;
}

export function valueCellContentRenderer<R>(props: CellContentRendererProps<R>) {
  return props.value;
}
