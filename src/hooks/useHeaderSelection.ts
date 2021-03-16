import { useContext } from 'react';

import { AllRowsSelectedContext, AllRowsSelectedContextChange } from '../context';

export function useAllRowsSelected() {
  const context = useContext(AllRowsSelectedContext);
  if (context === undefined) {
    throw new Error('useAllRowsSelected must be used within a AllRowsSelectedContext');
  }
  return context;
}

export function useAllRowsSelectedChange() {
  const context = useContext(AllRowsSelectedContextChange);
  if (context === undefined) {
    throw new Error('useAllRowsSelectedChange must be used within a AllRowsSelectedContextChange');
  }
  return context;
}
