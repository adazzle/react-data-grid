import { createContext, useContext } from 'react';

export const RowSelectionContext =
  createContext<boolean | undefined>(undefined);

export function useRowSelection() {
  const context = useContext(RowSelectionContext);
  if (context === undefined) {
    throw new Error('useRowSelection must be used within a RowSelectionContext');
  }
  return context;
}
