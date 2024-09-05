import { createContext, useContext } from 'react';

import type { SelectHeaderRowEvent, SelectRowEvent } from '../types';

export interface RowSelectionContextValue {
  readonly isRowSelected: boolean;
  readonly isRowSelectionDisabled: boolean;
}

const RowSelectionContext = createContext<RowSelectionContextValue | undefined>(undefined);

export const RowSelectionProvider = RowSelectionContext.Provider;

const RowSelectionChangeContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((selectRowEvent: SelectRowEvent<any>) => void) | undefined
>(undefined);

export const RowSelectionChangeProvider = RowSelectionChangeContext.Provider;

export function useRowSelection() {
  const rowSelectionContext = useContext(RowSelectionContext);
  const rowSelectionChangeContext = useContext(RowSelectionChangeContext);

  if (rowSelectionContext === undefined || rowSelectionChangeContext === undefined) {
    throw new Error('useRowSelection must be used within DataGrid cells');
  }

  return {
    isRowSelectionDisabled: rowSelectionContext.isRowSelectionDisabled,
    isRowSelected: rowSelectionContext.isRowSelected,
    onRowSelectionChange: rowSelectionChangeContext
  };
}

export interface HeaderRowSelectionContextValue {
  readonly isRowSelected: boolean;
  readonly isIndeterminate: boolean;
}

const HeaderRowSelectionContext = createContext<HeaderRowSelectionContextValue | undefined>(
  undefined
);

export const HeaderRowSelectionProvider = HeaderRowSelectionContext.Provider;

const HeaderRowSelectionChangeContext = createContext<
  ((selectRowEvent: SelectHeaderRowEvent) => void) | undefined
>(undefined);

export const HeaderRowSelectionChangeProvider = HeaderRowSelectionChangeContext.Provider;

export function useHeaderRowSelection() {
  const headerRowSelectionContext = useContext(HeaderRowSelectionContext);
  const headerRowSelectionChangeContext = useContext(HeaderRowSelectionChangeContext);

  if (headerRowSelectionContext === undefined || headerRowSelectionChangeContext === undefined) {
    throw new Error('useHeaderRowSelection must be used within DataGrid cells');
  }

  return {
    isIndeterminate: headerRowSelectionContext.isIndeterminate,
    isRowSelected: headerRowSelectionContext.isRowSelected,
    onRowSelectionChange: headerRowSelectionChangeContext
  };
}
