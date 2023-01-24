import type { CellEvent } from '../types';

export function createCellEvent<E extends React.SyntheticEvent<HTMLDivElement>>(
  event: E
): CellEvent<E> {
  let defaultPrevented = false;
  return {
    ...event,
    preventGridDefault() {
      defaultPrevented = true;
    },
    isGridDefaultPrevented() {
      return defaultPrevented;
    }
  };
}
