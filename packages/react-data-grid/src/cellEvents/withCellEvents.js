import React from 'react';
import PropTypes from 'prop-types';
import EventTypes from './CellEventTypes';

export const withCellEvents = WrappedComponent => {
  return class CellConnector extends React.Component {
    static contextTypes = {
      cellEvents: PropTypes.object.isRequired
    };

    static propTypes = {
      idx: PropTypes.number,
      rowIdx: PropTypes.number
    };

    state = {
      isEditorEnabled: false
    };

    componentDidMount() {
      const { cellEvents } = this.context;
      cellEvents.subscribe(EventTypes.editCell, this.setEditorEnabled);
    }

    onCellClick = ({ idx, rowIdx }) => {
      const { cellEvents } = this.context;
      cellEvents.dispatch(EventTypes.onClick, { idx, rowIdx });
    };

    setEditorEnabled = (selectedPosition, initialKeyCode) => {
      const {idx, rowIdx} = this.props;
      if (idx === selectedPosition.idx && rowIdx === selectedPosition.rowIdx) {
        this.setState({isEditorEnabled: true, initialKeyCode});
      }
    };

    render() {
      return (
        <WrappedComponent
          isEditorEnabled={this.state.isEditorEnabled}
          initialKeyCode={this.state.initialKeyCode}
          onCellClick={this.onCellClick}
          {...this.props}
        />
      );
    }
  };
};
