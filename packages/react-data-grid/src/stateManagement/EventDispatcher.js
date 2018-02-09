const listeners = new Map();

export const subscribe = (label, callback) => {
  listeners.set(label, callback);
};

export const unsubscribe = () => {
  listeners.clear();
};

export const dispatch = (label, ...args) => {
  const event = listeners.get(label);

  if (event) {
    event(...args);
  }
};
