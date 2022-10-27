import { createContext, useContext } from 'react';

import type { Renderers, Maybe } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataGridDefaultComponentsContext = createContext<Maybe<Renderers<any, any>>>(undefined);

export const DataGridDefaultComponentsProvider = DataGridDefaultComponentsContext.Provider;

export function useDefaultComponents<R, SR>(): Maybe<Renderers<R, SR>> {
  return useContext(DataGridDefaultComponentsContext);
}
