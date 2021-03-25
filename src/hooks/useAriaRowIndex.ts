import { createContext, useContext } from 'react';

export const AriaRowIndexContext =
  createContext<number | undefined>(undefined);

export function useAriaRowIndex() {
  const context = useContext(AriaRowIndexContext);
  if (context === undefined) {
    throw new Error('useAriaRowIndex must be used within a AriaRowIndexContext');
  }
  return context;
}
