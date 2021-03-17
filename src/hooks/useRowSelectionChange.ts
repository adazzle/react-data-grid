import { createContext, useContext } from 'react';

export const RowSelectionChangeContext =
  createContext<(((checked: boolean, isShiftClick: boolean) => void) | undefined)>(undefined);

export function useRowSelectionChange() {
  const context = useContext(RowSelectionChangeContext);
  if (context === undefined) {
    throw new Error('useRowSelectionChange must be used within a RowSelectionChangeContext');
  }
  return context;
}
