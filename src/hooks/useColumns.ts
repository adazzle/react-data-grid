import { createContext, useContext } from 'react';

import type { CalculatedColumn } from '../types';

export const ColumnsContext =
  createContext<readonly CalculatedColumn<unknown>[] | undefined>(undefined);

export function useColumns<R, SR>() {
  const context = useContext(ColumnsContext);
  if (context === undefined) {
    throw new Error('DataGrid compound components cannot be rendered outside the DataGrid component');
  }
  return context as readonly CalculatedColumn<R, SR>[];
}
