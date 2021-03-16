import { useContext } from 'react';

import type { Viewport } from '../context';
import { ViewportContext } from '../context';

export function useViewport<R, SR>() {
  const context = useContext(ViewportContext);
  if (context === undefined) {
    throw new Error('DataGrid compound components cannot be rendered outside the DataGrid component');
  }
  return context as Viewport<R, SR>;
}
