import React from 'react';
import PropTypes from 'prop-types';
import {createStore} from './Store';


const store = createStore();

export class Provider extends React.Component {
  static propTypes = {
    children: PropTypes.isRequired,
    store: PropTypes.isRequired
  };
  static childContextTypes = {
    store: PropTypes.object.isRequired
  };
  getChildContext() {
    return {store};
  }
  render() {
    return this.props.children;
  }
}

export default Provider;
