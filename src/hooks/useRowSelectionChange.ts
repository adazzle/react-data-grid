import { createContext, useContext } from 'react';
import type { SelectRowEvent } from '../types';

export const RowSelectionChangeContext =
  createContext<(((selectRowEvent: SelectRowEvent) => void) | undefined)>(undefined);

export const RowSelectionChangeProvider = RowSelectionChangeContext.Provider;

export function useRowSelectionChange() {
  const context = useContext(RowSelectionChangeContext);
  if (context === undefined) {
    throw new Error('useRowSelectionChange must be used within a RowSelectionChangeContext');
  }
  return context;
}
