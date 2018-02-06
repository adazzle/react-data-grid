import React from 'react';
import PropTypes from 'prop-types';
import EventTypes from './CellEventTypes';

export const cellEventListener = WrappedComponent => {
  return class extends React.Component {
    static contextTypes = {
      cellEvents: PropTypes.object.isRequired
    };

    editCell = (selectedPosition, keyCode) => {
      const cellEvents = this.context.cellEvents;
      cellEvents.dispatch(EventTypes.editCell, selectedPosition, keyCode);
    };

    render() {
      const cellEvents = this.context.cellEvents;
      return (
        <WrappedComponent
          cellEvents={cellEvents}
          editCell={this.editCell}
          {...this.props}
        />
      );
    }
  };
};
