import React from 'react';
import EventDispatcher from './EventDispatcher';

const events = new EventDispatcher();

const sharedState = {
  selectedPosition: {
    idx: -1,
    rowIdx: -1
  },
  isEditorEnabled: false,
  firstEditorKeyPress: null
};

function connect(mapStateToProps, mapDispatchToProps, subscribeToEvents = () => {}) {
  const actions = mapDispatchToProps(events.dispatch);
  return function wrapWithConnect(WrappedComponent) {
    return class Connect extends React.Component {
      componentDidMount() {
        subscribeToEvents(events.subscribe, this.setState, this.props);
      }

      componentWillUnmount() {
        events.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent
            {...mapStateToProps(sharedState, this.props)}
            {...this.props}
            {...actions}
          />
        );
      }
    };
  };
}

export default connect;
