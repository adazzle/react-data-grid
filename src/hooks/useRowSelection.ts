import { createContext, useContext } from 'react';
import type { SelectRowEvent } from '../types';

const RowSelectionContext = createContext<boolean | undefined>(undefined);

export const RowSelectionProvider = RowSelectionContext.Provider;

const RowSelectionChangeContext = createContext<
  ((selectRowEvent: SelectRowEvent) => void) | undefined
>(undefined);

export const RowSelectionChangeProvider = RowSelectionChangeContext.Provider;

export function useRowSelection(): [boolean, (selectRowEvent: SelectRowEvent) => void] {
  const rowSelectionContext = useContext(RowSelectionContext);
  const rowSelectionChangeContext = useContext(RowSelectionChangeContext);

  if (rowSelectionContext === undefined || rowSelectionChangeContext === undefined) {
    throw new Error('useRowSelection must be used within DataGrid cells');
  }

  return [rowSelectionContext, rowSelectionChangeContext];
}
