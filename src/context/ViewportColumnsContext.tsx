import type { ReactNode } from 'react';
import { createContext } from 'react';
import type { CalculatedColumn } from '../types';

export const ViewportColumnsContext = createContext<readonly CalculatedColumn<unknown>[] | undefined>(undefined);

interface ViewportColumnsContextProps<R, SR> {
  viewportColumns: readonly CalculatedColumn<R, SR>[];
  children: ReactNode;
}

export function ViewportColumnsProvider<R, SR>({
  viewportColumns,
  children
}: ViewportColumnsContextProps<R, SR>) {
  return (
    // @ts-expect-error
    <ViewportColumnsContext.Provider value={viewportColumns}>
      {children}
    </ViewportColumnsContext.Provider>
  );
}
