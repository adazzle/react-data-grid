import { createContext, useContext } from 'react';

export const RowPositionContext =
  createContext<number | undefined>(undefined);

export function useRowPosition() {
  const context = useContext(RowPositionContext);
  if (context === undefined) {
    throw new Error('useRowPosition must be used within a RowPositionContext');
  }
  return context;
}
