const validateAction = action => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!');
  }
  if (typeof action.type === 'undefined') {
    throw new Error('Action must have a type!');
  }
};

export default function createStore(reducer) {
  let state = undefined;
  const subscribers = [];

  const store = {
    dispatch: action => {
      validateAction(action);
      state = reducer(state, action);
      subscribers.forEach(handler => handler());
    },
    getState: () => state,
    subscribe: handler => {
      subscribers.push(handler);
      return () => {
        const index = subscribers.indexOf(handler);
        if (index > 0) {
          subscribers.splice(index, 1);
        }
      };
    }
  };
  store.dispatch({ type: '@@redux/INIT' });
  return store;
}
