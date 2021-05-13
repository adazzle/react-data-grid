import { createContext, useContext } from 'react';
import type { SelectRowEvent } from '../types';

const RowSelectionContext = createContext<boolean | undefined>(undefined);

export const RowSelectionProvider = RowSelectionContext.Provider;

function useSelection() {
  const context = useContext(RowSelectionContext);
  if (context === undefined) {
    throw new Error('useRowSelection must be used within a RowSelectionContext');
  }
  return context;
}

export const RowSelectionChangeContext =
  createContext<((selectRowEvent: SelectRowEvent) => void) | undefined>(undefined);

export const RowSelectionChangeProvider = RowSelectionChangeContext.Provider;

function useRowSelectionChange() {
  const context = useContext(RowSelectionChangeContext);
  if (context === undefined) {
    throw new Error('useRowSelectionChange must be used within a RowSelectionChangeContext');
  }
  return context;
}

export function useRowSelection(): readonly [boolean, (selectRowEvent: SelectRowEvent) => void] {
  return [useSelection(), useRowSelectionChange()];
}
