import React from 'react';

import Draggable from './Draggable';

import '../../../themes/react-data-grid-header.css';

const style = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 6,
  height: '100%'
};

export default class ResizeHandle extends React.Component {
  render() {
    return (
      <Draggable
        {...this.props}
        className="react-grid-HeaderCell__resizeHandle"
        style={style}
      />
    );
  }
}
