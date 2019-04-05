type Handler = (...args: unknown[]) => void;

export default class EventBus {
  readonly subscribers = new Map<string, Set<Handler>>();

  subscribe(type: string, handler: Handler) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }

    const handlers = this.subscribers.get(type)!;
    handlers.add(handler);

    return () => {
      handlers.delete(handler);
    };
  }

  dispatch(type: string, ...data: unknown[]) {
    const handlers = this.subscribers.get(type);
    if (handlers) {
      handlers.forEach(handler => handler(...data));
    }
  }
}
