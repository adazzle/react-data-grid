import React from 'react';
import PropTypes from 'prop-types';

export const cellEventListener = WrappedComponent => {
  return class extends React.Component {
    static contextTypes = {
      cellEvents: PropTypes.object.isRequired
    };

    render() {
      const cellEvents = this.context.cellEvents;
      return (
        <WrappedComponent
          cellEvents={cellEvents}
          {...this.props}
        />
      );
    }
  };
};
