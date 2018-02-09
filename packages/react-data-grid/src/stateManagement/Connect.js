import React from 'react';
import PropTypes from 'prop-types';
import {subscribe, dispatch} from './EventDispatcher';

const createAction = eventName => {
  return {
    [eventName](payload) {
      dispatch(eventName, payload);
    }
  };
};

const mapDispatchToActions = dispatchers => {
  return dispatchers.reduce((acc, eventName) => {
    return {
      ...{},
      ...createAction(eventName)
    };
  }, {});
};

function connect(mapStateToProps, getDispatchers, getSubscriptions) {
  const actions = getDispatchers && mapDispatchToActions(getDispatchers());
  return function wrapWithConnect(WrappedComponent) {
    return class Connect extends React.Component {
      static contextTypes = {
        store: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired
      };

      componentDidMount = () => {
        if (getSubscriptions) {
          const subscriptions = getSubscriptions(this.update);
          this.subscribe(subscriptions);
        }
      };

      subscribe = subscriptions => {
        Object.keys(subscriptions).forEach(eventName => {
          subscribe(eventName, subscriptions[eventName]);
        });
      };

      update =payload => {
        this.context.store.updateStore(payload);
        this.setState(payload);
      };

      render() {
        return (
          <WrappedComponent
            {...mapStateToProps(this.context.store.getState(), this.props)}
            {...this.props}
            {...actions}
          />
        );
      }
    };
  };
}

export default connect;

