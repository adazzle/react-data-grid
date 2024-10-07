import { createContext, useContext } from 'react';

import type { Direction } from '../src/types';

const DirectionContext = createContext<Direction>('ltr');

export const DirectionContextProvider = DirectionContext.Provider;

export function useDirection(): Direction {
  return useContext(DirectionContext);
}
