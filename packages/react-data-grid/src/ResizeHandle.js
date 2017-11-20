const React = require('react');
const Draggable = require('./Draggable');
require('../../../themes/react-data-grid-header.css');

const style = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 6,
  height: '100%'
};

function ResizeHandle(props) {
  return (
    <Draggable {...props}
      className="react-grid-HeaderCell__resizeHandle"
      style={style}
    />
  );
}

module.exports = ResizeHandle;
