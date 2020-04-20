import { Position, SelectRowEvent } from './common/types';

interface EventMap {
  SELECT_CELL: (position: Position, enableEditor?: boolean) => void;
  SELECT_ROW: (event: SelectRowEvent) => void;
  DRAG_ENTER: (overRowIdx: number) => void;
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
      handlers.forEach(handler => (handler as (...args: Parameters<EventMap[T]>) => void)(...args));
    }
  }
}
