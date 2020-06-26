import { Position, SelectRowEvent, CommitEvent } from './common/types';

interface EventMap {
  CELL_SELECT: (position: Position) => void;
  CELL_EDIT: (position: Position) => void;
  CELL_NAVIGATE: (key: string, shiftKey: boolean, nextPosition: Position) => void;
  CELL_COPY: (value: unknown) => void;
  CELL_PASTE: (position: Position) => void;
  CELL_COMMIT: (event: CommitEvent) => void;
  CELL_DRAG_START: () => void;
  CELL_DRAG_END: () => void;
  CELL_DRAG_HANDLE_DOUBLE_CLICK: () => void;
  ROW_SELECT: (event: SelectRowEvent) => void;
  ROW_DRAG_ENTER: (overRowIdx: number) => void;
}

type EventName = keyof EventMap;

export default class EventBus {
  private readonly subscribers = new Map<EventName, Set<EventMap[EventName]>>();

  subscribe<T extends EventName>(type: T, handler: EventMap[T]) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }

    const handlers = this.subscribers.get(type)!;
    handlers.add(handler);

    return () => {
      handlers.delete(handler);
    };
  }

  dispatch<T extends EventName>(type: T, ...args: Parameters<EventMap[T]>) {
    const handlers = this.subscribers.get(type);
    if (handlers) {
      // handler needed a type assertion to fix type bug
      handlers.forEach(handler => {
        (handler as (...args: Parameters<EventMap[T]>) => void)(...args);
      });
    }
  }
}
