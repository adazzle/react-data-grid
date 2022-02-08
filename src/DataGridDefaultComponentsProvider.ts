import { createContext, useContext } from 'react';

import type { Components, Maybe } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataGridDefaultComponentsContext = createContext<Maybe<Components<any, any>>>(undefined);

export const DataGridDefaultComponentsProvider = DataGridDefaultComponentsContext.Provider;

export function useDefaultComponents<R, SR>(): Maybe<Components<R, SR>> {
  return useContext(DataGridDefaultComponentsContext);
}
