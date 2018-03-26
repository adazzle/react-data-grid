import React from 'react';

import { subscribe, dispatch } from './EventDispatcher';
import { createStore } from './Store';

const store = createStore();

const createAction = eventName => {
  return {
    [eventName](payload) {
      dispatch(eventName, payload);
    }
  };
};

const mapDispatchToActions = dispatchers => {
  return dispatchers.reduce((actions, eventName) => {
    return {
      ...actions,
      ...createAction(eventName)
    };
  }, {});
};

function connect(mapStateToProps, getDispatchers, getSubscriptions) {
  const actions = getDispatchers && mapDispatchToActions(getDispatchers());
  return function wrapWithConnect(WrappedComponent) {
    return class Connect extends React.Component {

      componentDidMount() {
        if (getSubscriptions) {
          const subscriptions = getSubscriptions(this.update, this.props);
          this.subscribe(subscriptions);
        }
      }

      subscribe = subscriptions => {
        Object.keys(subscriptions).forEach(eventName => {
          subscribe(eventName, subscriptions[eventName]);
        });
      };

      update = payload => {
        store.updateStore(payload);
        this.setState(payload);
      };

      render() {
        return (
          <WrappedComponent
            {...mapStateToProps(store.getState(), this.props)}
            {...this.props}
            {...actions}
          />
        );
      }
    };
  };
}

export default connect;

