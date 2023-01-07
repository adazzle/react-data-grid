import { createContext, useContext } from 'react';

const TreeDataGridContext = createContext<boolean | undefined>(undefined);

export const TreeDataGridProvider = TreeDataGridContext.Provider;

export function useTreeDataGrid() {
  return useContext(TreeDataGridContext);
}
