
import React from 'react';
import PropTypes from 'prop-types';
import EventTypes from './CellEventTypes';

export const withCellEvents = (WrappedComponent) => {
  return class CellConnector extends React.Component {
    static contextTypes = {
      cellEvents: PropTypes.object.isRequired
    };

    onCellClick = ({idx, rowIdx}) => {
      const {cellEvents} = this.context;
      cellEvents.dispatch(EventTypes.onClick, {idx, rowIdx});
    }

    render() {
      return (
        <WrappedComponent onCellClick={this.onCellClick} {...this.props} />
      );
    }
  };
};
