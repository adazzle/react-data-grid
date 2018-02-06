import React from 'react';
import PropTypes from 'prop-types';
import { EventDispatcher } from './EventDispatcher';

export class CellEventsProvider extends React.Component {
  static propTypes = {
    children: PropTypes.isRequired
  };
  static childContextTypes = {
    cellEvents: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.cellEvents = new EventDispatcher();
  }
  getChildContext() {
    return { cellEvents: this.cellEvents };
  }
  render() {
    return this.props.children;
  }
}

export default CellEventsProvider;
