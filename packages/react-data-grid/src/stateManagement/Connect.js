import React from 'react';
import PropTypes from 'prop-types';

const connect = (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({}),
  shouldUpdate = () => true
) => Component => {
  class Connected extends React.Component {
    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    static propTypes = {
      innerRef: PropTypes.func
    };

    state = this.getStateFromStore(this.props);

    getStateFromStore(props) {
      const { store } = this.context;
      const state = store.getState();
      const stateProps = mapStateToProps(state, props);
      const dispatchProps = mapDispatchToProps(store.dispatch, props);

      return {
        ...stateProps,
        ...dispatchProps
      };
    }

    onStoreOrPropsChange = () => {
      const newState = this.getStateFromStore(this.props);
      if (shouldUpdate(this.state, newState)) {
        this.setState(newState);
      }
    };

    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(this.onStoreOrPropsChange);
    }

    componentWillReceiveProps(nextProps) {
      this.onStoreOrPropsChange(nextProps);
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
