import React from 'react';
import PropTypes from 'prop-types';

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

    state = this.getStateFromStore();

    getStateFromStore() {
      const { store } = this.context;
      const state = store.getState();
      const stateProps = mapStateToProps(state);
      const dispatchProps = mapDispatchToProps(store.dispatch);

      return {
        ...stateProps,
        ...dispatchProps
      };
    }

    onStoreChange = () => {
      this.setState(this.getStateFromStore());
    };

    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(this.onStoreChange);
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

