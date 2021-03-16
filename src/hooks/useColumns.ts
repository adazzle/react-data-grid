import { useContext } from 'react';

import type { CalculatedColumn } from '../types';
import { ViewportColumnsContext } from '../context';

export function useColumns<R, SR>() {
  const context = useContext(ViewportColumnsContext);
  if (context === undefined) {
    throw new Error('DataGrid compound components cannot be rendered outside the DataGrid component');
  }
  return context as readonly CalculatedColumn<R, SR>[];
}
