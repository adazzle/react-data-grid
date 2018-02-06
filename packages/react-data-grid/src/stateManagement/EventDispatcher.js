export default class EventDispatcher {
  constructor() {
    this.listeners = new Map();
  }
  subscribe = (label, callback) => {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }
  unsubscribe = () => {
    this.listeners.clear();
  }
  dispatch = (label, ...args) => {
    let listeners = this.listeners.get(label);

    if (listeners && listeners.length) {
      listeners.forEach(listener => {
        listener(...args);
      });
      return true;
    }
    return false;
  }
}
