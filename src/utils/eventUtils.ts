import type { CellEvent } from '../types';

export function createCellEvent<E extends React.SyntheticEvent<HTMLDivElement>>(
  event: E
): CellEvent<E> {
  let defaultPrevented = false;
  const cellEvent = {
    ...event,
    preventGridDefault() {
      defaultPrevented = true;
    },
    isGridDefaultPrevented() {
      return defaultPrevented;
    }
  };

  Object.setPrototypeOf(cellEvent, Object.getPrototypeOf(event));

  return cellEvent;
}

export function isInteractingWithInput(event: React.KeyboardEvent<HTMLSpanElement> | React.MouseEvent<HTMLSpanElement>) {
  return event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement ||
    event.target instanceof HTMLSelectElement;
}
