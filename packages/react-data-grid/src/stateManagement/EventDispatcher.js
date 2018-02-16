const listeners = new Map();

export const subscribe = (label, callback) => {
  listeners.has(label) || listeners.set(label, []);
  listeners.get(label).push(callback);
};

export const unsubscribe = () => {
  listeners.clear();
};

export const dispatch = (label, ...args) => {
  let actions = listeners.get(label);

  if (actions && actions.length) {
    actions.forEach(a => {
      a(...args);
    });
    return true;
  }
  return false;
};
