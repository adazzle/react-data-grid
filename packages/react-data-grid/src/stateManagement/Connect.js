import React from 'react';
import PropTypes from 'prop-types';

// import { subscribe, dispatch } from './EventDispatcher';
// import { createStore } from './Store';

// const store = createStore();

// const createAction = eventName => {
//   return {
//     [eventName](payload) {
//       dispatch(eventName, payload);
//     }
//   };
// };

// const mapDispatchToActions = dispatchers => {
//   return dispatchers.reduce((actions, eventName) => {
//     return {
//       ...actions,
//       ...createAction(eventName)
//     };
//   }, {});
// };

// function connect(mapStateToProps, getDispatchers, getSubscriptions) {
//   const actions = getDispatchers && mapDispatchToActions(getDispatchers());
//   return function wrapWithConnect(WrappedComponent) {
//     return class Connect extends React.Component {
//       static propTypes = {
//         innerRef: PropTypes.func
//       };

//       componentDidMount() {
//         if (getSubscriptions) {
//           const subscriptions = getSubscriptions(this.update, this.props);
//           this.subscribe(subscriptions);
//         }
//       }

//       componentWillUnmount() {
//         // TODO
//       }

//       subscribe(subscriptions) {
//         Object.keys(subscriptions).forEach(eventName => {
//           subscribe(eventName, subscriptions[eventName]);
//         });
//       }

//       update = payload => {
//         store.updateStore(payload);
//         this.setState(payload);
//       };

//       render() {
//         const { innerRef, ...rest } = this.props;

//         return (
//           <WrappedComponent
//             ref={innerRef}
//             {...mapStateToProps(store.getState(), rest)}
//             {...rest}
//             {...actions}
//           />
//         );
//       }
//     };
//   };
// }

const connect = (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({})
) => Component => {
  class Connected extends React.Component {
    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    static propTypes = {
      innerRef: PropTypes.func
    };

    onStoreChange() {
      const { store } = this.context;
      const state = store.getState();
      const stateProps = mapStateToProps(state);
      const dispatchProps = mapDispatchToProps(store.dispatch);
      this.setState({
        ...stateProps,
        ...dispatchProps
      });
    }

    componentWillMount() {
      const { store } = this.context;
      this.onStoreChange();
      this.unsubscribe = store.subscribe(() => this.onStoreChange(this.props));
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return (
        <Component
          ref={this.props.innerRef}
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  return Connected;
};

export default connect;

