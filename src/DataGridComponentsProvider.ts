import { createContext, useContext, useMemo } from 'react';

import type { Maybe } from './types';
import type { SortIconProps } from './components';
import { SortIcon } from './components';

interface Components {
  SortIcon?: Maybe<React.ComponentType<SortIconProps>>;
}

const DataGridComponentsContext = createContext<Components | undefined>(undefined);

export const DataGridComponentsProvider = DataGridComponentsContext.Provider;

export function useComponents(): {
  SortIcon: React.ComponentType<SortIconProps>;
} {
  const context = useContext(DataGridComponentsContext);
  return useMemo(() => ({ SortIcon: context?.SortIcon ?? SortIcon }), [context?.SortIcon]);
}
