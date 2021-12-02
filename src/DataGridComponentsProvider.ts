import { createContext, useContext, useMemo } from 'react';

import type { Maybe, HeaderRendererProps } from './types';
import HeaderRenderer from './HeaderRenderer';
import type { SortIconProps } from './SortIcon';
import SortIcon from './SortIcon';

interface Components<R, SR> {
  SortIcon?: Maybe<React.ComponentType<SortIconProps>>;
  HeaderRenderer?: Maybe<React.ComponentType<HeaderRendererProps<R, SR>>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataGridComponentsContext = createContext<Components<any, any> | undefined>(undefined);

export const DataGridComponentsProvider = DataGridComponentsContext.Provider;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useComponents(): Required<NonNullable<Components<any, any>>> {
  const context = useContext(DataGridComponentsContext);
  return useMemo(
    () => ({
      SortIcon: context?.SortIcon ?? SortIcon,
      HeaderRenderer: context?.HeaderRenderer ?? HeaderRenderer
    }),
    [context?.SortIcon, context?.HeaderRenderer]
  );
}
