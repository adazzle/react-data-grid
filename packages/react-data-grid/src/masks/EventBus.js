class EventBus {
  subscribers = {};

  subscribe(type, handler) {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }

    const handlers = this.subscribers[type];
    handlers.push(handler);

    return () => {
      const index = handlers.indexOf(handler);
      if (index > 0) {
        handlers.splice(index, 1);
      }
    };
  }

  dispatch(type, ...data) {
    const handlers = this.subscribers[type];
    if (Array.isArray(handlers)) {
      handlers.forEach(handler => handler(...data));
    }
  }
}

export default EventBus;
