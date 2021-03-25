import type { ReactNode } from 'react';
import { createContext } from 'react';

export const ColumnResizeContext = createContext<(((columnKey: string, width: number) => void) | undefined)>(undefined);

export const AllRowsSelectedContext = createContext<boolean | undefined>(undefined);

export const AllRowsSelectedContextChange = createContext<(((checked: boolean) => void) | undefined)>(undefined);

interface HeaderRowProviderProps {
  allRowsSelected: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
  onColumnResize: (columnKey: string, width: number) => void;
  children: ReactNode;
}

export function HeaderRowProvider({
  allRowsSelected,
  onAllRowsSelectionChange,
  onColumnResize,
  children
}: HeaderRowProviderProps) {
  return (
    <ColumnResizeContext.Provider value={onColumnResize}>
      <AllRowsSelectedContext.Provider value={allRowsSelected}>
        <AllRowsSelectedContextChange.Provider value={onAllRowsSelectionChange}>
          {children}
        </AllRowsSelectedContextChange.Provider>
      </AllRowsSelectedContext.Provider>
    </ColumnResizeContext.Provider>
  );
}
