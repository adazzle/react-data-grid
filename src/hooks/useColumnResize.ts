import { useContext } from 'react';

import { ColumnResizeContext } from '../context';

export function useColumnResize() {
  const context = useContext(ColumnResizeContext);
  if (context === undefined) {
    throw new Error('useColumnResize must be used within a ColumnResizeContext');
  }
  return context;
}
