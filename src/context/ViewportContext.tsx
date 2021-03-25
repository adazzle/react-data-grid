import type { ReactNode } from 'react';
import { createContext } from 'react';
import type { CalculatedColumn, GroupRow, Position } from '../types';

export interface Viewport<R, SR> {
  columns: readonly CalculatedColumn<R, SR>[];
  rows: readonly R[] | (R | GroupRow<R>)[];
  rawRows: readonly R[];
  rowOverscanStartIdx: number;
  rowOverscanEndIdx: number;
  clientHeight: number;
  totalHeaderHeight: number;
  headerRowsCount: number;
  groupBy: readonly string[];
  isGroupRow: (row: unknown) => row is GroupRow<R>;
  isDragging: boolean;
  setDragging: (isDragging: boolean) => void;
  scrollToCell: ({ idx, rowIdx }: Partial<Position>) => void;
}

export const ViewportContext = createContext<Viewport<unknown, unknown>| undefined>(undefined);

interface ViewportContextProps<R, SR> {
  children: ReactNode;
  value: Viewport<R, SR>;
}

export function ViewportContextProvider<R, SR>({
  value,
  children
}: ViewportContextProps<R, SR>) {
  return (
    // @ts-expect-error
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
}
